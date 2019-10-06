<template>
  <l-marker ref="marker" :lat-lng="{lat:item.lat, lng:item.lng}">
    <l-icon
      :icon-size="dymanicSize"
      :icon-anchor="dynamicAnchor"
      :icon-url="require('@/static/Frame.svg')"
    ></l-icon>
  </l-marker>
</template>

<script>
import 'leaflet/dist/leaflet.css'
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>