<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <v-form ref="form" lazy-validation :value="valid">
        <div class="text-center font-weight-bold headline">Информация об автомобиле</div>
        <v-geo-search @setLocate="setLocate" />
        <div class="pt-5">
          <v-textarea v-model="description" label="Описание" rows="4" />
        </div>
        <div class="py-5">
          <div class="font-weight-bold">Как вы работаете?</div>
          <div>
            <v-checkbox
              v-model="individual"
              @change="showroom=!individual"
              hide-details
              color="primary"
              label="Физические лица"
              class="mt-2"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="showroom"
              @change="individual=!showroom"
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
              max="4"
              :ticks="true"
              tick-size="4"
              track-color="rgba(0, 0, 0, 0.26)"
              color="primary"
              class="mt-5"
            ></v-range-slider>
          </div>
        </div>
        <div class="my-6 caption">Вы сможете изменить эти параметры в настройках сервиса</div>
      </v-form>
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
import { mapActions } from 'vuex'

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
    individual: true,
    showroom: null,
    description: null,
    priceRange: [1, 2],
    valid: false,
    price: ['1000', '3000', '6000', '10000', '']
  }),
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    ...mapActions('resource', ['setResourceParams']),
    setLocate(val) {
      this.location = val
    },
    async next() {
      await this.setResourceParams([
        {
          field: 'address',
          value: this.location.label
        },
        {
          field: 'lat',
          value: this.location.latlng.lat
        },
        {
          field: 'long',
          value: this.location.latlng.lng
        },
        // {
        //   field:'description',
        //   value:this.description
        // },
        {
          field: 'resource_type',
          value: this.individual
        },
        {
          field: 'min_cost',
          value: this.priceRange[0]
        },
        {
          field: 'max_cost',
          value: this.priceRange[1]
        }
      ])
      if (this.id) {
        this.$root.$router.back()
        return
      }
      // this.$root.$router.push('/resource/photos')
    }
  }
}
</script>

<style lang="scss">
.v-slider__tick:first-child {
  background: transparent !important;
  div {
    transform: traslateX(-12px) !important;
  }
}
.v-slider__tick:last-child {
  display: none;
}
</style>