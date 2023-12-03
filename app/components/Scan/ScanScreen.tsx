import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, BackHandler, Image, Linking, StyleSheet, Text, TouchableOpacity, View, ActionSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
import ImagePicker from 'react-native-image-crop-picker'
import { useNavigation, useRoute } from '@react-navigation/core'
import RNQRGenerator from 'rn-qr-generator'
import RNProgressHud from 'progress-hud'
import Constant from '../../controller/Constant'

const HandleButtonImage = ({ title, icon, onPress }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Image source={icon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.textGallery}>{title}</Text>
        </View>
    )
}

const Scan = () => {
    const navigation = useNavigation<any>()
    const [isBarcodeRead, setIsBarcodeRead] = useState(false)
    const [flash, setFlash] = useState(false)

    const GeneratorQRCode = (uri) => {
        RNProgressHud.show()
        RNQRGenerator.detect({
            uri
        })
            .then((response: any) => {
                const { values } = response
                const dataValues = JSON.parse(values)
                if (dataValues.app == Constant.QRCodeType.app) {
                    navigation.navigate('ProductScreen', {
                        id: dataValues.id
                    })
                } else {
                    Alert.alert('Notification', 'Please check the QR code again!')
                }
            })
            .finally(() => RNProgressHud.dismiss())
    }

    const isJsonString = (str) => {
        try {
            JSON.parse(str)
        } catch (error) {
            return false
        }
        return true
    }

    const onBarcodeRead = (event) => {
        // if (!isBarcodeRead) {
        //     if (isJsonString(event.data)) {
        handleCheckType(JSON.parse(event.data))
        // }
        // setIsBarcodeRead(true)
        // }
    }
    // const onBarcodeRead = (event) => {
    //     if (!isScanning.current) {
    //         return
    //     }
    //     try {
    //         const data = JSON.parse(event?.data)
    //         if (data?.type != null) {
    //             handleCheckType(data)
    //             isScanning.current = false
    //             return
    //         }
    //     } catch (error) {}
    // }

    const onChangeFlashMode = () => {
        setFlash(!flash)
    }

    const handleCheckType = (data) => {
        if (data.app == Constant.QRCodeType.app) {
            navigation.navigate('ProductScreen', {
                id: data.id
            })
        } else {
            Alert.alert('Notification', 'Please check the QR code again!')
        }
    }

    const onShowGallery = () => {
        ImagePicker.openPicker({}).then((image) => {
            GeneratorQRCode(image.path)
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                style={styles.camera}
                autoFocus='on'
                captureAudio={false}
                flashMode={flash ? 'torch' : 'off'}
                androidCameraPermissionOptions={{
                    title: 'Grant camera access',
                    message: 'Please grant camera access to use this function!',
                    buttonPositive: 'Agree',
                    buttonNegative: 'Cancel'
                }}
                onBarCodeRead={onBarcodeRead}
            >
                <View style={styles.cameraView}>
                    <View style={styles.backView}>
                        <TouchableOpacity
                            style={{
                                ...styles.closeButton
                            }}
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <Image source={Constant.icons.left} style={{ marginLeft: 20 }} />
                            <Text style={styles.scanText}>SCAN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles.view} />
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <View style={styles.view} />
                            <View>
                                <Image style={styles.scanFrameImg} />
                            </View>
                            <View style={styles.view} />
                        </View>
                        <View style={styles.view} />
                    </View>
                    <View style={styles.viewBot} />
                    <View style={styles.viewIcon}>
                        <HandleButtonImage title='Gallery' icon={Constant.icons.gallery} onPress={onShowGallery} />
                        <HandleButtonImage title='Light' icon={Constant.icons.light} onPress={onChangeFlashMode} />
                        <HandleButtonImage title='Help' icon={Constant.icons.help1} onPress={null} />
                    </View>
                </View>
            </RNCamera>
        </View>
    )
}

export default Scan

const styles = StyleSheet.create({
    scanFrameImg: {
        width: 260,
        height: 260
    },
    closeButton: {
        paddingLeft: 12,
        paddingTop: 28,
        flexDirection: 'row',
        alignItems: 'center'
    },
    camera: {
        flex: 1
    },
    titleText: {
        fontSize: 16,
        color: Constant.COLORS.white,
        paddingTop: 10,
        backgroundColor: Constant.COLORS.backgScan,
        textAlign: 'center'
    },
    cameraView: {
        flex: 1,
        backgroundColor: Constant.COLORS.backgScan
    },
    backView: {
        backgroundColor: Constant.COLORS.backgScan
    },
    scanText: {
        fontSize: 30,
        color: Constant.COLORS.white,
        marginLeft: 12,
        includeFontPadding: false
    },
    viewIcon: {
        backgroundColor: Constant.COLORS.backgScan,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingBottom: 20
    },
    icon: {
        width: 48,
        height: 48
    },
    textGallery: {
        color: Constant.COLORS.white,
        textAlign: 'center',
        paddingTop: 10
    },
    view: {
        flex: 1,
        backgroundColor: Constant.COLORS.backgScan
    },
    viewBot: {
        backgroundColor: Constant.COLORS.backgScan,
        paddingBottom: 24
    }
})
