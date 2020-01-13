<template>
  <v-row no-gutters class="fill-height start-bg flex-column">
    <v-col>
      <v-form
        @submit="call"
        :value="valid"
        lazy-validation
        ref="form"
        class="d-flex fill-height flex-column justify-center align-center"
      >
        <div
          class="d-flex flex-column justify-space-around white--text"
          style="height:100%"
        >
          <div class="fill-height flex-column justify-end d-flex">
            <div>
              <div class="text-uppercase display-1">
                Место
                <br />Твоих <br />Свиданий
              </div>

              <div class="py-4" v-if="city">город : {{ city }}</div>
              <!--     -->
              <v-text-field
                v-model="phone"
                v-mask="mask"
                prefix="+7"
                max="10"
                type="tel"
                :rules="[v => !!v || 'Укажите свой телефон', rules.length(13)]"
                hide-details
                placeholder="_ _ _  _ _ _  _ _  _ _"
                solo
                style="border-radius:0"
              ></v-text-field>
              <v-text-field
                v-if="!registrate"
                v-model="code"
                :rules="[v => !!v || 'Укажите пин-код', rules.length(4)]"
                maxlength="4"
                type="tel"
                inputmode="numeric"
                class="mt-1 text-center secure"
                hide-details
                placeholder="введите пин-код"
                solo
                style="border-radius:0"
              ></v-text-field>

              <div class="pt-2" v-if="registrate">
                На номер телефона придет СМС
                <br />с кодом подтверждения
              </div>
              <div v-if="!registrate" class="pt-2 d-flex justify-end">
                <nuxt-link class="link" to="/registrate/confirm"
                  >Забыли пин-код?</nuxt-link
                >
              </div>
            </div>
          </div>

          <div class="botom-btn d-flex justify-center">
            <v-btn
              block
              large
              color="primary"
              class="text-none font-weight-bold"
              max-width="250"
              style="min-width:250px!important"
              type="submit"
              >{{ registrate ? 'Регистрация' : 'Вход' }}</v-btn
            >
          </div>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapState, mapActions } from 'vuex'

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
    code: null,
    rules: {
      length: len => v => {
        if (!v) return true
        return v.length === len || 'Укажите свой телефон'
      }
    }
  }),
  computed: {
    ...mapState('user', ['city'])
  },
  methods: {
    ...mapActions('user', ['registrateApi', 'enter']),
    call(e) {
      this.registrate ? this.registrateAction() : this.enterAction()

      e.preventDefault()
    },
    async registrateAction() {
      if (this.$refs.form.validate()) {
        await this.registrateApi({
          field: 'phone',
          value: this.phone
        })
      }
    },
    async enterAction() {
      if (this.$refs.form.validate()) {
        await this.enter({
          phone: this.phone.replace(/\s+/g, ''),
          code: this.code
        })
      } else {
      }
    }
  }
}
</script>

<style lang="scss">
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
