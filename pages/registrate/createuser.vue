<template>
  <v-row no-gutters class="px-8 py-10 flex-column fill-height">
    <v-col class="title text-center">
      <div class="font-weight-bold">Вы у нас впервые?</div>
      <div class="font-weight-regular">Давайте познакомимся!</div>
      <div class="pt-8 px-8 d-flex justify-center">
        <v-img :src="require('@/static/photo.svg')"></v-img>
      </div>
    </v-col>
    <div>
      <div class="d-flex justify-center" style="width:100%;">
        <v-btn
          class="text-none font-weight-bold white--text"
          nuxt
          large
          width="250"
          @click="setUser('provider', '/registrate/resource/profile', true)"
          color="primary "
        >Регистрация для девушек</v-btn>
      </div>
      <div class="d-flex justify-center mt-4" style="width:100%">
        <v-btn
          color="primary"
          class="text-none font-weight-bold"
          width="250"
          nuxt
          large
          @click="setUser('customer', '/registrate/customer-name')"
        >Регистрация для мужчин</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { map } from 'leaflet'
export default {
  head: {
    title: 'Создание пользовтеля'
  },
  name: 'Usercreating',
  middleware: 'preRegistratepage',
  methods: {
    ...mapActions('user', ['setUserRole']),
    async setUser(userType, nextRoute) {
      await this.setUserRole({
        params: [
          {
            field: 'roles',
            value: userType
          }
        ],
        nextRoute: nextRoute
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
