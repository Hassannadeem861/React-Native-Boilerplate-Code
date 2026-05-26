import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik, FieldArray } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';

import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';
import { DUMMY_PROFILE } from '../../utils/dummyProfileData.js';

// ── Assets ─────────────────────────────────────────────────────────────────────
const ICON_DROPDOWN = require('../../assets/technicianProfileImages/dropdownIcon.png');
const ICON_CROSS    = require('../../assets/technicianProfileImages/crossIcon.png');
const ICON_CALENDAR = require('../../assets/technicianProfileImages/calendarIcon.png');
const ICON_LOCATION = require('../../assets/technicianProfileImages/locationIcon.png');
const ICON_EDIT     = require('../../assets/TechnicianSettingImages/editIcon.png');
const DUMMY_AVATAR  = require('../../assets/TechnicianSettingImages/dummyPicture.png');

// ── Constants ──────────────────────────────────────────────────────────────────
const SERVICES        = ['Painter', 'Prepper', 'Helper', 'Buffer', 'Body Man', 'Mechanic', 'Other'];
const JOB_TITLES      = ['Paint Technician', 'Prepper', 'Helper', 'Buffer', 'Body Man', 'Mechanic', 'Other'];
const EMPLOYED_OPTIONS = ['Yes', 'No'];
const SKILLS_OPTIONS  = ['Painting', 'Prep Work', 'Body Repair', 'Welding', 'Frame Work', 'Color Matching'];

// ── SelectModal ────────────────────────────────────────────────────────────────
const SelectModal = ({ visible, options, selected, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.modalBox}>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.modalItem, item === selected && styles.modalItemSelected]}
              onPress={() => { onSelect(item); onClose(); }}
            >
              <Text style={[styles.modalItemText, item === selected && styles.modalItemTextSelected]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

// ── DropdownField ──────────────────────────────────────────────────────────────
const DropdownField = ({ placeholder, value, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.dropdownBox, disabled && styles.disabledBox]}
    onPress={disabled ? null : onPress}
    activeOpacity={disabled ? 1 : 0.7}
  >
    <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
      {value || placeholder}
    </Text>
    {!disabled && <Image source={ICON_DROPDOWN} style={styles.dropdownIcon} />}
  </TouchableOpacity>
);

// ── DateInputField ─────────────────────────────────────────────────────────────
const DateInputField = ({ placeholder, value, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.dateInputBox, disabled && styles.disabledBox]}
    onPress={disabled ? null : onPress}
    activeOpacity={disabled ? 1 : 0.7}
  >
    <Text style={value ? styles.dateInputValue : styles.dateInputPlaceholder}>
      {value || placeholder}
    </Text>
    {!disabled && <Image source={ICON_CALENDAR} style={styles.calendarIconSmall} />}
  </TouchableOpacity>
);

