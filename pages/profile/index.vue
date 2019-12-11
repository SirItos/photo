<template>
  <v-row no-gutters class="fill-height flex-column">
    <div class="primary pa-4 d-flex align-center">
      <div>
        <v-img src="./empty_avatar.svg" width="100"></v-img>
      </div>
      <div class="pr-4 pl-6 d-flex align-center">
        <v-text-field
          v-model="userName"
          dark
          name="profileName"
          label="Имя"
          color="white"
          append-icon="mdi-pencil"
        ></v-text-field>
      </div>
    </div>
    <v-col>
      <v-row no-gutters class="py-5 flex-column fill-height">
        <v-col>
          <div class="px-5">
            <v-text-field
              v-model="userPhone"
              name="profilePhone"
              label="Телефон"
              color="primary"
              append-icon="mdi-pencil"
              v-mask="mask"
              prefix="+7"
              max="10"
              type="tel"
              :rules="[val => !!val || 'Укажите Ваш телефон']"
            ></v-text-field>
          </div>
          <div v-if="role==='provider'" class="px-5">
            <div>
              <v-text-field
                v-model="userEmail"
                name="userEmail"
                label="Email"
                color="primary"
                append-icon="mdi-pencil"
                type="email"
                :rules="[val => !!val || 'Укажите Ваш Email',emailRule]"
              ></v-text-field>
            </div>
            <div>
              <v-select v-model="age" clearable :items="['20-30','30-40','40-50','старше 50']" />
            </div>
          </div>
        </v-col>

        <div>
          <div v-if="role==='provider'">
            <v-divider></v-divider>
            <div
              class="px-5"
              v-ripple
              @click="$router.push({path:'/resource/carinfo',query:{id:1}})"
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
              @click="$router.push({path:'/resource/photos',query:{id:1}})"
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
            <v-btn
              block
              large
              max-width="250"
              color="primary"
              class="text-none font-weight-bold"
              @click="saveChange"
            >Сохранить</v-btn>
          </div>
        </div>
      </v-row>
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
  data: () => ({
    mask: '### ### ## ##',
    userName: null,
    userPhone: null,
    userEmail: null,
    age: null,
    emailRule: val => {
      return true
    }
  }),
  computed: {
    ...mapState('user', ['name', 'phone', 'pin', 'role', 'email', 'ageRange'])
  },
  created() {
    this.setToolbar(false)
    this.userName = JSON.parse(JSON.stringify(this.name))
    this.userPhone = JSON.parse(JSON.stringify(this.phone))
    this.userEmail = JSON.parse(JSON.stringify(this.email))
    this.age = JSON.parse(JSON.stringify(this.ageRange))
  },
  methods: {
    ...mapActions('settings', ['setToolbar']),
    ...mapActions('user', ['setUserProperties']),
    saveChange() {
      this.setUserProperties([
        {
          field: 'name',
          value: this.userName
        },
        {
          field: 'phone',
          value: this.userPhone
        },
        {
          field: 'email',
          value: this.userEmail
        },
        {
          field: 'ageRange',
          value: this.age
        }
      ])
      this.$root.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>