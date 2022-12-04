import { PermissionsAndroid, Alert, Platform } from 'react-native'
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
}
