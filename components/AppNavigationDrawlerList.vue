<template>
  <v-row class="flex-column fill-height" no-gutters>
    <v-col>
      <slot />
    </v-col>
    <v-divider class="white"></v-divider>
    <div>
      <NavListItems :items="items" />
    </div>
  </v-row>
</template>

<script>
import NavListItems from './AppNavList'
export default {
  name: 'AppNavigationDrawlerList',
  components: {
    NavListItems
  },
  data: () => ({
    items: [
      { text: 'Правила сервиса', url: 'terms.svg' },
      { text: 'Обратная связь', url: 'message.svg' }
    ]
  })
}
</script>

<style lang="scss">
.v-list-item__icon {
  margin-right: 16px !important;
}
</style>