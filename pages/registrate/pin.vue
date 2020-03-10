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
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            type="tel"
            inputmode="numeric"
            autocomplete="0ff"
            name="pin"
            label="Введите пинкод"
            counter
            maxlength="4"
            :class="{ secure: !show }"
            @click:append="show = !show"
          ></v-text-field>
          <v-text-field
            v-model="confirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            type="tel"
            inputmode="numeric"
            autocomplete="off"
            :error-messages="error"
            name="pinConfirm"
            label="Повторите пин"
            class="mt-4"
            counter
            maxlength="4"
            :class="{ secure: !show2 }"
            @click:append="show2 = !show2"
          ></v-text-field>
          <div class="caption mt-2">Вы сможете изменить или восстановить пинкод в личном кабинете</div>
        </div>
      </div>
    </v-col>
    <v-col class="d-flex align-end">
      <div style="width:100%" class="d-flex justify-center px-5">
        <v-btn
          width="250"
          color="primary"
          class="text-none font-weight-bold"
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
  head: {
    title: 'Установка пин-кода'
  },
  name: 'PinPage',
  middleware: 'beforePinSet',
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
    ...mapActions('user', ['setPin']),
    async createUser() {
      await this.setPin(this.pin)
    }
  }
}
</script>

<style lang="scss" scoped></style>
