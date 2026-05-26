import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import PostCard from '../../components/CustomPost/CustomPost.jsx'; 
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

// ── Dummy Posts Data ──────────────────────────────────────────────────────────
const DUMMY_POSTS = [
  {
    id: '1',
    avatar:       require('../../assets/TechnicianSettingImages/dummyPicture.png'),
    name:         'John Doe',
    location:     'Central Body Works',
    timeAgo:      '2 hours ago',
    caption:      'Just wrapped up a full clear coat job on this bumper today',
    postImage:    require('../../assets/postImages/car.png'), 
    likeCount:    12,
    commentCount: 25,
  },
  {
    id: '2',
    avatar:       require('../../assets/TechnicianSettingImages/dummyPicture.png'),
    name:         'John Doe',
    location:     'AutoFix Lahore',
    timeAgo:      '1 day ago',
    caption:      'Color matching done perfectly on this Honda Civic!',
    postImage:    require('../../assets/postImages/car.png'), 
    likeCount:    34,
    commentCount: 10,
  },
  {
    id: '3',
    avatar:       require('../../assets/TechnicianSettingImages/dummyPicture.png'),
    name:         'John Doe',
    location:     'SprayMasters',
    timeAgo:      '3 days ago',
    caption:      'Full body repaint on a Toyota Corolla — before & after coming soon!',
    postImage:    null, 
    likeCount:    8,
    commentCount: 3,
  },
];

// ── Screen ────────────────────────────────────────────────────────────────────
const TechnicianMyPost = () => {
  const navigation = useNavigation();

  const renderPost = ({ item }) => (
    <PostCard
      avatar={item.avatar}
      name={item.name}
      location={item.location}
      timeAgo={item.timeAgo}
      caption={item.caption}
      postImage={item.postImage}
      likeCount={item.likeCount}
      commentCount={item.commentCount}
      onLike={(liked) => console.log(`Post ${item.id} liked:`, liked)}
      onComment={() => console.log(`Open comments for post ${item.id}`)}
      onMore={() => console.log(`More options for post ${item.id}`)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.headerWrap}>
        <CustomHeader onBackPress={() => navigation.goBack()} />
        <Text style={styles.screenTitle}>My Posts</Text>
      </View>

      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No posts yet.</Text>
          </View>
        }
      />

    </SafeAreaView>
  );
};

export default TechnicianMyPost;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrap: {
    backgroundColor: '#fff',
    paddingHorizontal: vw(5),
    paddingBottom: vh(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  screenTitle: {
    fontSize: fs(26),
    fontFamily: FONTS.display_medium,
    color: '#111',
    marginTop: vh(0.5),
  },
  listContent: {
    paddingHorizontal: vw(4),
    paddingTop: vh(2),
    paddingBottom: vh(4),
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: vh(10),
  },
  emptyText: {
    fontSize: fs(15),
    fontFamily: FONTS.display_regular,
    color: '#999',
  },
});