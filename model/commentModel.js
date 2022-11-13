import { firebase, auth, db } from '../firebase'
import { ShowToast } from '../help/showToast';

const commentModel = {
    addComment: async (uid,productId, photoURL,displayName, textComment, createdAt,productImg) => {
        db.collection("comment").add({
            uid: uid,
            productId: productId,
            photoURL: photoURL,
            displayName: displayName,
            textComment: textComment,
            createdAt: createdAt,
            productImg: productImg
        })
        .then((docRef) => {
            ShowToast('Đã bình luận sản phẩm')
        })
        .catch((error) => {
            ShowToast('bình luận thất bại')
        })
    },
    getComment: async (productId,setDataComment) => {
        var comment = db.collection("comment")
        comment = comment.where('productId', '==', productId)
        comment = comment.orderBy('createdAt','desc')
        comment.onSnapshot((querySnapshot) => setDataComment(
            querySnapshot.docs.map(doc => ({
                uid: doc.data().uid,
                productId: doc.data().productId,
                photoURL: doc.data().photoURL,
                displayName: doc.data().displayName,
                textComment: doc.data().textComment,
                createdAt: doc.data().createdAt.toDate(),
                productImg: doc.data().productImg
            }))
        ))
        return comment
    },
    getAllComment: async (uid,setDataAllComment) => {
        var commentAll = db.collection("comment")
        commentAll = commentAll.where('uid', '==', uid)
        commentAll = commentAll.orderBy('createdAt','desc')
        commentAll.onSnapshot((querySnapshot) => setDataAllComment(
            querySnapshot.docs.map(doc => ({
                uid: doc.data().uid,
                productId: doc.data().productId,
                photoURL: doc.data().photoURL,
                displayName: doc.data().displayName,
                textComment: doc.data().textComment,
                createdAt: doc.data().createdAt.toDate(),
                productImg: doc.data().productImg
            }))
        ))
        return commentAll
    }
}

export default commentModel