import firestore from '@react-native-firebase/firestore'
import RNProgressHud from 'progress-hud'

const commentModel = {
    addComment: async (
        uid,
        productId,
        photoURL,
        displayName,
        textComment,
        createdAt,
        productImg
    ) => {
        firestore()
            .collection('comment')
            .add(uid, productId, photoURL, displayName, textComment, createdAt, productImg)
            .then(() => {
                RNProgressHud.showSuccessWithStatus('Nhận xét thành công')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default commentModel
