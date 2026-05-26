import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';

const ICON_CROSS = require('../../assets/TaskImages/cross.png');
const ICON_EMAIL = require('../../assets/TaskImages/mail.png');
const ICON_CLOCK = require('../../assets/TaskImages/clock.png');


// ── Pending Badge ──────────────────────────────────────────────────────────────
const PendingBadge = () => (
  <View style={styles.pendingBadge}>
    <View style={styles.pendingDot} />
    <Text style={styles.pendingText}>Pending</Text>
  </View>
);

// ── Task Summary Card ──────────────────────────────────────────────────────────
const TaskSummaryCard = ({ ro, description, hours, amount }) => (
  <View style={styles.summaryCard}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryRo}>{ro || 'RO #8829'}</Text>
      <PendingBadge />
    </View>
    <Text style={styles.summaryDesc}>{description || 'Painting - Clear Coat'}</Text>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryHours}>{hours || '1.5 hrs'}</Text>
      <Text style={styles.summaryAmount}>{amount || '$75.00'}</Text>
    </View>
  </View>
);

// ── Send Email Modal ───────────────────────────────────────────────────────────
const SendEmailModal = ({ visible, onClose, onSend }) => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.emailOverlay}>
        <View style={styles.emailBox}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.emailCloseBtn}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.emailCloseCircle}>
              <Image source={ICON_CROSS} style={styles.emailCrossIcon} />
            </View>
          </TouchableOpacity>

          {/* Email Input */}
          <View style={styles.emailInputWrap}>
            <CustomInput
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              islabelshown={false}
              image={ICON_EMAIL}
            />
          </View>

          {/* Send Button */}
          <CustomButton
            title="Send"
            onPress={() => {
              navigation.navigate('log_approved');
              onSend(email);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

// ── Main Screen ────────────────────────────────────────────────────────────────
const LogSubmittedScreen = ({ route }) => {
  const navigation = useNavigation();
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  // Task data passed from LogNewTaskScreen (or mock data)
  const taskData = route?.params?.taskData || {
    roNumber: 'RO #8829',
    taskName: 'Painting - Clear Coat',
    hours: '1.5 hrs',
    amount: '$75.00',
  };

  const handleSendEmail = (email) => {
    console.log('Sending to:', email);
    // API call here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainContainer}>

          {/* ── Clock Icon ── */}
          {/* <ClockIcon /> */}
          <Image source={ICON_CLOCK} style={styles.clockIcon} />

          {/* ── Title ── */}
          <Text style={styles.title}>Log Submitted</Text>

          {/* ── Task Summary Card ── */}
          <TaskSummaryCard
            ro={taskData.roNumber || 'RO #8829'}
            description={taskData.taskName || 'Painting - Clear Coat'}
            hours={taskData.hours || '1.5 hrs'}
            amount={taskData.amount || '$75.00'}
          />

          {/* ── Info Text ── */}
          <Text style={styles.infoText}>
            This amount will be added to your daily commission once{'\n'}
            approved by the manager.
          </Text>

          {/* ── Buttons ── */}
          <View style={styles.buttonsContainer}>
            <CustomButton
              title="Send via Email"
              onPress={() => setEmailModalVisible(true)}
              style={styles.primaryBtn}
            />

            <View style={styles.btnSpacing} />

            <CustomButton
              title="Back to Dashboard"
              onPress={() => navigation.navigate('technician_home_screen')}
              style={styles.primaryBtn}
            />

            <View style={styles.btnSpacing} />

            {/* Edit — outline button */}
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* ── Email Modal ── */}
      <SendEmailModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        onSend={handleSendEmail}
      />
    </SafeAreaView>
  );
};

export default LogSubmittedScreen;

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: vw(5),
    paddingTop: vh(5),
    paddingBottom: vh(5),
    alignItems: 'center',
  },

  // Title
  title: {
    fontSize: fs(24),
    fontFamily: FONTS.display_bold,
    fontWeight: '800',
    color: '#111',
    marginBottom: vh(2.5),
    textAlign: 'center',
  },

  // Summary card
  summaryCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: vw(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: vh(2),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryRo: {
    fontSize: fs(15),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: '#111',
  },
  summaryDesc: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
    marginBottom: 8,
  },
  summaryHours: {
    fontSize: fs(13),
    fontFamily: FONTS.display_medium,
    color: '#E01F00',
    fontWeight: '600',
  },
  summaryAmount: {
    fontSize: fs(15),
    fontFamily: FONTS.display_bold,
    color: '#16a34a',
    fontWeight: '700',
  },

  // Pending badge
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  pendingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#F59E0B',
  },
  pendingText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_medium,
    color: '#B45309',
    fontWeight: '600',
  },

  // Info text
  infoText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: fs(20),
    marginBottom: vh(3),
    paddingHorizontal: vw(2),
  },

  // Action buttons
  buttonsContainer: {
    width: '100%',
  },
  primaryBtn: {
    width: '100%',
  },
  btnSpacing: {
    height: vh(1.5),
  },
  editBtn: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  editBtnText: {
    fontSize: fs(15),
    fontFamily: FONTS.display_medium,
    color: '#333',
    fontWeight: '600',
  },

  // ── Email Modal ──
  emailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  emailBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: vw(5),
    paddingTop: vh(5),
    paddingBottom: vh(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  emailCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  emailCloseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emailCrossIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  emailInputWrap: {
    marginBottom: vh(2),
    marginTop: vh(1),
  },
  clockIcon: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: vh(2),
  },
});