<template>
  <v-row no-gutters class="fill-height flex-column white">
    <v-col class="mb-4">
      <v-row no-gutters class="pa-4">
        <v-col cols="12" class="mb-3">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Какие встречи Вас интересуют?</div>
          <div>
            <v-checkbox
              v-model="filters.individual"
              hide-details
              color="primary"
              label="Встречи индивидуально"
              class="mt-2"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="filters.showroom"
              hide-details
              color="primary"
              label="Встречи с подругами"
              class="mt-2"
            ></v-checkbox>
          </div>
        </v-col>
        <v-col cols="12" class="mb-3">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Какой возраст Вам нравится?</div>
          <div>
            <v-checkbox
              v-model="filters.twenty"
              hide-details
              color="primary"
              class="mt-2"
              label="18-30 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="filters.thirty"
              hide-details
              color="primary"
              class="mt-2"
              label="30-40 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="filters.forty"
              hide-details
              color="primary"
              class="mt-2"
              label="40-50 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="filters.fifty"
              hide-details
              color="primary"
              class="mt-2"
              label="Старше 50"
            ></v-checkbox>
          </div>
        </v-col>
        <v-col cols="12" class="mb-3 pr-2">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Сколько Вы готовы потратить</div>
          <div>
            <v-range-slider
              :tick-labels="price"
              v-model="priceRange"
              @change="
                val => {
                  changeSliderRange(val)
                }
              "
              min="0"
              max="10"
              :ticks="true"
              tick-size="4"
              track-color="rgba(0, 0, 0, 0.26)"
              color="primary"
            ></v-range-slider>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <div class="px-4 py-5">
      <v-row no-gutters>
        <v-col cols="6" class="px-2">
          <v-btn
            block
            large
            text
            color="primary"
            @click="$router.back()"
            class="text-none font-weight-bold"
            nuxt
          >
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-btn
            @click="confirmFilters"
            block
            large
            color="primary"
            class="text-none font-weight-bold"
          >
            <span class="white--text">Применить</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { rangeHelper } from '~/utils'

export default {
  name: 'FilterComponent',
  data: () => ({
    filters: {
      individual: false,
      showroom: false,
      twenty: false,
      thirty: false,
      forty: false,
      fifty: false,
      price: [
        '1000',
        '2000',
        '3000',
        '4000',
        '5000',
        '6000',
        '7000',
        '8000',
        '9000',
        '10000',
        '999999999'
      ]
    },
    priceRange: [2, 4],
    price: [
      '1000',
      '2000',
      '3000',
      '4000',
      '5000',
      '6000',
      '7000',
      '8000',
      '9000',
      '10000',
      '999999999'
    ]
  }),
  computed: {
    ...mapGetters('filters', ['getFilters'])
  },
  created() {
    this.filters = Object.assign({}, this.getFilters)
    this.priceRange = [
      rangeHelper(this.filters.price[0]),
      rangeHelper(this.filters.price[1])
    ]
    this.$store.dispatch('settings/setToolbar', {
      header: 'Фильтры',
      toolbar: true
    })
  },

  beforeDestroy() {
    this.$store.dispatch('settings/setToolbar')
  },
  methods: {
    ...mapActions('filters', ['changeFilters', 'activateFilters']),
    confirmFilters() {
      const filters = this.filters
      this.changeFilters(this.filters)
      this.activateFilters(true)
      this.$root.$router.push('/')
    },
    changeSliderRange(val) {
      const min = rangeHelper(this.price[val[0]])
      this.filters.price = [
        min > 20000 ? 20000 : min,
        this.price[val[1]] || 99999
      ]
    }
  }
}
</script>

<style lang="scss">
.scrollFilters {
  max-height: calc(100vh - 92px - 56px);
}
.v-slider__tick:first-child {
  background: transparent !important;
}
.v-slider__tick-label {
  display: none !important;
}
.v-slider__tick:nth-child(odd) {
  .v-slider__tick-label {
    display: block !important;
    transform: translateX(-16px) !important;
  }
}
.v-slider__tick:last-child {
  display: none;
}
</style>
