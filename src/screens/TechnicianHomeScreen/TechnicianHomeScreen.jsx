import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

// ── Assets ─────────────────────────────────────────────────────────────────────
const notificationIcon = require('../../assets/TaskImages/notification.png');
const Clock = require('../../assets/EarningsImages/clock.png');
const DollerCircle = require('../../assets/EarningsImages/dollar-circle.png');
const LanguageCircle = require('../../assets/EarningsImages/language-circle.png');
const location = require('../../assets/EarningsImages/location.png');
const DUMMY_AVATAR = require('../../assets/TechnicianSettingImages/dummyPicture.png');

// ── Mock Data ──────────────────────────────────────────────────────────────────
const PENDING_TASKS = [
  { id: '1', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: 'April 15, 2026', hours: '1.5 hrs', status: 'In Progress' },
  { id: '2', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: 'April 15, 2026', hours: '1.5 hrs', status: 'Completed' },
  { id: '3', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: 'April 15, 2026', hours: '1.5 hrs', status: 'Approved' },
  { id: '4', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: 'April 15, 2026', hours: '1.5 hrs', status: 'Pending' },
];

const chartData = [
  { value: 250, label: 'Mon', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 420, label: 'Tue', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 500, label: 'Wed', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 380, label: 'Thu', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 320, label: 'Fri', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 200, label: 'Sat', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 80, label: 'Sun', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
];

const DATE_OPTIONS = ['All', 'Today', 'This Week', 'This Month'];
const STATUS_OPTIONS = ['All Status', 'In Progress', 'Completed', 'Approved', 'Pending'];
const WEEK_OPTIONS = [
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
];
// ── Main Screen ────────────────────────────────────────────────────────────────
const TechnicianHomeScreen = () => {
  const navigation = useNavigation();

  const [filterOpen, setFilterOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [weekDropdownOpen, setWeekDropdownOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Filter by Week');
  
  const profileName = 'John';
  const profilePhotoUrl = null;
  const avatarSource = profilePhotoUrl ? { uri: profilePhotoUrl } : DUMMY_AVATAR;

  // Close the other dropdown when one opens
  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
    setStatusOpen(false);
    setWeekDropdownOpen(false);
  };
  const toggleStatus = () => {
    setStatusOpen((prev) => !prev);
    setFilterOpen(false);
    setWeekDropdownOpen(false);
  };
  const toggleWeekDropdown = () => {
    setWeekDropdownOpen((prev) => !prev);
    setFilterOpen(false);
    setStatusOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContainer}>

          {/* ── Header Section ──────────────────────────────────────────── */}
          <View style={styles.headerSection}>
            {/* Welcome + Icons */}
            <View style={styles.headerTop}>
              <View style={styles.welcomeWrap}>
                <Image source={avatarSource} style={styles.profilePic} />
                <Text style={styles.welcomeText}>Welcome {profileName}!</Text>
              </View>

              {/* Notification + Language icons */}
              <View style={styles.headerIcons}>
                <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
                  <Image source={notificationIcon} style={styles.headerIcon} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
                  <Image source={LanguageCircle} style={styles.headerIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationWrap}>
              <Image source={location} style={styles.locationIcon} />
              <View style={styles.locationText}>
                <Text style={styles.locationTitle}>Central Body Works</Text>
                <Text style={styles.locationAddress}>123 Main Street, Toronto, ON M5V 2K1</Text>
              </View>
            </View>
          </View>

          {/* ── Stats Section (EarningScreen style) ─────────────────────── */}
          <View style={styles.statsRow}>
            {/* Hours Today */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIconCircle}>
                  <Image source={Clock} style={styles.statIcon} />
                </View>
                <Text style={styles.statLabel}>Hours Today</Text>
              </View>
              <Text style={styles.statValue}>
                6.5 <Text style={styles.statUnit}>hrs</Text>
              </Text>
            </View>

            {/* Today's Pay */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIconCircle}>
                  <Image source={DollerCircle} style={styles.statIcon} />
                </View>
                <Text style={styles.statLabel}>Today's Pay</Text>
              </View>
              <Text style={styles.statValue}>$128.00</Text>
            </View>
          </View>

            {/* Chart */}
            <View style={styles.chartSection}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Earnings</Text>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.weekFilter}
                    onPress={toggleWeekDropdown}
                  >
                    <Text style={styles.weekFilterText}>{selectedWeek}</Text>
                    <Text style={styles.chevron}>▾</Text>
                  </TouchableOpacity>
                  {weekDropdownOpen && (
                    <View style={styles.weekDropdown}>
                      {WEEK_OPTIONS.map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.floatItem,
                            item === selectedWeek && styles.floatItemActive,
                          ]}
                          onPress={() => { setSelectedWeek(item); setWeekDropdownOpen(false); }}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.floatItemText,
                            item === selectedWeek && styles.floatItemTextActive,
                          ]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                barWidth={28}
                barRadius={6}
                spacing={14}
                frontColor="#E01F00"
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor="#f0f0f0"
                height={220}
                dashGap={0}
                showValuesOnTopOfBars={false}
              />
            </View>
          </View>

          {/* ── Quick Log Button ────────────────────────────────────────── */}
          <View style={styles.quickLogSection}>
            <CustomButton
              title="+ Quick Log"
              onPress={() => navigation.navigate('log_new_task')}
              buttonStyle={styles.quickLogButton}
              titleStyle={styles.quickLogText}
            />
            <Text style={styles.quickLogSubtext}>Tap to log a new Repair Order</Text>
          </View>

          {/* ── Today's Activity Section ────────────────────────────────── */}
          <View style={styles.activitySection}>

            {/* Header row: title + two dropdown anchors */}
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>Today's Activity</Text>

              <View style={styles.dropdownPillRow}>

                {/* ── Date filter anchor ── */}
                <View style={styles.dropdownAnchor}>
                  <TouchableOpacity
                    style={styles.dropdownPill}
                    onPress={toggleFilter}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.dropdownPillText}>{selectedFilter}</Text>
                    <Text style={styles.pillChevron}>▾</Text>
                  </TouchableOpacity>

                  {/* Floating date dropdown */}
                  {filterOpen && (
                    <View style={[styles.floatingDropdown, styles.floatingLeft]}>
                      {DATE_OPTIONS.map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.floatItem,
                            item === selectedFilter && styles.floatItemActive,
                          ]}
                          onPress={() => { setSelectedFilter(item); setFilterOpen(false); }}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.floatItemText,
                            item === selectedFilter && styles.floatItemTextActive,
                          ]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* ── Status filter anchor ── */}
                <View style={styles.dropdownAnchor}>
                  <TouchableOpacity
                    style={styles.dropdownPill}
                    onPress={toggleStatus}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.dropdownPillText}>
                      {selectedStatus === 'All Status' ? 'Filter by Status' : selectedStatus}
                    </Text>
                    <Text style={styles.pillChevron}>▾</Text>
                  </TouchableOpacity>

                  {/* Floating status dropdown */}
                  {statusOpen && (
                    <View style={[styles.floatingDropdown, styles.floatingRight]}>
                      {STATUS_OPTIONS.map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.floatItem,
                            item === selectedStatus && styles.floatItemActive,
                          ]}
                          onPress={() => { setSelectedStatus(item); setStatusOpen(false); }}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.floatItemText,
                            item === selectedStatus && styles.floatItemTextActive,
                          ]}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

              </View>
            </View>

            {/* Task Cards */}
            <FlatList
              data={PENDING_TASKS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TaskCard task={item} />}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.taskSeparator} />}
            />
          </View>

          <View style={{ height: vh(10) }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TechnicianHomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    paddingHorizontal: vw(4),
    paddingBottom: vh(3),
  },

  // ── Header ────
  headerSection: {
    marginBottom: vh(2.5),
    marginTop: vh(1),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(1.5),
  },
  welcomeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(3),
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: FONTS.display_bold,
    color: colors.black,
    fontWeight: '800',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
  },
  iconBtn: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(10) / 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: vw(2.5),
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    shadowColor: '#32325d',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
    paddingVertical: vh(1.5),
    paddingHorizontal: vw(3),
  },
  locationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 2,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: FONTS.display_medium,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: FONTS.display_regular,
    color: '#888',
  },

  // ── Stats (EarningScreen style) ────
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(2.5),
    gap: vw(3),
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: vw(3),
    padding: vw(3.5),
    backgroundColor: '#FAFAFA',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  statIconCircle: {
    width: vw(7),
    height: vw(7),
    borderRadius: vw(7) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2),
  },
  statIcon: {
    width: vw(7),
    height: vw(7),
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: vw(3.5),
    color: colors.black,
    fontFamily: FONTS.display_regular,
    fontWeight: '700',
  },
  statValue: {
    fontSize: vw(6),
    fontWeight: '800',
    color: '#000',
    fontFamily: FONTS.display_bold,
  },
  statUnit: {
    fontSize: vw(3.5),
    fontWeight: '400',
    color: 'black',
  },

  // ── Chart ────
  chartSection: {
    marginBottom: vh(2),
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(1.5),
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: FONTS.display_bold,
    fontWeight: '800',
    color: colors.black,
  },
  weekFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: vw(2),
    paddingHorizontal: vw(3),
    height: vh(4.5),
  },
  weekDropdown: {
    position: 'absolute',
    top: vh(5),
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    minWidth: vw(40),
    overflow: 'hidden',
  },
  weekFilterText: {
    fontSize: vw(3.4),
    color: '#555',
    marginRight: vw(2),
    fontFamily: FONTS.display_regular,
  },
  chevron: {
    fontSize: vw(3),
    color: '#777',
  },
  chartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    paddingHorizontal: vw(3),
    paddingVertical: vh(2),
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },

  // ── Quick Log ────
  quickLogSection: {
    marginBottom: vh(3),
  },
  quickLogButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: vh(2),
  },
  quickLogText: {
    fontSize: 16,
    fontFamily: FONTS.display_bold,
    color: 'white',
  },
  quickLogSubtext: {
    fontSize: 15,
    fontFamily: FONTS.display_regular,
    color: '#888',
    marginTop: 6,
    textAlign: 'center',
  },

  // ── Today's Activity ────
  activitySection: {
    marginBottom: vh(2),
    zIndex: 10,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(1.5),
    zIndex: 10,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: FONTS.display_bold,
    fontWeight: '800',
    color: colors.black,
  },
  dropdownPillRow: {
    flexDirection: 'row',
    gap: vw(2),
    zIndex: 10,
  },

  // Anchor wraps each button + its floating dropdown
  dropdownAnchor: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingHorizontal: vw(3),
    paddingVertical: vh(1.2),
    borderWidth: 2,
    borderColor: '#F3F3F3',
    gap: vw(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownPillText: {
    fontSize: 13,
    fontFamily: FONTS.display_medium,
    color: '#222',
    fontWeight: '600',
  },
  pillChevron: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },

  // Floating dropdown card (absolute, overlaps cards below)
  floatingDropdown: {
    position: 'absolute',
    top: vh(5.5),
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 12,
    zIndex: 999,
    minWidth: vw(42),
    overflow: 'hidden',
  },
  floatingLeft: {
    left: 0,
  },
  floatingRight: {
    right: 0,
  },
  floatItem: {
    paddingVertical: vh(1.8),
    paddingHorizontal: vw(4.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  floatItemActive: {
    backgroundColor: '#FFF2F0',
  },
  floatItemText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS.display_regular,
  },
  floatItemTextActive: {
    color: colors.primary,
    fontFamily: FONTS.display_medium,
    fontWeight: '700',
  },

  taskSeparator: {
    height: vh(1.2),
  },
});