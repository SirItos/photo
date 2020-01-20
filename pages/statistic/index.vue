<template>
  <v-row no-gutters class="px-8 py-8 flex-column fill-height">
    <v-col>
      <v-row no-gutters class="fill-height flex-column">
        <v-col cols="4" style="max-width:100%!important">
          <v-select
            v-model="current_period"
            @change="loadStats"
            :items="periods"
            item-text="label"
            item-value="value"
            hide-details
          ></v-select>
        </v-col>
        <v-col>
          <v-row no-gutters class="f-18 font-weight-medium align-center">
            <v-col>Просмотры профиля</v-col>
            <div>{{details}}</div>
          </v-row>
          <v-divider class="my-6" style="background-color:#D4D4D4"></v-divider>
          <v-row no-gutters class="f-18 font-weight-medium align-center">
            <v-col>Добавление в избранное</v-col>
            <div>{{favorite}}</div>
          </v-row>
          <v-divider class="my-6" style="background-color:#D4D4D4"></v-divider>
          <v-row no-gutters class="f-18 font-weight-medium align-center">
            <v-col>Звонки</v-col>
            <div>{{call}}</div>
          </v-row>
          <v-divider class="my-6" style="background-color:#D4D4D4"></v-divider>
        </v-col>
      </v-row>
    </v-col>
    <div class="d-flex justify-center">
      <v-btn
        @click="$nuxt.$router.back()"
        class="text-none font-weight-bold"
        max-width="250"
        style="min-width:250px!important"
        block
        large
        color="primary"
      >
        <span class="white--text">Закрыть</span>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'Statistic',
  head: {
    title: 'Статистика'
  },
  async asyncData({ store, $axios }) {
    return await $axios
      .post('/get-events', { id: store.state.user.id, period: 'today' })
      .then(response => {
        return response.data
      })
      .catch(e => {
        store.dispatch('dialog/setDialogParams', {
          visibility: true,
          title: 'Ошибка формирования статистики',
          okLabel: 'Ок',
          text:
            'Произошла ошибка при формирование статистики. Попробуйте позже.'
        })
      })
  },
  data: () => ({
    current_period: 'today',
    periods: [
      {
        label: 'Сегодня',
        value: 'today'
      },
      {
        label: 'Вчера',
        value: 'yesterday'
      },
      {
        label: 'Неделя',
        value: 'week'
      },
      {
        label: 'Месяц',
        value: 'mounth'
      },
      {
        label: 'Квартал',
        value: 'quart'
      },
      {
        label: 'Год',
        value: 'year'
      }
    ]
  }),
  methods: {
    async loadStats() {
      this.$store.dispatch('settings/setOverlay', true)
      let currentTimeZoneOffsetInHours = -new Date().getTimezoneOffset() / 60
      await this.$axios
        .post('/get-events', {
          id: this.$store.state.user.id,
          period: this.current_period,
          timestamp: currentTimeZoneOffsetInHours
        })
        .then(response => {
          this.call = response.data.call
          this.details = response.data.details
          this.favorite = response.data.favorite
        })
        .catch(e => {
          this.$store.dispatch('dialog/setDialogParams', {
            visibility: true,
            title: 'Ошибка формирования статистики',
            okLabel: 'Ок',
            text:
              'Произошла ошибка при формирование статистики. Попробуйте позже.'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>