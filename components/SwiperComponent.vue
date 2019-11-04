<template>
  <div>
    <VueGallery
      :images="['https://picsum.photos/id/11/500/300']"
      :index="imgIndex"
      @close="imgIndex=null"
      style="margin-top:calc(env(safe-area-inset-top))"
    />
    <swiper :options="swiperOptions">
      <swiperSlide v-for="n in 6" :key="`bottom_img_${n}`">
        <div>
          <v-img
            src="https://picsum.photos/id/11/500/300"
            lazy-src="https://picsum.photos/id/11/10/6"
            max-width="110"
            min-height="80"
            @click="openGallery(n)"
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
  mounted() {
    this.$nextTick(() => {
      const next = document.querySelector('.blueimp-gallery>.next')
      const prev = document.querySelector('.blueimp-gallery>.prev')
      const close = document.querySelector('.blueimp-gallery>.close')
      next.remove()
      prev.remove()
      close.innerHTML = ''
      close.classList.add('custom-close')
    })
  },
  methods: {
    openGallery(index) {
      this.imgIndex = index
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