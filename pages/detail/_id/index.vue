<template>
  <v-row no-gutters class="flex-column fill-height">
    <g-detail-slider />
    <div class="detail_title" ref="title">
      <v-row no-gutters class="px-3">
        <v-col class="headline">Название</v-col>
        <div>
          <v-btn text icon @click="like=!like">
            <v-icon
              :class="{'primary--text':like}"
            >{{like ? 'mdi-cards-heart' :'mdi-heart-outline'}}</v-icon>
          </v-btn>
        </div>
      </v-row>
    </div>
    <v-content
      id="scroll-target-detail"
      ref="scrolledArea"
      :style="{
        'max-height':max+'px',
        'position':'relative'
      }"
      class="overflow-y-auto py-0 px-3"
    >
      <v-row no-gutters>
        <v-col>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, laboriosam illum doloremque exercitationem at error officia autem a commodi, vitae vel tempora quibusdam consequatur odio modi quisquam dolorem pariatur amet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, neque fuga suscipit aspernatur rerum beatae quae illo voluptate, eveniet animi optio rem enim dolorum quia iusto quisquam, sequi nostrum amet?
        </v-col>
      </v-row>
      <v-scale-transition>
        <div v-if="scrolled" class="arrow-down">
          <v-icon size="2em" class="d4">mdi-arrow-down</v-icon>
        </div>
      </v-scale-transition>
    </v-content>
    <div>
      <v-row no-gutters class="px-3 py-4">
        <v-col class="px-2">
          <v-btn block large color="secondary" to="/" nuxt>
            <span class="primary--text">Отмена</span>
          </v-btn>
        </v-col>
        <v-col class="px-2">
          <v-btn block large color="primary">
            <span class="white--text">Позвонить</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import { scrolling } from '~/mixins'
export default {
  name: 'DetailPage',
  components: {
    'g-detail-slider': () => import('~/components/DetailSlider')
  },
  props: {
    id: {
      type: [String, Number],
      default: 0
    }
  },
  mixins: [scrolling],
  data: () => ({
    like: false,
    target: '#scroll-target-detail'
  }),
  // mounted() {
  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //       this.scrolled =
  //         this.$refs.scrolled.$el.clientHeight <
  //         this.$refs.scrolled.$el.scrollHeight
  //     }, 250)
  //     document
  //       .querySelector(this.target)
  //       .addEventListener('scroll', this.onScroll)
  //     this.setMaxHeight()
  //   })
  // },
  methods: {
    // onScroll(e) {
    //   this.scrolled =
    //     Math.ceil(e.target.scrollHeight) >
    //     Math.ceil(e.target.scrollTop + e.target.clientHeight) + 20
    // },
    setMaxHeight() {
      this.max =
        document.documentElement.clientHeight -
        56 -
        328 -
        this.$refs.title.offsetHeight -
        76
    }
  }
}
</script>

<style lang="scss" scoped>
.sider-container {
  height: 328px;
  padding-bottom: 28px;
  width: 100%;
}
.arrow-down {
  position: fixed;
  bottom: 96px;
  right: 6px;
}
.d4 {
  color: #d4d4d4;
}
</style>