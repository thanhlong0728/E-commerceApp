import { firebase, auth } from '../firebase'
import { ShowToast } from '../help/showToast';

const userModel = {
    changePass: async (oldPass, newPass, confirmPass) => {
        if (newPass !== confirmPass) {
            ShowToast('Nhập lại mật khẩu sai !!!')
        } else {
            var cred = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, oldPass);
            auth.currentUser.reauthenticateWithCredential(cred)
                .then(async () => {
                    try {
                        await auth.currentUser.updatePassword(newPass)
                        ShowToast('Thay đổi mật khẩu thành công')
                    } catch (error) {
                        ShowToast(error.message)
                    }
                })
                .catch((error) => {
                    ShowToast(error.message)
                })
        }
    },
    uploadImage: async ({ nameFull, blob, setPhoto, setLoading }) => {
        var metadata = {
            contentType: 'image/jpeg'
        };
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/' + nameFull).put(blob, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes)
                setLoading(progress)
            },
            (error) => {
                ShowToast(error.message)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    await auth.currentUser.updateProfile({
                        photoURL: downloadURL
                      }).then(()=>{
                        ShowToast('Cập nhật thành công!!!')
                        setPhoto(downloadURL)
                      }).catch((error) =>{
                        ShowToast(error.message)
                      })
                });
            }
        );

    }
}

export default userModel