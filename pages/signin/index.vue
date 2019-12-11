<template>
  <statScreen :registrate="false"></statScreen>
</template>

<script>
// import { mapActions } from 'vuex'
const statScreen = () => import('@/components/StartScreen')
export default {
  head: {
    title: 'Вход'
  },
  name: 'signin',
  components: {
    statScreen
  }
}
</script>

<style lang="scss" scoped>
</style>