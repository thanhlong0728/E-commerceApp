import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../contains'

const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.25,
        flexDirection: 'row'
    },
    boxAvatar: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 100
    },
    boxImg: {},
    avatar: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 100
    },
    info: {
        width: '100%',
        height: '100%',
        marginTop: 30,
        marginLeft: 20
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 16
    },
    body: {
        flex: 0.65
    },
    footter: {
        flex: 0.1
    },
    footterSubmit: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 5
    },
    textFootterSubmit: {
        color: 'white',
        marginLeft: 10,
        fontSize: 19
    },
    iconAvatar: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        padding: 3,
        backgroundColor: 'black'
    }
})

export default styles
