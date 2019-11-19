<template>
  <v-row no-gutters class="flex-column fill-height">
    <g-detail-slider />
  </v-row>
</template>

<script>
export default {
  name: 'DetailPage',
  components: {
    'g-detail-slider': () => import('~/components/DetailSlider')
  },
  props: {
    id: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-container {
  height: 328px;
  padding-bottom: 28px;
  width: 100%;
}
</style>