import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import UploadImageComponent from '../../components/UploadImageComponent/UploadImageComponent.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { profileUpdateAsync } from '../../redux/Services/authService.js';
import { ROLES } from '../../utils/helper.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const ClientProfileUpload = ({ route }) => {
  const navigation = useNavigation();
  const routeParams = useRoute();
  const { userType } = route?.params || {};
  const selectedEmoji = routeParams?.params?.selectedEmoji || null;

  const onboardingMessage =
    'You are in onboarding flow. Please complete this step and continue.';

  const [profileImageUrl, setProfileImageUrl] = useState('');

  const handleImageUpload = (imageUri, mediaType) => {
    setProfileImageUrl(imageUri);
  };

  const handleNext = () => {
    navigation.navigate('profile_ready', { userType });
  };

  const handleBlockedBack = () => {
    Alert.alert('Please Continue', onboardingMessage);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.backButtoncontainer}>
                <MainHeader onBackPress={handleBlockedBack} />
              </View>

              <View style={styles.container}>
                <CustomHeading
                  containerStyle={styles.textContainer}
                  heading="Upload Photo"
                  paragraph="Upload your photo"
                  color={colors.black}
                  paragraphColor={colors.description}
                  center={false}
                  headingFontSize={28}
                  paragraphFontSize={14}
                  headingFontFamily={FONTS.display_medium}
                  paragraphFontFamily={FONTS.display_regular}
                />
                <View style={{ paddingHorizontal: 20 }}>
                  <View style={{ marginTop: '5%' }}>
                    {/* Photo upload box — hidden when emoji selected */}
                    {!selectedEmoji && (
                      <View style={{ width: '100%', height: 390 }}>
                        <UploadImageComponent
                          onImageSelect={handleImageUpload}
                          mediaType="photo"
                        />
                      </View>
                    )}

                    {/* Emoji preview — shown when emoji selected */}
                    {selectedEmoji && (
                      <View style={styles.emojiPreview}>
                        <Image source={selectedEmoji} style={styles.emojiImage} resizeMode="contain" />
                      </View>
                    )}

                    {/* Or + Choose Emoji */}
                    <View style={styles.orRow}>
                      <View style={styles.orLine} />
                      <Text style={styles.orText}>Or</Text>
                      <View style={styles.orLine} />
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('choose_emoji', { userType })}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.chooseEmojiText}>Choose Emoji</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
              <CustomButton
                onPress={handleNext}
                title={'Continue'}
                // title={isLoading ? 'Saving...' : 'Continue'}
                // disabled={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ClientProfileUpload;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: vw(2),
    paddingVertical: vh(2),
  },
  backButtoncontainer: {
    padding: 10,
  },
   container: {
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emojiPreview: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: '#FFF5F4',
    borderWidth: 2,
    borderColor: '#E01F00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  emojiImage: {
    width: vw(40),
    height: vw(40),
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(2.5),
    marginBottom: vh(1),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    fontWeight: '400',
    color: '#888',
    marginHorizontal: 12,
  },
  chooseEmojiText: {
    fontSize: fs(16),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
});
