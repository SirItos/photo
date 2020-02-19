<template>
  <v-autocomplete
    @click:clear="clear()"
    @change="
      val => {
        change(val)
      }
    "
    @click:append="findOnMap"
    :search-input.sync="search"
    :items="mapItems"
    :loading="loading"
    :value="current"
    :rules="[val => !!val || 'Укажите адрес']"
    :menu-props="menuProps"
    class="no-rotate mt-10"
    append-icon="mdi-map-marker"
    no-filter
    item-text="label"
    item-value="value"
    clearable
    :hide-no-data="!error_msg"
    no-data-text
    hide-selected
    label="Ваше местоположение (отображается на карте)"
  >
    <template v-slot:item="objects">
      <v-row no-gutters class="pa-1">
        <v-col cols="12">{{ objects.item.label }}</v-col>
      </v-row>
    </template>
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>Поиск не принес результатов</v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'PositionSearchComponent',
  props: {
    init: {
      type: [String, Object],
      default: null
    },
    many: Boolean
  },
  data: () => ({
    loading: false,
    wait: false,
    search: null,
    mapItems: [],
    current: null,
    error_msg: false
  }),
  computed: {
    menuProps() {
      if (!this.$vuetify.breakpoint.xsOnly) {
        return {}
      }
      return {
        maxHeight: 200
      }
    }
  },
  watch: {
    search(val) {
      this.search = val
      if (!this.wait) {
        this.wait = true
        setTimeout(() => {
          this.startSearch()
          this.wait = false
        }, 1000)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.init) {
        this.search = this.init
        this.startSearch(true)
      }
    })
  },
  methods: {
    startSearch(getFirst) {
      if (!this.search) {
        return
      }
      this.loading = true
      this.$axios
        .post('/geosearch', {
          address: this.search
        })
        .then(response => {
          if (response.data.status !== 'OK') {
            this.loading = false
            this.error_msg = true

            return
          }
          this.error_msg = false
          const items = response.data.results.map((item, index) => {
            return {
              value: item.place_id,
              label: item.formatted_address,
              latlng: item.geometry.location
            }
          })
          this.mapItems = items
          if (getFirst) {
            this.current = this.mapItems[0]
            this.change(this.current.value)
          }
          this.loading = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    change(val) {
      const selected = this.mapItems.find(object => {
        return object.value === val
      })

      this.$emit('setLocate', selected || null)
    },
    clear() {
      this.mapItems = []
    },
    findOnMap() {
      $nuxt.$router.push({
        path: '/findMap',
        query: { type: this.many ? 'many' : 'solo' }
      })
    },
    findInResponse(item, target) {
      const result = item.find(address => {
        return address.types.includes(target)
      })
      return result
    }
  }
}
</script>

<style lang="scss">
.no-rotate.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: rotate(0) !important;
}
</style>
