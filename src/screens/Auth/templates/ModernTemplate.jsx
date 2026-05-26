import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FONTS } from '../../../utils/fonts';
import { fs, vh, vw } from '../../../utils/responsive';

const PRIMARY = '#ff2200';

const ICONS = {
    mail: require('../../../assets/TechnicianResumeTemplateImages/mailIcon.png'),
    call: require('../../../assets/TechnicianResumeTemplateImages/callIcon.png'),
    location: require('../../../assets/TechnicianResumeTemplateImages/locationIcon.png'),
    work: require('../../../assets/TechnicianResumeTemplateImages/work_experienceIcon.png'),
    education: require('../../../assets/TechnicianResumeTemplateImages/educationIcon.png'),
    skills: require('../../../assets/TechnicianResumeTemplateImages/skillsIcon.png'),
    certifications: require('../../../assets/TechnicianResumeTemplateImages/certficationsIcon.png'),
};

const ModernTemplate = ({ profile }) => (
    <View>
        {/* Header card */}
        <View style={styles.headerCard}>
            <Text style={styles.name}>{profile.name}</Text>
            <View style={styles.contactRow}>
                <Image source={ICONS.mail} style={styles.contactIcon} />
                <Text style={styles.contactText}>{profile.email}</Text>
                <Image source={ICONS.call} style={[styles.contactIcon, { marginLeft: vw(3) }]} />
                <Text style={styles.contactText}>{profile.phone}</Text>
            </View>
        </View>

        {/* Services */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.tagsRow}>
            {profile.services.map((s) => (
                <View key={s} style={styles.tag}><Text style={styles.tagText}>{s}</Text></View>
            ))}
        </View>

        {/* Service Locations */}
        <Text style={styles.sectionTitle}>Services Locations</Text>
        {profile.serviceLocations.map((loc, i) => (
            <View key={i} style={styles.locationRow}>
                <Image source={ICONS.location} style={styles.locationPin} />
                <Text style={styles.locationText}>{loc}</Text>
            </View>
        ))}

        {/* Hourly Rate */}
        <Text style={styles.sectionTitle}>Hourly Rate</Text>
        <Text style={styles.bodyText}>{profile.hourlyRate}</Text>

        {/* Introduction */}
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.bodyText}>{profile.introduction}</Text>

        {/* Work Experience */}
        <View style={styles.iconRow}>
            <Image source={ICONS.work} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: PRIMARY, marginTop: 0, marginBottom: 0 }]}>Work Experience</Text>
        </View>
        {profile.jobs.map((job, i) => (
            <View key={i} style={styles.expCard}>
                <View style={styles.expRow}>
                    <Text style={styles.expCompany}>{job.company}</Text>
                    <View style={styles.dateBadge}>
                        <Text style={styles.dateBadgeText}>{job.startDate} - {job.endDate}</Text>
                    </View>
                </View>
                <Text style={styles.expTitle}>{job.title}  {job.experience}</Text>
                <Text style={styles.bodyText}>{job.description}</Text>
                <View style={styles.locationSmallRow}>
                    <Image source={ICONS.location} style={styles.locationSmallIcon} />
                    <Text style={styles.locationSmall}>{job.location}</Text>
                </View>
            </View>
        ))}

        {/* Education */}
        <View style={styles.iconRow}>
            <Image source={ICONS.education} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: PRIMARY, marginTop: 0, marginBottom: 0 }]}>Education</Text>
        </View>
        {profile.educations.map((edu, i) => (
            <View key={i} style={styles.expCard}>
                <View style={styles.expRow}>
                    <Text style={styles.expCompany}>{edu.degree}</Text>
                    <View style={styles.dateBadge}>
                        <Text style={styles.dateBadgeText}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                </View>
                <Text style={styles.bodyText}>{edu.school}</Text>
                <Text style={styles.bodyText}>{edu.fieldOfStudy}</Text>
            </View>
        ))}

        {/* Skills */}
        <View style={styles.iconRow}>
            <Image source={ICONS.skills} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>Skills</Text>
        </View>
        <View style={styles.tagsRow}>
            {profile.skills.map((s) => (
                <View key={s} style={styles.tagOutline}><Text style={styles.tagOutlineText}>{s}</Text></View>
            ))}
        </View>

        {/* Certifications */}
        <View style={styles.iconRow}>
            <Image source={ICONS.certifications} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>Certifications</Text>
        </View>
        <Text style={styles.bodyText}>{profile.certifications}</Text>
    </View>
);

