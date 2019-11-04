<template>
  <v-filters></v-filters>
</template>

<script>
import filters from '@/components/FilterComponent'
export default {
  name: 'filters',
  head: {
    title: 'Фильтр'
  },
  components: {
    'v-filters': filters
  }
}
</script>

<style lang="scss" scoped>
</style>