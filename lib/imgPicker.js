import ImagePicker from 'react-native-image-crop-picker';
import { Platform } from 'react-native';
import {userModel} from '../model'

const imgPicker = async (setPhoto, setLoading) =>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const uri = result.uri
        const response = await fetch(uri)   
        const blob = await response.blob()
                  
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let filename = uploadUri?.substring(uploadUri.lastIndexOf('/') + 1)

        //custom name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.')
        let nameFull = name + Date.now() + '.' + extension
        userModel.uploadImage({nameFull, blob,setPhoto, setLoading})
      }
}
export default imgPicker