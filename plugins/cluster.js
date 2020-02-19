import Vue from 'vue'
import * as L from 'leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'

Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster)
Vue.component('v-tilelayer-googlemutant', Vue2LeafletGoogleMutant)
// const LeafletPlugin = {
//   install(Vue) {
//     Vue.prototype.$L
//   }
// }
