<template>
  <v-list>
    <v-list-item @click="changeValue" v-ripple="{class:'white--text'}">
      <v-list-item-icon></v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text font-weight-bold">Онлайн</v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-switch v-model="status" color="white"></v-switch>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'SwitcherComponent',
  data: () => ({
    status: true
  }),
  created() {
    this.status = this.$store.state.user.online
  },
  methods: {
    changeValue() {
      this.status = !this.status
      this.$store.commit('user/SET_USER_FILED', [
        {
          field: 'online',
          value: this.status
        }
      ])
      this.$axios.post('/set-user-details', {
        params: [
          {
            field: 'online',
            value: this.status
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>