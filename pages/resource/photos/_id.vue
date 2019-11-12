<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <div class="headline text-center font-weight-bold">Добавить фотографии</div>
      <v-row class="my-10">
        <v-photo-view
          v-for="(img,index) in img"
          :key="`photo_view_${img.name}`"
          :src="img"
          :index="index"
          @deleteImg="deleteImg"
        />
        <v-photo-input @pickImg="setNewImg" />
      </v-row>
      <div class="my-6 caption">Вы сможете изменить эти параметры в настройках сервиса</div>
    </v-col>
    <div class="pa-10">
      <v-btn
        class="text-none font-weight-bold"
        color="primary"
        @click="next"
        block
      >{{id ? 'Сохранить' :'Отправить на проверку'}}</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'Photos',
  components: {
    'v-photo-input': () => import('@/components/PhotoInput'),
    'v-photo-view': () => import('@/components/PhotoView')
  },
  data: () => ({
    img: [],
    id: null
  }),
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    setNewImg(val) {
      this.img.push(val)
    },
    deleteImg(val) {
      console.log(val)
      this.img.splice(val, 1)
      console.log(this.img)
    },
    next() {
      if (this.id) {
        this.$root.$router.back()
        return
      }
      this.$root.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>