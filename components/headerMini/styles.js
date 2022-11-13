import { StyleSheet,Dimensions } from 'react-native';
import { COLORS } from '../../contains';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
    container : {
        width : width,
        height : height/10,
        backgroundColor: COLORS.pink
    },
    top : {
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    bottom:{
        marginLeft: 20,
    },
    textHeader:{
        fontSize: 22,
        color: 'white'
    },
    icon:{
        marginLeft: 10
    }
    
   
})

export default styles;