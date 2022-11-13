import { StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../contains'


const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop: 10
    },
    myComment:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5
    },
    boxImg:{
        width: 80,
        height: 80,
        flex: 0.2,
        justifyContent:'center'
    },
    img:{
        width:'80%',
        height: '75%',
        resizeMode: 'contain',
        borderRadius: 40

    },
    boxImgProduct:{
        width: 80,
        height: 80,
        flex:0.2
    },
    imgProduct:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    content:{
        flex: 0.6,
        justifyContent:'center',
        marginLeft: 10,
        marginRight:10,
    },
    nameAndDate:{
        flexDirection:'row',
    },
    nameUser:{
    },
    date:{
        width: '40%',
        alignItems:'flex-end',

    },
    textDay:{
        color:'gray'
    },
    textUser:{
        fontSize: 18,
    }
    
})

export default styles;