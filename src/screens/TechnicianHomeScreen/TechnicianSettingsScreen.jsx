import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CancelSubscriptionModal from '../../components/CancelSubscriptionModal/CancelSubscriptionModal.jsx';
import { useRole } from '../../utils/RoleContext.js';
import { ROLES } from '../../utils/helper.js';

// ── Assets ────────────────────────────────────────────────────────────────────
const dummyAvatar      = require('../../assets/TechnicianSettingImages/dummyPicture.png');
const accountIcon      = require('../../assets/TechnicianSettingImages/account.png');
const lockIcon         = require('../../assets/TechnicianSettingImages/lock.png');
const subscriptionIcon = require('../../assets/TechnicianSettingImages/Subscription.png');
const termsIcon        = require('../../assets/TechnicianSettingImages/Terms.png');
const privacyIcon      = require('../../assets/TechnicianSettingImages/Privacy.png');
const logoutIcon       = require('../../assets/TechnicianSettingImages/Logout.png');
const MyResume         = require('../../assets/TechnicianSettingImages/my_resume.png');
const MyPost           = require('../../assets/TechnicianSettingImages/post.png');
const arrowIcon        = require('../../assets/TechnicianSettingImages/greater_then.png');

// ── Menu Items ────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: '1', label: 'Personal Information', icon: accountIcon,      screen: 'personal_information' },
  { id: '2', label: 'Change Password',      icon: lockIcon,         screen: 'change_password' },
  { id: '4', label: 'My Resume',            icon: MyResume,         screen: 'my_resume' },
  { id: '5', label: 'My Post',              icon: MyPost,           screen: 'my_posts' },
  // { id: '6', label: 'Subscription',         icon: subscriptionIcon, isSubscription: true },
  { id: '7', label: 'Terms & Conditions',   icon: termsIcon,        screen: 'terms_conditions' },
  { id: '8', label: 'Privacy Policy',       icon: privacyIcon,      screen: 'privacy_policy' },
  { id: '9', label: 'Logout',               icon: logoutIcon,       isLogout: true },
];

// ── Main Screen ───────────────────────────────────────────────────────────────
const TechnicianSettingScreen = ({ navigation }) => {
  const { role } = useRole();
  const isTechnician = role === ROLES.TECHNICIAN;

  const menuItems = isTechnician
    ? MENU_ITEMS.filter((item) => item.id !== '4')
    : MENU_ITEMS;

  const [subscriptionExpanded, setSubscriptionExpanded] = useState(false);
  const [cancelModalVisible,   setCancelModalVisible]   = useState(false);
  // 'trial' = 30 Day Free Trial, 'paid' = any paid plan
  const [currentPlan, setCurrentPlan] = useState('trial');

  const profileName     = 'John Doe';
  const profileEmail    = 'johndoe@gmail.com';
  const profilePhotoUrl = null;
  const avatarSource    = profilePhotoUrl ? { uri: profilePhotoUrl } : dummyAvatar;

  const performLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'splash_screen' }] });
  };

  const handleCancelConfirm = () => {
    setCancelModalVisible(false);
    // API call lagao yahan cancel subscription ke liye
    Alert.alert('Cancelled', 'Your subscription has been cancelled.');
  };

  const handlePress = (item) => {
    if (item.isLogout) {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: performLogout },
      ]);
    } else if (item.isSubscription) {
      // Toggle subscription sub-menu
      setSubscriptionExpanded((prev) => !prev);
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Title ── */}
        <Text style={styles.title}>Settings</Text>

        {/* ── Profile Card ── */}
        <View style={styles.profileWrap}>
          <Image source={avatarSource} style={styles.avatar} />
          <Text style={styles.name}>{profileName}</Text>
          <Text style={styles.email}>{profileEmail}</Text>
        </View>

        {/* ── Banner ── */}
        <TouchableOpacity
          style={styles.banner}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('personal_information')}
        >
          <Text style={styles.bannerText}>Profile Page</Text>
        </TouchableOpacity>

        {/* ── Menu Items ── */}
        <View style={styles.menuWrap}>
          {menuItems.map((item, idx) => (
            <View key={item.id}>

              {/* ── Main Row ── */}
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.6}
                onPress={() => handlePress(item)}
              >
                <View style={styles.iconWrap}>
                  <Image source={item.icon} style={styles.menuIcon} />
                </View>
                <Text style={styles.rowLabel}>{item.label}</Text>
                {!item.isLogout && (
                  <Image
                    source={arrowIcon}
                    style={[
                      styles.menuIcon,
                      item.isSubscription && subscriptionExpanded && styles.arrowDown,
                    ]}
                  />
                )}
              </TouchableOpacity>

              {/* ── Subscription Sub-menu ── */}
              {item.isSubscription && subscriptionExpanded && (
                <View style={styles.subMenu}>

                  {/* Change Plan — only for paid plan */}
                  {currentPlan !== 'trial' && (
                    <TouchableOpacity
                      style={styles.subBtn}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSubscriptionExpanded(false);
                        navigation.navigate('choose_plan');
                      }}
                    >
                      <Text style={styles.subBtnText}>Change Plan</Text>
                    </TouchableOpacity>
                  )}

                  {/* Cancel Subscription — always visible */}
                  <TouchableOpacity
                    style={[styles.subBtn, styles.subBtnCancel]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSubscriptionExpanded(false);
                      setCancelModalVisible(true);
                    }}
                  >
                    <Text style={[styles.subBtnText, styles.subBtnCancelText]}>Cancel Subscription</Text>
                  </TouchableOpacity>

                </View>
              )}

              {idx < MENU_ITEMS.length - 1 && <View style={styles.separator} />}
            </View>
          ))}

          {/* Delete Account */}
          <CustomButton
            style={{ marginTop: 30 }}
            title="Delete Account"
            onPress={performLogout}
          />
        </View>

      </ScrollView>

      {/* ── Cancel Subscription Modal ── */}
      <CancelSubscriptionModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={handleCancelConfirm}
      />

    </SafeAreaView>
  );
};

export default TechnicianSettingScreen;

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 100 },

  title: {
    fontSize: 24,
    fontFamily: FONTS.display_bold,
    color: colors.black,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
  },

  // Profile
  profileWrap: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 110, height: 110, borderRadius: 18, backgroundColor: '#eee', marginBottom: 12 },
  name:   { fontSize: 20, fontFamily: FONTS.display_bold, color: colors.black, marginBottom: 2 },
  email:  { fontSize: 14, fontFamily: FONTS.display_regular, color: colors.description },

  // Banner
  banner: {
    backgroundColor: colors.primary[0],
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerText: { fontSize: 17, fontFamily: FONTS.display_bold, color: colors.white },

  // Menu
  menuWrap: { paddingHorizontal: 20, paddingTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  iconWrap: { width: 36, alignItems: 'center', marginRight: 14 },
  menuIcon: { width: 15, height: 15, resizeMode: 'contain', tintColor: colors.primary[0] },
  arrowDown: { transform: [{ rotate: '90deg' }] },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: FONTS.display_regular, color: colors.black },
  separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 50 },

  // Subscription Sub-menu
  subMenu: {
    flexDirection: 'row',
    gap: vw(3),
    paddingLeft: 50,
    paddingBottom: vh(1.5),
    paddingTop: vh(0.5),
  },
  subBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary[0],
    borderRadius: 10,
    paddingVertical: vh(1.2),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subBtnCancel: {
    backgroundColor: colors.primary[0],
  },
  subBtnText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_medium,
    color: colors.primary[0],
  },
  subBtnCancelText: {
    color: '#fff',
  },
});