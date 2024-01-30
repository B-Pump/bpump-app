import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants";
import styles from "./style/notif.style";

export default function Notif() {
    const [dailyRemindersEnabled, setDailyRemindersEnabled] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const [show, setShow] = useState(false);

    const onTimeChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    };

    useEffect(() => {
        if (dailyRemindersEnabled) {
            //
        } else {
            //
        }
    }, [dailyRemindersEnabled, date]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⌚​ Notifications</Text>
            <View style={styles.content}>
                <View style={styles.object(false, true, true, true)}>
                    <Text>Activer les rappels journaliers</Text>
                    <Switch
                        trackColor={{ false: COLORS.gray2, true: COLORS.gray }}
                        thumbColor={COLORS.white}
                        onValueChange={(value) => setDailyRemindersEnabled(value)}
                        value={dailyRemindersEnabled}
                    />
                </View>
                <View style={styles.object(true, false, false, false)}>
                    <Text>
                        Choisissez une heure où vous êtes fréquemment disponible. Nous vous enverrons une notification
                        afin de vous rappeler de faire votre entraînement.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
                        <Text style={styles.buttonText}>Sélectionner une heure</Text>
                    </TouchableOpacity>
                    {show && <DateTimePicker value={date} mode={"time"} is24Hour={true} onChange={onTimeChange} />}
                </View>
            </View>
        </View>
    );
}
