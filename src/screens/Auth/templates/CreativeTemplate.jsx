import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../../utils/fonts';
import { fs, vh, vw } from '../../../utils/responsive';

const PRIMARY = '#E01F00';
const CARD_BG = '#F4F4F4';

const ICONS = {
  mail: require('../../../assets/TechnicianResumeTemplateImages/mailIcon.png'),
  call: require('../../../assets/TechnicianResumeTemplateImages/callIcon.png'),
  location: require('../../../assets/TechnicianResumeTemplateImages/locationIcon.png'),
  work: require('../../../assets/TechnicianResumeTemplateImages/work_experienceIcon.png'),
  education: require('../../../assets/TechnicianResumeTemplateImages/educationIcon.png'),
  skills: require('../../../assets/TechnicianResumeTemplateImages/skillsIcon.png'),
  certifications: require('../../../assets/TechnicianResumeTemplateImages/certficationsIcon.png'),
};

const CreativeTemplate = ({ profile, onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ── Red Header with gradient ── */}
      <LinearGradient
        colors={['#C0392B', '#E01F00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.header, { paddingTop: insets.top + vh(2) }]}
      >
        {onBack && (
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={onBack}
          >
            <Text style={styles.backArrow}>{'<'}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.name}>{profile.name}</Text>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image source={ICONS.mail} style={styles.contactIcon} />
            <Text style={styles.contactText}>{profile.email}</Text>
          </View>
          <View style={[styles.contactItem, { marginLeft: vw(5) }]}>
            <Image source={ICONS.call} style={styles.contactIcon} />
            <Text style={styles.contactText}>{profile.phone}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ── Body Content ── */}
      <View style={styles.body}>
        <View style={styles.infoCard}>
          <View style={styles.servicesRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardLabel}>Services</Text>
              <View style={styles.tagsRow}>
                {profile.services.map((s) => (
                  <View key={s} style={styles.tag}>
                    <Text style={styles.tagText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ flex: 1, paddingLeft: vw(3) }}>
              <Text style={styles.cardLabel}>Hourly Rate</Text>
              <Text style={styles.rateText}>{profile.hourlyRate}</Text>
            </View>
          </View>

          <Text style={[styles.cardLabel, { marginTop: vh(2) }]}>
            Services Locations
          </Text>
          {profile.serviceLocations.map((loc, i) => (
            <View key={i} style={styles.locationRow}>
              <Image source={ICONS.location} style={styles.locationPin} />
              <Text style={styles.locationText}>{loc}</Text>
            </View>
          ))}

          <Text style={[styles.cardLabel, { marginTop: vh(2) }]}>
            Introduction
          </Text>
          <Text style={styles.introText}>{profile.introduction}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Image source={ICONS.work} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Work Experience</Text>
        </View>
        {profile.jobs.map((job, i) => (
          <View key={i} style={styles.expBlock}>
            <Text style={styles.companyName}>{job.company}</Text>
            <Text style={styles.expSub}>{job.title}</Text>
            <Text style={styles.dateText}>
              {job.startDate} - {job.endDate}
            </Text>
            <Text style={styles.bodyText}>{job.description}</Text>
            <View style={styles.locRow}>
              <Image source={ICONS.location} style={styles.locSmallIcon} />
              <Text style={styles.locSmallText}>{job.location}</Text>
            </View>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Image source={ICONS.education} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Education</Text>
        </View>
        {profile.educations.map((edu, i) => (
          <View key={i} style={styles.expBlock}>
            <Text style={styles.companyName}>{edu.degree}</Text>
            <Text style={styles.expSub}>{edu.school}</Text>
            <Text style={styles.dateText}>
              {edu.startDate} - {edu.endDate}
            </Text>
            <Text style={styles.bodyText}>{edu.fieldOfStudy}</Text>
          </View>
        ))}

        <View style={styles.sectionHeader}>
          <Image source={ICONS.skills} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>
        <View style={[styles.tagsRow, { paddingHorizontal: vw(5) }]}>
          {profile.skills.map((s) => (
            <View key={s} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Image source={ICONS.certifications} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Certfications</Text>
        </View>
        <Text style={styles.bodyText}>{profile.certifications}</Text>
      </View>
    </View>
  );
};

export default CreativeTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* ── Header ── */
  header: {
    paddingHorizontal: vw(5),
    paddingBottom: vh(4),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    width: vw(9),
    height: vw(9),
    borderRadius: vw(9) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(2),
    backgroundColor: 'transparent',
  },
  backArrow: {
    color: '#fff',
    fontSize: fs(16),
    fontWeight: '600',
    lineHeight: fs(20),
  },
  name: {
    fontSize: fs(30),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: '#fff',
    marginBottom: vh(1.5),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 6,
  },
  contactText: {
    fontSize: fs(12.5),
    fontFamily: FONTS.display_regular,
    color: '#fff',
  },

  /* ── Body ── */
  body: { paddingVertical: vh(2) },

  /* ── Info card ── */
  infoCard: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: vw(4),
    marginHorizontal: vw(4),
    marginBottom: vh(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  servicesRow: { flexDirection: 'row' },
  cardLabel: {
    fontSize: fs(14),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: '#111',
    marginBottom: vh(1),
  },
  rateText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: vw(3.5),
    paddingVertical: 6,
  },
  tagText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: '#333',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationPin: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: PRIMARY,
    marginRight: 8,
  },
  locationText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#333',
  },
  introText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
    lineHeight: 20,
  },

  /* ── Section header ── */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    marginTop: vh(2),
    marginBottom: vh(1),
  },
  sectionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: PRIMARY,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: fs(17),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: '#111',
  },

  /* ── Experience / Education ── */
  expBlock: {
    paddingHorizontal: vw(5),
    marginBottom: vh(1.5),
  },
  companyName: {
    fontSize: fs(14),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: PRIMARY,
    marginBottom: 2,
  },
  expSub: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#333',
    marginBottom: 2,
  },
  dateText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: '#888',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
    lineHeight: 20,
    paddingHorizontal: vw(5),
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locSmallIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: PRIMARY,
    marginRight: 4,
  },
  locSmallText: { fontSize: fs(12), color: '#888' },

  /* ── Skills ── */
  skillTag: {
    backgroundColor: CARD_BG,
    borderRadius: 8,
    paddingHorizontal: vw(4),
    paddingVertical: 8,
  },
  skillTagText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#333',
  },
});