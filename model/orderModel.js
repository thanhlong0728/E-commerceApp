import { firebase, auth, db } from '../firebase'
import { ShowToast } from '../help/showToast';

const orderModel = {
    addOrder: async (params) => {
        const {uid,cartID, phone, address, createdAt, total, cartItems} = params
        db.collection("order").add({
            uid: uid,
            cartID:cartID,
            phone: phone,
            address: address,
            createdAt: createdAt,
            total: total,
            cartItems: cartItems,
            status: 'confirmed'
        })
        .then((docRef) => {
            ShowToast('Đã mua')
        })
        .catch((error) => {
            ShowToast('Đặt hàng thất bại')
        })
    
    },
    getOrder: async (uid,setDataOrder) => {
        var productOrder = db.collection("order")
        productOrder = productOrder.where('uid', '==', uid)
        productOrder = productOrder.orderBy('createdAt','desc')
        productOrder.onSnapshot((querySnapshot) => setDataOrder(
            querySnapshot.docs.map(doc => ({
                uid: doc.data().uid,
                cartID: doc.data().cartID,
                id: doc.data().id,
                phone: doc.data().phone,
                address: doc.data().address,
                createdAt: doc.data().createdAt.toDate(),
                total: doc.data().total,
                cartItems: doc.data().cartItems,
                status : doc.data().status
            }))
        ))
        return productOrder
    },
    
}

export default orderModel