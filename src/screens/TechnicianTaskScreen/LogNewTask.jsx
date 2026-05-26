import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import CalendarPicker from 'react-native-calendar-picker';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';

// ── Assets ─────────────────────────────────────────────────────────────────────
const ICON_DROPDOWN = require('../../assets/TaskImages/Vector.png');
const ICON_CALENDAR = require('../../assets/TaskImages/calendar.png');

// ── Options ────────────────────────────────────────────────────────────────────
const TASK_OPTIONS   = ['Painter', 'Prepper', 'Helper', 'Buffer', 'Body Man', 'Mechanic', 'Other'];
const STATUS_OPTIONS = ['In Progress', 'Completed'];

const INITIAL_VALUES = {
  taskName: '',
  roNumber: '',
  hours: '',
  date: '',
  status: '',
};

// ── SelectModal ────────────────────────────────────────────────────────────────
// Used for both Tasks and Status dropdowns
const SelectModal = ({ visible, title, options, selected, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.modalBox}>

        {/* Modal header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          {/* Chevron up — indicates this is the open dropdown */}
          <Image source={ICON_DROPDOWN} style={styles.modalHeaderIcon} />
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.modalItem, item === selected && styles.modalItemSelected]}
              onPress={() => { onSelect(item); onClose(); }}
              activeOpacity={0.7}
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
const DropdownField = ({ value, placeholder, onPress }) => (
  <TouchableOpacity style={styles.dropdownBox} onPress={onPress} activeOpacity={0.7}>
    <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
      {value || placeholder}
    </Text>
    <Image source={ICON_DROPDOWN} style={styles.dropdownIcon} />
  </TouchableOpacity>
);

// ── DateInputField ─────────────────────────────────────────────────────────────
const DateInputField = ({ value, placeholder, onPress }) => (
  <TouchableOpacity style={styles.dateBox} onPress={onPress} activeOpacity={0.7}>
    <Text style={value ? styles.dateValue : styles.datePlaceholder}>
      {value || placeholder}
    </Text>
    <Image source={ICON_CALENDAR} style={styles.calendarIcon} />
  </TouchableOpacity>
);

// ── Field Label ────────────────────────────────────────────────────────────────
const FieldLabel = ({ label }) => (
  <Text style={styles.fieldLabel}>{label}</Text>
);

