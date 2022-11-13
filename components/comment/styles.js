import { StyleSheet , Dimensions } from 'react-native';

import { COLORS } from '../../contains'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container : {
    marginBottom : 10
  },
  title : {
    fontWeight : 'bold',
    fontSize : 18,
    marginBottom : 10
  },
  conment : {
    flex: 1,
    height : 120,
    marginBottom : 5,
    borderTopWidth : 1,
    flexDirection : 'row',
    alignItems : 'center',
  },
  conment_avatar : {
    width : 80,
    height : 80,
    borderRadius : 50,
    marginRight : 30,
    flex: 0.25
  },
  conment_avatar_img : {
    width : '100%',
    height : '100%',
    borderRadius : 50
  },
  content : {
    justifyContent : 'space-around',
    flex: 0.65
  },
  name : {
    fontSize : 20,
    fontWeight : 'bold',
  },
  boxImg:{
    width: 50,
    height: 50,
    marginRight: 10
  },
  img:{
    width:'100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius:10,
  },
  input:{
    flex:1,
    borderWidth: 0.7,
    marginLeft: 10,
    width: width/1.4,
    height: 70,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  box:{
    flexDirection:'row'
  },
  textInput:{
    marginLeft: 5,
  },
  buttonComment: {
    flex: 1,
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  button:{
    flexDirection:'row',
    backgroundColor: COLORS.main,
    width: 120,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  textButtonComment:{
    color: 'white',
    fontSize: 16,
    marginLeft: 5
  },
  
  data:{
    fontSize: 17,
    marginTop: 10
  },
  textDayComment: {
    fontSize: 12,
    color:'green'
  },
  textNodata:{
    fontSize: 24
  },
  deleteComment:{
    flex: 0.1,
    height:'100%',
    marginTop: 30
  },
  textDelete:{
    color: 'red',
    fontSize: 18
  }
})

export default styles;