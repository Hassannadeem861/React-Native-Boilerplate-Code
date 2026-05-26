import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import CustomHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const userAvatar = require('../../assets/CommunityImages/user.png');

const EMPLOYED_OPTIONS = ['Yes', 'No'];

const MarketplaceCreatePost = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [serviceAreas, setServiceAreas] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [employed, setEmployed] = useState('No');
  const [employedOpen, setEmployedOpen] = useState(false);

  const handlePost = () => {
    console.log({ title, description, services, serviceAreas, hourlyRate, employed });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + vh(16) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back */}
          <CustomHeader onBackPress={() => navigation.goBack()} />

          <Text style={styles.heading}>Create Post</Text>

          {/* Card */}
          <View style={styles.card}>
            {/* User row */}
            <View style={styles.userRow}>
              <Image source={userAvatar} style={styles.avatar} />
              <Text style={styles.userName}>John Doe</Text>
            </View>

            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <CustomInput
              placeholder="Looking for Painter Position"
              value={title}
              onChangeText={setTitle}
            />

            <View style={styles.gap} />

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <CustomInput
              placeholder="Short intro (experience, skills)"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.gap} />

            {/* Services */}
            <Text style={styles.label}>Services</Text>
            <CustomInput
              placeholder="Painting, Prep"
              value={services}
              onChangeText={setServices}
            />

            <View style={styles.gap} />

            {/* Service Areas */}
            <Text style={styles.label}>Service Areas</Text>
            <CustomInput
              placeholder="123 Main Street, Toronto, ON M5V 2K1"
              value={serviceAreas}
              onChangeText={setServiceAreas}
            />

            <View style={styles.gap} />

            {/* Hourly Rate */}
            <Text style={styles.label}>
              Hourly Rate <Text style={styles.labelHint}>(Expected)</Text>
            </Text>
            <CustomInput
              placeholder="$50/hr"
              value={hourlyRate}
              onChangeText={setHourlyRate}
              keyboardType="numeric"
            />

            <View style={styles.gap} />

            {/* Currently Employed dropdown */}
            <Text style={styles.label}>Currently Employed</Text>
            <View style={styles.dropdownAnchor}>
              <TouchableOpacity
                style={styles.dropdownRow}
                onPress={() => setEmployedOpen((prev) => !prev)}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValue}>{employed}</Text>
                <Text style={styles.chevron}>▾</Text>
              </TouchableOpacity>
              {employedOpen && (
                <View style={styles.dropdownList}>
                  {EMPLOYED_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={styles.dropdownOption}
                      onPress={() => { setEmployed(opt); setEmployedOpen(false); }}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.dropdownOptionText,
                        opt === employed && styles.dropdownOptionActive,
                      ]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Post button */}
        <View style={[styles.btnWrap, { paddingBottom: insets.bottom + vh(2) }]}>
          <CustomButtom title="Post" onPress={handlePost} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MarketplaceCreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: vw(4),
    paddingTop: vh(0.5),
  },
  heading: {
    fontSize: vw(6.5),
    fontFamily: FONTS?.display_bold,
    fontWeight: '800',
    color: '#000',
    marginTop: vh(0.5),
    marginBottom: vh(2),
  },
  card: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: vw(4),
    padding: vw(4),
    backgroundColor: '#fff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(3),
    marginBottom: vh(2.5),
  },
  avatar: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(11) / 2,
  },
  userName: {
    fontSize: vw(4.2),
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: vw(3.6),
    fontFamily: FONTS?.display_medium,
    fontWeight: '600',
    color: '#333',
    marginBottom: vh(0.8),
  },
  labelHint: {
    fontWeight: '400',
    color: '#888',
    fontFamily: FONTS?.display_regular,
  },
  gap: {
    height: vh(1.8),
  },
  // Dropdown
  dropdownAnchor: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: vw(3),
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.8),
    backgroundColor: '#FAFAFA',
  },
  dropdownValue: {
    fontSize: vw(3.8),
    fontFamily: FONTS?.display_regular,
    color: '#444',
  },
  chevron: {
    fontSize: vw(4),
    color: '#888',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: vw(3),
    marginTop: 4,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.8),
  },
  dropdownOptionText: {
    fontSize: vw(3.8),
    fontFamily: FONTS?.display_regular,
    color: '#444',
  },
  dropdownOptionActive: {
    color: '#E01F00',
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
  },
  btnWrap: {
    paddingHorizontal: vw(4),
    paddingTop: vh(1),
    backgroundColor: colors.white,
  },
});
