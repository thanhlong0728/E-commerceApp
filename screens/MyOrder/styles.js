import {StyleSheet,Dimensions} from 'react-native'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    boxProductOrder:{
        flex:1,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 20,
        marginTop:20
    },
    imgOrder:{
        width : '100%',
        height : '100%',
        resizeMode:'contain'
    },
    boxImg:{
        width:100,
        height: 120,
        marginRight: 20 
    },
    productOrder:{
        flex:1,
        width:width,
        height:height/3,
        marginTop: 5,
        backgroundColor:'white',
        justifyContent:'center'
    },
    boxOrder:{
        flex:1,
        justifyContent:'space-between'
    },
    infoOrder:{
        flexDirection:'row'
    },
    textInfo:{
        fontSize: 16,
        fontWeight:'500',
        marginBottom: 2
    },
    textRed:{
        color:'red'
    },
    textGreen:{
        color:'green'
    },
    boxtext:{
        alignItems:'center',
        marginTop: 7
    },
    textHuy:{

    },
    textStatus:{
        fontSize: 16,
    },
    statusOrder:{
        backgroundColor:'#F5B455',
        width:width,
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 3,
    },
    boxHuy:{
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems:'center',
        marginTop:5,
        borderRadius: 3
    },
    textHuy:{
        color:'red',
        fontSize: 17,
        paddingVertical: 5
    }
})
export default styles