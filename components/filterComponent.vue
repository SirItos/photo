<template>
  <v-row no-gutters class="fill-height flex-column white">
    <v-col>
      <v-content
        id="scroll-target-filtres"
        ref="scrolledArea"
        :style="{
        'position':'relative'
      }"
        class="overflow-y-auto scrollFilters py-0 pb-2"
      >
        <v-row no-gutters class="elevation-6 pa-4">
          <v-col cols="12" class="mb-3">
            <div
              class="title font-weight-medium"
              style="	font-family: 'Montserrat', sans-serif !important;"
            >Как Вы любите работать?</div>
            <div>
              <v-checkbox
                v-model="filters.individual"
                hide-details
                color="primary"
                label="Физические лица"
                class="mt-2"
              ></v-checkbox>
            </div>
            <div>
              <v-checkbox
                v-model="filters.showroom"
                hide-details
                color="primary"
                label="Автосалоны"
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
                label="20-30 лет"
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
                v-model="filters.priceRange"
                min="0"
                max="5"
                :ticks="true"
                tick-size="6"
                track-color="rgba(0, 0, 0, 0.26)"
                color="primary"
              ></v-range-slider>
            </div>
          </v-col>
          <v-col cols="12" class="pr-2">
            <div
              class="title font-weight-medium"
              style="	font-family: 'Montserrat', sans-serif !important;"
            >Расстояние от текущего положения</div>
            <div>
              <v-slider
                :tick-labels="distanceLabels"
                v-model="filters.distance"
                min="0"
                max="3"
                :ticks="true"
                tick-size="5"
                track-color="rgba(0, 0, 0, 0.26)"
                color="primary"
              ></v-slider>
            </div>
          </v-col>
        </v-row>
      </v-content>
    </v-col>
    <div class="px-4 py-6" style="box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)">
      <v-row no-gutters>
        <v-col cols="6" class="px-2">
          <v-btn block large color="secondary" to="/" nuxt>
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-btn @click="confirmFilters" block large color="primary">
            <span class="white--text">Применить</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      priceRange: [2, 4],
      distance: 0
    },
    price: ['0', '1000', '3000', '6000', '10000', ''],
    distanceLabels: ['1к', '3км', '6км', '10км']
  }),
  computed: {
    ...mapGetters('filters', ['getFilters'])
  },
  created() {
    this.filters = Object.assign({}, this.getFilters)
  },
  methods: {
    ...mapActions('filters', ['changeFilters', 'activateFilters']),
    confirmFilters() {
      this.changeFilters(this.filters)
      this.activateFilters(true)
      this.$root.$router.push('/')
    }
  }
}
</script>

<style lang="scss" >
.scrollFilters {
  max-height: calc(100vh - 92px - 56px);
}
</style>