export default ModernTemplate;

const styles = StyleSheet.create({
    headerCard: {
        borderWidth: 1.5,
        borderColor: PRIMARY,
        borderRadius: 12,
        padding: vw(4),
        marginBottom: vh(1),
        backgroundColor: '#ff634b3d',
    },
    name: {
        fontSize: fs(20),
        fontFamily: FONTS.display_bold,
        color: 'red',
        fontWeight: '700',
        marginBottom: 6,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    contactIcon: { width: 14, height: 14, resizeMode: 'contain', tintColor: 'red', marginRight: 5 },
    contactText: { fontSize: fs(12), fontFamily: FONTS.display_regular, fontWeight: '400', color: '#858585', marginRight: 4 },
    sectionTitle: {
        fontSize: fs(16),
        fontFamily: FONTS.display_bold,
        fontWeight: '700',
        color: '#111',
        marginTop: vh(1.5),
        marginBottom: vh(0.5),
    },
    bodyText: {
        fontSize: fs(13),
        fontFamily: FONTS.display_regular,
        fontWeight: '400',
        color: '#444',
        lineHeight: 20,
    },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: vh(0.5) },
    tag: {
        borderWidth: 0,
        borderColor: '#CCC',
        borderRadius: 10,
        paddingHorizontal: vw(3),
        paddingVertical: 10,
        backgroundColor: '#ff22003d',
    },
    tagText: { fontSize: fs(12), fontFamily: FONTS.display_regular, fontWeight: '400', color: 'red' },
    tagOutline: {
        borderWidth: 0,
        borderColor: '#CCC',
        borderRadius: 10,
        paddingHorizontal: vw(3),
        paddingVertical: 10,
        backgroundColor: '#ff634b3d',
    },
    tagOutlineText: { fontSize: fs(12), fontFamily: FONTS.display_regular, fontWeight: '400', color: 'red' },
    locationRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
    locationPin: { width: 14, height: 14, resizeMode: 'contain', tintColor: PRIMARY, marginRight: 5, marginTop: 2 },
    locationText: { fontSize: fs(13), fontFamily: FONTS.display_regular, fontWeight: '400', color: '#444', flex: 1 },
    iconRow: { flexDirection: 'row', alignItems: 'center', marginTop: vh(1.5), marginBottom: vh(0.5) },
    sectionIcon: { width: 16, height: 16, resizeMode: 'contain', tintColor: PRIMARY, marginRight: 6 },
    expCard: { marginBottom: vh(1.5) },
    expRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
    expCompany: { fontSize: fs(14), fontFamily: FONTS.display_bold, fontWeight: '700', color: '#111', flex: 1, marginRight: 6 },
    expTitle: { fontSize: fs(13), fontFamily: FONTS.display_regular, fontWeight: '500', color: '#555', marginBottom: 4 },
    dateBadge: {
        backgroundColor: '#FFF0F0',
        borderRadius: 10,
        paddingHorizontal: vw(2.5),
        paddingVertical: 3,
    },
    dateBadgeText: { fontSize: fs(11), fontFamily: FONTS.display_regular, fontWeight: '400', color: PRIMARY },
    locationSmallRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    locationSmallIcon: { width: 12, height: 12, resizeMode: 'contain', tintColor: '#888', marginRight: 4 },
    locationSmall: { fontSize: fs(12), fontWeight: '400', color: '#888' },
});
