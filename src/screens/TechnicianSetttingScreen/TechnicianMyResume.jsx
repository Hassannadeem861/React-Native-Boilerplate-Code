import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

// ── Icons — sirf yeh 2 paths apne sahi path se replace karo ──────────────────
const ICON_EYE      = require('../../assets/eye.png');
const ICON_DOWNLOAD = require('../../assets/download.png');

// ── Dummy Resume Data ─────────────────────────────────────────────────────────
const DUMMY_RESUMES = [
  { id: '1', title: 'Resume' },
];

// ── Resume Card Component ─────────────────────────────────────────────────────
const ResumeCard = ({ title, onView, onDownload }) => (
  <View style={styles.card}>

    {/* Left: PDF badge + title */}
    <View style={styles.cardLeft}>
      <View style={styles.pdfBadge}>
        <Text style={styles.pdfBadgeText}>PDF</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>

    {/* Right: View + Download icons */}
    <View style={styles.cardRight}>
      <TouchableOpacity
        onPress={onView}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image source={ICON_EYE} style={styles.actionIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDownload}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image source={ICON_DOWNLOAD} style={styles.actionIcon} />
      </TouchableOpacity>
    </View>

  </View>
);

// ── Main Screen ───────────────────────────────────────────────────────────────
const TechnicianMyResume = () => {
  const navigation = useNavigation();

  const handleView = (item) => {
    Alert.alert('View Resume', `Opening: ${item.title}`);
    // navigation.navigate('pdf_viewer', { resumeUrl: item.url });
  };

  const handleDownload = (item) => {
    Alert.alert('Download', `Downloading: ${item.title}`);
    // RNFS download logic yahan lagao
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Header ── */}
      <View style={styles.headerWrap}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
        <Text style={styles.screenTitle}>My Resume</Text>
      </View>

      {/* ── List ── */}
      <FlatList
        data={DUMMY_RESUMES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ResumeCard
            title={item.title}
            onView={() => handleView(item)}
            onDownload={() => handleDownload(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No resume uploaded yet.</Text>
          </View>
        }
      />

    </SafeAreaView>
  );
};

export default TechnicianMyResume;

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrap: {
    paddingHorizontal: vw(5),
    paddingBottom: vh(1),
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: fs(26),
    fontFamily: FONTS.display_medium,
    color: '#111',
    marginTop: vh(0.5),
  },
  listContent: {
    paddingHorizontal: vw(5),
    paddingTop: vh(2.5),
  },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDECEA',
    borderRadius: 12,
    paddingVertical: vh(1.6),
    paddingHorizontal: vw(4),
    marginBottom: vh(1.5),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(3),
  },

  // PDF Badge
  pdfBadge: {
    backgroundColor: '#E01F00',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfBadgeText: {
    color: '#fff',
    fontSize: fs(10),
    fontFamily: FONTS.display_medium,
    letterSpacing: 0.5,
  },

  cardTitle: {
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#333',
  },

  // Right icons
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(5),
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#E01F00',
  },

  // Empty
  emptyWrap: {
    alignItems: 'center',
    marginTop: vh(10),
  },
  emptyText: {
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#999',
  },
});