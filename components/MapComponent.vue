<template>
  <v-col class="map-containter">
    <client-only>
      <l-map
        ref="map"
        @click="clickOutsde"
        @update:zoom="zoomUpdated"
        style="height:100%"
        :center="center"
        :zoom="zoom"
        :minZoom="1"
        :maxZoom="16"
        :zoomAnimation="true"
        :options="mapOptions"
      >
        <!-- <l-tile-layer :url="url"></l-tile-layer> -->
        <v-tilelayer-googlemutant :apikey="googleApiKey" lang="ru"></v-tilelayer-googlemutant>
        <l-marker v-if="userLocation && !finding" ref="user_point" :lat-lng="userLocation">
          <l-icon :icon-size="[36, 36]" :icon-anchor="[18, 36]" :icon-url="null">
            <v-icon style="transform:rotate(45deg)" color="primary" size="36px">mdi-navigation</v-icon>
          </l-icon>
        </l-marker>
        <v-marker-cluster v-if="!finding" :options="clusterOptions">
          <Markers
            v-for="marker in points"
            :key="`marker_${marker.id}`"
            :current="currentMarker"
            :item="marker"
            @markerCLick="markerClick"
          />
        </v-marker-cluster>
      </l-map>
    </client-only>
    <div v-if="finding" class="center_markerck">
      <v-img :src="pin==='solo' ? '/frame.png' : 'frame_many.png'"></v-img>
    </div>
    <div v-if="!finding" class="fillter-btn d-flex d-sm-none justify-center">
      <v-btn
        v-if="!getFilterActive"
        large
        min-width="250"
        color="primary"
        class="text-none font-weight-bold"
        nuxt
        to="/filters"
      >Поиск</v-btn>
      <v-btn
        v-else
        large
        min-width="250"
        color="primary"
        class="font-weight-bold text-none"
        @click="unsetFilters"
      >Сбросить фильтр</v-btn>
    </div>
    <div v-if="!finding" class="map-contorls">
      <div
        v-show="getGeolocationPermision"
        @click="currentPosition"
        class="loccate_btn mb-2 pa-2 elevation-1"
        v-ripple
      >
        <v-icon>mdi-crosshairs-gps</v-icon>
      </div>
      <div class="zoomBtns elevation-1">
        <div @click="zoomIn" class="zoomPlus pa-2" v-ripple="!maxZoomDisable">
          <v-icon>mdi-plus</v-icon>
        </div>
        <v-divider class="mx-1"></v-divider>
        <div @click="zoomOut" class="zoomOut pa-2 1" v-ripple="!minZoomDisable">
          <v-icon>mdi-minus</v-icon>
        </div>
      </div>
    </div>
    <v-bottom-sheet v-model="sheet" hide-overlay>
      <v-divider class="white"></v-divider>
      <BottomSheetContent
        ref="bottomSheet"
        @loadEnd="recenter"
        @closeSheet="closeSheet"
        :id="selected"
      />
    </v-bottom-sheet>
    <v-bottom-sheet v-model="positionFinding" hide-overlay>
      <v-row no-gutters class="pa-3 white">
        <v-fade-transition appear mode="out-in">
          <v-col v-if="!findingLoading">
            <v-row no-gutters>
              <div class="pr-2">Адрес:</div>
              <v-col>{{ findingOnMap.address }}</v-col>
            </v-row>
            <div class="py-3 d-flex justify-center">
              <v-btn
                @click="setLocation"
                large
                min-width="250"
                color="primary"
                class="text-none font-weight-bold"
              >Принять</v-btn>
            </div>
          </v-col>
          <v-col v-else>
            <v-row no-gutters class="justify-center">
              <v-progress-circular indeterminate color="primary" size="48" width="6"></v-progress-circular>
            </v-row>
          </v-col>
        </v-fade-transition>
      </v-row>
    </v-bottom-sheet>
  </v-col>
</template>

<script>
const Markers = () => import('./MarkertComponent')
const BottomSheetContent = () => import('./BottomSheetContent')
import { mapGetters, mapActions } from 'vuex'

// AIzaSyDzFFmjZh6ZVHJPoSEt0BsoSSApgir3y1k

