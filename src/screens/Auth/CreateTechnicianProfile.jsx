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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik, FieldArray } from 'formik';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';

// ── Assets ─────────────────────────────────────────────────────────────────────
const ICON_DROPDOWN = require('../../assets/technicianProfileImages/dropdownIcon.png');
const ICON_CROSS = require('../../assets/technicianProfileImages/crossIcon.png');
const ICON_CALENDAR = require('../../assets/technicianProfileImages/calendarIcon.png');
const ICON_LOCATION = require('../../assets/technicianProfileImages/locationIcon.png');

const SERVICES = ['Painter', 'Prepper', 'Helper', 'Buffer', 'Body Man', 'Mechanic', 'Other'];
const JOB_TITLES = ['Paint Technician', 'Prepper', 'Helper', 'Buffer', 'Body Man', 'Mechanic', 'Other'];
const EMPLOYED_OPTIONS = ['Yes', 'No'];
const SKILLS_OPTIONS = ['Painting', 'Prep Work', 'Body Repair', 'Welding', 'Frame Work', 'Color Matching'];

// const profileSchema = Yup.object().shape({ ... });

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  selectedService: '',
  serviceArea: '',
  hourlyRate: '',
  intro: '',
  jobs: [{ jobTitle: '', company: '', location: '', startDate: '', endDate: '', experience: '', employed: '', description: '' }],
  educations: [{ school: '', fieldOfStudy: '', startDate: '', endDate: '' }],
  skills: ['Painting', 'Prep Work', 'Body Repair'],
  certifications: '',
};

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

// ── Dropdown field ─────────────────────────────────────────────────────────────
const DropdownField = ({ placeholder, value, onPress }) => (
  <TouchableOpacity style={styles.dropdownBox} onPress={onPress} activeOpacity={0.7}>
    <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>{value || placeholder}</Text>
    <Image source={ICON_DROPDOWN} style={styles.dropdownIcon} />
  </TouchableOpacity>
);

// ── Date field ─────────────────────────────────────────────────────────────────
const DateField = ({ placeholder, value, onChangeText }) => (
  <View style={[styles.dateBox]}>
    <CustomInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      islabelshown={false}
      style={{ flex: 1 }}
    />
    <Image source={ICON_CALENDAR} style={styles.calendarIcon} />
  </View>
);

// ── Add More button ───────────────────────────────────────────────────────────
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

// ── Date input field ──────────────────────────────────────────────────────────
const DateInputField = ({ placeholder, value, onPress }) => (
  <TouchableOpacity style={styles.dateInputBox} onPress={onPress} activeOpacity={0.7}>
    <Text style={value ? styles.dateInputValue : styles.dateInputPlaceholder}>
      {value || placeholder}
    </Text>
    <Image source={ICON_CALENDAR} style={styles.calendarIconSmall} />
  </TouchableOpacity>
);

