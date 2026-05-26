import TechnicianHomeScreen from '../screens/TechnicianHomeScreen/TechnicianHomeScreen.jsx';
import TechnicianEarningScreen from '../screens/TechnicianHomeScreen/TechnicianEarningScreen.jsx';
import TechnicianCommunityScreen from '../screens/TechnicianHomeScreen/TechnicianCommunityScreen.jsx';
import TechnicianTasksScreen from '../screens/TechnicianHomeScreen/TechnicianTasksScreen.jsx';
import TechnicianSettingScreen from '../screens/TechnicianHomeScreen/TechnicianSettingsScreen.jsx';
import technicianHomeIcons from '../utils/technicianHomeicon.js';

export const BottomTabsTechnician = [
  {
    name: 'Home',
    component: TechnicianHomeScreen,
    icon_outline: technicianHomeIcons.HOME_OUTLINE,
    label: "Home",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Earnings',
    component: TechnicianEarningScreen,
    icon_outline: technicianHomeIcons.EARNING_OUTLINE,
    label: "Earnings",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Community',
    component: TechnicianCommunityScreen,
    icon_outline: technicianHomeIcons.COMMUNITY_OUTLINE,
    label: "Community",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Tasks',
    component: TechnicianTasksScreen,
    icon_outline: technicianHomeIcons.TASK_OUTLINE,
    label: "Tasks",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Settings',
    component: TechnicianSettingScreen,
    icon_outline: technicianHomeIcons.ACCOUNT_OUTLINE,
    label: "Settings",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
];
