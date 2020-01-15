<template>
  <v-autocomplete
    @click:clear="clear()"
    @change="
      val => {
        change(val)
      }
    "
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
    hide-no-data
    no-data-text
    hide-selected
    label="Местонахождение авто"
  >
    <template v-slot:item="objects">
      <v-row no-gutters class="pa-1">
        <v-col cols="12">{{objects.item.label}}</v-col>
        <div class="caption">{{objects.item.sub}}</div>
      </v-row>
    </template>
  </v-autocomplete>
</template>

<script>
// import { OpenStreetMapProvider } from 'leaflet-geosearch'

// const provider = new OpenStreetMapProvider({
//   params: {
//     addressdetails: 1,
//     limit: 20,
//     'accept-language': 'ru',
//     countrycodes: 'ru'
//   }
// })

export default {
  name: 'PositionSearchComponent',
  props: {
    init: {
      type: [String, Object],
      default: null
    }
  },
  data: () => ({
    loading: false,
    wait: false,
    search: null,
    mapItems: [],
    current: null
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
          val: this.search,
          ll: this.$store.state.user.latlng.lng
            ? this.$store.state.user.latlng
            : undefined
        })
        .then(response => {
          const items = response.data.response.GeoObjectCollection.featureMember.map(
            (item, index) => {
              return {
                value: item.GeoObject.name + '_' + index,
                label: item.GeoObject.name,
                sub: item.GeoObject.description,
                latlng: {
                  lat: item.GeoObject.Point.pos.split(' ')[1],
                  lng: item.GeoObject.Point.pos.split(' ')[0]
                }
              }
            }
          )
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

      // if (val.length >= 3 && !this.loading) {
      //   this.loading = true
      //   provider.search({ query: val }).then(response => {
      //     const items = response.map(item => {
      //       const label = `${item.raw.address.road || ''} ${item.raw.address
      //         .house_number ||
      //         item.raw.address.house ||
      //         ''} ${item.raw.address.state}`
      //       return {
      //         label: label,
      //         value: item.raw.osm_id,
      //         latlng: {
      //           lat: Number(item.y),
      //           lng: Number(item.x)
      //         }
      //       }
      //     })

      //     this.mapItems = items
      //     this.loading = false
      //   })
      // }
    },
    change(val) {
      const selected = this.mapItems.find(object => {
        return object.value === val
      })

      this.$emit('setLocate', selected || null)
    },
    clear() {
      this.mapItems = []
    }
  }
}
</script>

<style lang="scss">
.no-rotate.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: rotate(0) !important;
}
</style>
