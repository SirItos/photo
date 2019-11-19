<template>
  <v-row no-gutters class="pa-3 white" style="box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)">
    <div class="primary--text d-flex align-center">
      <v-skeleton-loader v-if="false" type="chip" />
      <div v-else class="d-flex align-center">
        <v-icon class="primary--text mr-2">mdi-clock</v-icon>
        <div>Активен</div>
      </div>
    </div>
    <v-col class="px-1 d-flex align-center">
      <v-skeleton-loader type="chip" class="fill-skeleton" width="100%" />
    </v-col>
    <div>
      <v-btn icon @click="$emit('closeSheet')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-col cols="12" class="mt-7 mb-4">
      <Swiper />
    </v-col>
    <v-col cols="12" class="my-3">
      <div class="d-flex justify-center">
        <v-btn v-if="true" nuxt to="/detail/1" min-width="250" color="primary">Подробнее</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapgetters, mapGetters } from 'vuex'
const Swiper = () => import('./SwiperComponent')
export default {
  name: 'BottomSheetContent',
  components: {
    Swiper
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('bottomSheet', ['getId'])
  },
  watch: {
    getId: function(newVal) {
      if (!newVal) {
        this.loading = true
        return
      }
      this.loading = false
    }
  },
  created() {}
}
</script>

<style lang="scss" >
.fill-skeleton > .v-skeleton-loader__button {
  height: 100%;
  width: 100%;
}
</style>