<template>
  <v-list flat>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      @click="call(item)"
      :to="item.to || '/'"
      nuxt
      v-ripple="{class:'white--text'}"
      style="background:inherit!important"
    >
      <v-list-item-icon>
        <v-icon class="white--text" v-if="item.icon" v-text="item.icon"></v-icon>
        <v-img v-else :src="item.url" height="20px"></v-img>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="white--text" v-text="item.text"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AppNavList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions('user', ['enter', 'exit']),
    call(item) {
      this.$emit('hideDrawler')
      if (!item.action) return
      this[item.action]()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>