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
          <div>
            <v-select
              multiple
              v-model="price"
              :items="optionsPriceRange"
              chips
              item-value="id"
              item-text="value"
              label="Сколько Вы готовы потратить"
            >
              <template v-slot:selection="{item}">
                <v-chip @click:close="spliceSelected(item.id)" close color="primary">{{item.value}}</v-chip>
              </template>
            </v-select>
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
import { rangeHelperSelect } from '~/utils'

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
      price: []
    },
    price: [],
    options: [
      { id: 1, min: 1000, max: 3000 },
      { id: 2, min: 3000, max: 6000 },
      { id: 3, min: 6000, max: 10000 },
      { id: 4, min: 10000, max: 20000 },
      { id: 5, min: 20000, max: 999999999 }
    ]
  }),
  computed: {
    ...mapGetters('filters', ['getFilters']),
    optionsPriceRange() {
      return this.options.map(item => {
        return {
          id: item.id,
          value: `${item.min}  ${this.checkMaxValue(item.max)}`
        }
      })
    }
  },
  created() {
    this.filters = Object.assign({}, this.getFilters)
    console.log(this.filters.price.length)
    if (this.filters.price.length) {
      this.price = rangeHelperSelect(this.filters.price)
    }
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
      this.preparePriceFilter()
      this.changeFilters(this.filters)
      this.activateFilters(true)
      this.$root.$router.push('/')
    },
    checkMaxValue(value) {
      return value >= 999999999 ? ' и более' : ` - ${value}`
    },
    spliceSelected(id) {
      const index = this.filters.price.findIndex(item => {
        return item.id === id
      })
      this.filters.price.splice(index, 1)
    },
    preparePriceFilter() {
      this.filters.price = this.price.map(item => {
        return this.options.find(option => {
          return option.id === item
        })
      })
    }
    // changeSliderRange(val) {
    //   const min = rangeHelper(this.price[val[0]])
    //   this.filters.price = [
    //     min > 20000 ? 20000 : min,
    //     this.price[val[1]] || 99999
    //   ]
    // }
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
