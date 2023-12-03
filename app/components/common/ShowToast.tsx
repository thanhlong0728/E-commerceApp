import Toast from 'react-native-root-toast'
import Constant from '../../controller/Constant'

export function ShowToast(message: string) {
    return Toast.show(message, {
        position: 50,
        shadow: true,
        animation: true,
        delay: 0,
        backgroundColor: Constant.COLORS.main
    })
}
