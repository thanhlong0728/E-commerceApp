import firestore from '@react-native-firebase/firestore'

export const getProfileUser = async (uid) => {
    try {
        const response = firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                } else {
                    return null
                }
            })
        return Promise.resolve(response)
    } catch (error) {
        return Promise.reject(error)
    }
}
