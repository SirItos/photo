<template>
  <div class="primary--text">
    <div>Оценка свидания:</div>
    <div
      v-for="range in preparePriceArray"
      :key="range.id"
      class="font-weight-bold"
    >{{ priceRange(range) }}</div>
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
    preparePriceArray() {
      const first_iterration = this.price.sort(this.sortByMin)
      return this.mergePrice(first_iterration)
    }
  },
  methods: {
    priceRange(price) {
      if (!price.min_cost && !price.max_cost) {
        return 'Не указана'
      }
      if (price.min_cost === price.max_cost) {
        return `${price.min_cost} `
      }
      if (price.length < 2) {
        return `${price.min_cost} `
      }

      return this.startPrice(price) + this.decim(price) + this.endPrice(price)
    },
    startPrice(price) {
      const startStr = Number(price.max_cost) > 10000 ? 'от ' : ''
      return price.min_cost ? `${startStr} ${price.min_cost} ` : ''
    },
    endPrice(price) {
      if (Number(price.max_cost) > 10000) return ''
      const startStr = Number(!price.min_cost) ? 'до ' : ''
      return price.max_cost ? `${startStr}${price.max_cost} ` : ''
    },
    decim(price) {
      return price.min_cost && this.endPrice(price) ? '- ' : ''
    },
    sortByMin(a, b) {
      if (a.min_cost < b.min_cost) {
        return -1
      }
      if (a.min_cost > b.min_cost) {
        return 1
      }
      return 0
    },
    mergePrice(sortedArray) {
      let result = []
      sortedArray.forEach((item, index, array) => {
        let prevValue
        if (result.length) {
          prevValue = result[result.length - 1]
        }
        if (!prevValue) {
          result.push(item)
        } else {
          if (prevValue.max_cost === item.min_cost) {
            result[result.length - 1].max_cost = item.max_cost
          } else {
            result.push(item)
          }
        }
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped></style>
