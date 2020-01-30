const cost_range = [
  '1000',
  '2000',
  '3000',
  '4000',
  '5000',
  '6000',
  '7000',
  '8000',
  '9000',
  '10000',
  '999999999'
]

export const rangeHelper = value => {
  if (value > 10000) return 10
  return cost_range.indexOf(value.toString())
}
