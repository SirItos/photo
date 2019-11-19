<template>
  <v-row no-gutters class="px-10 py-10 flex-column fill-height">
    <v-col class="title text-center">
      <div class="font-weight-bold">Вы у нас впервые?</div>
      <div class="font-weight-regular">Давайте познакомимся!</div>
      <div class="pt-8 px-8">
        <v-img :src="require('@/static/car.svg')"></v-img>
      </div>
    </v-col>
    <div>
      <div class="d-flex justify-center" style="width:100%;">
        <v-btn
          color="primary"
          class="text-none font-weight-bold"
          width="250"
          nuxt
          large
          @click="setUser('customer','/registrate/customer-name')"
        >Я хочу фотографироваться</v-btn>
        <!--  to="/registrate/customer-name" -->
      </div>
      <div class="d-flex justify-center mt-4" style="width:100%">
        <v-btn
          class="text-none font-weight-bold primary--text"
          nuxt
          large
          width="250"
          @click="setUser('provider','/resource/profile')"
          color="secondary "
        >У меня есть машины</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { map } from 'leaflet'
export default {
  name: 'Usercreating',
  middleware: 'preRegistratepage',
  methods: {
    ...mapActions('user', ['setUserProperties']),
    setUser(userType, nextRoute) {
      this.setUserProperties([
        {
          field: 'role',
          value: userType
        }
      ])
      this.$root.$router.push(`${nextRoute}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>