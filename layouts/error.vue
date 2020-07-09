<template>
  <v-app style="margin-top:0px ;margin-top:env(safe-area-inset-top)">
    <v-row class="flex-column fill-height align-center justify-center px-5">
      <div class="text-center">
        <h1 v-if="error.statusCode === 404">404</h1>
        <h1 v-else>А где все девушки?</h1>
        <div>
          Ищем самых красивых дам...
          <br />Они точно где-то есть...
        </div>
      </div>

      <div class="pt-5 px-5">
        <v-btn
          v-if="!getFilterActive"
          large
          min-width="250"
          color="primary"
          class="text-none font-weight-bold"
          nuxt
          to="/"
        >На карту!</v-btn>
      </div>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.pageNotFound.header
        : this.otherError.header
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: {
        header: '404 Страница не найдена.',
        body: 'Ищем дам покрасивее..'
      },
      otherError: ''
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
