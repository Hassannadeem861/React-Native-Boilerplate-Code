import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import CustomHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const companyAvatar = require('../../assets/CommunityImages/user.png');
const locationPin = require('../../assets/EarningsImages/location.png');
const notificationIcon = require('../../assets/TaskImages/notification.png');
const resumeIcon = require('../../assets/TechnicianSettingImages/my_resume.png');

const ApplyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const job = route.params?.job || {};

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [phone, setPhone] = useState('+1 123 456 7890');

  const handleApply = () => {
    navigation.navigate('application_sent', { company: job.company || 'Central Body Works' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + vh(14) }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header row */}
          <View style={styles.headerRow}>
            <CustomHeader onBackPress={() => navigation.goBack()} />
            <TouchableOpacity style={styles.bellWrapper} activeOpacity={0.7}>
              <Image source={notificationIcon} style={styles.bellIcon} />
            </TouchableOpacity>
          </View>

          {/* Company card */}
          <View style={styles.companyCard}>
            <Image source={companyAvatar} style={styles.companyAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.companyName}>{job.company || 'Central Body Works'}</Text>
              <View style={styles.locationRow}>
                <Image source={locationPin} style={styles.pinIcon} />
                <Text style={styles.locationText}>123 Main Street, Toronto, ON M5V 2K1</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
            <View style={{ height: vh(1.5) }} />
            <CustomInput
              placeholder="johndoe@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <View style={{ height: vh(1.5) }} />
            <CustomInput
              placeholder="+1 123 456 7890"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <View style={{ height: vh(1.5) }} />

            {/* Resume row */}
            <View style={styles.resumeRow}>
              <Image source={resumeIcon} style={styles.resumeIcon} resizeMode="contain" />
              <Text style={styles.resumeLabel}>Resume</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Apply button */}
        <View style={[styles.applyBtnWrap, { paddingBottom: insets.bottom + vh(2) }]}>
          <CustomButtom title="Apply" onPress={handleApply} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: vw(5),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vh(1),
  },
  bellWrapper: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(11) / 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(3),
    marginTop: vh(2),
    marginBottom: vh(2.5),
  },
  companyAvatar: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(12) / 2,
  },
  companyName: {
    fontSize: vw(4),
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
    color: '#000',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(1),
    marginTop: 3,
  },
  pinIcon: {
    width: vw(3.5),
    height: vw(3.5),
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: vw(3),
    fontFamily: FONTS?.display_regular,
    color: '#888',
    flex: 1,
  },
  form: {
    gap: 0,
  },
  resumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F1',
    borderRadius: vw(3),
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
    gap: vw(2.5),
    borderWidth: 1,
    borderColor: '#FBDAD8',
  },
  resumeIcon: {
    width: vw(6),
    height: vw(6),
    tintColor: '#E01F00',
  },
  resumeLabel: {
    flex: 1,
    fontSize: vw(3.8),
    fontFamily: FONTS?.display_medium,
    color: '#E01F00',
  },
  changeLink: {
    fontSize: vw(3.5),
    fontFamily: FONTS?.display_regular,
    color: '#888',
  },
  applyBtnWrap: {
    paddingHorizontal: vw(5),
    paddingTop: vh(1),
    backgroundColor: colors.white,
  },
});