export default {
  name: 'MapComponent',
  components: {
    Markers,
    BottomSheetContent
  },
  props: {
    finding: { type: Boolean, default: false },
    pin: {
      type: String,
      default: 'solo'
    }
  },
  data: () => ({
    googleApiKey: 'AIzaSyBGWeItHlBAoNVIiQ1_JsXZy3iWEkC0Zow',
    resource_id: null,
    rememberPosition: null,
    userLocation: null,
    findingLoading: false,
    positionFinding: false,
    selected: null,
    getPosition: false,
    loadingPoints: false,
    mapInstanse: null,
    url: 'https://tile.gpnmarket.ru:/{z}/{x}/{y}.png',
    zoom: 14,
    center: { lat: 55.75396, lng: 37.620393 },
    mapOptions: {
      zoomControl: false,
      attributionControl: false
    },
    clusterOptions: {
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: false,
      disableClusteringAtZoom: 14
    },
    findingOnMap: {
      address: null,
      coords: null
    },
    sheet: false,
    currentMarker: null,
    points: []
  }),
  computed: {
    ...mapGetters('filters', ['getFilterActive', 'getGroupedFilters']),
    ...mapGetters('settings', ['getGeolocationPermision']),
    maxZoomDisable() {
      return this.zoom >= 18
    },
    minZoomDisable() {
      return this.zoom <= 8
    }
  },
  watch: {
    sheet: function(newVal, oldVal) {
      if (!newVal) {
        this.mapInstanse.setView(this.rememberPosition)
        this.selected = null
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapInstanse = this.$refs.map.mapObject
      this.mapListners()
      if (this.$store.state.settings.lastCenterPosition) {
        this.center = this.$store.state.settings.lastCenterPosition
      } else {
        this.currentPosition()
      }
      this.debounce()
    })
  },
  beforeDestroy() {
    this.mapInstanse.off()
  },
  methods: {
    ...mapActions('filters', ['changeFilters', 'activateFilters']),
    ...mapActions('settings', [
      'setLastCenterPosition',
      'setGeolocationPremision'
    ]),
    ...mapActions('resource', ['setResourceParams']),
    mapListners() {
      this.mapInstanse.on('movestart', () => {
        this.positionFinding = false
      })
      this.mapInstanse.on('moveend ', e => {
        this.debounce()
      })
      this.mapInstanse.on('zoomend ', e => {
        this.debounce()
      }),
        this.mapInstanse.on('locationfound', e => {
          this.setGeolocationPremision(true)
          this.mapInstanse.setZoom(14)
          this.userLocation = e.latlng
          this.getPosition = false
        })
      this.mapInstanse.on('locationerror', e => {
        this.getPosition = false
        this.setGeolocationPremision(false)
        this.$store.dispatch('settings/setOverlay', true)
        this.$axios.get('/alt-locate').then(response => {
          if (response.data.latitude) {
            this.mapInstanse.setView({
              lat: response.data.latitude,
              lng: response.data.longitude
            })
          }
        })
      })
    },
    debounce() {
      this.setLastCenterPosition(this.mapInstanse.getCenter())

      if (!this.loadingPoints) {
        this.loadingPoints = true
        if (this.finding) {
          this.findingLoading = true
          this.positionFinding = true
        }
        setTimeout(() => {
          if (this.finding) {
            this.positionFinding = true
            this.reverseGeocoding()
          } else {
            this.loadPoints()
          }

          this.loadingPoints = false
        }, 1000)
      }
    },
    async loadPoints() {
      this.loadingPoints = true
      const bound = this.mapInstanse.getBounds()

      await this.$axios
        .post('/points', {
          sw: bound._southWest,
          ne: bound._northEast,
          filters: this.getFilterActive ? this.getGroupedFilters : undefined
        })
        .then(response => {
          this.points = response.data
          this.loadingPoints = false
        })
        .catch(e => {
          console.log(e)
          this.loadingPoints = false
        })
    },
    async reverseGeocoding() {
      const center = this.mapInstanse.getCenter()

      await this.$axios
        .post('/geosearch', { latlng: center.lat + ',' + center.lng })
        .then(response => {
          this.findingLoading = false
          this.findingOnMap.address = response.data.results[0].formatted_address
          this.findingOnMap.coords = center
        })
        .catch(e => {
          this.findingLoading = false
          this.findingOnMap.address = 'Ошибка получения адреса'
        })
    },
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    zoomIn() {
      this.mapInstanse.zoomIn()
    },
    zoomOut() {
      this.mapInstanse.zoomOut()
    },
    currentPosition() {
      if (this.getPosition) return
      this.mapInstanse.locate({
        setView: true,
        maxZoom: 14,
        watch: false,
        enableHighAccuracy: false,
        maximumAge: 600000
      })
    },
    unsetFilters() {
      this.changeFilters()
      this.activateFilters()
      this.debounce()
    },
    markerClick(val) {
      this.currentMarker = val.id
      this.rememberPosition = val.latlng
      this.mapInstanse.panTo(val.latlng)
      this.selected = val.id
      this.sheet = true
      this.recenter()
    },
    clickOutsde() {
      if (this.sheet) {
        this.sheet = false
        return
      }
      this.currentMarker = null
    },
    recenter() {
      this.$nextTick(() => {
        this.panWithOffset(this.rememberPosition, [0, this.calcOffset()])
      })
    },
    calcOffset() {
      const availableSpaceCenter =
        (window.innerHeight - this.$refs.bottomSheet.$el.offsetHeight - 56) / 2
      return window.innerHeight / 2 - availableSpaceCenter
    },
    panWithOffset(latlng, offset) {
      const x = this.mapInstanse.latLngToContainerPoint(latlng).x + offset[0]
      const y =
        this.mapInstanse.latLngToContainerPoint(latlng).y + offset[1] - 23
      const point = this.mapInstanse.containerPointToLatLng([x, y])
      this.mapInstanse.setView(point)
    },
    closeSheet() {
      this.sheet = false
      this.selected = null
    },
    async setLocation() {
      await this.setResourceParams([
        {
          field: 'address',
          value: this.findingOnMap.address
        },
        {
          field: 'lat',
          value: this.findingOnMap.coords.lat
        },
        {
          field: 'long',
          value: this.findingOnMap.coords.lng
        }
      ])
      this.$root.$router.replace({
        path: '/registrate/resource/carinfo',
        query: { from_map: this.$store.state.resource.lastResourceId }
      })
    }
  }
}
</script>

<style></style>

<style lang="scss">
.leaflet-pane {
  z-index: 0 !important;
}
.map-container {
  position: relative;
}
.map-contorls,
.fillter-btn {
  position: absolute;
}
.map-contorls {
  right: 8px;
  bottom: 112px;
}
.fillter-btn {
  bottom: 28px;
  left: 0;
  width: 100%;
}
.loccate_btn,
.zoomBtns {
  background: white;
}
.loccate_btn {
  border-radius: 10px;
}
.zoomBtns {
  border-radius: 10px;
  overflow: hidden;
}
.marker-cluster {
  background-color: #ff473a;
  color: white;
}
.center_markerck {
  position: absolute;
  height: 46px;
  width: 40px;
  // z-index: 202;
  top: 50%;
  left: 50%;
  margin: -46px 0 0 -20px;
}
</style>
