<template>
  <v-row no-gutters class="flex-column fill-height">
    <div class="primary pa-6 pb-10 white--text">
      <div>
        На
        <span v-if="phone">номер+7 {{ phone }}</span>
        <span v-else>телефонный номер</span>
      </div>
      <div>выслан код подтверждения</div>
      <div class="mt-8">Код из СМС</div>
      <input
        v-model="code"
        type="tel"
        class="code-input"
        maxlength="4"
        @focus="vissible_button=false"
        @blur="vissible_button=true"
      />
      <v-fade-transition>
        <div
          v-if="timer"
          class="caption"
          style=" font-family: 'Montserrat', sans-serif !important;"
        >выслать повторно код можно через {{ timer }} секунд</div>
      </v-fade-transition>
    </div>
    <v-col>
      <v-row no-gutters class="flex-column justify-end fill-height">
        <v-fade-transition appear>
          <div v-if="vissible_button" class="d-flex justify-center">
            <v-fade-transition mode="out-in">
              <v-btn
                v-if="timer"
                @click="confirmCode"
                large
                width="250"
                class="text-none font-weight-bold"
                color="primary"
                :disabled="codeEntered"
              >Подтвердить</v-btn>
              <v-btn
                v-else
                large
                width="250"
                class="text-none font-weight-bold"
                color="primary"
                @click="sendSms"
              >Отправить код</v-btn>
            </v-fade-transition>
          </div>
        </v-fade-transition>
        <div class="caption pa-3" style=" font-family: 'Montserrat', sans-serif !important;">
          Введя код , вы подтверждаете, что вы старше 18 лет и
          соглашаетесь с
          <nuxt-link to="/terms?confirm=1">Условиями использования сервиса</nuxt-link>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  head: {
    title: 'Подтвердитt Email'
  },
  name: 'confrimCode',
  middleware: 'preRegistratepage',
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data: () => ({
    vissible_button: true,
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
    ...mapActions('user', ['smsConfrim', 'ascNewCode']),
    async sendSms() {
      this.code = null
      await this.ascNewCode()
      this.timer = 60
      this.countdown()
    },
    countdown() {
      const interval = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    async confirmCode() {
      await this.smsConfrim({
        code: this.code
      })
      this.code = null
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
