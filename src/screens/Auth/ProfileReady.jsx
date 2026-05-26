import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const PRIMARY = '#E01F00';

// Badge with green checkmark
const BadgeIcon = () => (
    <View style={styles.badgeContainer}>
        <View style={styles.badge}>
            <Text style={styles.badgeCheck}>✓</Text>
        </View>
    </View>
);

const ProfileReady = ({ route }) => {
    const navigation = useNavigation();
    const { userType } = route?.params || {};

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
                <BadgeIcon />

<CustomHeading
                    heading="Your Profile is Ready"
                    paragraph="Your digital profile has been created. You can now start logging your work."
                    center={true}
                    containerStyle={{ marginBottom: vh(3) }}
                />

                {/* Resume download row */}
                <TouchableOpacity style={styles.resumeRow} activeOpacity={0.8}>
                    <View style={styles.resumeLeft}>
                        <View style={styles.pdfBadge}>
                            <Text style={styles.pdfText}>PDF</Text>
                        </View>
                        <Text style={styles.resumeLabel}>Resume</Text>
                    </View>
                    <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.7}>
                        <Text style={styles.downloadIcon}>⬇</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <CustomButton
                    title="Go to Dashboard"
                    onPress={() => navigation.navigate('choose_plan', { userType })}
                />
            </View>
        </SafeAreaView>
    );
};

export default ProfileReady;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: vw(7),
    },
    badgeContainer: {
        marginBottom: vh(3.5),
    },
    badge: {
        width: vw(22),
        height: vw(22),
        borderRadius: vw(11),
        backgroundColor: '#22A547',
        justifyContent: 'center',
        alignItems: 'center',
        // star / seal shape via shadow overlay
        shadowColor: '#22A547',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    badgeCheck: {
        fontSize: fs(32),
        color: '#fff',
        fontWeight: '700',
        lineHeight: fs(38),
    },
    resumeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#FFF5F4',
        borderRadius: 12,
        paddingHorizontal: vw(4),
        paddingVertical: vh(1.8),
    },
    resumeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    pdfBadge: {
        backgroundColor: PRIMARY,
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 3,
    },
    pdfText: {
        fontSize: fs(10),
        fontFamily: FONTS.display_bold,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    resumeLabel: {
        fontSize: fs(15),
        fontFamily: FONTS.display_bold,
        fontWeight: '600',
        color: '#111',
    },
    downloadBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFE8E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadIcon: {
        fontSize: fs(16),
        color: PRIMARY,
    },
    footer: {
        paddingHorizontal: vw(5),
        paddingBottom: vh(4),
        paddingTop: vh(1),
        backgroundColor: '#fff',
    },
});
