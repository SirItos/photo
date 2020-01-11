<template>
  <v-fade-transition appear mode="out-in">
    <v-col cols="4" :key="`photo-view_${src.name}`">
      <div class="photo-container">
        <div class="close-btn" v-if="deleteButtonShow">
          <v-btn icon class="delete-btn" color="white" @click="deleteImg">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-img :src="imgUrl" :lazy-src="imgUrl" contain>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular :value="progress" color="primary"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
    </v-col>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'PhotoView',
  props: {
    src: [Object, File],
    saved: Boolean,
    index: Number
  },
  data: () => ({
    imgUrl: '',
    progress: 0
  }),
  computed: {
    deleteButtonShow() {
      if (this.saved) return true
      return this.progress === 100
    }
  },
  created() {
    if (this.saved) {
      this.imgUrl = this.src.url
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.saved) {
        return
      }
      const reader = new FileReader()
      reader.onloadstart = e => {
        this.progress = 0
      }
      reader.onloadend = e => {
        this.imgUrl = e.target.result
      }
      reader.onprogress = e => {
        this.updateProgress(e)
      }
      if (this.src) reader.readAsDataURL(this.src)
    })
  },
  methods: {
    updateProgress(e) {
      this.progress = Math.round((e.loaded / e.total) * 100)
    },
    deleteImg() {
      this.$emit(
        'deleteImg',
        this.saved ? { id: this.src.id, index: this.index } : this.index
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  min-height: 77px;
  max-height: 96px;
  display: flex;
  height: 100%;
  border: 0.5px solid rgba(74, 74, 74, 0.25);
  border-radius: 2px;
  position: relative;
}
.close-btn {
  position: absolute;
  z-index: 100;
  top: -15px;
  right: -15px;
}
.delete-btn {
  background: rgba(0, 0, 0, 0.5);
  border-color: white;
}
</style>