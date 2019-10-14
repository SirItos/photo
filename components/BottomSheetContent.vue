<template>
  <v-row no-gutters class="pa-3 white">
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
    <v-col cols="12" class="mt-2">
      <v-row no-gutters>
        <v-col v-for="i in 3" :key="`img_skeleton_${i}`" class="px-1">
          <v-skeleton-loader type="image" max-height="80" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="my-3">
      <div class="d-flex justify-center">
        <!-- <v-skeleton-loader
          type="button"
          v-if="true"
          min-width="148"
          min-height="44"
          class="fill-skeleton"
        />-->
        <v-btn v-if="false" large color="primary">Подробнее</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapgetters, mapGetters } from 'vuex'
export default {
  name: 'BottomSheetContent',
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
.fill-skeleton > .v-skeleton-loader__bone {
  // width: 100% !important;
}
.fill-skeleton > .v-skeleton-loader__button {
  height: 100%;
  width: 100%;
}
</style>