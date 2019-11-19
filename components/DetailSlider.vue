<template>
  <div v-swiper:mySwiper="swiperOptions" class="swiper-container px-3">
    <div class="swiper-wrapper">
      <div class="swiper-slide img-shadow" v-for="n in 6" :key="`detail_img${n}`">
        <v-img
          src="https://picsum.photos/id/11/500/300"
          lazy-src="https://picsum.photos/id/11/10/6"
          class
          cover
          height="300px"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-skeleton-loader height="80" type="image" />
            </v-row>
          </template>
        </v-img>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailSlider',
  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    }
  })
}
</script>

<style lang="scss" >
.swiper-container {
  height: 328px;
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