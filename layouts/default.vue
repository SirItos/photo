<template>
  <v-app style="margin-top:0px ;margin-top:env(safe-area-inset-top)">
    <v-app-bar app :value="toolbar" class="elevation-0">
      <div class="d-flex justify-start align-center" style="min-width:68px">
        <v-btn icon @click.stop="drawler=true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-row no-gutters>
        <v-col class="d-flex align-center justify-center">
          <div class="primary--text font-weight-bold">{{header}}</div>
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
        <NavList :items="getNavList(list)" @hideDrawler="drawler=false" />
      </AppNavContent>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
    <v-overlay :value="overlay" opacity="0.8">
      <v-progress-circular indeterminate color="primary" width="7" size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog :value="visibility" @click:outside="closeDialog" style="z-index:1200">
      <dialog-content />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'defaultLayer',
  components: {
    AppNavContent: () => import('@/components/AppNavigationDrawlerList'),
    NavList: () => import('@/components/AppNavList'),
    'dialog-content': () => import('@/components/AppDialog')
  },
  data() {
    return {
      drawler: false
    }
  },
  computed: {
    ...mapGetters('settings', ['getNavList', 'getToolbar']),
    ...mapState('user', ['name', 'roles', 'phone', 'have_res', 'have_foto']),
    ...mapState('settings', ['overlay', 'toolbar', 'header']),
    ...mapState('dialog', ['visibility']),
    list() {
      if (!this.roles) return 'unauth'
      return this.roles
    }
  },
  watch: {
    have_res: function(newVal) {
      this.checkUser()
    }
  },
  mounted() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
    this.$nextTick(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.findCity({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      }
      this.checkUser()
    })
  },
  methods: {
    ...mapActions('dialog', ['setDialogParams']),
    ...mapActions('user', ['setCity']),
    closeDialog() {
      this.setDialogParams({})
    },
    checkUser() {
      if (!this.$cookies.get('token')) return
      if (this.roles === 'provider') {
        if (!this.have_res || !this.have_foto) {
          const mode = this.have_res ? !this.have_foto : false
          this.dialogAboutResource(mode)
        }
      }
    },
    findCity(latlng) {
      this.$axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
            latlng.lat
          }&lon=${latlng.lng}&zoom=10&addressdetails=1&accept-language=ru`
        )
        .then(response => {
          this.setCity([
            { field: 'city', value: response.data.address.state },
            { field: 'latlng', value: latlng }
          ])
        })
        .catch(e => {
          this.setCity([
            { field: city, value: null },
            { field: latlng, value: null }
          ])
        })
    },
    dialogAboutResource(foto) {
      if ($nuxt.$route.name.indexOf('registrate') !== -1) return
      this.$store.dispatch(
        'dialog/setDialogParams',
        {
          visibility: true,
          title: foto ? 'Добавьте фотографии' : 'Создайте ресурс',
          text: foto
            ? 'Для продолжения работы в качестве поставщика услуг, необходимо добавить фотографии'
            : 'Для продолжения работы в качестве поставщика услуг, необходимо создать ресурс',
          confirm: true,
          okLabel: foto ? 'Добавить' : 'Создать',
          cancelLabel: 'Позже',
          okAction: () => {
            foto
              ? this.$root.$router.push({
                  path: 'registrate/resource/photos'
                })
              : this.$root.$router.push('/registrate/resource/carinfo')
            this.$store.dispatch('dialog/setDialogParams', {}, { root: true })
          }
        },
        { root: true }
      )
    }
  }
}
</script>

<style lang="scss" >
.fix-nav {
  max-height: calc(var(--vh, 1vh) * 100) !important;
}
</style>
