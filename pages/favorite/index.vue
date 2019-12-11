<template>
  <v-row no-gutters class="px-1 py-4 align-stretch">
    <v-col
      @click="$root.$router.push('/detail/1')"
      cols="6"
      v-for="item in test"
      :key="`test_${item}`"
      class="pa-2"
      v-ripple
    >
      <v-img
        src="https://picsum.photos/id/11/500/300"
        lazy-src="https://picsum.photos/id/11/10/6"
        cover
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
      <div class="primary--text text-uppercase">название_{{item}}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head: {
    title: 'Избранное'
  },
  name: 'Favorite',
  data: () => ({
    test: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  })
}
</script>

<style lang="scss" scoped>
</style>