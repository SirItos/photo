<template>
  <v-row no-gutters class="fill-height flex-column pa-5">
    <v-col>
      <div class="headline text-center font-weight-bold">Добавить фотографии</div>
      <v-row class="my-10 align-stretch" v-if="mountEnd">
        <v-photo-view
          v-for="(img, index) in savedImage"
          :key="`photo_view_saved${img.id}`"
          :src="img"
          :index="index"
          :saved="true"
          @deleteImg="deleteSavedImg"
        />
        <v-photo-view
          v-for="(img, index) in img"
          :key="`photo_view_${img.name}`"
          :src="img"
          :index="index"
          @deleteImg="deleteImg"
        />
        <v-photo-input @pickImg="setNewImg" />
      </v-row>
      <div
        class="my-6 caption"
        style=" font-family: 'Montserrat', sans-serif !important;"
      >Вы сможете изменить эти параметры в личном кабинете</div>
    </v-col>
    <div class="pt-10">
      <div class="d-flex justify-center">
        <v-btn
          class="text-none font-weight-bold"
          color="primary"
          min-width="250"
          @click="nextBtnClick"
          large
        >{{ id ? 'Сохранить' : 'Отправить на проверку' }}</v-btn>
      </div>
      <div class="d-flex justify-center">
        <v-btn
          v-if="id"
          class="text-none font-weight-bold primary--text mt-4"
          nuxt
          large
          width="250"
          @click="$router.back()"
          color="secondary "
        >Отмена</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  head: {
    title: 'Загрузка фотографий'
  },
  name: 'Photos',
  middleware: 'isProvider',
  components: {
    'v-photo-input': () => import('@/components/PhotoInput'),
    'v-photo-view': () => import('@/components/PhotoView')
  },
  async asyncData({ route, $axios }) {
    if (route.query.edit) {
      return await $axios
        .get(`/get-resourece-images?id=${route.query.edit}`)
        .then(response => {
          return {
            savedImage: response.data,
            startLenght: response.data.length
          }
        })
    }
    return {}
  },
  data: () => ({
    img: [],
    id: null,
    mountEnd: false,
    toDelete: [],
    savedImage: []
  }),
  created() {
    this.id = this.$route.query.edit
  },
  mounted() {
    this.$nextTick(() => {
      this.mountEnd = true
    })
  },
  methods: {
    ...mapActions('images', ['uploadImages', 'deleteImages']),
    setNewImg(val) {
      this.img.push(val)
    },
    deleteImg(val) {
      this.img.splice(val, 1)
    },
    deleteSavedImg(val) {
      this.savedImage.splice(val.index, 1)
      this.toDelete.push(val.id)
    },
    nextBtnClick() {
      if (this.id) {
        this.checkEditStatusAction()
      } else {
        if (!this.img.length) {
          this.$store.dispatch('dialog/setDialogParams', {
            visibility: true,
            title: 'Вы уверены?',
            text:
              'Для успешного прохождения модерации рекомендуется добавить фотографии объекта',
            confirm: true,
            okLabel: 'Добавить',
            cancelLabel: 'Потом',
            cancelAction: () => {
              this.$root.$router.push('/')
              this.$store.dispatch('dialog/setDialogParams', {}, { root: true })
            }
          })
        } else {
          this.firstSave()
        }
      }
    },

    async firstSave() {
      await this.uploadImages({ upload: this.img })
      this.$root.$router.push('/')
      this.$store.dispatch('dialog/setDialogParams', {
        visibility: true,
        title: 'Поздравляем!',
        text:
          'Ваша анкета создана и отправлена на проверку. Скоро она появится на карте',
        okLabel: 'Ок'
      })
    },
    async edtiBack() {
      this.$root.$router.back()
    },
    async checkEditStatusAction() {
      if (!this.img.length) {
        if (!this.toDelete.length) {
          this.edtiBack()
          return
        }
        this.deleteImages(this.toDelete)
      } else {
        await this.uploadImages({ upload: this.img })
        if (this.toDelete.length) {
          this.deleteImages(this.toDelete)
        }
      }
      this.edtiBack()
    }
  }
}
</script>

<style lang="scss" scoped></style>
