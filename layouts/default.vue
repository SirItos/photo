<template>
  <v-app style="margin-top:0px ;margin-top:env(safe-area-inset-top)">
    <v-app-bar app :value="getToolbar">
      <div class="d-flex justify-start align-center" style="min-width:68px">
        <v-btn icon @click.stop="drawler=true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-row no-gutters>
        <v-col class="d-flex align-center justify-center">
          <div class="primary--text font-weight-bold">Заголовок</div>
        </v-col>
        <div class="overline texg-uppercase text-right">
          <div class="text-right">Место</div>
          <div>Твоих</div>
          <div>Свиданий</div>
        </div>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawler" class="primary white--text fix-nav" app temporary>
      <AppNavContent>
        <NavList :items="getNavList(list)" />
      </AppNavContent>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import AppNavContent from '@/components/AppNavigationDrawlerList'
import NavList from '@/components/AppNavList'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'defaultLayer',
  components: {
    AppNavContent,
    NavList
  },
  data() {
    return {
      drawler: false
    }
  },
  computed: {
    ...mapGetters('settings', ['getNavList', 'getToolbar']),
    ...mapState('user', ['name', 'role', 'phone']),
    list() {
      if (!this.phone) return 'unauth'
      return this.role
    }
  },
  mounted() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }
}
</script>

<style lang="scss" >
.fix-nav {
  max-height: calc(var(--vh, 1vh) * 100) !important;
}
</style>
