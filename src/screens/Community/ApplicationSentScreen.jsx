import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const ApplicationSentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const company = route.params?.company || 'Central Body Works';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Green checkmark */}
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.title}>Application Sent Successfully</Text>
        <Text style={styles.subtitle}>
          Your application has been sent to {company}.
        </Text>
      </View>

      {/* Button */}
      <View style={[styles.btnWrap, { paddingBottom: insets.bottom + vh(2) }]}>
        <CustomButtom
          title="Back to Community"
          onPress={() => navigation.navigate('technician_home_screen', { screen: 'Community' })}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplicationSentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(8),
  },
  checkCircle: {
    width: vw(28),
    height: vw(28),
    borderRadius: vw(28) / 2,
    borderWidth: 3,
    borderColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vh(4),
  },
  checkMark: {
    fontSize: vw(14),
    color: '#22C55E',
    fontWeight: '700',
  },
  title: {
    fontSize: vw(6),
    fontFamily: FONTS?.display_bold,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: vh(1.5),
  },
  subtitle: {
    fontSize: vw(3.8),
    fontFamily: FONTS?.display_regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: vh(3),
  },
  btnWrap: {
    paddingHorizontal: vw(5),
    paddingTop: vh(1),
  },
});
