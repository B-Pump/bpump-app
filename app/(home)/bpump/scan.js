import { Camera, CameraView } from "expo-camera/next";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";

import styles from "../../../style/scan";

export default function Scan() {
    const { width, height } = Dimensions.get("window");
    const qrSize = Math.min(width, height) * 0.7 + 50;

    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        router.back();
        console.log(`QR Code scanné : ${type} - ${data}`);
        Alert.alert("Scanneur", `${data}`);
    };

    if (hasPermission === null) {
        return <Text style={styles.permissonProblem}>Demander la permission d'accès à la caméra</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.permissonProblem}>Aucun accès à la caméra</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{ barCodeTypes: ["qr"] }}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlayContainer}>
                <Text style={styles.overlayText}>Scannez le code QR de votre robot</Text>
                <View style={styles.frame(height, width, qrSize)} />
            </View>
        </View>
    );
}
