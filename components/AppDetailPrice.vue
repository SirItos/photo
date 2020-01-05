<template>
  <div class="primary--text">
    <div>Стоимость услуг</div>
    <div class="font-weight-bold">{{priceRange}}</div>
  </div>
</template>

<script>
const priceArray = []

export default {
  name: 'AppDetailPrice',
  props: {
    price: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    priceRange() {
      if (this.price.length < 2) {
        return this.price[0] + 'руб.'
      }
      return this.startPrice + this.decim + this.endPrice + 'руб.'
    },
    startPrice() {
      return this.price[0] ? `${this.price[0]} ` : ''
    },
    endPrice() {
      if (Number(this.price[1]) > 10000) return ''
      return this.price[1] ? `${this.price[1]} ` : ''
    },
    decim() {
      return this.price[0] && this.endPrice ? '-' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>