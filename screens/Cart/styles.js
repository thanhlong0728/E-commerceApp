import { StyleSheet , Dimensions } from 'react-native';

import { COLORS } from '../../contains'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : COLORS.background,
        paddingTop : 10,
    },
    boxAddress:{
        backgroundColor: COLORS.main,
        flexDirection: 'row',
        width: width,
        alignItems:'center',
        height: 90,
        justifyContent:'space-between',
    },
    
    textAddress:{
        color: 'white',
        fontSize: 20,
        textAlign:'center'
    },
    contentAddress:{
        justifyContent:'center',
        width: width /1.3,
        alignItems:'center'
    },
    apply : {
        alignItems : 'center',
    },
    applyButton : {
        width:'90%',
        backgroundColor : COLORS.main,
        justifyContent : 'center',
        alignItems : 'center',
        paddingVertical : 20,
        borderRadius : 15,
        marginBottom : 10,
    },
    applyButtonText : {
        color : COLORS.white,
        fontSize : 20
    },
    viewPrice : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    sum : {
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        paddingHorizontal : 20,
        marginTop : 20,
        paddingBottom: 10
    },
    contentPrice:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    textEmpty:{
        fontSize: 20
    }
})

export default styles;