import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ToastAndroid, Linking, Alert } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import RNFS from 'react-native-fs'
import CameraRoll from '@react-native-community/cameraroll'
import Clipboard from '@react-native-clipboard/clipboard'
import RNProgressHud from 'progress-hud'
import Modal from 'react-native-modal'
import Util from '../../../controller/Util'
import Constant from '../../../controller/Constant'

//1. npm i react-native-svg react-native-qrcode-svg
//2. thêm android:name="android.permission.CAMERA", android:name="android.permission.READ_EXTERNAL_STORAGE", android:name="android.permission.WRITE_EXTERNAL_STORAGE" vào AndroidManifest.xml
//3. thêm android:requestLegacyExternalStorage="true" vào application
//4. thêm include ':@react-native-community_cameraroll'project(':@react-native-community_cameraroll').projectDir = new File(rootProject.projectDir, 	'../node_modules/@react-native-community/cameraroll/android') vào android/settings.gradle
//5 . npm i react-native-modal @react-native-community/cameraroll '@react-native-clipboard/clipboard
// 6. npm install --save fbjs

type Props = {
    value: any
    dataQR: string
    isModalVisible: boolean
    setModalVisible: (value: boolean) => void
}

const ImgQrCode = (props: Props) => {
    const { value, dataQR, isModalVisible, setModalVisible } = props
    const [productQRref, setProductQRref] = useState<any>()

    const downloadQRCode = async () => {
        if (Platform.OS === 'android' && !(await Util.hasAndroidPermission())) {
            Alert.alert('Notification', 'Please update your access rights')
            Linking.openSettings()
            return
        }

        if (productQRref) {
            productQRref.toDataURL((data) => {
                let filePath = RNFS.CachesDirectoryPath + `/${value}.png`
                RNFS.writeFile(filePath, data, 'base64')
                    .then((success) => {
                        return CameraRoll.save(filePath, 'photo' as never)
                    })
                    .then(() => {
                        ToastAndroid.show('Save QR Code successful', ToastAndroid.LONG)
                    })
            })
        }
    }

    const copyPhone = () => {
        Clipboard.setString(value)
        RNProgressHud.showSuccessWithStatus('Copy successful', null)
    }

    return (
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.boxText}>
                    <Text style={styles.textTittle}>QR Code</Text>
                </View>
                <QRCode
                    value={dataQR}
                    size={160}
                    getRef={(c) => setProductQRref(c)}
                    quietZone={10} // set nền trắng chữ đen khi lưu ảnh vào thư viện
                    style={styles.imgQrCode}
                />
                <TouchableOpacity onPress={downloadQRCode}>
                    <Image source={Constant.icons.download} style={{ marginVertical: 20 }} />
                </TouchableOpacity>
                <Text style={styles.textPhone}>{value}</Text>
                <TouchableOpacity onPress={copyPhone} style={styles.buttonCopy}>
                    <Text style={styles.textCopy}>Copy</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center'
    },
    imgQrCode: {
        color: 'white',
        backgroundColor: Constant.COLORS.black
    },
    boxText: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 5
    },
    textTittle: {
        fontSize: 21,
        color: Constant.COLORS.black
    },
    textPhone: {
        fontSize: 14,
        color: Constant.COLORS.black
    },
    buttonCopy: {
        backgroundColor: Constant.COLORS.button,
        borderRadius: 20,
        marginTop: 33,
        marginBottom: 26
    },
    textCopy: {
        fontSize: 14,
        color: Constant.COLORS.white,
        marginVertical: 9,
        marginHorizontal: 28
    }
})

export default ImgQrCode
