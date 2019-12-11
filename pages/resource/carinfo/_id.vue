<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <div class="text-center font-weight-bold headline">Информация о автомобиле</div>
      <v-geo-search @setLocate="setLocate" />
      <div class="pa-5">
        <div class="font-weight-bold">Как вы работаете?</div>
        <div>
          <v-checkbox
            v-model="individual"
            @change="showroom=false"
            hide-details
            color="primary"
            label="Физические лица"
            class="mt-2"
          ></v-checkbox>
        </div>
        <div>
          <v-checkbox
            v-model="showroom"
            @change="individual=false"
            hide-details
            color="primary"
            label="Автосалоны"
            class="mt-2"
          ></v-checkbox>
        </div>
      </div>
      <div class="py-5">
        <div class="font-weight-bold">Сколько стоят Ваши услуги?</div>
        <div>
          <v-range-slider
            :tick-labels="price"
            v-model="priceRange"
            min="0"
            max="5"
            :ticks="true"
            tick-size="6"
            track-color="rgba(0, 0, 0, 0.26)"
            color="primary"
            class="mt-5"
          ></v-range-slider>
        </div>
      </div>
      <div class="my-6 caption">Вы сможете изменить эти параметры в настройках сервиса</div>
    </v-col>
    <div class="pa-10">
      <v-btn
        class="text-none font-weight-bold"
        color="primary"
        width="250px"
        @click="next"
        large
      >{{id ? 'Сохранить' : 'Продолжить'}}</v-btn>
    </div>
  </v-row>
</template>

<script>
const SearchField = () => import('@/components/PositionSearchComponent')

export default {
  head: {
    title: 'Информация о ресурсе'
  },
  name: 'CarInfo',
  components: {
    'v-geo-search': SearchField
  },
  data: () => ({
    id: null,
    location: null,
    individual: null,
    showroom: null,
    priceRange: [2, 4],
    price: ['0', '1000', '3000', '6000', '10000', '']
  }),
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    setLocate(val) {
      this.location = val
    },
    next() {
      if (this.id) {
        this.$root.$router.back()
        return
      }
      this.$root.$router.push('/resource/photos')
    }
  }
}
</script>

<style lang="scss">
.no-margin-slider .v-slider--horizontal {
  // margin: 0;
}
</style>