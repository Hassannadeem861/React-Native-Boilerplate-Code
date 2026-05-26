import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { useRole } from '../../utils/RoleContext.js';
import { ROLES } from '../../utils/helper.js';

const notificationIcon = require('../../assets/TaskImages/notification.png');
const searchIcon = require('../../assets/TaskImages/search.png');
const locationImg = require('../../assets/EarningsImages/location.png');

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PENDING_TASKS = [
  { id: '1', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: null, hours: null, status: null },
  { id: '2', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: 'April 15, 2026', hours: '1.5 hrs', status: 'In Progress' },
  { id: '3', ro: 'RO #8829', amount: '$75.00', description: 'Painting - Clear Coat', date: null, hours: null, status: null },
];

const COMPLETED_TASKS = [
  { id: '4', ro: 'RO #9012', amount: '$120.00', description: 'Engine Oil Change', date: 'April 10, 2026', hours: '2.0 hrs', status: 'Completed' },
];

const ALL_OPTIONS    = ['All', 'Today', 'This Week', 'This Month'];
const STATUS_OPTIONS = ['All Status', 'In Progress', 'Completed', 'Pending'];
const LOCATION_OPTIONS = [
  { name: 'Central Body Works', address: '123 Main Street, Toronto, ON M5V 2K1' },
  { name: 'North Auto Shop', address: '456 King Street, Toronto, ON M4B 1B3' },
  { name: 'East Side Garage', address: '789 Queen Street, Toronto, ON M4M 1H1' },
];

