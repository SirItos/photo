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

const selectOptions = [
  { id: 1, min: 1000, max: 3000 },
  { id: 2, min: 3000, max: 6000 },
  { id: 3, min: 6000, max: 10000 },
  { id: 4, min: 10000, max: 20000 },
  { id: 5, min: 20000, max: 999999999 }
]

export const rangeHelper = value => {
  return selectOptions.find(price_item => {
    return price_item.id === value
  })
}

export const rangeHelperSelect = values => {
  debugger
  let result = []
  values.forEach(value => {
    result.push(
      selectOptions.find(item => {
        return item.min === value.min_cost
      })
    )
  })

  return result
}
