<template>
  <div
    v-if="images.length"
    v-swiper:mySwiper="swiperOptions"
    class="swiper-container px-3"
    style="height: 328px;"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide img-shadow" v-for="image in images" :key="`detail_img${image.id}`">
        <v-img :src="image.url['320']" :lazy-src="image.url['320']" contain height="300px">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">Нет изображения</v-row>
          </template>
        </v-img>
      </div>
    </div>

    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
  <div v-else class="swiper-container px-3" style="height:328px">
    <div class="img-shadow d-flex fill-height justify-center align-center">
      <v-icon size="64px">mdi-image-off-outline</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailSlider',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      pagination: {
        el: '.swiper-pagination'
      }
    }
  })
}
</script>

<style lang="scss" >
.swiper-container {
  width: 100%;
  padding-bottom: 28px;
}
.img-shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.swiper-pagination {
  bottom: 0px !important;
}
.swiper-pagination-bullet {
  transition: 0.2s;
  width: 6px;
  height: 6px;
  margin: 0 4px;
  &-active {
    background-color: #ff473a;
  }
}
</style>