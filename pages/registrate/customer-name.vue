<template>
  <v-row no-gutters class="flex-column py-10 px-5 fill-height">
    <v-col>
      <div class="headline font-weight-bold text-center">Как к Вам обращаться?</div>
      <div class="mt-12">
        <v-text-field v-model="name" name="userNameInptu" label="Введите имя" class="mt-4"></v-text-field>
      </div>
      <div
        class="caption"
        style=" font-family: 'Montserrat', sans-serif !important;"
      >Вы сможете изменить эти параметры в личном кабинете</div>
    </v-col>
    <div>
      <div class="d-flex justify-center px-10" style="width:100%;">
        <v-btn
          color="primary"
          class="text-none font-weight-bold"
          nuxt
          width="250"
          large
          @click="setCustomerName"
          block
        >{{ name ? 'Начать пользоваться' : 'Пропустить' }}</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head: {
    title: 'Настройка клиента'
  },
  name: 'CustomerName',
  middleware: 'preRegistratepage',
  data: () => ({
    name: null
  }),
  methods: {
    ...mapActions('user', ['setUserProperties']),
    async setCustomerName() {
      if (this.name) {
        await this.setUserProperties([
          {
            field: 'name',
            value: this.name
          }
        ])
      }
      this.$root.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped></style>
