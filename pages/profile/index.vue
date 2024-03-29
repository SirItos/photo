<template>
  <v-row no-gutters class="fill-height flex-column">
    <div class="primary pa-4 d-flex align-center">
      <div>
        <v-img src="./empty_avatar.svg" width="100"></v-img>
      </div>
      <div class="pr-4 pl-6 d-flex flex-column align-center">
        <v-text-field
          v-model="loginPhone"
          dark
          readonly
          v-mask="computedMask"
          :max="computedMask.len"
          type="tel"
          name="loginPhone"
          class="loginPhone"
          label="Телефон"
          color="white"
        ></v-text-field>
        <v-text-field
          v-model="userName"
          dark
          name="profileName"
          label="Имя"
          color="white"
          class="always_white"
          :rules="[val => !!val || 'Укажите Ваше Имя']"
          append-icon="mdi-pencil"
        ></v-text-field>
      </div>
    </div>
    <v-col v-if="!trashed">
      <v-form ref="form" class="fill-height" lazy-validation :value="valid">
        <v-row no-gutters class="py-5 flex-column fill-height">
          <v-col v-if="roles === 'provider'">
            <div class="px-5">
              <v-text-field
                v-model="userPhone"
                name="profilePhone"
                label="Номер телефона (видят клиенты)"
                color="primary"
                append-icon="mdi-pencil"
                autocomplete="off"
                max="10"
                type="tel"
                :rules="[val => !!val || 'Укажите телефон для обращений к Вам']"
              ></v-text-field>
            </div>
            <div v-if="roles === 'provider'" class="px-5">
              <div>
                <v-text-field
                  v-model="userEmail"
                  name="userEmail"
                  autocomplete="off"
                  label="Email"
                  color="primary"
                  append-icon="mdi-pencil"
                  type="email"
                  :rules="[val => !!val || 'Укажите Ваш Email', email_rules]"
                ></v-text-field>
              </div>
              <div>
                <v-select
                  v-model="age"
                  clearable
                  :items="['18-30', '30-40', '40-50', 'старше 50']"
                />
              </div>
            </div>
          </v-col>

          <div>
            <div v-if="roles === 'provider'">
              <v-divider></v-divider>
              <div
                class="px-5"
                v-ripple
                @click="
                  $router.push({
                    path: '/placement',
                    query: { profile: 1 }
                  })
                "
              >
                <div class="d-flex margin-sides">
                  <div class="flex pa-3">
                    Правила размещения анкет
                  </div>
                  <div class="d-flex align-center">
                    <v-icon>mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <div
                class="px-5"
                v-ripple
                @click="
                  $router.push({
                    path: '/registrate/resource/carinfo',
                    query: { edit: resource_id }
                  })
                "
              >
                <div class="d-flex margin-sides">
                  <div class="flex pa-3">
                    Редактировать информацию о себе
                  </div>
                  <div class="d-flex align-center">
                    <v-icon>mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div
                class="px-5"
                v-ripple
                @click="
                  $router.push({
                    path: '/registrate/resource/photos',
                    query: { edit: resource_id }
                  })
                "
              >
                <div class="d-flex margin-sides">
                  <div class="flex pa-3">
                    Редактирование фотографий
                  </div>
                  <div class="d-flex align-center">
                    <v-icon>mdi-chevron-right</v-icon>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
            </div>
            <div class="px-5 pt-5">
              <div class="d-flex justify-center">
                <v-btn
                  block
                  large
                  max-width="250"
                  style="min-width:250px!important"
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="saveChange"
                  >Сохранить</v-btn
                >
              </div>
              <div v-if="resource_id" class="d-flex pt-2 justify-center">
                <v-btn
                  block
                  large
                  max-width="250"
                  style="min-width:250px!important"
                  text
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="deleting"
                >
                  <span class="primary--text">Удалить анкету</span>
                </v-btn>
              </div>
            </div>
          </div>
        </v-row>
      </v-form>
    </v-col>
    <v-col v-else>
      <v-row
        no-gutters
        class="py-5 flex-column fill-height justify-center align-center"
      >
        <div class="px-5 py-2 text-center">
          Ваша анкета удалена Вами. Для востановления анкеты нажмити кнопку
        </div>
        <div class="d-flex justify-center">
          <v-btn
            block
            large
            max-width="250"
            style="min-width:250px!important"
            color="primary"
            class="text-none font-weight-bold"
            @click="restoreDialog"
            >Востановить анкету</v-btn
          >
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'

