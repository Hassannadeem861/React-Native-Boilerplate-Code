import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';

const { width } = Dimensions.get('window');

// ── Icons (use your own assets or any icon library) ───────────────────────────
const ICON_LIKE     = require('../../assets/postImages/like.png');
const ICON_COMMENT  = require('../../assets/postImages/comment.png');
const ICON_LOCATION = require('../../assets/postImages/location.png');
const ICON_MORE     = require('../../assets/postImages/dots.png'); 

// ─────────────────────────────────────────────────────────────────────────────
const PostCard = ({
  avatar,         
  name,
  location,
  timeAgo,
  caption,
  postImage,        
  likeCount,
  commentCount,
  onLike,
  onComment,
  onMore,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike && onLike(!liked);
  };

  return (
    <View style={styles.card}>

      {/* ── Header ──────────────────────────────────────── */}
      <View style={styles.header}>

        {/* Left: Avatar + Name + Location */}
        <View style={styles.headerLeft}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.locationRow}>
              <Image source={ICON_LOCATION} style={styles.locationIcon} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>
        </View>

        {/* Right: Time + More icon */}
        <View style={styles.headerRight}>
          <Text style={styles.timeText}>{timeAgo}</Text>
          {/* <TouchableOpacity onPress={onMore} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image source={ICON_MORE} style={styles.moreIcon} />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* ── Caption ─────────────────────────────────────── */}
      {caption ? (
        <Text style={styles.caption}>{caption}</Text>
      ) : null}

      {/* ── Post Image ──────────────────────────────────── */}
      {postImage ? (
        <Image source={postImage} style={styles.postImage} resizeMode="cover" />
      ) : null}

      {/* ── Footer ──────────────────────────────────────── */}
      <View style={styles.footer}>

        {/* Like + Comment buttons */}
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleLike} activeOpacity={0.7}>
            <Image
              source={ICON_LIKE}
              style={[styles.actionIcon, liked && styles.likedIcon]}
            />
            <Text style={[styles.actionText, liked && styles.likedText]}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={onComment} activeOpacity={0.7}>
            <Image source={ICON_COMMENT} style={styles.actionIcon} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
        </View>

        {/* Comment count */}
        <Text style={styles.commentCount}>{commentCount} Comments</Text>
      </View>

    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    // backgroundColor: '#F2F2F2',
    borderRadius: 16,
    marginBottom: vh(2),
    overflow: 'hidden',
    // Shadow
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingTop: vh(1.5),
    paddingBottom: vh(1),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: vw(3),
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: fs(15),
    fontFamily: FONTS.display_medium,
    color: '#111',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#E01F00',
  },
  locationText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: '#E01F00',
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  timeText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: '#999',
  },
  moreIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#555',
  },

  // ── Caption ───────────────────────────────────────────────
  caption: {
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#222',
    paddingHorizontal: vw(4),
    paddingBottom: vh(1.2),
    lineHeight: fs(20),
  },

  // ── Post Image ────────────────────────────────────────────
  postImage: {
    width: '100%',
    height: width * 0.58,
    backgroundColor: '#f0f0f0',
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.4),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(4),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#555',
  },
  likedIcon: {
    tintColor: '#E01F00',
  },
  actionText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#555',
  },
  likedText: {
    color: '#E01F00',
  },
  commentCount: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#888',
  },
});