// ── AddMoreBtn ─────────────────────────────────────────────────────────────────
const AddMoreBtn = ({ onPress }) => (
  <View style={styles.addMoreWrap}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#E01F00', '#9F1600']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.addMoreBtn}
      >
        <Text style={styles.addMoreText}>Add More</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

// ── Main Screen ────────────────────────────────────────────────────────────────
const TechnicianProfileEditPersonalInformationScreen = () => {
  const navigation = useNavigation();

  const [editMode,     setEditMode]     = useState(false);
  const [profileImage, setProfileImage] = useState(DUMMY_PROFILE.profilePhotoUrl || null);
  const [activeModal,  setActiveModal]  = useState(null);
  const [calState,     setCalState]     = useState({ visible: false, onSelect: null });

  // ── Calendar helpers ─────────────────────────────────────────────────────────
  const openCalendar = (onSelect) => setCalState({ visible: true, onSelect });
  const closeCalendar = () => setCalState({ visible: false, onSelect: null });

  // ── Modal helpers ────────────────────────────────────────────────────────────
  const openModal = (options, onSelect, selected) =>
    setActiveModal({ options, onSelect, selected });

  // ── Image picker ─────────────────────────────────────────────────────────────
  const handleImagePick = () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ width: 400, height: 400, cropping: true, cropperCircleOverlay: true })
            .then((img) => setProfileImage(img.path))
            .catch(() => {}),
      },
      {
        text: 'Gallery',
        onPress: () =>
          ImagePicker.openPicker({ width: 400, height: 400, cropping: true, cropperCircleOverlay: true })
            .then((img) => setProfileImage(img.path))
            .catch(() => {}),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = (values) => {
    if (!editMode) {
      // "Edit Profile" button dabaya — edit mode ON
      setEditMode(true);
    } else {
      // "Save" button dabaya — save karo aur edit mode OFF
      console.log('Saved values:', { ...values, profileImage });
      setEditMode(false);
      // Yahan API call lagana
    }
  };

  // ── Avatar source ─────────────────────────────────────────────────────────
  const avatarSource = profileImage ? { uri: profileImage } : DUMMY_AVATAR;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>

            <MainHeader onBackPress={() => navigation.goBack()} />

            {/* ── Profile Avatar ── */}
            <View style={styles.profileWrap}>
              <View style={styles.avatarWrap}>
                <Image source={avatarSource} style={styles.avatar} />

                {/* Edit icon — sirf editMode mein dikhega */}
                {editMode && (
                  <TouchableOpacity style={styles.editIconWrap} onPress={handleImagePick} activeOpacity={0.8}>
                    <Image source={ICON_EDIT} style={styles.editIcon} />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.profileName}>{DUMMY_PROFILE.fullName}</Text>
              <Text style={styles.profileEmail}>{DUMMY_PROFILE.email}</Text>
            </View>

            {/* ── Formik Form ── */}
            <Formik
              initialValues={{ ...DUMMY_PROFILE }}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                touched,
                errors,
                setFieldValue,
                setFieldTouched,
                handleSubmit: formikSubmit,
              }) => (
                <View style={styles.formContainer}>

                  {/* ── Basic Info ─────────────────────────── */}
                  <CustomInput
                    placeholder="Your Full Name"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={() => setFieldTouched('fullName', true)}
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  <CustomInput
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email', true)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  <CustomInput
                    placeholder="Enter Your Phone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone', true)}
                    keyboardType="phone-pad"
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  {/* Services Dropdown */}
                  <DropdownField
                    placeholder="Select Services"
                    value={values.selectedService}
                    disabled={!editMode}
                    onPress={() => openModal(
                      SERVICES,
                      (v) => setFieldValue('selectedService', v),
                      values.selectedService,
                    )}
                  />

                  {/* Service Area */}
                  <View style={styles.locationRow}>
                    <View style={{ flex: 1 }}>
                      <CustomInput
                        placeholder="Enter Your Service Area"
                        value={values.serviceArea}
                        onChangeText={handleChange('serviceArea')}
                        onBlur={() => setFieldTouched('serviceArea', true)}
                        islabelshown={false}
                        disabled={!editMode}
                        style={!editMode && styles.readonlyInput}
                      />
                    </View>
                    <Image source={ICON_LOCATION} style={styles.locationIcon} />
                  </View>

                  {editMode && <AddMoreBtn onPress={() => {}} />}

                  <CustomInput
                    placeholder="Enter Your Hourly Rate"
                    value={values.hourlyRate}
                    onChangeText={handleChange('hourlyRate')}
                    onBlur={() => setFieldTouched('hourlyRate', true)}
                    keyboardType="numeric"
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  <CustomInput
                    placeholder="Short Introduction"
                    value={values.intro}
                    onChangeText={handleChange('intro')}
                    onBlur={() => setFieldTouched('intro', true)}
                    multiline
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  {/* ── Recent Jobs ────────────────────────── */}
                  <CustomHeading heading="Recent Job" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <FieldArray name="jobs">
                    {({ push }) => (
                      <>
                        {values.jobs.map((job, i) => (
                          <View key={i}>
                            <DropdownField
                              placeholder="Job Title"
                              value={job.jobTitle}
                              disabled={!editMode}
                              onPress={() => openModal(
                                JOB_TITLES,
                                (v) => setFieldValue(`jobs[${i}].jobTitle`, v),
                                job.jobTitle,
                              )}
                            />
                            <CustomInput
                              placeholder="Company Name"
                              value={job.company}
                              onChangeText={handleChange(`jobs[${i}].company`)}
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                            <CustomInput
                              placeholder="Location"
                              value={job.location}
                              onChangeText={handleChange(`jobs[${i}].location`)}
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                            <View style={styles.dateRow}>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="Start Date"
                                  value={job.startDate}
                                  disabled={!editMode}
                                  onPress={() => openCalendar((d) => setFieldValue(`jobs[${i}].startDate`, d))}
                                />
                              </View>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="End Date"
                                  value={job.endDate}
                                  disabled={!editMode}
                                  onPress={() => openCalendar((d) => setFieldValue(`jobs[${i}].endDate`, d))}
                                />
                              </View>
                            </View>
                            <CustomInput
                              placeholder="Years Of Experience"
                              value={job.experience}
                              onChangeText={handleChange(`jobs[${i}].experience`)}
                              keyboardType="numeric"
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                            <DropdownField
                              placeholder="Currently Employed"
                              value={job.employed}
                              disabled={!editMode}
                              onPress={() => openModal(
                                EMPLOYED_OPTIONS,
                                (v) => setFieldValue(`jobs[${i}].employed`, v),
                                job.employed,
                              )}
                            />
                            <CustomInput
                              placeholder="Description (In Your Recent Job)"
                              value={job.description}
                              onChangeText={handleChange(`jobs[${i}].description`)}
                              multiline
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                          </View>
                        ))}
                        {editMode && (
                          <AddMoreBtn onPress={() => push({
                            jobTitle: '', company: '', location: '',
                            startDate: '', endDate: '', experience: '',
                            employed: '', description: '',
                          })} />
                        )}
                      </>
                    )}
                  </FieldArray>

                  {/* ── Education ──────────────────────────── */}
                  <CustomHeading heading="Education" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <FieldArray name="educations">
                    {({ push }) => (
                      <>
                        {values.educations.map((edu, i) => (
                          <View key={i}>
                            <CustomInput
                              placeholder="School/Institute Name"
                              value={edu.school}
                              onChangeText={handleChange(`educations[${i}].school`)}
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                            <CustomInput
                              placeholder="Field Of Study"
                              value={edu.fieldOfStudy}
                              onChangeText={handleChange(`educations[${i}].fieldOfStudy`)}
                              islabelshown={false}
                              disabled={!editMode}
                              style={!editMode && styles.readonlyInput}
                            />
                            <View style={styles.dateRow}>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="Start Date"
                                  value={edu.startDate}
                                  disabled={!editMode}
                                  onPress={() => openCalendar((d) => setFieldValue(`educations[${i}].startDate`, d))}
                                />
                              </View>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="End Date"
                                  value={edu.endDate}
                                  disabled={!editMode}
                                  onPress={() => openCalendar((d) => setFieldValue(`educations[${i}].endDate`, d))}
                                />
                              </View>
                            </View>
                          </View>
                        ))}
                        {editMode && (
                          <AddMoreBtn onPress={() => push({ school: '', fieldOfStudy: '', startDate: '', endDate: '' })} />
                        )}
                      </>
                    )}
                  </FieldArray>

                  {/* ── Skills ─────────────────────────────── */}
                  <CustomHeading heading="Skills" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  {editMode && (
                    <DropdownField
                      placeholder="Add Skill"
                      value=""
                      onPress={() => openModal(
                        SKILLS_OPTIONS,
                        (v) => { if (!values.skills.includes(v)) setFieldValue('skills', [...values.skills, v]); },
                        '',
                      )}
                    />
                  )}

                  <View style={styles.tagsRow}>
                    {values.skills.map((skill) => (
                      <LinearGradient
                        key={skill}
                        colors={['#E01F00', '#9F1600']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.tag}
                      >
                        <Text style={styles.tagText}>{skill}</Text>
                        {editMode && (
                          <TouchableOpacity
                            onPress={() => setFieldValue('skills', values.skills.filter(s => s !== skill))}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                          >
                            <Image source={ICON_CROSS} style={styles.tagCross} />
                          </TouchableOpacity>
                        )}
                      </LinearGradient>
                    ))}
                  </View>

                  {/* ── Certifications ─────────────────────── */}
                  <CustomHeading heading="Certifications" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <CustomInput
                    placeholder="Eg: Icar-ASA-Other"
                    value={values.certifications}
                    onChangeText={handleChange('certifications')}
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />

                  {/* ── Button ─────────────────────────────── */}
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      onPress={() => handleSubmit(values)}
                      title={editMode ? 'Save Profile' : 'Edit Profile'}
                    />
                  </View>

                </View>
              )}
            </Formik>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Select Modal ───────────────────────────── */}
      {activeModal && (
        <SelectModal
          visible={!!activeModal}
          options={activeModal.options}
          selected={activeModal.selected}
          onSelect={activeModal.onSelect}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── Calendar Overlay ───────────────────────── */}
      {calState.visible && (
        <Pressable style={styles.calendarOverlay} onPress={closeCalendar}>
          <Pressable style={styles.calendarBox} onPress={(e) => e.stopPropagation()}>
            <CalendarPicker
              onDateChange={(date) => {
                if (typeof calState.onSelect === 'function' && date) {
                  if (typeof date.format === 'function') {
                    // Moment.js object
                    calState.onSelect(date.format('DD/MM/YYYY'));
                  } else {
                    // Plain JS Date object
                    const d   = new Date(date);
                    const day   = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year  = d.getFullYear();
                    calState.onSelect(`${day}/${month}/${year}`);
                  }
                }
                closeCalendar();
              }}
              selectedDayColor="#E01F00"
              selectedDayTextColor="#FFFFFF"
              todayBackgroundColor="#FFECEC"
              todayTextStyle={{ color: '#E01F00' }}
              textStyle={{ fontFamily: FONTS.display_regular }}
              width={vw(85)}
            />
          </Pressable>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default TechnicianProfileEditPersonalInformationScreen;

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
    paddingBottom: vh(5),
  },
  // Profile avatar section
  profileWrap: {
    alignItems: 'center',
    marginBottom: vh(3),
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 18,
    backgroundColor: '#eee',
  },
  editIconWrap: {
    position: 'absolute',
    top: -10,
    right: -6,
    // backgroundColor: '#E01F00',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  editIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    // tintColor: '#fff',
  },
  profileName: {
    fontSize: fs(17),
    fontFamily: FONTS.display_medium,
    color: colors.black,
  },
  profileEmail: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#888',
    marginTop: 3,
  },
  formContainer: {
    flex: 1,
  },
  sectionHeading: {
    marginTop: vh(2),
    marginBottom: vh(0.5),
  },
  // Read-only style
  readonlyInput: {
    // backgroundColor: 'red',
    color: '#555',
  },
  // Dropdown
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: vw(4),
    paddingVertical: Platform.OS === 'ios' ? 18 : 14,
    marginVertical: 10,
  },
  disabledBox: {
    // backgroundColor: '#F5F5F5',
  },
  dropdownValue: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#AAA',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  // Location row
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: vw(3.5),
  },
  // Date row
  dateRow: {
    flexDirection: 'row',
    gap: vw(2),
  },
  dateHalf: {
    flex: 1,
  },
  dateInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: vw(3),
    paddingVertical: Platform.OS === 'ios' ? 18 : 13,
    marginVertical: 10,
  },
  dateInputValue: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  dateInputPlaceholder: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#AAA',
  },
  calendarIconSmall: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#AAA',
  },
  // Calendar overlay
  calendarOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  calendarBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  // Add More
  addMoreWrap: {
    alignItems: 'flex-end',
    marginBottom: vh(1),
  },
  addMoreBtn: {
    borderRadius: 10,
    paddingHorizontal: vw(4),
    paddingVertical: 7,
  },
  addMoreText: {
    color: colors.white,
    fontSize: fs(13),
    fontWeight: '600',
  },
  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: vh(1.5),
    marginTop: vh(0.5),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: vw(3),
    paddingVertical: 5,
    gap: 6,
  },
  tagText: {
    color: colors.white,
    fontFamily: FONTS.display_medium,
    fontSize: fs(13),
  },
  tagCross: {
  marginTop: -18,
    marginRight: -13,
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  // Button
  buttonContainer: {
    marginTop: vh(3),
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: vw(5),
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: vh(50),
    overflow: 'hidden',
  },
  modalItem: {
    paddingVertical: vh(1.8),
    paddingHorizontal: vw(5),
  },
  modalItemSelected: {
    backgroundColor: '#FFECEC',
  },
  modalItemText: {
    fontSize: fs(15),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  modalItemTextSelected: {
    color: colors.primary,
    fontFamily: FONTS.display_medium,
  },
  // Error
  errorText: {
    color: colors.primary,
    fontSize: fs(12),
    marginTop: -6,
    marginBottom: 4,
    marginLeft: 4,
  },
});
