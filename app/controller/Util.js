import { PermissionsAndroid, Alert, Platform } from 'react-native'
import Toast from 'react-native-root-toast'
import Constant from './Constant'

export default class Util {
    static async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

        const hasPermission = await PermissionsAndroid.check(permission)
        if (hasPermission) {
            return true
        }

        const status = await PermissionsAndroid.request(permission)
        return status === 'granted'
    }

    static FormatPrice = (yourNumber) => {
        return yourNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    static formatPriceNumber = (value) => {
        const result = new Intl.NumberFormat('en', {})
            .format(parseInt(`${value}`))
            .replace(/\./g, ',')
        return result === 'NaN' ? null : result
    }
    static SalePercent = (price, priceSale) => {
        let result = 100 - Math.floor((priceSale * 100) / price)
        return result + '%'
    }
    staticShowToast(message) {
        return Toast.show(message, {
            position: 50,
            shadow: true,
            animation: true,
            delay: 0,
            backgroundColor: Constant.COLORS.main
        })
    }
}
