<template>
  <v-row no-gutters class="fill-height" style="width:100%">
    <MapComponent></MapComponent>
  </v-row>
</template>

<script>
const MapComponent = () => import('~/components/MapComponent')
import { mapActions } from 'vuex'
export default {
  head: {
    title: 'Поиск'
  },
  name: 'index',
  components: {
    MapComponent
  },
  created() {
    this.setToolbar(true)
  },
  beforeDestroy() {
    this.setToolbar(false)
  },
  methods: {
    ...mapActions('settings', ['setToolbar'])
  }
}
</script>
