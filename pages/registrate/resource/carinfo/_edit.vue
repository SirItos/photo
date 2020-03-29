<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <v-form ref="form" lazy-validation :value="valid">
        <div class="text-center font-weight-bold headline">Информация о себе</div>
        <v-geo-search @setLocate="setLocate" :init="location" :many="showroom" />
        <div class="pt-5">
          <v-textarea v-model="description" label="Информация о себе" rows="4" />
        </div>
        <div class="py-5">
          <div class="font-weight-bold">Как вы встречаетесь?</div>
          <div>
            <v-checkbox
              v-model="individual"
              @change="showroom = !individual"
              hide-details
              color="primary"
              label="Встречи индивидуально"
              class="mt-2"
            >
              <template v-slot:prepend>
                <v-img src="/one.png" height="36" width="56" contain></v-img>
              </template>
            </v-checkbox>
          </div>
          <div>
            <v-checkbox
              v-model="showroom"
              @change="individual = !showroom"
              hide-details
              color="primary"
              label="Встречи с подругами"
              class="mt-2"
            >
              <template v-slot:prepend>
                <v-img src="/many.png" height="36" width="56" contain></v-img>
              </template>
            </v-checkbox>
          </div>
        </div>
        <div class="py-5">
          <div class="font-weight-bold">Оцените ваше свидание?</div>
          <div>
            <v-text-field
              label="Cтоимость"
              class="mt-3"
              v-model="cost"
              type="number"
              color="primary"
            />
          </div>
          <v-select
            :disabled="cost ? true : false"
            return-object
            v-model="priceRange"
            clearable
            :items="options"
            item-value="id"
            label="Выберите стоимость"
          >
            <template v-slot:item="{item}">{{`${item.min}${checkMaxValue(item.max)}`}}</template>
            <template v-slot:selection="{item}">{{`${item.min}${checkMaxValue(item.max)}`}}</template>
          </v-select>
          <!-- <div>
            <v-range-slider
              :disabled="cost ? true : false"
              :tick-labels="price"
              v-model="priceRange"
              min="0"
              max="10"
              :ticks="true"
              tick-size="4"
              track-color="rgba(0, 0, 0, 0.26)"
              color="primary"
              class="mt-5"
            ></v-range-slider>
          </div>-->
        </div>
        <div
          class="my-6 caption"
          style=" font-family: 'Montserrat', sans-serif !important;"
        >Вы сможете изменить эти параметры в личном кабинете</div>
      </v-form>
    </v-col>

    <div class="pt-10">
      <div class="d-flex justify-center">
        <v-btn
          class="text-none font-weight-bold"
          color="primary"
          width="250px"
          @click="next"
          large
        >{{ id ? 'Сохранить' : 'Продолжить' }}</v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-btn
          v-if="id"
          class="text-none font-weight-bold primary--text mt-4"
          nuxt
          large
          width="250"
          @click="$router.back()"
          text
          color="primary"
        >Отмена</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { rangeHelperSelect } from '~/utils'

const SearchField = () => import('@/components/PositionSearchComponent')

export default {
  head: {
    title: 'Информация о себе'
  },
  name: 'CarInfo',
  middleware: 'isProvider',
  components: {
    'v-geo-search': SearchField
  },
  async asyncData({ route, $axios }) {
    if (!route.query.edit && !route.query.from_map) {
      return
    }
    return await $axios
      .post('/get-resource-params', {
        id: route.query.edit || route.query.from_map,
        params: [
          'id',
          'address',
          'resource_type',
          'description',
          'cost',
          'min_cost',
          'max_cost'
        ]
      })
      .then(response => {
        return {
          id: response.data.id,
          location: response.data.address,
          individual: response.data.resource_type,
          showroom: !response.data.resource_type,
          description: response.data.description,
          cost: response.data.cost,
          priceRange: response.data.cost
            ? null
            : rangeHelperSelect(response.data.min_cost)
        }
      })
  },
  data: () => ({
    id: null,
    location: null,
    individual: true,
    showroom: null,
    description: null,
    cost: null,
    priceRange: [3, 5],
    valid: false,
    options: [
      { id: 1, min: 1000, max: 3000 },
      { id: 2, min: 3000, max: 6000 },
      { id: 3, min: 6000, max: 10000 },
      { id: 4, min: 10000, max: 20000 },
      { id: 5, min: 20000, max: 999999999 }
    ]
  }),
  created() {
    this.id = this.$route.query.edit
  },
  methods: {
    ...mapActions('resource', ['setResourceParams']),
    setLocate(val) {
      this.location = val
    },
    async next() {
      if (!this.$refs.form.validate()) {
        this.$vuetify.goTo(0)
        return
      }
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
        {
          field: 'description',
          value: this.description
        },
        {
          field: 'resource_type',
          value: this.individual
        },
        {
          field: 'cost',
          value: this.cost
        },
        {
          field: 'min_cost',
          value: this.cost || this.priceRange.min
        },
        {
          field: 'max_cost',
          value: this.cost || this.priceRange.max
        }
      ])
      if (this.id) {
        this.$root.$router.back()
        return
      }
      this.$root.$router.push('/registrate/resource/photos')
    },
    checkMaxValue(value) {
      return value >= 999999999 ? ' и более' : ` - ${value}`
    }
  }
}
</script>

<style lang="scss">
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
