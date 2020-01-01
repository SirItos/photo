<template>
  <v-col class="map-containter">
    <client-only>
      <l-map
        ref="map"
        @update:zoom="zoomUpdated"
        style="height:100%"
        :center="center"
        :zoom="zoom"
        :minZoom="1"
        :zoomAnimation="true"
        :options="mapOptions"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <v-marker-cluster :options="clusterOptions">
          <Markers
            v-for="marker in points"
            :key="`marker_${marker.id}`"
            :item="marker"
            @markerCLick="markerClick"
          />
        </v-marker-cluster>
      </l-map>
    </client-only>
    <div class="fillter-btn d-flex d-sm-none justify-center">
      <v-btn
        v-if="!getFilterActive"
        large
        min-width="250"
        color="primary"
        class="font-weight-bold"
        nuxt
        to="/filters"
      >Поиск</v-btn>
      <v-btn
        v-else
        large
        min-width="250"
        color="primary"
        class="font-weight-bold"
        @click="unsetFilters"
      >Сбросить фильтр</v-btn>
    </div>
    <div class="map-contorls">
      <div
        v-show="geolocationPremission"
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
      <BottomSheetContent ref="bottomSheet" @closeSheet="closeSheet" />
    </v-bottom-sheet>
  </v-col>
</template>

<script>
const Markers = () => import('./MarkertComponent')
const BottomSheetContent = () => import('./BottomSheetContent')
import { mapGetters, mapActions } from 'vuex'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider({
  params: {
    addressdetails: 1,
    limit: 20,
    'accept-language': 'ru',
    countrycodes: 'ru'
  }
})

export default {
  name: 'MapComponent',
  components: {
    Markers,
    BottomSheetContent
  },
  data: () => ({
    geolocationPremission: true,
    rememberPosition: null,
    loadingPoints: false,
    mapInstanse: null,
    url: 'https://tile.gpnmarket.ru:4443/{z}/{x}/{y}.png',
    zoom: 14,
    minZoom: 8,
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
    sheet: false,
    points: []
  }),
  computed: {
    ...mapGetters('filters', ['getFilterActive']),
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
        // console.log(this)
        this.mapInstanse.setView(this.rememberPosition)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mapInstanse = this.$refs.map.mapObject
      this.mapListners()
      this.currentPosition()
      this.debounce()
      // this.loadPoints()
    })
  },
  beforeDestroy() {
    this.mapInstanse.off()
  },
  methods: {
    ...mapActions('filters', ['changeFilters', 'activateFilters']),
    ...mapActions('bottomSheet', ['setId']),
    mapListners() {
      this.mapInstanse.on('moveend ', e => {
        this.debounce()
        // this.loadPoints()
      })
      this.mapInstanse.on('zoomend ', e => {
        this.debounce()
        // this.loadPoints(e)
      }),
        this.mapInstanse.on('locationfound', e => {
          this.mapInstanse.setZoom(14)
          this.geolocationPremission = true
        })
      this.mapInstanse.on('locationerror', e => {
        if (e.code === 1) {
          // alert(
          //   'Для определения местоположения требуется разрешить браузеру запрашиватьэти данные'
          // )
        }
        this.mapInstanse.stopLocate()
      })
    },
    debounce() {
      if (!this.loadingPoints) {
        this.loadingPoints = true
        setTimeout(() => {
          this.loadPoints()
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
          ne: bound._northEast
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
      this.mapInstanse.locate({ setView: true })
    },
    unsetFilters() {
      this.changeFilters()
      this.activateFilters()
    },
    markerClick(val) {
      this.rememberPosition = val.latlng
      this.mapInstanse.panTo(val.latlng)
      this.sheet = true
      this.$nextTick(() => {
        const availableSpaceCenter =
          (window.innerHeight - this.$refs.bottomSheet.$el.offsetHeight - 56) /
          2
        const offset = window.innerHeight / 2 - availableSpaceCenter
        this.panWithOffset(this.rememberPosition, [0, offset])
      })
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
      this.setId(null)
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
</style>
