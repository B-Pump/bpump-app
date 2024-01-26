import { useState, useEffect } from "react";
import { Text, View, Alert, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { router } from "expo-router";

import { COLORS, FONT } from "../../../constants";
import styles from "../../../style/scan";

export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const { width, height } = Dimensions.get("window");
    const qrSize = Math.min(width, height) * 0.7;

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(`QR Code scanné : ${type} - ${data}`);
        Alert.alert("Scanneur", `${data}`);
        router.back();
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
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{ barCodeTypes: ["qr"] }}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlayContainer}>
                <Text style={styles.overlayText}>Scannez le code QR de votre robot</Text>
                <View style={styles.frame(height, width, qrSize + 50)} />
            </View>
        </View>
    );
}
