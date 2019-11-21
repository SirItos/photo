export const scrolling = {
  data: () => ({
    scrolled: true,
    max: 0
  }),
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.scrolled =
          this.$refs.scrolledArea.$el.clientHeight <
          this.$refs.scrolledArea.$el.scrollHeight
      }, 250)
      document
        .querySelector(this.target)
        .addEventListener('scroll', this.onScroll)
      this.setMaxHeight()
    })
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, true)
  },
  methods: {
    onScroll(e) {
      this.scrolled =
        Math.ceil(e.target.scrollHeight) >
        Math.ceil(e.target.scrollTop + e.target.clientHeight) + 20
    },
    setMaxHeight() {
      this.max =
        document.documentElement.clientHeight -
        48 -
        this.$refs.bottom.offsetHeight -
        13
    }
  }
}
