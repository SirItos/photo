<template>
  <v-row no-gutters class="flex-column fill-height pa-5">
    <v-col>
      <v-form @submit.prevent="send" ref="form" lazy-validation :value="valid" class="fill-height">
        <v-row no-gutters class="flex-column fill-height justify-space-between">
          <v-col>
            <div class="text-center font-weight-bold headline mb-6">Обратная связь</div>
            <v-text-field
              v-model="email"
              name="userEmail"
              autocomplete="off"
              label="Email"
              color="primary"
              type="email"
              append-icon="mdi-email"
              :rules="[
                        val => !!val || 'Укажите Ваш Email',
                        email_rules]"
            ></v-text-field>
            <v-textarea
              v-model="description"
              class="mt-4"
              label="Описание"
              rows="6"
              append-icon="mdi-pencil"
              :rules="[
                        val => !!val || 'Требуется указать сообщение']"
            />
          </v-col>
          <div class="d-flex justify-center align-center flex-column">
            <v-btn
              block
              large
              type="submit"
              max-width="250"
              min-width="250"
              style="min-width:250px!important"
              color="primary"
              class="text-none font-weight-bold"
            >Отправить</v-btn>
            <v-btn
              @click="$nuxt.$router.back()"
              block
              large
              max-width="250"
              min-width="250"
              style="min-width:250px!important"
              text
              color="primary"
              class="text-none font-weight-bold mt-3 primary--text"
            >Назад</v-btn>
          </div>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FeedbackPage',
  head: {
    title: 'Обратная связь'
  },
  async asyncData({ store, $axios }) {
    if (!store.state.user.access_token) {
      return {
        email: null,
        have_email: false
      }
    } else {
      return await $axios
        .post('/user-params', { params: ['roles', 'userDetails'] })
        .then(response => {
          return {
            email: response.data.userDetails.email,
            have_email: response.data.userDetails.email ? true : false
          }
        })
    }
  },
  data: () => ({
    valid: false,
    description: null,
    email_rules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Некоректный email'
    }
  }),
  methods: {
    async send() {
      if (this.$refs.form.validate()) {
        const action = this.$store.state.user.access_token
          ? 'sendFeedbackAuth'
          : 'sendFeedback'
        await this.$store.dispatch(`feedback/${action}`, {
          email: this.email,
          description: this.description
        })

        this.$store.dispatch('dialog/setDialogParams', {
          visibility: true,
          title: this.$store.state.feedback.error
            ? 'Ошибка отправки сообщения '
            : 'Сообщение отправлено',
          okLabel: 'Ок',
          text: this.$store.state.feedback.error
            ? 'Произошла ошибка при отправке сообщения. Попробуйте позже.'
            : 'Благодарим за обращение'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>