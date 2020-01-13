<template>
  <v-col cols="4">
    <div
      class="d-flex align-center pa-5 grey-bg"
      style="height:108px"
      v-ripple
      @click="$refs.picker.click()"
    >
      <v-img src="/camera.svg"></v-img>
      <input
        multiple
        ref="picker"
        type="file"
        accept="image/*"
        style="display:none"
        @change="onFileChange($event)"
      />
    </div>
  </v-col>
</template>

<script>
export default {
  name: 'PhotoInput',
  methods: {
    async onFileChange(event) {
      if (!event.target.files.length) return
      this.$emit('pickImg', event.target.files[0])
      this.$refs.picker.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.grey-bg {
  background: #f7f8f9;
  border: 0.5px solid rgba(74, 74, 74, 0.25);

  border-radius: 2px;
}
</style>