import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    eventButton:{
        flexDirection:'row',
        borderBottomColor: 'gray',
        height: 60,
        alignItems:'center',
        borderRadius : 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        padding : 10
    },
    icon:{
        marginRight: 10
    },
    textInfo:{
        fontSize:17
    }
})
export default styles