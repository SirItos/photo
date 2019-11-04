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
      <v-row no-gutters class="pa-5 flex-column fill-height">
        <v-col>
          <div>
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
        </v-col>
        <div class="pa-5">
          <v-btn
            block
            large
            color="primary"
            class="text-none font-weight-bold"
            @click="saveChange"
          >Сохранить</v-btn>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'

export default {
  name: 'ProfilePage',
  directives: {
    mask
  },
  data: () => ({
    mask: '### ### ## ##',
    userName: null,
    userPhone: null,
    userEmail: null,
    ageRange: null
  }),
  computed: {
    ...mapState('user', ['name', 'phone', 'pin'])
  },
  created() {
    this.setToolbar(false)
    this.userName = JSON.parse(JSON.stringify(this.name))
    this.userPhone = JSON.parse(JSON.stringify(this.phone))
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
        }
      ])
      this.$root.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>