export default {
  head: {
    title: 'Профиль'
  },
  name: 'ProfilePage',
  directives: {
    mask
  },
  async asyncData({ $axios }) {
    return await $axios
      .post('/user-params', {
        params: ['phone', 'userDetails', 'resource']
      })
      .then(response => {
        return {
          loginPhone: response.data.phone,
          userPhone: response.data.userDetails.display_phone,
          userEmail: response.data.userDetails.email,
          userName: response.data.userDetails.name,
          age: response.data.userDetails.age_range,
          resource_id: response.data.resource
            ? response.data.resource.id
            : null,
          trashed: response.data.resource
            ? response.data.resource.status === 7
            : false
        }
      })
      .catch(e => {})
  },
  data: () => ({
    tokens: {
      F: {
        pattern: /[\+\d]/
      },
      '#': { pattern: /\d/ }
    },
    age: null,
    email_rules: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Некоректный email'
    },
    valid: false
  }),
  computed: {
    ...mapState('user', ['name', 'phone', 'pin', 'roles', 'email', 'ageRange']),
    computedMask() {
      return {
        mask: this.phone
          ? this.phone[0] === '+'
            ? 'F# ### ### ## ##'
            : '#### ### ## ##'
          : 'F# ### ### ## ##',
        tokens: this.tokens,
        len: this.phone ? (this.phone[0] === '+' ? 16 : 14) : 16
      }
    }
  },
  methods: {
    ...mapActions('settings', ['setToolbar']),
    ...mapActions('user', ['setUserProperties']),
    ...mapActions('dialog', ['setDialogParams']),
    ...mapActions('resource', ['deleteRes']),
    saveChange() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.setUserProperties([
        {
          field: 'name',
          value: this.userName
        },
        {
          field: 'display_phone',
          value: this.userPhone.replace(/\s+/g, '')
        },
        {
          field: 'email',
          value: this.userEmail
        },
        {
          field: 'age_range',
          value: this.age
        }
      ])
      this.$root.$router.back()
    },
    deleting() {
      this.setDialogParams({
        visibility: true,
        title: 'Подтвердите действие',
        text: 'Вы уверены, что хотите удалить анкету?',
        confirm: true,
        okLabel: 'Да',
        cancelLabel: 'Нет',
        okAction: () => {
          this.setDialogParams({})
          this.deleteRes(this.resource_id)
        }
      })
    },
    restoreDialog() {
      this.setDialogParams({
        visibility: true,
        title: 'Подтвердите действие',
        text: 'Вы уверены, что хотите востановить  анкету?',
        confirm: true,
        okLabel: 'Да',
        cancelLabel: 'Нет',
        okAction: () => {
          this.setDialogParams({})
          this.restore()
        }
      })
    },
    restore() {
      this.$store.dispatch('settings/setOverlay', true)
      this.$axios
        .post('/restore-resources', {
          obj: [this.resource_id]
        })
        .then(response => {
          this.trashed = false
          this.setDialogParams({
            visibility: true,
            title: 'Успех!',
            text:
              'Ваша анкета востановлена и направлена на повторную проверку. В скором времени она появится на карте',
            confirm: false,
            okLabel: 'Ок'
          })
        })
        .catch(e => {
          this.setDialogParams({
            visibility: true,
            title: 'Ошибка',
            text: 'Не удалось востановить анкету. Повторите попытку позже',
            confirm: false,
            okLabel: 'Ок'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.loginPhone {
  .v-text-field__prefix {
    color: #ffffff !important;
  }
}
.margin-sides {
  margin-left: -12px;
  margin-right: -12px;
}
</style>
