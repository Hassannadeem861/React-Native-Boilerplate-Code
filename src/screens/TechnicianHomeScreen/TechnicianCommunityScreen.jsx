import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomButtom from '../../components/CustomButton/CustomButton.jsx';
import PostCard from '../../components/CustomPost/CustomPost.jsx';
import { vh, vw } from '../../utils/responsive.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRole } from '../../utils/RoleContext.js';
import { ROLES } from '../../utils/helper.js';

const notificationIcon = require('../../assets/TaskImages/notification.png');
const searchIcon = require('../../assets/TaskImages/search.png');
const menuIcon = require('../../assets/newIcon/menu.png');
const logoImg = require('../../assets/splash_screen_logo.png');
const crossIcon = require('../../assets/newIcon/crossIcon.png');
const userAvatar = require('../../assets/CommunityImages/user.png');
const drawer1 = require('../../assets/newIcon/Drawer1.png');
const drawer2 = require('../../assets/newIcon/Drawer2.png');
const drawer3 = require('../../assets/newIcon/Drawer3.png');
const drawer4 = require('../../assets/newIcon/Drawer4.png');
const logoutIcon = require('../../assets/TechnicianSettingImages/Logout.png');

const DRAWER_WIDTH = Dimensions.get('window').width * 0.78;

const POSTS = [
  {
    id: '1',
    userName: 'Luis Garcia',
    location: 'Central Body Works',
    timeAgo: '2 hours ago',
    content: 'Just wrapped up a full clear coat job on this bumper today',
    postImage: require('../../assets/CommunityImages/bumper.png'),
    likes: 0,
    comments: 25,
    image: require('../../assets/CommunityImages/user.png'),
  },
  {
    id: '2',
    userName: 'Luis Garcia',
    location: 'Central Body Works',
    timeAgo: '2 hours ago',
    content: 'Just wrapped up a full clear coat job on this bumper today',
    postImage: require('../../assets/CommunityImages/bumper.png'),
    likes: 0,
    comments: 25,
    image: require('../../assets/CommunityImages/user.png'),
  },
];

