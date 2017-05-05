import numeral from 'numeral'

export const formatDecimals = (a) => parseFloat(a).toFixed(2)

export const formatMonetaryValue = (a) => `£${numeral(a).format('£ 0,0[.]00')}`
