<template>
  <v-app style="margin-top:0px ;margin-top:env(safe-area-inset-top)">
    <v-app-bar app :value="toolbar" class="elevation-0">
      <div class="d-flex justify-start align-center" style="min-width:68px">
        <v-btn icon @click.stop="drawler = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-row no-gutters>
        <v-col class="d-flex align-center justify-center">
          <div class="primary--text font-weight-bold">{{ header }}</div>
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
        <NavList :items="getNavList(list)" @hideDrawler="drawler = false" />
      </AppNavContent>
    </v-navigation-drawer>
    <v-content style="background-color:rgba(255,255,255)">
      <nuxt />
    </v-content>
    <v-overlay :value="overlay" opacity="0.8">
      <v-progress-circular indeterminate color="primary" width="7" size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog :value="visibility" @click:outside="closeDialog">
      <dialog-content />
    </v-dialog>
    <v-bottom-sheet v-model="installSheet">
      <v-sheet class="text-center" style="position:relative" :height="400">
        <div style="position:absolute; width:100%" class="d-flex justify-end">
          <v-btn text icon @click="installSheet = !installSheet">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="pa-4">
          <v-img src="/tutorial.gif" max-height="364px" contain>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
      </v-sheet>
    </v-bottom-sheet>
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
      drawler: false,
      installSheet: false
    }
  },
  computed: {
    ...mapGetters('settings', ['getNavList']),
    ...mapState('user', [
      'name',
      'roles',
      'phone',
      'have_res',
      'have_foto',
      'userFill'
    ]),
    ...mapState('settings', ['overlay', 'toolbar', 'header']),
    ...mapState('dialog', ['visibility']),
    list() {
      if (!this.roles) return 'unauth'
      return this.roles
    },
    checkMode() {
      return (
        navigator.standalone || matchMedia('(display-mode: standalone)').matches
      )
    },
    checkDevice() {
      return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
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
      window.addEventListener('beforeinstallprompt', this.installHandler)
      if (!this.checkMode && this.checkDevice) {
        setTimeout(() => {
          this.installDialog()
        }, 500)
      }
      this.checkUser()
    })
  },
  beforeDestroy() {
    window.removeEventListener('beforeinstallprompt', this.installHandler)
  },
  methods: {
    ...mapActions('dialog', ['setDialogParams']),
    ...mapActions('user', ['setCity']),
    closeDialog() {
      this.setDialogParams({})
    },
    checkUser() {
      if (!this.$cookies.get('token')) return
      if ($nuxt.$route.name !== 'index') return
      if (this.$store.state.dialog.visibility) return
      if (this.roles === 'provider') {
        if (this.userFill) {
          this.dialogAboutUserFillProfile()
          return
        }
        if (!this.have_res || !this.have_foto) {
          const mode = this.have_res ? !this.have_foto : false
          this.dialogAboutResource(mode)
        }
      }
    },
    findCity(latlng) {
      this.$axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&zoom=10&addressdetails=1&accept-language=ru`
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
    dialogAboutUserFillProfile() {
      this.$store.dispatch(
        'dialog/setDialogParams',
        {
          visibility: true,
          title: 'Заполните профиль',
          text:
            'Для продолжения работы, необходимо заполнить информацию профиля в анкете',
          confirm: true,
          okLabel: 'Заполнить',
          cancelLabel: 'Позже',
          okAction: () => {
            this.$root.$router.push('/registrate/resource/profile')
            this.$store.dispatch('dialog/setDialogParams', {}, { root: true })
          }
        },
        { root: true }
      )
    },
    dialogAboutResource(foto) {
      if ($nuxt.$route.name.indexOf('registrate') !== -1) return
      this.$store.dispatch(
        'dialog/setDialogParams',
        {
          visibility: true,
          title: foto ? 'Добавьте фотографии' : 'Заполните анкету',
          text: foto
            ? 'Для продолжения работы, необходимо добавить фотографии'
            : 'Для продолжения работы, необходимо заполнить всю анкету',
          confirm: true,
          okLabel: foto ? 'Добавить' : 'Заполнить',
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
    },
    installHandler(e) {
      if (this.checkMode) return
      e.preventDefault()
      this.installDialog(e)
    },
    installDialog(event = null) {
      if (this.$store.state.dialog.visibility) return
      this.$store.dispatch(
        'dialog/setDialogParams',
        {
          visibility: true,
          title: 'Добавить на главный экран',
          text:
            'Вы можете добавить приложение на главный экран для быстрого доступа к нему',
          confirm: true,
          okLabel: this.checkDevice ? 'Как добавить?' : 'Добавить',
          cancelLabel: 'Отмена',
          okAction: () => {
            if (this.checkDevice) {
              this.$store.dispatch('dialog/setDialogParams', {}, { root: true })
              this.installSheet = true
            } else {
              event.prompt()
              event.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                  window.removeEventListener(
                    ' installprompt',
                    this.installHandler
                  )
                }
              })
            }
          }
        },
        { root: true }
      )
    }
  }
}
</script>

<style lang="scss">
.fix-nav {
  max-height: calc(var(--vh, 1vh) * 100) !important;
}
</style>