const TechnicianCommunityScreen = () => {
  const navigation = useNavigation();
  const { role } = useRole();
  const isMarketplace = role === ROLES.TECHNICIAN_MARKETPLACE;
  const [search, setSearch] = useState('');
  const tabBarHeight = useBottomTabBarHeight();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 240,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const drawerItems = [
    { label: 'Market Place', icon: drawer1, route: 'market_place' },
    { label: 'Job Offers', icon: drawer2, route: 'job_offers' },
    { label: 'Terms & Conditions', icon: drawer3, route: 'terms_conditions' },
    { label: 'Privacy Policy', icon: drawer4, route: 'privacy_policy' },
  ];

  const handleDrawerNav = (route) => {
    closeDrawer();
    setTimeout(() => navigation.navigate(route), 260);
  };

  const handleCreatePost = () => {
    navigation.navigate('create_post');
  };

  const renderHeader = () => (
    <View style={styles.headerBlock}>
      <View style={styles.headerTopRow}>
        {isMarketplace ? (
          <TouchableOpacity onPress={openDrawer} activeOpacity={0.7}>
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.menuIcon} />
        )}
        <TouchableOpacity style={styles.bellWrapper} activeOpacity={0.7}>
          <Image source={notificationIcon} style={styles.bellIcon} />
        </TouchableOpacity>
      </View>
      <CustomHeading
        heading="Community"
        paragraph="Connect, learn, and grow with other technicians & Owners"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Sidebar Drawer ── */}
      <Modal visible={drawerOpen} transparent animationType="none" onRequestClose={closeDrawer}>
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={closeDrawer} activeOpacity={0.7}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>

            {/* Logo */}
            <Image source={logoImg} style={styles.drawerLogo} resizeMode="contain" />

            {/* User */}
            <View style={styles.drawerUser}>
              <Image source={userAvatar} style={styles.drawerAvatar} />
              <View>
                <Text style={styles.drawerUserName}>John Doe</Text>
                <Text style={styles.drawerUserRole}>Painter</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.drawerDivider} />

            {/* Menu items */}
            <View style={styles.drawerMenu}>
              {drawerItems.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.drawerItem}
                  onPress={() => handleDrawerNav(item.route)}
                  activeOpacity={0.7}
                >
                  <Image source={item.icon} style={styles.drawerItemIcon} resizeMode="contain" />
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout */}
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.drawerItem} activeOpacity={0.7}>
              <Image source={logoutIcon} style={styles.drawerItemIcon} resizeMode="contain" />
              <Text style={[styles.drawerItemText, { color: '#E01F00' }]}>Logout</Text>
            </TouchableOpacity>
            <View style={{ height: vh(4) }} />
          </Animated.View>

          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <View style={styles.drawerBackdrop} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <View style={styles.contentWrapper}>
        <FlatList
          data={POSTS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: tabBarHeight + vh(10) },
          ]}
          ListHeaderComponent={
            <>
              {renderHeader()}
              <View style={styles.searchWrapper}>
                <CustomInput
                  placeholder="Search"
                  value={search}
                  onChangeText={setSearch}
                  image={searchIcon}
                />
              </View>
            </>
          }
          renderItem={({ item }) => (
            <PostCard
              avatar={item.image}
              name={item.userName}
              location={item.location}
              timeAgo={item.timeAgo}
              caption={item.content}
              postImage={item.postImage}
              likeCount={item.likes}
              commentCount={item.comments}
              onLike={(liked) => console.log(`Post ${item.id} liked:`, liked)}
              onComment={() => console.log(`Open comments for post ${item.id}`)}
              onMore={() => console.log(`More options for post ${item.id}`)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: vh(1.5) }} />}
        />

        <View
          style={[
            styles.buttonWrapper,
            { bottom: tabBarHeight + vh(1) },
          ]}
        >
          <CustomButtom title="Create Post" onPress={handleCreatePost} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TechnicianCommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: vw(4),
  },
  listContent: {
    paddingBottom: vh(12),
  },
  headerBlock: {
    marginTop: vh(1),
    marginBottom: vh(2),
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(1.2),
  },
  menuIcon: {
    width: vw(6),
    height: vw(6),
    resizeMode: 'contain',
    tintColor: '#E01F00',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: vh(1),
    marginBottom: vh(2),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(2),
    marginLeft: vw(2),
  },
  bellWrapper: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(11) / 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
  searchWrapper: {
    marginBottom: vh(2),
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: vh(2),
    left: vw(4),
    right: vw(4),
  },
  // ── Drawer ──
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: vw(5),
    paddingTop: vh(5),
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  closeBtn: {
    position: 'absolute',
    top: vh(4),
    right: vw(4),
    padding: 6,
  },
  closeIcon: {
    width: vw(5),
    height: vw(5),
    resizeMode: 'contain',
  },
  drawerLogo: {
    width: vw(22),
    height: vw(22),
    marginBottom: vh(2),
    alignSelf: 'flex-start',
  },
  drawerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(3),
    marginBottom: vh(2),
  },
  drawerAvatar: {
    width: vw(13),
    height: vw(13),
    borderRadius: vw(13) / 2,
  },
  drawerUserName: {
    fontSize: vw(4.5),
    fontFamily: FONTS?.display_bold,
    fontWeight: '700',
    color: '#000',
  },
  drawerUserRole: {
    fontSize: vw(3.4),
    fontFamily: FONTS?.display_regular,
    color: '#888',
    marginTop: 2,
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: vh(2),
  },
  drawerMenu: {
    gap: vh(0.5),
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(4),
    paddingVertical: vh(1.8),
  },
  drawerItemIcon: {
    width: vw(6),
    height: vw(6),
  },
  drawerItemText: {
    fontSize: vw(4),
    fontFamily: FONTS?.display_medium,
    color: '#222',
  },
});