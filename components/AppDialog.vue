<template>
  <v-card>
    <v-card-title>
      <div>{{ title }}</div>
    </v-card-title>

    <v-card-text>
      <div class="black--text" v-html="text"></div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="confirm" color="primary" @click="setDialogParams({})" text>{{ cancelLabel}}</v-btn>
      <v-btn class="text-none" color="primary" depressed @click="call">{{okLabel}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppDialog',
  computed: {
    ...mapState('dialog', [
      'title',
      'text',
      'okLabel',
      'cancelLabel',
      'okAction',
      'confirm'
    ])
  },
  methods: {
    ...mapActions('dialog', ['setDialogParams']),
    call() {
      if (this.okAction) {
        this.okAction()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>