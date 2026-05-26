import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import { ICON } from '../../utils/authImages.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { ROLES } from '../../utils/helper.js';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { fs, vh, vw } from '../../utils/responsive.js';
// import { getValidationSchema } from '../../utils/validationSchema.js';
// import { ResetPasswordAsync } from '../../redux/Services/authService.js';
// import { asyncStatus } from '../../utils/asyncStatus.js';
// import { setrResetpasswordStatus } from '../../redux/Slices/authSlice.js';

const CreatenewPassword = ({ route }) => {
  const { email, OTP, userType } = route.params || {};
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  const onboardingMessage =
    'You are in onboarding flow. Please complete this step and continue.';
  const [hasSubmittedReset, setHasSubmittedReset] = useState(false);

  // const { reset_password_status, reset_password_error } = useSelector(
  //   state => state?.auth || {},
  // );

  // const loader = reset_password_status === asyncStatus.LOADING;

  const errorText = (fieldName, touched, errors) => {
    if (!touched[fieldName] || !errors[fieldName]) {
      return null;
    }

    return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
  };

  const handleSubmit = (values) => {
    navigation.navigate('login', {
      userType: userType || ROLES.CLIENT,
    });
  }

  // const handleSubmit = values => {
  //   const payload = {
  //     email: email,
  //     password: values.password,
  //     confirmPassword: values.confirmPassword,
  //   };

  //   dispatch(setrResetpasswordStatus());
  //   setHasSubmittedReset(true);
  //   dispatch(ResetPasswordAsync(payload));
  // };

  // useEffect(() => {
  //   if (reset_password_status === asyncStatus.SUCCEEDED) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'Login',
  //           params: {
  //             userType: userType || ROLES.CLIENT,
  //           },
  //         },
  //       ],
  //     });
  //     dispatch(setrResetpasswordStatus());
  //     setHasSubmittedReset(false);
  //   }
  // }, [reset_password_status, userType, navigation, dispatch]);

  // useEffect(() => {
  //   if (
  //     reset_password_status === asyncStatus.ERROR &&
  //     reset_password_error &&
  //     hasSubmittedReset
  //   ) {
  //     Alert.alert('Reset Failed', reset_password_error);
  //     dispatch(setrResetpasswordStatus());
  //     setHasSubmittedReset(false);
  //   }
  // }, [reset_password_status, reset_password_error, hasSubmittedReset, dispatch]);

  const handleBlockedBack = () => {
    Alert.alert('Please Continue', onboardingMessage);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <MainHeader onBackPress={handleBlockedBack} containerStyle={{ paddingHorizontal: vw(5) }} />

            <View style={styles.container}>
              <CustomHeading
                containerStyle={styles.textContainer}
                heading="New Password"
                paragraph="Your new password should be different from the existing & previous ones."
                color={colors.black}
                paragraphColor={colors.description}
                center={false}
                headingFontSize={28}
                paragraphFontSize={14}
                headingFontFamily={FONTS.display_medium}
                paragraphFontFamily={FONTS.display_regular}
              />

              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}
                // validationSchema={getValidationSchema('reset-pass')}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  setFieldTouched,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <View style={styles.inputContainer}>
                    <View>
                      <CustomInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        isPassword={true}
                        islabelshown={false}
                        image={ICON.PASSWORD}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password', true)}
                      />
                      {/* {errorText('password', touched, errors)} */}

                      <CustomInput
                        label="Confirm Password"
                        placeholder="Enter your confirm password"
                        secureTextEntry
                        isPassword={true}
                        islabelshown={false}
                        image={ICON.PASSWORD}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword', true)}
                      />
                      {/* {errorText('confirmPassword', touched, errors)} */}
                    </View>

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        onPress={handleSubmit}
                        title={'Submit'}
                        // title={loader ? 'Submitting...' : 'Submit'}
                        // disabled={isSubmitting || loader}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatenewPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: vw(5),
    paddingBottom: vh(2.5),
  },
  textContainer: {
    marginTop: vh(2),
    marginBottom: vh(3),
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: fs(12),
    marginTop: -4,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: FONTS.display_regular,
  },
  buttonContainer: {
    marginBottom: vh(2.5),
  },
});
