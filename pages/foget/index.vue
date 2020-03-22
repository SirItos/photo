<template>
  <v-row no-gutters class="flex-column fill-height px-8 py-10">
    <div class="title font-weight-bold text-center mb-10">Востановление пароля</div>
    <v-col>
      <v-form @submit="reset" :value="valid" lazy-validation ref="form">
        <v-text-field
          v-model="phone"
          v-mask="mask"
          autocomplete="off"
          prefix="+7"
          max="10"
          type="tel"
          :rules="[v => !!v || 'Укажите свой телефон', rules.length(13)]"
        ></v-text-field>
      </v-form>
    </v-col>

    <div class="d-flex justify-center mt-4" style="width:100%">
      <v-btn
        color="primary"
        class="text-none font-weight-bold"
        width="250"
        nuxt
        large
        @click="reset"
      >Востановить</v-btn>
    </div>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { mapActions } from 'vuex'
export default {
  name: 'resetPasswordPage',
  head: {
    title: 'Востановление пароля'
  },
  directives: {
    mask
  },
  data: () => ({
    phone: null,
    mask: '### ### ## ##',
    valid: false,
    rules: {
      length: len => v => {
        if (!v) return true
        return v.length === len || 'Укажите свой телефон'
      }
    }
  }),
  methods: {
    ...mapActions('user', ['resetPassword']),
    async reset() {
      if (this.$refs.form.validate()) {
        await this.resetPassword({
          field: 'phone',
          value: this.phone
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>