import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { useNavigation } from '@react-navigation/native'


// const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
// console.log("rnBiometrics", rnBiometrics )

const FaceIDButton = () => {
    // const navigation = useNavigation()
    // const [biometryType, setBiometryType] = useState(null)

    // const handleFaceIDLogin = async () => {
    //     try {
    //         const { available, biometryType } = await rnBiometrics.isSensorAvailable()
    //         console.log("available: ", available)
    //         console.log("biometryType: ", biometryType)

    //         if (!available) {
    //             Alert.alert("Sorry", "Your device is not supported")
    //             return
    //         }

    //         const { success } = await rnBiometrics.simplePrompt({
    //             promptMessage: 'Login with Biometrics',
    //             cancelButtonText: 'Cancel',
    //         })
    //         console.log("success :", success)

    //         if (success) {
    //             navigation.navigate("bottom_tab")
    //         } 
    //         // else {
    //         //     Alert.alert("Failed", "Biometric not verified")
    //         // }
    //     } catch (error) {
    //         console.log("Biometric error:", error)
    //         Alert.alert("Error", "Biometric failed")
    //     }
    // }

    // useEffect(() => {
    //     // Check karo kaunsa type available hai
    //     rnBiometrics.isSensorAvailable()
    //         .then(({ biometryType }) => {
    //             console.log("Check bio metric data: ", biometryType)
    //             setBiometryType(biometryType)
    //             console.log("Check bio metric state data: ", biometryType)
    //         }).catch((error) => {
    //             console.log("error in biometric: ", error)
    //         })
    // }, [])

    return (
        // <TouchableOpacity activeOpacity={0.5} onPress={handleFaceIDLogin}>
        <TouchableOpacity activeOpacity={0.5} >
            <View style={styles.faceIdBox}>
                <Image style={styles.image} source={require('../../assets/face.png')} />
            </View>
            {/* <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "bold" }}>
                {biometryType === BiometryTypes.Biometrics
                    ? 'Enable Face ID'
                    : 'Enable Fingerprint'}
            </Text> */}
        </TouchableOpacity>
    )
}

export default FaceIDButton

const styles = StyleSheet.create({
    faceIdBox: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    image: {
        color: "black",
        width: 50,
        height: 50
    }
})