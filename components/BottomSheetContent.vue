<template>
  <v-row no-gutters class="pa-3 white" style="box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)">
    <v-fade-transition appear mode="out-in">
      <v-col v-if="!loading" key="content_bottom" cols="12">
        <v-row no-gutters>
          <v-col class="px-1 d-flex align-center primary--text" v-if="title">
            <v-icon color="primary">mdi-map-marker</v-icon>
            <div>{{title}}</div>
          </v-col>
          <div>
            <v-btn icon @click="$emit('closeSheet')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-col cols="12" class="my-3" style="max-height:124px">
          <Swiper v-if="images.length" :images="images" />
          <div v-else class="text-center">Нет изображений</div>
        </v-col>
        <v-col col="12" class="d-flex py-0 justify-start primary--text">
          <Price :price="cost" />
        </v-col>
        <v-col cols="12" class="my-3">
          <div class="d-flex justify-center">
            <v-btn
              v-if="true"
              nuxt
              :to="`/detail/${id}`"
              min-width="250"
              min-height="44"
              class="text-none font-weight-bold"
              color="primary"
            >Подробнее</v-btn>
          </div>
        </v-col>
      </v-col>
      <v-col v-else key="bottom_loading" class="loading-bottom align-center justify-center d-flex">
        <v-progress-circular indeterminate color="primary" size="64" width="7"></v-progress-circular>
      </v-col>
    </v-fade-transition>
  </v-row>
</template>

<script>
const Swiper = () => import('./SwiperComponent')
const Price = () => import('./AppDetailPrice')
export default {
  name: 'BottomSheetContent',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  components: {
    Swiper,
    Price
  },
  data: () => ({
    loading: true,
    images: [],
    title: null,
    cost: null
  }),
  watch: {
    id: function(newVal, oldVal) {
      if (newVal) {
        if (newVal !== oldVal) {
          this.loadData()
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      await this.$axios
        .post('/get-resource-params', {
          id: this.id,
          all: true
        })
        .then(response => {
          this.title = response.data.title
          this.images = response.data.images
          ;(this.loading = false),
            (this.cost = [response.data.min_cost, response.data.max_cost])
          this.callRecenter()
        })
        .catch(e => {
          this.callRecenter()
          this.loading = false
        })
    },
    callRecenter() {
      setTimeout(() => {
        this.$emit('loadEnd')
      }, 500)
    }
  }
}
</script>

<style lang="scss" >
.fill-skeleton > .v-skeleton-loader__button {
  height: 100%;
  width: 100%;
}
.loading-bottom {
  min-height: 200px;
}
</style>