import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';

const ClientPrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <MainHeader />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Privacy Policy</Text>

        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.heading}>2. Use of the Service</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.heading}>3. Privacy Policy</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={styles.heading}>4. Termination</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientPrivacyPolicyScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  headerContainer: { paddingHorizontal: 16, paddingTop: 4 },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  mainTitle: {
    fontSize: 28,
    fontFamily: FONTS.display_bold,
    color: colors.black,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.display_bold,
    color: colors.black,
    marginTop: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.display_regular,
    color: colors.description,
    lineHeight: 22,
    marginBottom: 13,
  },
});
