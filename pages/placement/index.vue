<template>
  <v-row no-gutters class="flex-column fill-height pa-5">
    <v-col>
      <div class="text-center font-weight-bold headline mb-6">Правила размещения анкет</div>
      <div>
        <span class="font-weight-bold">В описании и имени запрещается размещать:</span>
        <ul>
          <li>Информацию о третьих лицах</li>
          <li>Контакты и ссылки на другие сайты/сервисы/ресурсы</li>
          <li>Прямые коммерческие и рекламные предложения</li>
        </ul>
      </div>
      <div class="mt-5">
        <span class="font-weight-bold">Правила размещения фотографий:</span>
        <ul>
          <li>Запрещается использование фотографий порнографического характера (допускаются фотографии только с прикрытыми половыми органами).</li>
          <li>Запрещается использование фотографии третьих лиц. Для подтверждения оригинальности фото используется «сигнатуры». Публикуются анкеты, прошедшие предварительную модерацию.</li>
          <li>Вы можете пользоваться Сайтом исключительно в личных некоммерческих целях (запрещается указывать стоимость и виды услуг).</li>
          <li>Запрещается размещать контакты и ссылки на другие сайты/сервисы/ресурсы.</li>
        </ul>
      </div>
    </v-col>
    <div class="d-flex justify-center my-5">
      <v-btn
        @click="next"
        large
        width="250"
        class="text-none font-weight-bold"
        color="primary"
      >Продолжить</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'PlcacementPage',
  head: {
    title: 'Правила размещения анкет'
  },
  methods: {
    next() {
      if (this.$route.query.profile) {
        this.$router.back()
        return
      }

      this.$router.push('/registrate/resource/profile')
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>