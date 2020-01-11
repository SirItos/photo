<template>
  <v-row class="flex-column fill-height" no-gutters>
    <v-col>
      <slot />
    </v-col>

    <div>
      <OnlineSwitch v-if="roles==='provider'" />
      <v-divider class="white"></v-divider>
      <NavListItems :items="items" />
    </div>
  </v-row>
</template>

<script>
const NavListItems = () => import('./AppNavList')
const OnlineSwitch = () => import('./SwitcherComponent')

import { mapState } from 'vuex'
export default {
  name: 'AppNavigationDrawlerList',
  components: {
    NavListItems,
    OnlineSwitch
  },
  data: () => ({
    items: [
      { text: 'Правила сервиса', url: '/terms.svg', to: '/terms' },
      { text: 'Обратная связь', url: '/message.svg' }
    ]
  }),
  computed: {
    ...mapState('user', ['roles'])
  }
}
</script>

<style lang="scss">
.v-list-item__icon {
  margin-right: 16px !important;
}
</style>