// ── Main Screen ────────────────────────────────────────────────────────────────
const CreateTechnicianProfile = () => {
  const navigation = useNavigation();
  const [activeModal, setActiveModal] = useState(null);
  const [calState, setCalState] = useState({ visible: false, onSelect: null });

  const openCalendar = (onSelect) => setCalState({ visible: true, onSelect });
  const closeCalendar = () => setCalState({ visible: false, onSelect: null });

  const openModal = (options, onSelect, selected) =>
    setActiveModal({ options, onSelect, selected });

  const errorText = (fieldName, touched, errors) => {
    if (!touched[fieldName] || !errors[fieldName]) return null;
    return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
  };

  const handleContinue = () => {
    navigation.navigate('technician_resume_template');
  };

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

            <CustomHeading
              containerStyle={styles.textContainer}
              heading="Complete Your Profile"
              color={colors.black}
              paragraphColor={colors.description}
              center={false}
              headingFontSize={28}
              paragraphFontSize={14}
              headingFontFamily={FONTS.display_medium}
              paragraphFontFamily={FONTS.display_regular}
            />

            <Formik
              initialValues={INITIAL_VALUES}
              // validationSchema={profileSchema}
              onSubmit={handleContinue}
            >
              {({
                values,
                handleChange,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                handleSubmit,
              }) => (
                <View style={styles.formContainer}>

                  {/* ── Basic Info ──────────────────────────── */}
                  <CustomInput
                    placeholder="Your Full Name"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={() => setFieldTouched('fullName', true)}
                    islabelshown={false}
                  />
                  {/* {errorText('fullName', touched, errors)} */}

                  <CustomInput
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email', true)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    islabelshown={false}
                  />
                  {/* {errorText('email', touched, errors)} */}

                  <CustomInput
                    placeholder="Enter Your Phone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone', true)}
                    keyboardType="phone-pad"
                    islabelshown={false}
                  />
                  {/* {errorText('phone', touched, errors)} */}

                  {/* Services Dropdown */}
                  <DropdownField
                    placeholder="Select Services"
                    value={values.selectedService}
                    onPress={() => openModal(
                      SERVICES,
                      (v) => setFieldValue('selectedService', v),
                      values.selectedService,
                    )}
                  />

                  {/* Service Area + location icon */}
                  <View style={styles.locationRow}>
                    <View style={{ flex: 1 }}>
                      <CustomInput
                        placeholder="Enter Your Service Area"
                        value={values.serviceArea}
                        onChangeText={handleChange('serviceArea')}
                        onBlur={() => setFieldTouched('serviceArea', true)}
                        islabelshown={false}
                      />
                    </View>
                    <Image source={ICON_LOCATION} style={styles.locationIcon} />
                  </View>
                  {/* {errorText('serviceArea', touched, errors)} */}

                  <AddMoreBtn onPress={() => { }} />

                  <CustomInput
                    placeholder="Enter Your Hourly Rate"
                    value={values.hourlyRate}
                    onChangeText={handleChange('hourlyRate')}
                    onBlur={() => setFieldTouched('hourlyRate', true)}
                    keyboardType="numeric"
                    islabelshown={false}
                  />
                  {/* {errorText('hourlyRate', touched, errors)} */}

                  <CustomInput
                    placeholder="Short Introduction"
                    value={values.intro}
                    onChangeText={handleChange('intro')}
                    onBlur={() => setFieldTouched('intro', true)}
                    multiline
                    islabelshown={false}
                  />
                  {/* {errorText('intro', touched, errors)} */}

                  {/* ── Recent Jobs ─────────────────────────── */}
                  <CustomHeading heading="Recent Job" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <FieldArray name="jobs">
                    {({ push }) => (
                      <>
                        {values.jobs.map((job, i) => (
                          <View key={i}>
                            <DropdownField
                              placeholder="Job Title"
                              value={job.jobTitle}
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
                              onBlur={() => setFieldTouched(`jobs[${i}].company`, true)}
                              islabelshown={false}
                            />
                            <CustomInput
                              placeholder="Location"
                              value={job.location}
                              onChangeText={handleChange(`jobs[${i}].location`)}
                              onBlur={() => setFieldTouched(`jobs[${i}].location`, true)}
                              islabelshown={false}
                            />
                            <View style={styles.dateRow}>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="Start Date"
                                  value={job.startDate}
                                  onPress={() => openCalendar((d) => setFieldValue(`jobs[${i}].startDate`, d))}
                                />
                              </View>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="End Date"
                                  value={job.endDate}
                                  onPress={() => openCalendar((d) => setFieldValue(`jobs[${i}].endDate`, d))}
                                />
                              </View>
                            </View>
                            <CustomInput
                              placeholder="Years Of Experience"
                              value={job.experience}
                              onChangeText={handleChange(`jobs[${i}].experience`)}
                              onBlur={() => setFieldTouched(`jobs[${i}].experience`, true)}
                              keyboardType="numeric"
                              islabelshown={false}
                            />
                            <DropdownField
                              placeholder="Currently Employed"
                              value={job.employed}
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
                              onBlur={() => setFieldTouched(`jobs[${i}].description`, true)}
                              multiline
                              islabelshown={false}
                            />
                          </View>
                        ))}
                        <AddMoreBtn onPress={() => push({ jobTitle: '', company: '', location: '', startDate: '', endDate: '', experience: '', employed: '', description: '' })} />
                      </>
                    )}
                  </FieldArray>

                  {/* ── Education ───────────────────────────── */}
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
                              onBlur={() => setFieldTouched(`educations[${i}].school`, true)}
                              islabelshown={false}
                            />
                            <CustomInput
                              placeholder="Field Of Study"
                              value={edu.fieldOfStudy}
                              onChangeText={handleChange(`educations[${i}].fieldOfStudy`)}
                              onBlur={() => setFieldTouched(`educations[${i}].fieldOfStudy`, true)}
                              islabelshown={false}
                            />
                            <View style={styles.dateRow}>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="Start Date"
                                  value={edu.startDate}
                                  onPress={() => openCalendar((d) => setFieldValue(`educations[${i}].startDate`, d))}
                                />
                              </View>
                              <View style={styles.dateHalf}>
                                <DateInputField
                                  placeholder="End Date"
                                  value={edu.endDate}
                                  onPress={() => openCalendar((d) => setFieldValue(`educations[${i}].endDate`, d))}
                                />
                              </View>
                            </View>
                          </View>
                        ))}
                        <AddMoreBtn onPress={() => push({ school: '', fieldOfStudy: '', startDate: '', endDate: '' })} />
                      </>
                    )}
                  </FieldArray>

                  {/* ── Skills ──────────────────────────────── */}
                  <CustomHeading heading="Skills" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <DropdownField
                    placeholder="Skills"
                    value=""
                    onPress={() => openModal(
                      SKILLS_OPTIONS,
                      (v) => { if (!values.skills.includes(v)) setFieldValue('skills', [...values.skills, v]); },
                      '',
                    )}
                  />
                  <View style={styles.tagsRow}>
                    {values.skills.map((skill) => (
                      <LinearGradient key={skill} colors={['#E01F00', '#9F1600']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.tag}>
                        <Text style={styles.tagText}>{skill}</Text>
                        <TouchableOpacity
                          onPress={() => setFieldValue('skills', values.skills.filter(s => s !== skill))}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <Image source={ICON_CROSS} style={styles.tagCross} />
                        </TouchableOpacity>
                      </LinearGradient>
                    ))}
                  </View>

                  {/* ── Certifications ──────────────────────── */}
                  <CustomHeading heading="Certifications" headingFontSize={18} containerStyle={styles.sectionHeading} />

                  <CustomInput
                    placeholder="Eg: Icar-ASA-Other"
                    value={values.certifications}
                    onChangeText={handleChange('certifications')}
                    onBlur={() => setFieldTouched('certifications', true)}
                    islabelshown={false}
                  />

                  {/* ── Continue ────────────────────────────── */}
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      onPress={handleSubmit}
                      title="Continue"
                    // disabled={isSubmitting}
                    />
                  </View>

                </View>
              )}
            </Formik>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {activeModal && (
        <SelectModal
          visible={!!activeModal}
          options={activeModal.options}
          selected={activeModal.selected}
          onSelect={activeModal.onSelect}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── Calendar overlay (no Modal) ─────────────── */}
      {calState.visible && (
        <Pressable style={styles.calendarOverlay} onPress={closeCalendar}>
          <Pressable style={styles.calendarBox} onPress={(e) => e.stopPropagation()}>
            <CalendarPicker
              onDateChange={(date) => {
                if (typeof calState.onSelect === 'function' && date) {

                  // Pehle check karo — kya .format() exist karta hai? (Moment object)
                  if (typeof date.format === 'function') {
                    calState.onSelect(date.format('DD/MM/YYYY')); // Moment object hai ✅
                  } else {
                    // Plain JS Date object hai, manually format karo
                    const d = new Date(date);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    calState.onSelect(`${day}/${month}/${year}`); // ✅
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

export default CreateTechnicianProfile;

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
  textContainer: {
    marginBottom: vh(2),
  },
  formContainer: {
    flex: 1,
  },
  sectionHeading: {
    marginTop: vh(2),
    marginBottom: vh(0.5),
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
  calendarIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#AAA',
  },
  // Error
  errorText: {
    color: colors.primary,
    fontSize: fs(12),
    marginTop: -6,
    marginBottom: 4,
    marginLeft: 4,
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
  // Date input field
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  // Continue
  buttonContainer: {
    marginTop: vh(3),
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
    paddingVertical: 3,
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
});