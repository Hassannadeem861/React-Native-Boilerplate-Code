import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  backgroundColor = null,
  textColor,
}) => {
  // If backgroundColor is provided, use solid color instead of gradient
  if (backgroundColor) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          styles.button,
          style,
          {
            backgroundColor: disabled ? '#ccc' : backgroundColor,
            padding: 20,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor || colors.white }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Default gradient behavior
  return (
    <LinearGradient
      colors={disabled ? ['#ccc', '#ccc'] : ['#E01F00', '#9F1600']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.button, style, { padding: 0, width: '100%' }]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={{
          padding: 20,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    color: colors.white,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    // fontFamily: FONTS.display_medium,
    fontWeight: '600',
  },
});

export default CustomButton;
