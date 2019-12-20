<template>
  <v-row no-gutters class="flex-column fill-height">
    <div class="d-flex justify-end pt-3">
      <v-btn text color="primary" class="text-none caption">Switch to English</v-btn>
    </div>
    <v-col class="pt-3 d-flex flex-column">
      <v-content
        id="scroll-target"
        ref="scrolledArea"
        :style="{
        'max-height':max+'px',
        'position':'relative'
      }"
        class="overflow-y-auto px-5"
      >
        <v-row no-gutters>
          <v-col>
            <h4>Условия пользования сервисом</h4>
            <div class="mt-3">
              <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>3. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>4. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.two traumatic incidents early in her life.</p>
              <p>5. The other was her contraction of polio at age seven which left her with a weakened right leg and a permanent limp.[</p>
              <p>6. It formed me, guided me, instructed me, helped me and humiliated me," Lange once said of her altered gait. "I've never gotten over it, and I am aware of the force and power of it."[3]</p>
            </div>
          </v-col>
        </v-row>
        <v-scale-transition>
          <div v-if="scrolled" class="arrow-down">
            <v-icon size="2em" class="d4">mdi-arrow-down</v-icon>
          </div>
        </v-scale-transition>
      </v-content>
    </v-col>
    <div
      ref="bottom"
      class="px-4 pt-5 pb-3"
      style="box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <div class="d-flex justify-center">
        <v-btn
          nuxt
          :to="confirm ? '/registrate/confirm': '/'"
          depressed
          color="primary"
          class="text-none"
          min-width="250"
        >Продолжить</v-btn>
      </div>
      <div class="pt-5 caption black--text" style="line-height:15px">
        Нажимая кнопку “Продолжить” вы подтверждаете, что вы старше 18 лет и соглашаетесь с
        <a
          href
          class="black--text"
        >Полными&nbsp;условиями использованиями сервиса</a>
      </div>
    </div>
  </v-row>
</template>

<script>
import { scrolling } from '~/mixins'

export default {
  head: {
    title: 'Пользовательское соглашение'
  },
  name: 'TermsPage',
  mixins: [scrolling],
  data: () => ({
    target: '#scroll-target',
    confirm: false
  }),
  mounted() {
    this.confirm = this.$route.query.confirm || false
  }
}
</script>

<style lang="scss" scoped>
.arrow-down {
  position: fixed;
  bottom: 160px;
  right: 6px;
}
.d4 {
  color: #d4d4d4;
}
</style>