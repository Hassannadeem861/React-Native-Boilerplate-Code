import React from 'react';
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
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const companyAvatar = require('../../assets/CommunityImages/user.png');
const locationPin = require('../../assets/postImages/location.png');

const OFFERS = [
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
    duration: '1 Month',
    startDate: 'May 15, 2026',
    rate: '$25',
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
    duration: '1 Month',
    startDate: 'May 15, 2026',
    rate: '$25',
  },
];

const OfferCard = ({ item }) => (
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

    <View style={styles.detailsRow}>
      <Text style={styles.detailIcon}>🕐</Text>
      <Text style={styles.detailText}>Duration: {item.duration}</Text>
    </View>
    <View style={styles.detailsRow}>
      <Text style={styles.detailIcon}>📅</Text>
      <Text style={styles.detailText}>Start Date: {item.startDate}</Text>
    </View>
    <View style={styles.detailsRow}>
      <Text style={styles.detailIcon}>💲</Text>
      <Text style={styles.detailText}>Rate per hour: {item.rate}</Text>
    </View>

    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.declineBtn} activeOpacity={0.8}>
        <Text style={styles.declineBtnText}>Decline</Text>
      </TouchableOpacity>
      <View style={styles.acceptBtn}>
        <CustomButtom title="Accept" onPress={() => {}} />
      </View>
    </View>
  </View>
);

const JobOffersScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={OFFERS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + vh(4) }]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Job Offers</Text>
          </View>
        }
        renderItem={({ item }) => <OfferCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: vh(1.5) }} />}
      />
    </SafeAreaView>
  );
};

export default JobOffersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingHorizontal: vw(4),
  },
  header: {
    marginTop: vh(1.5),
    marginBottom: vh(2),
  },
  title: {
    fontSize: vw(6.5),
    fontFamily: FONTS?.display_bold,
    fontWeight: '800',
    color: '#000',
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
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
    marginTop: vh(0.8),
  },
  detailIcon: {
    fontSize: vw(3.5),
  },
  detailText: {
    fontSize: vw(3.4),
    fontFamily: FONTS?.display_regular,
    color: '#444',
  },
  actionRow: {
    flexDirection: 'row',
    gap: vw(3),
    marginTop: vh(2),
  },
  declineBtn: {
    flex: 1,
    height: vh(6.5),
    borderRadius: vw(3),
    backgroundColor: '#FDECEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineBtnText: {
    fontSize: vw(4),
    fontFamily: FONTS?.display_medium,
    color: '#E01F00',
    fontWeight: '600',
  },
  acceptBtn: {
    flex: 1,
  },
});
