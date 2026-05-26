import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { useRole } from '../../utils/RoleContext.js';
import { ROLES } from '../../utils/helper.js';

const notificationIcon = require('../../assets/TaskImages/notification.png');
const searchIcon = require('../../assets/TaskImages/search.png');
const Clock = require('../../assets/EarningsImages/clock.png');
const DollerCircle = require('../../assets/EarningsImages/dollar-circle.png');
const LanguageCircle = require('../../assets/EarningsImages/language-circle.png');
const locationImg = require('../../assets/EarningsImages/location.png');

const chartData = [
  { value: 250, label: 'Mon', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 420, label: 'Tue', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 500, label: 'Wed', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 380, label: 'Thu', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 320, label: 'Fri', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 200, label: 'Sat', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
  { value: 80, label: 'Sun', labelWidth: 50, labelTextStyle: { color: '#666', fontSize: 12, fontFamily: FONTS.display_regular } },
];

const APPROVED = [
  { id: '1', ro: 'RO #8829', date: 'April 15, 2026', description: 'Painting - Clear Coat', hours: '1.5 hrs', amount: '$75.00', status: 'Completed' },
  { id: '2', ro: 'RO #8829', date: 'April 15, 2026', description: 'Painting - Clear Coat', hours: '1.5 hrs', amount: '$75.00', status: 'Completed' },
  { id: '3', ro: 'RO #8829', date: 'April 15, 2026', description: 'Painting - Clear Coat', hours: '1.5 hrs', amount: '$75.00', status: 'Completed' },
];

const PENDING = [
  { id: '1', ro: 'RO #8829', date: 'April 15, 2026', description: 'Painting - Clear Coat', hours: '1.5 hrs', amount: '$75.00', status: 'Completed' },
  { id: '2', ro: 'RO #8829', date: 'April 15, 2026', description: 'Painting - Clear Coat', hours: '1.5 hrs', amount: '$75.00', status: 'Completed' },
];

const DATE_OPTIONS = ['All', 'Today', 'This Week', 'This Month'];
const STATUS_OPTIONS = ['All Status', 'In Progress', 'Completed', 'Approved', 'Pending'];
const LOCATION_OPTIONS = [
  { name: 'Central Body Works', address: '123 Main Street, Toronto, ON M5V 2K1' },
  { name: 'North Auto Shop', address: '456 King Street, Toronto, ON M4B 1B3' },
  { name: 'East Side Garage', address: '789 Queen Street, Toronto, ON M4M 1H1' },
];

const TechnicianEarningScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { role } = useRole();
  const isTechnician = role === ROLES.TECHNICIAN;
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_OPTIONS[0]);
  const [weekFilterOpen, setWeekFilterOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Filter by Week');

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
    setLocationOpen(false);
    setWeekFilterOpen(false);
  };
  const toggleLocation = () => {
    setLocationOpen((prev) => !prev);
    setFilterOpen(false);
    setWeekFilterOpen(false);
  };
  const toggleWeekFilter = () => {
    setWeekFilterOpen((prev) => !prev);
    setFilterOpen(false);
    setLocationOpen(false);
  };

  const tasks = activeTab === 0 ? APPROVED : PENDING;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + vh(10) },
        ]}
        keyboardShouldPersistTaps="handled"
      >
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>My Earnings</Text>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.bellWrapper} activeOpacity={0.7}>
                  <Image source={notificationIcon} style={styles.bellIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bellWrapper, { marginLeft: vw(2) }]} activeOpacity={0.7}>
                  <Image source={LanguageCircle} style={styles.bellIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Location */}
            {!isTechnician && (
            <View style={styles.locationAnchor}>
              <TouchableOpacity style={styles.locationWrap} onPress={toggleLocation} activeOpacity={0.8}>
                <Image source={locationImg} style={styles.locationIcon} />
                <View style={styles.locationText}>
                  <Text style={styles.locationTitle}>{selectedLocation.name}</Text>
                  <Text style={styles.locationAddress}>{selectedLocation.address}</Text>
                </View>
                <Text style={styles.pillChevron}>▾</Text>
              </TouchableOpacity>
              {locationOpen && (
                <View style={styles.locationDropdown}>
                  {LOCATION_OPTIONS.map((loc) => (
                    <TouchableOpacity
                      key={loc.name}
                      style={[styles.floatItem, loc.name === selectedLocation.name && styles.floatItemActive]}
                      onPress={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.floatItemText, loc.name === selectedLocation.name && styles.floatItemTextActive]}>
                        {loc.name}
                      </Text>
                      <Text style={styles.locationDropdownAddress}>{loc.address}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>            )}
            {/* Stat cards */}
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={styles.statIconCircle}>
                    <Image source={Clock} style={styles.statIcon} />
                  </View>
                  <Text style={styles.statLabel}>Total Hours</Text>
                </View>
                <Text style={styles.statValue}>
                  65 <Text style={styles.statUnit}>hrs</Text>
                </Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={styles.statIconCircle}>
                    <Image source={DollerCircle} style={styles.statIcon} />
                  </View>
                  <Text style={styles.statLabel}>Total Pay</Text>
                </View>
                <Text style={styles.statValue}>$1800.00</Text>
              </View>
            </View>

            {/* Chart */}
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Earnings</Text>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.weekFilter}
                    onPress={toggleWeekFilter}
                  >
                    <Text style={styles.weekFilterText}>{selectedWeek}</Text>
                    <Text style={styles.chevron}>▾</Text>
                  </TouchableOpacity>
                  {weekFilterOpen && (
                    <View style={styles.weekDropdown}>
                      {['This Week', 'Last Week', 'This Month', 'Last Month'].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.floatItem,
                            item === selectedWeek && styles.floatItemActive,
                          ]}
                          onPress={() => { setSelectedWeek(item); setWeekFilterOpen(false); }}
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

            {/* Tabs */}
            <View style={styles.tabsWrapper}>
              <CustomTabs
                tabs={['Approved', 'Pending']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </View>

            {/* Search + filter row */}
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Image source={searchIcon} style={styles.searchIcon} />
                <TextInput
                  placeholder="Search by RO"
                  placeholderTextColor="#AAA"
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {/* ── Date filter pill ── */}
              <View style={styles.dropdownAnchor}>
                <TouchableOpacity
                  style={styles.dropdownPill}
                  onPress={toggleFilter}
                  activeOpacity={0.8}
                >
                  <Text style={styles.dropdownPillText}>{selectedFilter}</Text>
                  <Text style={styles.pillChevron}>▾</Text>
                </TouchableOpacity>
                {filterOpen && (
                  <View style={[styles.floatingDropdown, styles.floatingRight]}>
                    {DATE_OPTIONS.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={[styles.floatItem, item === selectedFilter && styles.floatItemActive]}
                        onPress={() => { setSelectedFilter(item); setFilterOpen(false); }}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.floatItemText, item === selectedFilter && styles.floatItemTextActive]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
        {tasks.map((item, index) => (
          <View key={item.id}>
            <TaskCard task={item} />
            {index < tasks.length - 1 && <View style={{ height: vh(1.2) }} />}
          </View>
        ))}
        <View style={{ height: vh(4) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TechnicianEarningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingHorizontal: vw(4),
    paddingTop: vh(1),
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(2),
  },
  headerTitle: {
    fontSize: vw(6.5),
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    marginRight: vw(3),
  },
  avatarA: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(8) / 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarB: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(8) / 2,
    backgroundColor: '#2D4A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -vw(3),
  },
  avatarLetter: {
    color: '#fff',
    fontSize: vw(3.5),
    fontWeight: '700',
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
  // Stat cards
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh(2),
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: vw(3),
    padding: vw(3.5),
    marginHorizontal: vw(0.8),
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
    // borderWidth: 1,
    borderColor: colors.primary || '#C32026',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw(2),
  },
  statIconText: {
    color: colors.primary || '#C32026',
    fontSize: vw(3.5),
    fontWeight: '700',
  },
  statLabel: {
    fontSize: vw(3.5),
    color: 'black',
    fontFamily: FONTS?.display_regular,
    fontWeight: '800',
  },
  statValue: {
    fontSize: vw(6),
    fontWeight: '800',
    color: '#000',
    fontFamily: FONTS?.display_bold,
  },
  statUnit: {
    fontSize: vw(3.5),
    fontWeight: '400',
    color: 'black',
  },
  // Location
  locationAnchor: {
    position: 'relative',
    zIndex: 20,
    marginBottom: vh(2),
  },
  locationDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 20,
    zIndex: 999,
    overflow: 'hidden',
    marginTop: 4,
  },
  locationDropdownAddress: {
    fontSize: 11,
    color: '#888',
    fontFamily: FONTS?.display_regular,
    marginTop: 2,
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: FONTS?.display_medium,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: FONTS?.display_regular,
    color: '#888',
  },
  // Chart
  chartCard: {
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
    fontFamily: FONTS?.display_bold,
    fontWeight: '800',
    color: '#000',
  },
  chartContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    paddingHorizontal: vw(3),
    paddingVertical: vh(2),
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    fontFamily: FONTS?.display_regular,
  },
  chevron: {
    fontSize: vw(3),
    color: '#777',
  },
  axisText: {
    fontSize: vw(2.8),
    color: '#888',
    fontFamily: FONTS?.display_regular,
  },
  // Tabs + search
  tabsWrapper: {
    marginBottom: vh(2),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1.5),
    zIndex: 10,
    gap: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#AAA',
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    fontFamily: FONTS?.display_regular,
    padding: 0,
  },
  // Pill dropdowns
  dropdownAnchor: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#F3F3F3',
    gap: vw(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    width: 70,
  },
  dropdownPillText: {
    fontSize: 11,
    fontFamily: FONTS?.display_medium,
    color: '#444',
    fontWeight: '600',
    flexShrink: 1,
  },
  pillChevron: {
    fontSize: 14,
    color: colors.primary || '#C32026',
    fontWeight: '700',
  },
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
    fontFamily: FONTS?.display_regular,
  },
  floatItemTextActive: {
    color: colors.primary || '#C32026',
    fontFamily: FONTS?.display_medium,
    fontWeight: '700',
  },

  statIcon: {
    width: vw(7),
    height: vw(7),
    resizeMode: 'contain',
  },

  
});