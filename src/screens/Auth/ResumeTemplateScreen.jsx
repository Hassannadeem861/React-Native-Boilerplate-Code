import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';
import colors from '../../utils/color.js';


const TEMPLATES = [
  {
    id: 'modern',
    title: 'Modern Professional',
    description: 'Clean and minimal layout, perfect for corporate and formal roles.',
    bullets: ['Simple & elegant design', 'Easy to read structure', 'Best for office jobs'],
  },
  {
    id: 'creative',
    title: 'Creative Edge',
    description: 'Stylish and bold layout for showcasing personality and skills.',
    bullets: ['Visually engaging design', 'Great for creative fields', 'Highlights skills & experience'],
  },
];

const ResumeTemplateScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('modern');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            <MainHeader onBackPress={() => navigation.goBack()} />

            <CustomHeading
              containerStyle={styles.textContainer}
              heading="Choose Your Resume Template"
              paragraph="Select a design that best represents your profile. You can preview both templates before finalizing."
              color={colors.black}
              paragraphColor={colors.description}
              center={false}
              headingFontSize={28}
              paragraphFontSize={14}
              headingFontFamily={FONTS.display_medium}
              paragraphFontFamily={FONTS.display_regular}
            />

            {TEMPLATES.map((t) => {
              const isSelected = selected === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSelected(t.id)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {t.title}
                  </Text>
                  <Text style={styles.cardDesc}>{t.description}</Text>
                  <View style={styles.bulletList}>
                    {t.bullets.map((b) => (
                      <Text key={b} style={styles.bullet}>{'\u2022  '}{b}</Text>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}

          </View>
        </ScrollView>

        <View style={styles.footer}>
          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate('ProfilePreview', { template: selected })}
            // backgroundColor={colors.primary}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResumeTemplateScreen;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: vh(2),
  },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingBottom: vh(2) },
  container: { paddingHorizontal: vw(5), paddingBottom: vh(2) },
  heading: {
    fontSize: fs(26),
    fontFamily: FONTS.display_bold,
    color: '#111',
    marginTop: vh(1),
    marginBottom: vh(1),
  },
  subheading: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#666',
    marginBottom: vh(2.5),
    lineHeight: 20,
  },
  card: {
    borderWidth: 1.5,
    borderColor: colors.gray,
    borderRadius: 14,
    padding: vw(4.5),
    marginBottom: vh(2),
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: "red",
    backgroundColor: '#FFF5F5',
  },
  cardTitle: {
    fontSize: fs(15),
    fontFamily: FONTS.display_bold,
    color: '#111',
    fontWeight: '700',
    marginBottom: 6,
  },
  cardTitleSelected: {
    color: colors.primary,
  },
  cardDesc: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
    marginBottom: 10,
  },
  bulletList: { gap: 4 },
  bullet: {
    fontSize: fs(12.5),
    fontFamily: FONTS.display_regular,
    color: '#555',
  },
  footer: {
    paddingHorizontal: vw(5),
    paddingBottom: Platform.OS === 'ios' ? vh(3) : vh(2),
    paddingTop: vh(1),
    backgroundColor: '#fff',
  },
});