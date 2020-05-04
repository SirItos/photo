<template>
  <div>
    <VueGallery
      :images="galleryArray"
      :index="imgIndex"
      @close="imgIndex=null"
      style="margin-top:calc(env(safe-area-inset-top))"
    />
    <swiper :options="swiperOptions">
      <swiperSlide v-for="image in images" :key="`bottom_img_${image.id}`" style="max-height:100px">
        <div>
          <v-img
            :src="image.url['320']"
            :lazy-src="image.url['320']"
            max-width="120"
            min-height="100"
            max-height="100"
            contain
            @click="openGallery(image.id)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-skeleton-loader height="80" type="image" />
              </v-row>
            </template>
          </v-img>
        </div>
      </swiperSlide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueGallery from 'vue-gallery'
export default {
  name: 'SwiperComponet',
  components: {
    swiper,
    swiperSlide,
    VueGallery
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 10,
      navigation: {
        nextEl: '',
        prevEl: ''
      }
    },
    imgIndex: null
  }),
  computed: {
    galleryArray() {
      return this.images.map(item => {
        return item.url.origin
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      const next = document.querySelector('.blueimp-gallery>.next')
      const prev = document.querySelector('.blueimp-gallery>.prev')
      const close = document.querySelector('.blueimp-gallery>.close')
      next.remove()
      prev.remove()
    })
  },
  methods: {
    openGallery(index) {
      const imageIndex = this.images.findIndex(item => {
        return item.id === index
      })
      if (imageIndex === -1) return
      this.imgIndex = imageIndex
    }
  }
}
</script>

<style lang="scss" >
.custom-close {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  line-height: 1;
  &::before {
    content: '\F156';
    display: inline-block;
    font: normal normal normal 24px/1 'Material Design Icons';
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>