import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import colors from '../../utils/color.js';
import { ROLES } from '../../utils/helper.js';
import { useRole } from '../../utils/RoleContext.js';
import SuccessImage from '../../assets/membershipIcon.png';

const MemberShipActivated = ({ route }) => {
  const navigation = useNavigation();
  const { setProfileComplete } = useRole();
  const { userType } = route?.params || {};

  const handleContinue = () => {
    // Mark profile as complete (in-memory for dev)
    setProfileComplete(true);
    navigation.navigate('technician_home_screen', {
      userType: userType || ROLES.TECHNICIAN,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={SuccessImage} style={styles.successImage} />
        <Text style={styles.title}>Membership Activated</Text>
      </View>

      <View style={styles.bottomButtonContainer}>
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          // backgroundColor={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

export default MemberShipActivated;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successImage: {
    width: 130,
    height: 130,
    marginBottom: 28,
    resizeMode: 'contain',
    // backgroundColor:"red"
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
});
