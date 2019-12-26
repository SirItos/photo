<template>
  <v-autocomplete
    @click:clear="clear()"
    @change="val=>{change(val)}"
    :search-input.sync="search"
    :items="mapItems"
    :loading="loading"
    :value="current"
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
  ></v-autocomplete>
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
  data: () => ({
    loading: false,
    wait: false,
    search: null,
    mapItems: [],
    current: null
  }),
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
  methods: {
    startSearch() {
      if (!this.search) {
        return
      }
      this.$axios
        .post('/geosearch', {
          val: this.search
        })
        .then(response => {
          console.log(response.data)
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

<style lang="scss" >
.no-rotate.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: rotate(0) !important;
}
</style>