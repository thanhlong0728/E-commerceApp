import { StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../contains'


const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : 25,
        paddingVertical : 20
    },
   
    formInput : {
        marginBottom : 20
    },
    footterSubmit:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: COLORS.main,
        alignItems:'center',
        justifyContent:'center',
        padding: 15,
        borderRadius: 5,
        marginTop:300
    },
    textFootterSubmit:{
        color: 'white',
        fontSize: 20
    }
})

export default styles;