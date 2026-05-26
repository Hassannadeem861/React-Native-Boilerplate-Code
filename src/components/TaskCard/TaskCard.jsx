import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FONTS } from '../../utils/fonts';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const TaskCard = ({ task, showLogTask = false }) => {
        const navigation = useNavigation();

    return (
        <View style={styles.card}>
            {/* Row 1: RO + Amount */}
            <View style={styles.cardRow}>
                <Text style={styles.cardRo}>{task.ro}</Text>
                <Text style={styles.cardAmount}>{task.amount}</Text>
            </View>

            {/* Row 2: Description + optional Date */}
            <View style={styles.cardRow}>
                <Text style={styles.cardDesc}>{task.description}</Text>
                {task.date ? <Text style={styles.cardDate}>{task.date}</Text> : null}
            </View>

            {/* Row 3: optional Hours + Status badge */}
            {(task.hours || task.status) ? (
                <View style={[styles.cardRow, { marginTop: 6 }]}>
                    {task.hours ? <Text style={styles.cardHours}>{task.hours}</Text> : null}
                    {/* {task.status ? <StatusBadge status={task.status} /> : null} */}
                </View>
            ) : null}

            {/* Log Task Button — only when explicitly enabled */}
            {showLogTask && (
                <View style={styles.cardButtonWrap}>
                    <CustomButton title="Log Task" onPress={() => { navigation.navigate("log_new_task") }} />
                </View>
            )}
        </View>
    );
};

export default TaskCard;

const styles = StyleSheet.create({
    // Task card
    card: {
        backgroundColor: "#FAFAFA",
        borderRadius: 16,
        padding: 16,
        // shadowColor: '#E01F00',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.08,
        // shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    cardRo: {
        fontSize: 15,
        fontFamily: FONTS.display_bold,
        color: '#1a1a1a',
        fontWeight: '700',
    },
    cardAmount: {
        fontSize: 15,
        fontFamily: FONTS.display_bold,
        color: '#16a34a',
        fontWeight: '700',
    },
    cardDesc: {
        fontSize: 13,
        fontFamily: FONTS.display_regular,
        color: '#555',
    },
    cardDate: {
        fontSize: 12,
        fontFamily: FONTS.display_regular,
        color: '#888',
    },
    cardHours: {
        fontSize: 13,
        fontFamily: FONTS.display_medium,
        color: '#E01F00',
        fontWeight: '600',
    },
    cardButtonWrap: {
        marginTop: 14,
    },
})
