import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

const galleryIcon = require('../../assets/CommunityImages/gallery.png');
const user = require('../../assets/CommunityImages/user.png');

const CreatePost = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState('');
  const [location, setLocation] = useState('');

  const handlePost = () => {
    console.log({ text, photos, location });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + vh(14) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button*/}
          <CustomHeader onPress={() => navigation.goBack()} />

          <View style={styles.headingWrapper}>
            <CustomHeading heading="Create Post" />
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* User row */}
            <View style={styles.userRow}>
              <Image source={user} style={styles.avatar} />
              <Text style={styles.userName}>Luis Garcia</Text>
            </View>

            {/* What's on your mind */}
            <CustomInput
              placeholder="What's on your mind?"
              value={text}
              onChangeText={setText}
              multiline
            />

            {/* Add Photos */}
            <CustomInput
              placeholder="Add Photos"
              value={photos}
              onChangeText={setPhotos}
              image={galleryIcon}
            />

            {/* Location */}
            <CustomInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </ScrollView>

        {/* Post button */}
        <View
          style={[
            styles.buttonWrapper,
            { bottom: insets.bottom + vh(2) },
          ]}
        >
          <CustomButtom title="Post" onPress={handlePost} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: vw(4),
    paddingTop: vh(1),
  },
  headingWrapper: {
    marginVertical: vh(1),
  },
  card: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: vw(3),
    padding: vw(4),
    backgroundColor: "#FDFDFD",
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh(1),
  },
  avatar: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(10) / 2,
    marginRight: vw(3),
  },
  userName: {
    fontSize: vw(4.2),
    color: '#000',
    fontFamily: FONTS?.semiBold || undefined,
    fontWeight: '600',
  },
  buttonWrapper: {
    position: 'absolute',
    left: vw(4),
    right: vw(4),
  },
});