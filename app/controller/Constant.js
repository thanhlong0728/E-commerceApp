import { Dimensions } from 'react-native'

export default  {
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    icons: {
        scan: require('../assets/images/ic_scan.png'),
        left: require('../assets/images/ic_left.png'),
        gallery: require('../assets/images/ic_gallery1.png'),
        light: require('../assets/images/ic_light1.png'),
        help1: require('../assets/images/ic_help1.png'),
        qrcode: require('../assets/images/img_qrcode.png'),
        download: require('../assets/images/ic_download.png')
    },
    COLORS: {
        gray: '#868686',
        white: '#fff',
        black: '#000',
        border: '#CCCCE3',
        button: '#00CEFF',
        buttonHome: '#7879E8',
        backgScan: 'rgba(0, 0, 0, 0.2)',
        backgroundHome: '#F7F7F7',
        second: '#FFFFFF',
        title: '#0288D1',
        text: '#000000',
        black: '#000000',
        tabBar: '#F5F9FA',
        icon: '#949494',
        main: '#EF6A62',
        background: '#FFFFFF',
        inputSearch: '#E1E1E1',
        primary: '#CB6D80',
        red: 'red',
        white: 'white',
        pink: '#CB6D80',
        button: '#48B6DB'
    },
    IMAGES: {
        avatar: require('../assets/images/open.jpg'),
        sale: require('../assets/images/km.png'),
        nodata: require('../assets/images/nodata.png')
    },
    keys: {
        currentUser: 'currentUser'
    },
    allCategory: {
        id: 0,
        parent_name: 'All'
    },
    QRCodeType: {
        app: 'Spray',
        phone: 0,
        wallet: 1
    },
    tokenError: new Error('AccessToken does not exist!')
}
