import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export default class StorageManager {
    static setData = async (key: any, value: any) => {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            Alert.alert(error)
        }
    }

    static getData = async (key) => {
        try {
            let data = await AsyncStorage.getItem(key)
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }
}