// ── Main Screen ────────────────────────────────────────────────────────────────
const LogNewTaskScreen = () => {
  const navigation = useNavigation();

  // activeModal holds { title, options, onSelect, selected } or null
  const [activeModal, setActiveModal] = useState(null);
  const [calState, setCalState]       = useState({ visible: false, onSelect: null });

  const openCalendar = (onSelect) => setCalState({ visible: true, onSelect });
  const closeCalendar = () => setCalState({ visible: false, onSelect: null });

  const openModal = (title, options, onSelect, selected) =>
    setActiveModal({ title, options, onSelect, selected });

  const handleSubmit = (values) => {
    navigation.navigate('log_submitted', { taskData: values });
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

            {/* ── Header ── */}
            <MainHeader onBackPress={() => navigation.goBack()} />

            {/* ── Title ── */}
            <CustomHeading
              heading="Log New Task"
              containerStyle={styles.textContainer}
              headingStyle={styles.headingText}
              center={false}
            />

            {/* ── Form ── */}
            <Formik
              initialValues={INITIAL_VALUES}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                handleSubmit: formikSubmit,
              }) => (
                <View style={styles.formContainer}>

                  {/* ── Select Tasks (DROPDOWN) ── */}
                  <FieldLabel label="Select Tasks" />
                  <DropdownField
                    placeholder="Select Tasks"
                    value={values.taskName}
                    onPress={() =>
                      openModal(
                        'Select Tasks',
                        TASK_OPTIONS,
                        (v) => setFieldValue('taskName', v),
                        values.taskName,
                      )
                    }
                  />

                  {/* ── Enter RO Number ── */}
                  <FieldLabel label="Enter RO Number" />
                  <CustomInput
                    placeholder="Enter RO Number"
                    value={values.roNumber}
                    onChangeText={handleChange('roNumber')}
                    onBlur={() => setFieldTouched('roNumber', true)}
                    islabelshown={false}
                  />

                  {/* ── Enter Hours ── */}
                  <FieldLabel label="Enter Hours" />
                  <CustomInput
                    placeholder="Enter Hours"
                    value={values.hours}
                    onChangeText={handleChange('hours')}
                    onBlur={() => setFieldTouched('hours', true)}
                    keyboardType="numeric"
                    islabelshown={false}
                  />

                  {/* ── Enter Date ── */}
                  <FieldLabel label="Enter Date" />
                  <DateInputField
                    placeholder="Enter Date"
                    value={values.date}
                    onPress={() =>
                      openCalendar((d) => setFieldValue('date', d))
                    }
                  />

                  {/* ── Status (DROPDOWN) ── */}
                  <FieldLabel label="Status" />
                  <DropdownField
                    placeholder="Select Status"
                    value={values.status}
                    onPress={() =>
                      openModal(
                        'Select Status',
                        STATUS_OPTIONS,
                        (v) => setFieldValue('status', v),
                        values.status,
                      )
                    }
                  />

                  {/* ── Submit ── */}
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      title="Submit"
                      onPress={formikSubmit}
                      disabled={isSubmitting}
                    />
                  </View>

                </View>
              )}
            </Formik>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Select Modal (Tasks or Status) ── */}
      {activeModal && (
        <SelectModal
          visible={!!activeModal}
          title={activeModal.title}
          options={activeModal.options}
          selected={activeModal.selected}
          onSelect={activeModal.onSelect}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* ── Calendar Overlay ── */}
      {calState.visible && (
        <Pressable style={styles.calendarOverlay} onPress={closeCalendar}>
          <Pressable style={styles.calendarBox} onPress={(e) => e.stopPropagation()}>
            <CalendarPicker
              onDateChange={(date) => {
                if (typeof calState.onSelect === 'function' && date) {
                  if (typeof date.format === 'function') {
                    calState.onSelect(date.format('DD/MM/YYYY'));
                  } else {
                    const d     = new Date(date);
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

export default LogNewTaskScreen;

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
  textContainer: {
    marginBottom: vh(2),
    marginTop: vh(1),
  },
  headingText: {
    fontSize: fs(26),
    fontFamily: FONTS.display_bold,
    color: '#111',
  },
  formContainer: {
    flex: 1,
  },

  // ── Field Label ────
  fieldLabel: {
    fontSize: fs(14),
    fontFamily: FONTS.display_medium,
    color: '#111',
    fontWeight: '600',
    marginBottom: -4,
    marginTop: vh(1),
  },

  // ── Dropdown ────
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
    backgroundColor: '#fafafa',
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
    tintColor: '#E01F00',
  },

  // ── Date Input ────
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: vw(4),
    paddingVertical: Platform.OS === 'ios' ? 18 : 14,
    marginVertical: 10,
    backgroundColor: '#fafafa',
  },
  dateValue: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  datePlaceholder: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#AAA',
  },
  calendarIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#E01F00',
  },

  // ── Submit Button ────
  buttonContainer: {
    marginTop: vh(3),
  },

  // ── Modal ────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: vw(5),
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    maxHeight: vh(55),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: fs(15),
    fontFamily: FONTS.display_bold,
    color: '#111',
    fontWeight: '700',
  },
  modalHeaderIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#E01F00',
    transform: [{ rotate: '180deg' }], // chevron up = open state
  },
  modalItem: {
    paddingVertical: vh(2),
    paddingHorizontal: vw(5),
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  modalItemSelected: {
    backgroundColor: '#FFF2F0',
  },
  modalItemText: {
    fontSize: fs(15),
    fontFamily: FONTS.display_regular,
    color: '#333',
  },
  modalItemTextSelected: {
    color: '#E01F00',
    fontFamily: FONTS.display_medium,
    fontWeight: '600',
  },

  // ── Calendar Overlay ────
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
});