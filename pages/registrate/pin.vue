<template>
  <v-row no-gutters class="flex-column align-center justify-space-between fill-height pa-5">
    <v-col>
      <div style="width:100%">
        <div class="d-flex flex-column align-center title" style="width:100%">
          <span class="font-weight-bold">Придумайт свой пинкод</span>
          <span class="font-weight-regular">для входа в сервис</span>
        </div>
        <div class="w-100 py-12">
          <v-text-field
            ref="pin"
            v-model="pin"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="pin"
            label="Введите пинкод"
            counter
            maxlength="4"
            @click:append="show = !show"
          ></v-text-field>
          <v-text-field
            v-model="confirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :error-messages="error"
            name="pinConfirm"
            label="Повторите пин"
            class="mt-4"
            counter
            maxlength="4"
            @click:append="show2 = !show2"
          ></v-text-field>
          <div class="caption mt-2">Вы сможете изменить или восстановить пинкод в настройках сервиса</div>
        </div>
      </div>
    </v-col>
    <v-col class="d-flex align-end">
      <div style="width:100%" class="d-flex justify-center px-5">
        <v-btn
          width="250"
          color="primary"
          @click="createUser"
          large
          nuxt
          :disabled="confirmed"
        >Продолжить</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PinPage',
  middleware: 'preRegistratepage',
  data: () => ({
    show: false,
    show2: false,
    pin: null,
    confirm: null,
    error: null
  }),
  computed: {
    confirmed() {
      if (!this.confirm) return true
      if (this.confirm.length === 4) {
        this.error =
          this.confirm === this.pin ? null : 'Введеные пинкоды не совпадают'
        return !!this.error
      }
      return true
    }
  },
  methods: {
    ...mapActions('user', ['setUserProperties']),
    createUser() {
      this.$root.$router.push('/registrate/createuser')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>