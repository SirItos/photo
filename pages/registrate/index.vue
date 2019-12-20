<template>
  <statScreen :rigistrate="true"></statScreen>
</template>

<script>
// import { mapActions } from 'vuex'
const statScreen = () => import('@/components/StartScreen')
export default {
  head: {
    title: 'Регистрация'
  },
  name: 'registrate',

  components: {
    statScreen
  }
}
</script>

<style lang="scss" scoped>
</style>