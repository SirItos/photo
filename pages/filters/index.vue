<template>
  <v-row no-gutters class="fill-height flex-column white">
    <v-col>
      <v-row no-gutters class="elevation-6 pa-4">
        <v-col cols="12" class="mb-6">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Как Вы любите работать?</div>
          <div>
            <v-checkbox
              v-model="individual"
              hide-details
              color="primary"
              label="Физические лица"
              class="mt-2"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="showroom"
              hide-details
              color="primary"
              label="Автосалоны"
              class="mt-2"
            ></v-checkbox>
          </div>
        </v-col>
        <v-col cols="12" class="mb-6">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Какой возраст Вам нравится?</div>
          <div>
            <v-checkbox
              v-model="age.twenty"
              hide-details
              color="primary"
              class="mt-2"
              label="20-30 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="age.thirty"
              hide-details
              color="primary"
              class="mt-2"
              label="30-40 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="age.forty"
              hide-details
              color="primary"
              class="mt-2"
              label="40-50 лет"
            ></v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="age.fifty"
              hide-details
              color="primary"
              class="mt-2"
              label="Старше 50"
            ></v-checkbox>
          </div>
        </v-col>
        <v-col cols="12" class="mb-6 pr-2">
          <div
            class="title font-weight-medium"
            style="	font-family: 'Montserrat', sans-serif !important;"
          >Сколько Вы готовы потратить</div>
          <div>
            <v-range-slider
              :tick-labels="price"
              :value="[2, 4]"
              min="0"
              max="5"
              :ticks="true"
              tick-size="6"
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
              v-model="distance"
              min="0"
              max="3"
              :ticks="true"
              tick-size="5"
              color="primary"
            ></v-slider>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <div class="px-4 py-6">
      <v-row no-gutters>
        <v-col class="px-2">
          <v-btn block large color="secondary">
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col class="px-2">
          <v-btn block large color="primary">
            <span class="white--text">Применить</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'filters',
  head: {
    title: 'Фильтр'
  },
  data: () => ({
    individual: false,
    showroom: false,
    age: {
      twenty: false,
      thirty: false,
      forty: false,
      fifty: false
    },
    price: ['0', '1000', '3000', '6000', '10000', ''],
    distanceLabels: ['1к', '3км', '6км', '10км'],
    distance: 0
  })
}
</script>

<style lang="scss" scoped>
</style>