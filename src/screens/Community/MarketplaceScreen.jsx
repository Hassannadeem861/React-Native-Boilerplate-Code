import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import CustomHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const companyAvatar = require('../../assets/CommunityImages/user.png');
const locationPin = require('../../assets/postImages/location.png');
const searchIcon = require('../../assets/TaskImages/search.png');
const userAvatar1 = require('../../assets/CommunityImages/user.png');
const userAvatar2 = require('../../assets/EarningsImages/user.png');

const JOBS = [
  {
    id: '1',
    company: 'Central Body Works',
    location: 'Dallas, TX',
    timeAgo: '2 hours ago',
    description: "We're looking for an experienced Automotive Painter to join our team",
    requirements: [
      'Minimum 3+ years experience',
      'Must be familiar with BASF or Axalta paint systems',
      'Ability to handle full paint jobs independently',
    ],
  },
  {
    id: '2',
    company: 'Central Body Works',
    location: 'Dallas, TX',
    timeAgo: '2 hours ago',
    description: "We're looking for an experienced Automotive Painter to join our team",
    requirements: [
      'Minimum 3+ years experience',
      'Must be familiar with BASF or Axalta paint systems',
      'Ability to handle full paint jobs independently',
    ],
  },
  {
    id: '3',
    company: 'Central Body Works',
    location: 'Dallas, TX',
    timeAgo: '2 hours ago',
    description: "We're looking for an experienced Automotive Painter to join our team",
    requirements: [
      'Minimum 3+ years experience',
      'Must be familiar with BASF or Axalta paint systems',
      'Ability to handle full paint jobs independently',
    ],
  },
];

const JobCard = ({ item, onApply }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image source={companyAvatar} style={styles.companyAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.companyName}>{item.company}</Text>
        <View style={styles.locationRow}>
          <Image source={locationPin} style={styles.pinIcon} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
    </View>
    <Text style={styles.description}>{item.description}</Text>
    {item.requirements.map((req, i) => (
      <View key={i} style={styles.reqRow}>
        <Text style={styles.checkMark}>✓ </Text>
        <Text style={styles.reqText}>{req}</Text>
      </View>
    ))}
    <View style={styles.applyBtn}>
      <CustomButtom title="Apply Now" onPress={() => onApply(item)} />
    </View>
  </View>
);

const MarketplaceScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const handleApply = (job) => {
    navigation.navigate('apply_screen', { job });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={JOBS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + vh(12) }]}
        ListHeaderComponent={
          <>
            {/* Back button */}
            <CustomHeader onBackPress={() => navigation.goBack()} />
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Market Place</Text>
              <View style={styles.avatarStack}>
              </View>
            </View>
            <Text style={styles.subtitle}>
              Search technicians by skills, experience,{'\n'}and certifications.
            </Text>
            {/* Search */}
            <View style={styles.searchWrapper}>
              <CustomInput
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
                image={searchIcon}
              />
            </View>
          </>
        }
        renderItem={({ item }) => <JobCard item={item} onApply={handleApply} />}
        ItemSeparatorComponent={() => <View style={{ height: vh(1.5) }} />}
      />

      {/* Create Post floating button */}
      <View style={[styles.floatBtn, { bottom: insets.bottom + vh(2) }]}>
        <CustomButtom title="Create Post" onPress={() => navigation.navigate('marketplace_create_post')} />
      </View>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingHorizontal: vw(4),
    paddingBottom: vh(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vh(1.5),
    marginBottom: vh(0.5),
  },
  title: {
    fontSize: vw(6),
    fontFamily: FONTS?.display_bold,
    fontWeight: '800',
    color: '#000',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackAvatar: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(9) / 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  stackAvatarShift: {
    marginLeft: -vw(3),
  },
  stackBadge: {
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackBadgeText: {
    color: '#fff',
    fontSize: vw(3.2),
    fontWeight: '700',
  },
  subtitle: {
    fontSize: vw(3.4),
    fontFamily: FONTS?.display_regular,
    color: '#666',
    lineHeight: vh(2.6),
    marginBottom: vh(1.5),
  },
  searchWrapper: {
    marginBottom: vh(2),
  },
  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: vw(4),
    padding: vw(4),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: vw(3),
    marginBottom: vh(1.2),
  },
  companyAvatar: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(11) / 2,
  },
  companyName: {
    fontSize: vw(3.8),
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
    color: '#000',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(1),
    marginTop: 2,
  },
  pinIcon: {
    width: vw(3.5),
    height: vw(3.5),
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: vw(3.2),
    fontFamily: FONTS?.display_regular,
    color: '#888',
  },
  timeAgo: {
    fontSize: vw(3),
    fontFamily: FONTS?.display_regular,
    color: '#aaa',
  },
  description: {
    fontSize: vw(3.4),
    fontFamily: FONTS?.display_regular,
    color: '#444',
    marginBottom: vh(1),
    lineHeight: vh(2.5),
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  checkMark: {
    fontSize: vw(3.4),
    color: '#555',
  },
  reqText: {
    flex: 1,
    fontSize: vw(3.4),
    fontFamily: FONTS?.display_regular,
    color: '#555',
  },
  applyBtn: {
    marginTop: vh(1.5),
  },
  floatBtn: {
    position: 'absolute',
    left: vw(4),
    right: vw(4),
  },
});
