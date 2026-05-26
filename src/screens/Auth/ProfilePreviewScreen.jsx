import React from 'react';
import {
    StyleSheet, View, ScrollView,
    KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { vh, vw } from '../../utils/responsive';
import ModernTemplate from './templates/ModernTemplate.jsx';
import CreativeTemplate from './templates/CreativeTemplate.jsx';

const MOCK = {
    name: 'John Doe',
    email: 'johndoe12@gmail.com',
    phone: '+1 123 456 7890',
    services: ['Painting', 'Prep'],
    serviceLocations: ['123 Main Street, Toronto, ON M5V 2K1'],
    hourlyRate: '$50/hr',
    introduction:
        'Experienced automotive painter with 6+ years in collision repair and refinishing. Skilled in color matching and high-quality finishes.',
    jobs: [
        {
            company: 'Central Body Works',
            title: 'Automative Painter',
            experience: '10+ Years Experience',
            startDate: 'Jan 2024',
            endDate: 'Present',
            description:
                'Performed surface prep, sanding, masking, and full paint jobs. Specialized in clear coat finishing and color matching using BASF systems.',
            location: 'Dallas, TX',
        },
    ],
    educations: [
        {
            degree: 'Diploma in Automative Refinishing',
            school: 'Texas Technical Institute',
            fieldOfStudy: 'Auto Body & Paint',
            startDate: 'Jan 2022',
            endDate: 'Jan 2024',
        },
    ],
    skills: ['Painting', 'Prep', 'Body Repair'],
    certifications: 'Icar certificate',
};

// ─────────────────────────────────────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────────────────────────────────────
const ProfilePreviewScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const template = route.params?.template ?? 'modern';

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[styles.container, template === 'creative' && { paddingHorizontal: 0 }]}>

                        <View style={template === 'creative' ? { paddingHorizontal: vw(5) } : {}}>
                            <MainHeader onBackPress={() => navigation.goBack()} />
                        </View>

                        {template === 'modern'
                            ? <ModernTemplate profile={MOCK} />
                            : <CreativeTemplate profile={MOCK} />
                        }

                        {/* spacer so content clears the sticky footer */}
                        <View style={{ height: vh(10) }} />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <CustomButton
                        title="Continue"
                        // backgroundColor={PRIMARY}
                        onPress={() => {
                            navigation.navigate('upload_photos');
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ProfilePreviewScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { flexGrow: 1 },
    container: { paddingHorizontal: vw(5), paddingBottom: vh(2) },
    footer: {
        paddingHorizontal: vw(5),
        paddingBottom: Platform.OS === 'ios' ? vh(3) : vh(2),
        paddingTop: vh(1),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
});
