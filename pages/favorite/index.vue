<template>
  <v-row no-gutters class="px-1 py-4 align-stretch" v-if="favorites.length">
    <v-col
      @click="$root.$router.push(`/detail/${item.resource_id}`)"
      cols="6"
      v-for="item in favorites"
      :key="`favorite_${item.id}`"
      class="pa-2"
      v-ripple
    >
      <v-img
        v-if="item.img"
        :src="item.img.url"
        :lazy-src="item.img.url"
        contain
        min-width="100%"
        height="124px"
        max-width="165px"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-skeleton-loader height="80" type="image" />
          </v-row>
        </template>
      </v-img>
      <div v-else class="favorite-no-img d-flex justify-center align-center">
        <v-icon size="32px">mdi-image-off-outline</v-icon>
      </div>
      <div class="primary--text text-uppercase">{{item.resource.title || item.resource.address}}</div>
    </v-col>
  </v-row>
  <v-row v-else no-gutters class="fill-height px-8 align-center justify-center">
    <div class="headline text-center">Список избранных пуст</div>
  </v-row>
</template>

<script>
import { async } from 'q'
export default {
  head: {
    title: 'Избранное'
  },
  name: 'Favorite',
  async asyncData({ $axios }) {
    return await $axios.get('get-favorite').then(response => {
      return {
        favorites: response.data
      }
    })
  },
  data: () => ({}),
  created() {
    this.$store.dispatch('settings/setToolbar', {
      header: 'Избранное',
      toolbar: true
    })
  },
  beforeDestroy() {
    this.$store.dispatch('settings/setToolbar')
  }
}
</script>

<style lang="scss" scoped>
.favorite-no-img {
  min-width: 100%;
  max-width: 165px;
  height: 124px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.09);
}
</style>