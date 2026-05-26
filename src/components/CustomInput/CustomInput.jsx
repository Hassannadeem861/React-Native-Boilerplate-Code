import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';

const InputField = ({
  islabelshown,
  label,
  placeholder,
  icon,
  isPassword,
  disabled,
  onChange,
  onChangeText,
  style,
  numberOfLines,
  iconType,
  multiline,
  value,
  keyboardType,
  image,
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View style={styles.container}>
      {islabelshown && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          multiline && styles.inputContainerMultiline,
        ]}
      >
        {icon && (
          <FontAwesome
            name={icon}
            size={20}
            color={colors.white}
            style={styles.icon}
          />
        )}
        {image && <Image source={image} style={[styles.image, isPassword && styles.imageGray]} />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          style={[styles.input, style, multiline && styles.inputMultiline]}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          editable={!disabled}
          onChangeText={onChangeText || onChange}
          value={value}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}

        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Image
              source={require('../../assets/eye.png')}
              style={[styles.eyeIcon, !isSecure && styles.eyeIconActive]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    // paddingHorizontal: 20,
  },
  label: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '400',
    // fontFamily: FONTS.display_regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 18 : 10,
    fontFamily: FONTS.display_regular,
  },
  inputContainerMultiline: {
    alignItems: 'flex-start',
    minHeight: 100,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  image: {
    marginRight: 10,
    marginLeft: 5,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  imageGray: {
    tintColor: '#AAA',
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 14,
    fontFamily: FONTS.display_regular,
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 8,
  },
  eyeIcon: {
    marginLeft: 10,
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#AAA',
  },
  eyeIconActive: {
    tintColor: '#555',
  },
});
