<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <div class="text-center font-weight-bold headline">Данные профиля</div>
      <div class="mt-10">
        <v-form ref="form" lazy-validation :value="valid">
          <div class="mb-5">
            <v-text-field
              v-model="name"
              name="profileName"
              autocomplete="off"
              label="Имя (видят клиенты)"
              :rules="[val => !!val || 'Укажите как к Вам обращаться']"
              color="primary"
            ></v-text-field>
          </div>
          <div class="mb-5">
            <v-text-field
              v-model="userPhone"
              @input="val => {cropAutoSet(val)}"
              name="profilePhone"
              label="Номер телефона (видят клиенты)"
              color="primary"
              v-mask="mask"
              autocomplete="off"
              prefix="+7"
              max="10"
              type="tel"
              :rules="[val => !!val || 'Укажите Ваш телефон']"
            ></v-text-field>
          </div>
          <div class="mb-5">
            <v-text-field
              v-model="email"
              autocomplete="off"
              name="profileMail"
              label="Эл. почта"
              :rules="[
                        val => !!val || 'Укажите Ваш Email',
                        email_rules]"
              color="primary"
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="ageRange"
              label="Возростной диапазон"
              clearable
              :items="['20-30','30-40','40-50','старше 50']"
            />
            <!-- <v-text-field disabled name="ageRange" label="Возрастной диапозон" color="primary"></v-text-field> -->
          </div>
        </v-form>
      </div>
      <div class="my-6 caption">Вы сможете изменить эти параметры в настройках сервиса</div>
    </v-col>
    <div class="pa-10">
      <v-btn
        width="250"
        large
        class="text-none font-weight-bold"
        color="primary"
        @click="next"
        block
      >Продолжить</v-btn>
    </div>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapState, mapActions } from 'vuex'
export default {
  head: {
    title: 'Настройка держателя'
  },
  middleware: 'createResource',
  name: 'ResourceProfile',
  async asyncData({ from, $axios, redirect }) {
    if (!from) {
      redirect('/')
      return
    }
    if (from.name === 'index' || from.name === 'registrate-createuser') {
      return await $axios
        .post('/user-params', {
          params: ['phone', 'userDetails']
        })
        .then(response => {
          return {
            userPhone: response.data.userDetails.display_phone,
            email: response.data.userDetails.email,
            name: response.data.userDetails.name,
            ageRange: response.data.userDetails.age_range
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
    redirect('/')
  },
  directives: {
    mask
  },
  data: () => ({
    mask: '### ### ## ##',
    valid: false,
    name: null,
    userPhone: null,
    email: null,
    ageRange: null,
    email_rules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Некоректный email'
    }
  }),
  computed: {
    ...mapState('user', ['phone'])
  },
  created() {
    if (!this.userPhone) {
      this.userPhone = this.phone
    }
  },
  methods: {
    cropAutoSet(val) {
      console.log(val)
    },
    ...mapActions('user', ['setUserProperties']),
    async next() {
      if (this.$refs.form.validate()) {
        await this.setUserProperties([
          {
            field: 'name',
            value: this.name
          },
          {
            field: 'display_phone',
            value: this.userPhone
          },
          {
            field: 'email',
            value: this.email
          },
          {
            field: 'age_range',
            value: this.ageRange
          }
        ])
        this.$root.$router.push('/registrate/resource/carinfo')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>