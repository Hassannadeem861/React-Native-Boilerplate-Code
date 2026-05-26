import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';

const ClientTermsAndConditionScreen = () => {
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
        <Text style={styles.mainTitle}>Terms & Conditions</Text>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Lectus ultricies id sit dui
          lorem sem feugiat massa integer. Magna a fermentum lectus tempus nibh
          lacinia pharetra commodo. Urna nam pretium aliquet nam quis duis luctus
          pellentesque id. Nulla dignissim suspendisse et dolor facilisis euismod.
          Tellus at pellentesque est eleifend elit convallis neque. A nisi erat
          amet blandit in rhoncus morbi. Mi luctus risus donec pharetra neque.
          Mattis donec porta nascetur aenean nisl. Risus consequat urna phasellus
          facilisis. Est porttitor est massa dui. Pellentesque diam amet lectus
          nec elit et platea rhoncus id. Elit duis orci non volutpat. Purus ultrices
          donec habitasse nunc aliquet. Et facilisi id at ac scelerisque netus
          ultrices massa. Pharetra eget eget rhoncus sit. Tempus phasellus integer
          orci molestie tincidunt sed eu sem rhoncus. Amet dolor vitae ac eu et.
          Adipiscing fusce viverra sed amet phasellus. Morbi quam cursus placerat
          varius odio sit ipsum fringilla. Porttitor dui ac blandit integer sem
          lectus. Tortor vivamus et morbi mattis ac turpis bibendum lorem etiam.
          Morbi egestas sit consectetur venenatis amet venenatis imperdiet bibendum.
          Mauris montes consequat aliquam quis phasellus donec. Vitae in aliquet
          viverra lacus vel pretium orci in vel. Ut consequat nam a orci vestibulum.
          Viverra erat egestas tincidunt pellentesque diam ut neque mollis amet.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientTermsAndConditionScreen;

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
  description: {
    fontSize: 14,
    fontFamily: FONTS.display_regular,
    color: colors.description,
    lineHeight: 22,
    marginBottom: 13,
  },
});
