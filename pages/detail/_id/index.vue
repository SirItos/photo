<template>
  <v-row no-gutters class="flex-column fill-height">
    <g-detail-slider :images="images" />
    <div class="detail_title" ref="title">
      <v-row no-gutters class="px-3">
        <v-col class="headline">{{
          address.replace(/, Россия, \d{5,}/g, '')
        }}</v-col>
        <div v-if="$store.state.user.roles === 'customer'">
          <v-btn text icon @click="setFavorite">
            <v-icon :class="{ 'primary--text': like }">
              {{ like ? 'mdi-cards-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
        </div>
      </v-row>
    </div>
    <v-col class="px-3">
      <div class="primary--text">Информация о себе:</div>
      <div>{{ description }}</div>
      <g-detail-price :price="cost_range" />
    </v-col>
    <div>
      <v-row no-gutters class="px-3 py-4">
        <v-col class="px-2">
          <v-btn
            block
            large
            text
            color="primary"
            class="text-none font-weight-bold"
            @click="$root.$router.back()"
            nuxt
          >
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col class="px-2">
          <v-btn
            :href="`tel:${phone}`"
            @click="sendStatisticEvent('call')"
            block
            large
            color="primary"
            class="text-none font-weight-bold"
          >
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
      title: this.name
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
        return {
          address: response.data.address,
          name: response.data.user.user_details.name || response.data.address,
          phone: response.data.user.phone,
          id: response.data.id,
          user_id: response.data.user.id,
          description: response.data.description,
          cost_range: response.data.price_range,
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
    this.$store.dispatch('settings/setToolbar', {
      header: this.name,
      toolbar: true
    })

    this.sendStatisticEvent('details')
  },
  beforeDestroy() {
    this.$store.dispatch('settings/setToolbar')
  },
  methods: {
    async setFavorite() {
      this.like = !this.like
      await this.$axios.post('/set-favorite', {
        id: this.id,
        delete: !this.like
      })
    },
    sendStatisticEvent(event) {
      if (this.$store.state.user.id === this.user_id) return
      this.$axios.post('/event', {
        resourse_id: this.id,
        event: event
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
