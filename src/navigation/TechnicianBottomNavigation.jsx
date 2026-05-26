import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsTechnician } from '../navigation/TechnicianBottomRoutes.jsx';
import Color from '../utils/color.js';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ icon_fill, icon_outline, label, focused }) => {

  return (
    <View style={[styles.tabItemContent, { width: width * 0.2 }]}>
      {/* Top indicator line */}
      <View style={{
        height: 4,
        width: 35,
        borderRadius: 2,
        backgroundColor: focused ? Color.primary[0] : 'transparent',
        position: 'absolute',
        bottom: 45,
      }} />
      <View style={styles.iconWrapper}>
        <Image
          source={focused ? icon_outline : icon_outline}
          style={[
            styles.tabIcon,
            {
              tintColor: focused ? Color.primary[0] : 'black',
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={2}
        style={[
          styles.label,
          { color: focused ? Color.primary[0] : 'black' },
        ]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </View>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          lazy: false,
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          tabBarActiveBackgroundColor: 'transparent',
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarIndicatorStyle: { height: 0 },
        }
      }
    >
      {BottomTabsTechnician?.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
                style={[props.style, { backgroundColor: 'transparent' }]}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <CustomTabBarIcon
                  // icon_fill={screen.icon_fill}
                  icon_outline={screen.icon_outline}
                  label={screen.label}
                  focused={focused}
                />
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation

const styles = StyleSheet.create({

  tabBar: {
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: 'blue',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // shadowColor: Color.WHITE,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.65,
    elevation: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  tabItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 100,
    gap: 5,
    marginBottom: 20,
    paddingHorizontal: 12,
  },

  iconWrapper: {
    height: 30,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcon: {
    width: 28,
    height: 28,
  },

  label: {
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 10,
  },

});