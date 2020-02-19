<template>
  <l-marker ref="marker" :lat-lng="{ lat: item.lat, lng: item.long }" @click="clickEvent">
    <l-icon
      :icon-size="dymanicSize"
      :icon-anchor="dynamicAnchor"
      :icon-url="require(`@/static/${dinamycUrl}`)"
    ></l-icon>
  </l-marker>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MarkerComponent',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    current: {
      type: Number,
      default: null
    }
  },
  computed: {
    currentMarker() {
      return this.current === this.item.id ? 10 : 0
    },
    dymanicSize() {
      return [40, 52]
    },
    dynamicAnchor() {
      return [20, 52]
    },
    dinamycUrl() {
      let start = this.item.resource_type ? 'frame' : 'frame_many'
      if (this.current === this.item.id) {
        start += '_active'
      }
      return start + '.png'
    }
  },
  methods: {
    clickEvent(e) {
      this.$emit('markerCLick', {
        latlng: e.latlng,
        id: this.item.id
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
