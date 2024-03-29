import { Camera, CameraView } from "expo-camera/next";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";

export default function Scan() {
    const mode = useLocalSearchParams();

    const { width, height } = Dimensions.get("window");
    const qrSize = Math.min(width, height) * 0.7 + 50;
    const styles = StyleSheet.create({
        frame: {
            position: "absolute",
            borderColor: "white",
            borderWidth: 4,
            borderRadius: 20,
            width: qrSize,
            height: qrSize,
            top: (height - qrSize) / 2,
            left: (width - qrSize) / 2,
        },
    });

    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, [setHasPermission]);

    const handleBarCodeScanned = ({ type, data }) => {
        router.back();

        if (mode.value === "bluetooth") {
            const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
            if (regex.test(data)) {
                // TODO: connexion via bluetooth

                Alert.alert("Scanneur", `${data}`);
            } else Alert.alert("Scanneur", "Ce code QR ne correspond pas à une adresse MAC");
        } else if (mode.value === "wifi") {
            const regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}$/;
            if (regex.test(data)) {
                // TODO: connexion via wifi

                Alert.alert("Scanneur", `${data}`);
            } else Alert.alert("Scanneur", "Ce code QR ne correspond pas à une adresse IP");
        }

        console.info(`QR code scanned : ${type} - ${data}`);
    };

    if (hasPermission === null) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <Text className="text-foreground">Demander la permission d'accès à la caméra</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <Text className="text-foreground">Aucun accès à la caméra</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 flex-col justify-center">
            <CameraView
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                style={StyleSheet.absoluteFillObject}
            />
            <View className="flex-1">
                <Text className="mx-20 mt-[50%] rounded-lg bg-[#00000094] p-2 text-center font-medium text-white">
                    Scannez le code QR de votre robot
                </Text>
                <View style={styles.frame} />
            </View>
        </View>
    );
}
