<template>
  <l-marker ref="marker" :lat-lng="{lat:item.lat, lng:item.long}" @click="clickEvent">
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
    }
  },
  computed: {
    dymanicSize() {
      return [40, 46]
    },
    dynamicAnchor() {
      return [20, 46]
    },
    dinamycUrl() {
      return this.item.resource_type ? 'Frame.svg' : 'frame_many.svg'
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

<style lang="scss" scoped>
</style>