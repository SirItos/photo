<template>
  <v-row no-gutters class="flex-column fill-height">
    <g-detail-slider :images="images" />
    <div class="detail_title" ref="title">
      <v-row no-gutters class="px-3">
        <v-col class="headline">{{title}}</v-col>
        <div v-if="$store.state.user.roles === 'customer'">
          <v-btn text icon @click="setFavorite">
            <v-icon
              :class="{'primary--text':like}"
            >{{like ? 'mdi-cards-heart' :'mdi-heart-outline'}}</v-icon>
          </v-btn>
        </div>
      </v-row>
    </div>
    <v-col class="px-3">
      <div>{{description}}</div>
      <g-detail-price :price="cost_range" />
    </v-col>
    <div>
      <v-row no-gutters class="px-3 py-4">
        <v-col class="px-2">
          <v-btn block large color="secondary" @click="$root.$router.back()" nuxt>
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col class="px-2">
          <v-btn :href="`tel:+7${phone}`" block large color="primary">
            <span class="white--text">Позвонить</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'Ресурс ' + this.title
    }
  },
  name: 'DetailPage',
  components: {
    'g-detail-slider': () => import('~/components/DetailSlider'),
    'g-detail-price': () => import('~/components/AppDetailPrice')
  },
  async asyncData({ params, $axios }) {
    return await $axios
      .post('/get-resource-params', {
        id: params.id,
        all: true
      })
      .then(response => {
        console.log(response.data)
        return {
          address: response.data.address,
          title: response.data.title || response.data.address,
          phone: response.data.user.phone,
          id: response.data.id,
          description: response.data.description,
          cost_range: [response.data.min_cost, response.data.max_cost],
          type: response.data.resource_type,
          like: response.data.favorite,
          images: response.data.images
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  data: () => ({
    like: false
  }),
  created() {
    this.$store.dispatch('settings/setToolbar', true)
  },
  beforeDestroy() {
    this.$store.dispatch('settings/setToolbar', false)
  },
  methods: {
    async setFavorite() {
      this.like = !this.like
      await this.$axios.post('/set-favorite', {
        id: this.id,
        delete: !this.like
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-container {
  height: 328px;
  padding-bottom: 28px;
  width: 100%;
}
.arrow-down {
  position: fixed;
  bottom: 96px;
  right: 6px;
}
.d4 {
  color: #d4d4d4;
}
</style>