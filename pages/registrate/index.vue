<template>
  <statScreen :rigistrate="true"></statScreen>
</template>

<script>
// import { mapActions } from 'vuex'
const statScreen = () => import('@/components/StartScreen')
export default {
  name: 'registrate',

  components: {
    statScreen
  }
  // created() {
  //   this.setToolbar(false)
  // },
  // methods: {
  //   ...mapActions('settings', ['setToolbar'])
  // }
}
</script>

<style lang="scss" scoped>
</style>