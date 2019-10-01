<template>
  <v-list flat>
    <v-list-item v-for="(item, i) in items" :key="i" to="/" color="white">
      <v-list-item-icon>
        <v-icon v-if="item.icon" v-text="item.icon"></v-icon>
        <v-img v-else :src="item.url" height="20px" v-ripple="{class:'white'}"></v-img>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'AppNavList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>