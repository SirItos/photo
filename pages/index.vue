<template>
  <v-row no-gutters class="fill-height" style="width:100%">
    <MapComponent></MapComponent>
  </v-row>
</template>

<script>
import MapComponent from '~/components/MapComponent'
export default {
  name: 'index',
  components: {
    MapComponent
  }
}
</script>
