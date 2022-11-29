import { Platform } from 'react-native'

export const formatPriceNumber = (value) => {
    const result = new Intl.NumberFormat('en', {}).format(parseInt(`${value}`)).replace(/\./g, ',')
    return result === 'NaN' ? null : result
}
export const SalePercent = (price, priceSale) => {
    let result = 100 - Math.floor((priceSale * 100) / price)
    return result + '%'
}
