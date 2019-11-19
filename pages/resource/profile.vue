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
              label="Имя (видят клиенты)"
              :rules="[val => !!val || 'Укажите как к Вам обращаться']"
              color="primary"
            ></v-text-field>
          </div>
          <div class="mb-5">
            <v-text-field
              v-model="userPhone"
              name="profilePhone"
              label="Номер телефона (видят клиенты)"
              color="primary"
              v-mask="mask"
              prefix="+7"
              max="10"
              type="tel"
              :rules="[val => !!val || 'Укажите Ваш телефон']"
            ></v-text-field>
          </div>
          <div class="mb-5">
            <v-text-field
              v-model="email"
              name="profileMail"
              label="Эл. почта"
              :rules="[
                        val => !!val || 'Укажите Ваш Email',
                        email_rules]"
              color="primary"
            ></v-text-field>
          </div>
          <div>
            <v-select v-model="ageRange" clearable :items="['20-30','30-40','40-50','старше 50']" />
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
  name: 'ResourceProfile',
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
    this.userPhone = this.phone
  },
  methods: {
    ...mapActions('user', ['setUserProperties']),
    next() {
      if (this.$refs.form.validate()) {
        this.$root.$router.push('/resource/carinfo')
        this.setUserProperties([
          {
            field: 'name',
            value: this.name
          },
          {
            field: 'phone',
            value: this.userPhone
          },
          {
            field: 'email',
            value: this.email
          },
          {
            field: 'ageRange',
            value: this.ageRange
          }
        ])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>