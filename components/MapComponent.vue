<template>
  <v-col class="map-containter">
    <client-only>
      <l-map
        ref="map"
        @update:zoom="zoomUpdated"
        style="height:100%"
        :center="center"
        :zoom="zoom"
        :minZoom="1 "
        :zoomAnimation="true"
        :options="mapOptions"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <v-marker-cluster :options="clusterOptions">
          <Markers
            v-for="marker in TestMarkers"
            :key="`marker_${marker.lng}`"
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
      <div @click="currentPosition" class="loccate_btn mb-2 pa-2 elevation-1" v-ripple>
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
      <BottomSheetContent @closeSheet="closeSheet" />
    </v-bottom-sheet>
  </v-col>
</template>

<script>
const Markers = () => import('./MarkertComponent')
const BottomSheetContent = () => import('./BottomSheetContent')
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MapComponent',
  components: {
    Markers,
    BottomSheetContent
  },
  data: () => ({
    mapInstanse: null,
    url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
    zoom: 10,
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
    // TEST BLOC TODO DELETE
    // lat:55.75396
    //  lng:37.620393

    TestMarkers: [
      { lat: 55.75396, lng: 37.620393, selected: false },
      { lat: 54.75396, lng: 36.620393, selected: false },
      { lat: 53.75396, lng: 34.620393, selected: false },
      { lat: 55.95396, lng: 37.13, selected: false },
      { lat: 56.75396, lng: 33.620393, selected: false }
    ]
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
  mounted() {
    this.$nextTick(() => {
      this.mapInstanse = this.$refs.map.mapObject
      this.mapListners()
      this.currentPosition()
    })
  },
  beforeDestroy() {
    this.mapInstanse.off()
  },
  methods: {
    ...mapActions('filters', ['changeFilters', 'activateFilters']),
    ...mapActions('bottomSheet', ['setId']),
    mapListners() {
      this.mapInstanse.on('locationfound', e => {
        this.mapInstanse.stopLocate()
      })
      this.mapInstanse.on('locationerror', () => {
        this.mapInstanse.stopLocate()
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
      this.mapInstanse.locate({ watch: true, setView: true, maxZoom: 12 })
    },
    unsetFilters() {
      this.changeFilters()
      this.activateFilters()
    },
    markerClick(val) {
      this.mapInstanse.panTo(val.latlng)
      this.sheet = true
    },
    closeSheet() {
      this.sheet = false
      this.setId(null)
    }
  }
}
</script>

<style >
</style>

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