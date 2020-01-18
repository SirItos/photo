<template>
  <v-row no-gutters class="fill-height flex-column">
    <div class="primary pa-4 d-flex align-center">
      <div>
        <v-img src="./empty_avatar.svg" width="100"></v-img>
      </div>
      <div class="pr-4 pl-6 d-flex flex-column align-center">
        <v-text-field
          v-model="loginPhone"
          dark
          readonly
          v-mask="mask"
          prefix="+7"
          max="10"
          type="tel"
          name="loginPhone"
          class="loginPhone"
          label="Телефон"
          color="white"
        ></v-text-field>
        <v-text-field
          v-model="userName"
          dark
          name="profileName"
          label="Имя"
          color="white"
          :rules="[val => !!val || 'Укажите Ваш телефон']"
          append-icon="mdi-pencil"
        ></v-text-field>
      </div>
    </div>
    <v-col>
      <v-form ref="form" lazy-validation :value="valid">
        <v-row no-gutters class="py-5 flex-column fill-height">
          <v-col>
            <div class="px-5">
              <v-text-field
                v-model="userPhone"
                name="profilePhone"
                label="Номер телефона (видят клиенты)"
                color="primary"
                append-icon="mdi-pencil"
                autocomplete="off"
                v-mask="mask"
                prefix="+7"
                max="10"
                type="tel"
                :rules="[val => !!val || 'Укажите телефон для обращений к Вам']"
              ></v-text-field>
            </div>
            <div v-if="roles==='provider'" class="px-5">
              <div>
                <v-text-field
                  v-model="userEmail"
                  name="userEmail"
                  autocomplete="off"
                  label="Email"
                  color="primary"
                  append-icon="mdi-pencil"
                  type="email"
                  :rules="[
                        val => !!val || 'Укажите Ваш Email',
                        email_rules]"
                ></v-text-field>
              </div>
              <div>
                <v-select v-model="age" clearable :items="['20-30','30-40','40-50','старше 50']" />
              </div>
            </div>
          </v-col>

          <div>
            <div v-if="roles==='provider'">
              <v-divider></v-divider>
              <div
                class="px-5"
                v-ripple
                @click="$router.push({path:'/registrate/resource/carinfo',query:{edit:resource_id}})"
              >
                <v-row>
                  <v-col>Редактировать информацию о автомобиле</v-col>
                  <div class="d-flex align-center">
                    <v-icon>mdi-chevron-right</v-icon>
                  </div>
                </v-row>
              </div>
              <v-divider></v-divider>
              <div
                class="px-5"
                v-ripple
                @click="$router.push({path:'/registrate/resource/photos',query:{edit:resource_id}})"
              >
                <v-row>
                  <v-col>Редактирование фотографий</v-col>
                  <div class="d-flex align-center">
                    <v-icon>mdi-chevron-right</v-icon>
                  </div>
                </v-row>
              </div>
              <v-divider></v-divider>
            </div>
            <div class="pa-5">
              <div class="d-flex justify-center">
                <v-btn
                  block
                  large
                  max-width="250"
                  style="min-width:250px!important"
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="saveChange"
                >Сохранить</v-btn>
              </div>
            </div>
          </div>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'

export default {
  head: {
    title: 'Профиль'
  },
  name: 'ProfilePage',
  directives: {
    mask
  },
  async asyncData({ $axios }) {
    return await $axios
      .post('/user-params', {
        params: ['phone', 'userDetails', 'resource']
      })
      .then(response => {
        return {
          loginPhone: response.data.userDetails.display_phone,
          userPhone: response.data.userDetails.display_phone,
          userEmail: response.data.userDetails.email,
          userName: response.data.userDetails.name,
          age: response.data.userDetails.age_range,
          resource_id: response.data.resource ? response.data.resource.id : null
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  data: () => ({
    mask: '### ### ## ##',
    age: null,
    email_rules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Некоректный email'
    },
    valid: false
  }),
  computed: {
    ...mapState('user', ['name', 'phone', 'pin', 'roles', 'email', 'ageRange'])
  },
  methods: {
    ...mapActions('settings', ['setToolbar']),
    ...mapActions('user', ['setUserProperties']),
    saveChange() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.setUserProperties([
        {
          field: 'name',
          value: this.userName
        },
        {
          field: 'display_phone',
          value: this.userPhone.replace(/\s+/g, '')
        },
        {
          field: 'email',
          value: this.userEmail
        },
        {
          field: 'age_range',
          value: this.age
        }
      ])
      this.$root.$router.back()
    }
  }
}
</script>

<style lang="scss" >
.loginPhone {
  .v-text-field__prefix {
    color: #ffffff !important;
  }
}
</style>