import { StyleSheet, Dimensions } from 'react-native';

import { COLORS } from '../../contains'

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop : 10,
        borderBottomColor: 'orange',
        borderWidth : 2,
        borderColor: 'white',
        width: width/1.1,
    },
    textInputLabel : {
        color : COLORS.title,
    },
    textInput: {
        marginBottom: 10,
        marginLeft: 20
    },
    iconShowPass : {
      position : 'absolute',
      right : 10,
      bottom : 10
    },
    icon:{
    }
})

export default styles;