// ─── Dropdown Select Modal ─────────────────────────────────────────────────────
const DropdownModal = ({ visible, title, options, selected, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={modalStyles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={modalStyles.box}>
        <View style={modalStyles.header}>
          <Text style={modalStyles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={modalStyles.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[modalStyles.item, item === selected && modalStyles.itemActive]}
              onPress={() => { onSelect(item); onClose(); }}
              activeOpacity={0.7}
            >
              <Text style={[modalStyles.itemText, item === selected && modalStyles.itemTextActive]}>
                {item}
              </Text>
              {item === selected && <Text style={modalStyles.checkmark}>✓</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: vw(6),
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.display_bold,
    color: '#111',
    fontWeight: '700',
  },
  closeX: {
    fontSize: 14,
    color: '#888',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: vw(5),
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  itemActive: {
    backgroundColor: '#FFF2F0',
  },
  itemText: {
    fontSize: 14,
    fontFamily: FONTS.display_regular,
    color: '#333',
  },
  itemTextActive: {
    color: '#E01F00',
    fontFamily: FONTS.display_medium,
    fontWeight: '600',
  },
  checkmark: {
    color: '#E01F00',
    fontSize: 14,
    fontWeight: '700',
  },
});

// ─── Dropdown Pill ────────────────────────────────────────────────────────────
const DropdownPill = ({ label, isActive, onPress, style }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.dropdownPill, isActive && styles.dropdownPillActive, style]}
  >
    <Text style={[styles.dropdownLabel, isActive && styles.dropdownLabelActive]} numberOfLines={1}>
      {label}
    </Text>
    <Text style={[styles.dropdownArrow, isActive && styles.dropdownArrowActive]}>▾</Text>
  </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const TechnicianTasksScreen = () => {
  const { role } = useRole();
  const isTechnician = role === ROLES.TECHNICIAN;
  const [activeTab, setActiveTab]             = useState(0);
  const [searchText, setSearchText]           = useState('');
  const [selectedAll, setSelectedAll]         = useState('All');
  const [selectedStatus, setSelectedStatus]   = useState('All Status');
  const [allModalOpen, setAllModalOpen]       = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [locationOpen, setLocationOpen]       = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_OPTIONS[0]);

  const tasks = activeTab === 0 ? PENDING_TASKS : COMPLETED_TASKS;

  const filteredTasks = tasks.filter(task => {
    const matchSearch = searchText
      ? task.ro.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const matchStatus = selectedStatus === 'All Status'
      ? true
      : task.status === selectedStatus || (!task.status && selectedStatus === 'Pending');
    return matchSearch && matchStatus;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <CustomHeading
            heading="My Tasks"
            containerStyle={styles.headingContainer}
            headingStyle={styles.title}
          />
          <TouchableOpacity style={styles.bellWrap} activeOpacity={0.7}>
            <Image source={notificationIcon} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        {/* ── Location ── */}
        {!isTechnician && (
        <View style={styles.locationAnchor}>
          <TouchableOpacity
            style={styles.locationWrap}
            onPress={() => setLocationOpen((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Image source={locationImg} style={styles.locationIcon} />
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>{selectedLocation.name}</Text>
              <Text style={styles.locationAddress}>{selectedLocation.address}</Text>
            </View>
            <Text style={styles.locationChevron}>▾</Text>
          </TouchableOpacity>
          {locationOpen && (
            <View style={styles.locationDropdown}>
              {LOCATION_OPTIONS.map((loc) => (
                <TouchableOpacity
                  key={loc.name}
                  style={[
                    styles.locationDropItem,
                    loc.name === selectedLocation.name && styles.locationDropItemActive,
                  ]}
                  onPress={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.locationDropItemText,
                    loc.name === selectedLocation.name && styles.locationDropItemTextActive,
                  ]}>
                    {loc.name}
                  </Text>
                  <Text style={styles.locationDropAddress}>{loc.address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        )}

        {/* ── Tabs ── */}
        <View style={styles.tabsWrapper}>
          <CustomTabs
            tabs={['Pending', 'Completed']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            containerStyle={styles.tabs}
          />
        </View>

        {/* ── Search + Filters ── */}
        <View style={styles.filterRow}>
          <View style={styles.searchBox}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search by RO"
              placeholderTextColor="#AAA"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <DropdownPill
            label={selectedAll}
            isActive={selectedAll !== 'All'}
            onPress={() => setAllModalOpen(true)}
            style={styles.dropdownSmall}
          />

          {activeTab === 0 && (
            <DropdownPill
              label={selectedStatus}
              isActive={selectedStatus !== 'All Status'}
              onPress={() => setStatusModalOpen(true)}
              style={styles.dropdownLarge}
            />
          )}
        </View>

        {/* ── Task List ── */}
        <View style={styles.listContainer}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} showLogTask={activeTab === 0} />
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No tasks found</Text>
            </View>
          )}
          <View style={{ height: vh(10) }} />
        </View>
      </ScrollView>

      {/* ── All / Period Modal ── */}
      <DropdownModal
        visible={allModalOpen}
        title="Select Period"
        options={ALL_OPTIONS}
        selected={selectedAll}
        onSelect={setSelectedAll}
        onClose={() => setAllModalOpen(false)}
      />

      {/* ── Filter by Status Modal ── */}
      <DropdownModal
        visible={statusModalOpen}
        title="Filter by Status"
        options={STATUS_OPTIONS}
        selected={selectedStatus}
        onSelect={setSelectedStatus}
        onClose={() => setStatusModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default TechnicianTasksScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    marginBottom: 12,
  },
  headingContainer: { flex: 1 },
  title: { fontSize: 26, fontFamily: FONTS.display_bold, color: '#1a1a1a' },
  bellWrap: {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 1, borderColor: '#e0e0e0',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  bellIcon: { width: 20, height: 20, resizeMode: 'contain' },

  tabsWrapper: { paddingHorizontal: 18, marginBottom: 16 },
  tabs: { marginBottom: 0 },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 16,
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
    flex: 1, fontSize: 13, color: '#333',
    fontFamily: FONTS.display_regular, padding: 0,
  },

  dropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  dropdownPillActive: {
    backgroundColor: '#FFF2F0',
    borderWidth: 1,
    borderColor: '#E01F00',
  },
  dropdownSmall: { width: 55 },
  dropdownLarge: { width: 100 },

  dropdownLabel: {
    fontSize: 11,
    color: '#444',
    fontFamily: FONTS.display_regular,
    marginRight: 2,
    flexShrink: 1,
  },
  dropdownLabelActive: { color: '#E01F00', fontWeight: '600' },

  dropdownArrow: {
    fontSize: 14,
    color: '#888',
    lineHeight: 18,
  },
  dropdownArrowActive: { color: '#E01F00' },

  listContainer: { paddingHorizontal: 18, gap: 14 },

  emptyWrap: { alignItems: 'center', paddingVertical: vh(5) },
  emptyText: { fontSize: 14, fontFamily: FONTS.display_regular, color: '#AAA' },

  // ── Location ──
  locationAnchor: {
    position: 'relative',
    zIndex: 20,
    marginHorizontal: 18,
    marginBottom: 16,
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
  },
  locationText: { flex: 1 },
  locationTitle: {
    fontSize: 15,
    fontFamily: FONTS.display_medium,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: FONTS.display_regular,
    color: '#888',
  },
  locationChevron: {
    fontSize: 13,
    color: '#C32026',
    fontWeight: '700',
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
  locationDropItem: {
    paddingVertical: vh(1.8),
    paddingHorizontal: vw(4.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  locationDropItemActive: { backgroundColor: '#FFF2F0' },
  locationDropItemText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FONTS.display_regular,
    fontWeight: '600',
  },
  locationDropItemTextActive: {
    color: '#E01F00',
    fontFamily: FONTS.display_medium,
  },
  locationDropAddress: {
    fontSize: 11,
    color: '#888',
    fontFamily: FONTS.display_regular,
    marginTop: 2,
  },
});