<template>
  <v-row no-gutters class="fill-height start-bg flex-column">
    <v-col>
      <v-row no-gutters class="fill-height flex-column justify-center align-center white--text">
        <div class="d-flex flex-column justify-space-around" style="height:100%">
          <v-row no-gutters class="flex-column justify-end">
            <div class="text-uppercase display-1">
              Место
              <br />Твоих
              <br />Свиданий
            </div>
            <div class="py-4">город : Санкт-Петербург</div>
            <v-form :value="valid" lazy-validation ref="form">
              <!--     -->
              <v-text-field
                v-model="phone"
                v-mask="mask"
                prefix="+7"
                max="10"
                type="tel"
                :rules="[val => !!val || 'Укажите Ваш телефон']"
                hide-details
                placeholder="_ _ _  _ _ _  _ _  _ _"
                solo
                style="border-radius:0"
              ></v-text-field>
              <v-text-field
                v-if="!registrate"
                v-model="code"
                maxlength="4"
                type="tel"
                class="mt-1 text-center"
                hide-details
                placeholder="введите пин-код"
                solo
                style="border-radius:0"
              ></v-text-field>
            </v-form>
            <div class="pt-2" v-if="registrate">
              На номер телефона придет СМС
              <br />с кодом подтверждения
            </div>
            <div v-if="!registrate" class="pt-2 d-flex justify-end">
              <nuxt-link class="link" to="/registrate/confirm">Забыли пин-код?</nuxt-link>
            </div>
          </v-row>
          <div class="botom-btn">
            <v-btn
              block
              large
              color="primary"
              class="text-none font-weight-bold"
              @click="call"
            >{{ registrate ? 'Регистрация' : 'Вход'}}</v-btn>
          </div>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapActions } from 'vuex'

export default {
  name: 'StartScreen',
  props: {
    registrate: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    mask
  },
  data: () => ({
    mask: '### ### ## ##',
    valid: false,
    phone: null,
    code: null
  }),
  created() {
    // this.$store.registerModule('providerDetails', providerModule)
  },
  methods: {
    ...mapActions('user', ['setUserProperties', 'enter']),
    call() {
      this.registrate ? this.registrateAction() : this.enterAction()
    },
    registrateAction() {
      if (this.$refs.form.validate()) {
        this.setUserProperties([{
          field: 'phone',
          value: this.phone
        }])
        this.$root.$router.push('/registrate/confirm')
      }
    },
    enterAction() {
      if (this.$refs.form.validate()) {
        if (this.code === '1111') {
          this.enter({ name: 'User one', phone: this.phone, role: 'provider' })
          this.$root.$router.push('/')
        }
        if (this.code === '2222') {
          this.enter({ name: 'User two', phone: this.phone, role: 'customer' })
          this.$root.$router.push('/')
        }
      }
    }
  }
}
</script>

<style lang="scss" >
.start-bg {
  background-image: url('/photo-main-bg.png');
  background-position: center;
  background-size: cover;
}
.v-text-field__prefix {
  color: #000;
}
.link {
  color: white !important;
  text-decoration: none;
  font-size: 12px;
}
</style>