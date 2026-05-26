import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/color';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const SplashScreen = () => {
  const navigation = useNavigation();

 
  useEffect(() => {
    const timer = setTimeout(async () => {
      navigation.navigate("login");

    //   const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
    //  console.log("hasSeenIntro: ", hasSeenIntro)
      // if (hasSeenIntro) {
      //   navigation.navigate("bottom_tab");
      // } else {
      //   navigation.navigate("intro_splash_screen");
      // }
    }, 3000)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash_screen_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>
        Designed for{' '}
        <Text style={styles.highlight}>automotive technicians</Text>
        {' '}to streamline their workday and increase{' '}
        <Text style={styles.highlight}>earnings</Text>.
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: vw(50),
    height: vw(50),
  },
  heading: {
    fontFamily: FONTS.display_medium,
    fontWeight: '800',
    fontSize: fs(16),
    color: colors.black,
    textAlign: 'center',
    marginTop: vh(3),
    paddingHorizontal: vw(8),
    lineHeight: fs(24),
  },
  highlight: {
    color: '#C64B09',
    fontFamily: FONTS.display_bold,
    fontWeight: '800',
  },
});
