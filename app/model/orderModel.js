import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import RNProgressHud from 'progress-hud'

const orderModel = {
    addOrder: async (params) => {
        RNProgressHud.show()
        const { uid, cartID, phone, address, createdAt, total, cartItems } = params
        firestore()
            .collection('order')
            .add({
                uid: uid,
                cartID: cartID,
                phone: phone,
                address: address,
                createdAt: createdAt,
                total: total,
                cartItems: cartItems,
                status: 'confirmed'
            })
            .then(() => {
                RNProgressHud.showSuccessWithStatus('Đặt hàng thành công')
            })
            .catch((error) => {
                console.log(error)
                setTimeout(() => {
                    RNProgressHud.dismiss()
                }, 1500)
            })
            .finally(() => {
                setTimeout(() => {
                    RNProgressHud.dismiss()
                }, 1500)
            })
    }
}

export default orderModel
