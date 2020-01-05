const cost_range = ['0', '3000', '6000', '10000', '']

export const rangeHelper = value => {
  if (value > 10000) return 4
  return cost_range.indexOf(value.toString())
}
