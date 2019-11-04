<template>
  <v-row no-gutters class="flex-column fill-height">
    <div class="primary pa-6 pb-10 white--text">
      <div>
        На
        <span v-if="phone">номер+7 {{phone}}</span>
        <span v-else>телефонный номер</span>
      </div>
      <div>выслан код подтверждения</div>
      <div class="mt-8">Код из СМС</div>
      <input v-model="code" type="tel" class="code-input" maxlength="4" />
      <v-fade-transition>
        <div v-if="timer" class="caption">выслать повторно код можно через {{timer}} секунд</div>
      </v-fade-transition>
    </div>
    <v-col>
      <v-row no-gutters class="flex-column justify-end fill-height">
        <div class="d-flex justify-center">
          <v-fade-transition mode="out-in">
            <v-btn
              v-if="timer"
              @click="confirmCode"
              large
              min-width="250"
              color="primary"
              :disabled="codeEntered"
            >Подтвердить</v-btn>
            <v-btn v-else large min-width="250" color="primary" @click="sendSms">Отправить код</v-btn>
          </v-fade-transition>
        </div>
        <div
          class="caption pa-3"
        >Нажимая кнопку Отправить код, вы подтверждаете, что вы старше 18 лет и соглашаетесь с Условиями использования сервиса</div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'confrimCode',
  middleware: 'preRegistratepage',
  data: () => ({
    code: null,
    timer: 60
  }),
  computed: {
    ...mapState('user', ['phone']),
    codeEntered() {
      if (!this.code) return true
      return this.code.length !== 4
    }
  },
  watch: {
    code: function(newVal, oldVal) {
      if (!newVal) return
      if (newVal.length === 4) {
        this.confirmCode()
      }
    }
  },
  created() {
    this.countdown()
  },
  methods: {
    sendSms() {
      this.timer = 60
      this.countdown()
    },
    countdown() {
      const interval = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    confirmCode() {
      this.$root.$router.push('/registrate/pin')
    }
  }
}
</script>

<style lang="scss" scoped>
.code-input {
  border: none;
  border-radius: 0;
  color: white;
  border-bottom: 2px solid white;
  padding: 5px;
  font-size: 36px;
  width: 100%;
  text-align: center;
  &:focus {
    outline: none;
  }
}
</style>