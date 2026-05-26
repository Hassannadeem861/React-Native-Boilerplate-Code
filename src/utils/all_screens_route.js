// ── Public / Auth Screens ─────────────────────────────────────────────────────
import SplashScreen from '../screens/StartScreens/SplashScreen';
// import OnboardingScreen from '../screens/StartScreens/OnboardingScreen';
// import Login from '../screens/Auth/Login';
// import SignUp from '../screens/Auth/Signup';
// import ForgotPassword from '../screens/Auth/ForgotPassword';
// import VerifyOtp from '../screens/Auth/VerifyOtp';
// import CreateNewPassword from '../screens/Auth/CreateNewPassword';

// ── Technician Profile Setup ──────────────────────────────────────────────────
// import CreateTechnicianProfile from '../screens/Auth/CreateTechnicianProfile';
// import ProfileUpload from '../screens/Auth/ProfileUpload';

// ── Technician Private Screens ────────────────────────────────────────────────
// import TechnicianMainScreen from '../screens/MainScreen/TechnicianMainScreen';
// import TechnicianHomeScreen from '../screens/TechnicianScreens/HomeScreen/TechnicianHomeScreen';
// import TechnicianBookingsScreen from '../screens/TechnicianScreens/BookingsScreen/TechnicianBookingsScreen';
// import TechnicianMessagesScreen from '../screens/TechnicianScreens/MessagesScreen/TechnicianMessagesScreen';
// import TechnicianChatScreen from '../screens/TechnicianScreens/ChatScreen/TechnicianChatScreen';
// import TechnicianSettingScreen from '../screens/TechnicianScreens/SettingScreen/TechnicianSettingScreen';

import { ROLES } from './helper';

// ─── User status enum ─────────────────────────────────────────────────────────
// Add new statuses here as the app grows — never hard-code status strings elsewhere.

export const USER_STATUS = {
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
    PROFILE_INCOMPLETE: 'PROFILE_INCOMPLETE',
    TECHNICIAN_VERIFIED: 'TECHNICIAN_VERIFIED',
};

export const all_screens = {

    // ── Always accessible (no auth required) ──────────────────────────────
    PUBLIC: [
        { name: 'Splash', Screen_Component: SplashScreen, header_shown: false },
        // { name: 'OnboardingScreen', Screen_Component: OnboardingScreen, header_shown: false },
        // { name: 'Login', Screen_Component: Login, header_shown: false },
        // { name: 'SignUp', Screen_Component: SignUp, header_shown: false },
        // { name: 'ForgotPassword', Screen_Component: ForgotPassword, header_shown: false },
        // { name: 'VerifyOtp', Screen_Component: VerifyOtp, header_shown: false },
        // { name: 'CreateNewPassword', Screen_Component: CreateNewPassword, header_shown: false },
    ],

    // ── Email not yet verified ────────────────────────────────────────────
    VERIFICATION: [
        // { name: 'VerifyOtp', Screen_Component: VerifyOtp, header_shown: false },
    ],

    // ── Technician profile setup (email verified, profile incomplete) ─────
    TECHNICIAN_PROFILE_SETUP: [
        // { name: 'CreateTechnicianProfile', Screen_Component: CreateTechnicianProfile, header_shown: false },
        // { name: 'ProfileUpload', Screen_Component: ProfileUpload, header_shown: false },
    ],

    // ── Fully verified technician ─────────────────────────────────────────
    TECHNICIAN_PRIVATE: [
        // { name: 'TechnicianMainScreen', Screen_Component: TechnicianMainScreen, header_shown: false },
        // { name: 'TechnicianHomeScreen', Screen_Component: TechnicianHomeScreen, header_shown: false },
        // { name: 'TechnicianBookingsScreen', Screen_Component: TechnicianBookingsScreen, header_shown: false },
        // { name: 'TechnicianMessagesScreen', Screen_Component: TechnicianMessagesScreen, header_shown: false },
        // { name: 'TechnicianChatScreen', Screen_Component: TechnicianChatScreen, header_shown: false },
        // { name: 'TechnicianSettingScreen', Screen_Component: TechnicianSettingScreen, header_shown: false },
    ],
};

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export const getUserCompletionStatus = (user_data) => {
    if (__DEV__) console.log('[getUserCompletionStatus] user_data:', user_data);

    const userId = user_data?.user?.id || user_data?.user?._id;
    if (!userId) {
        return USER_STATUS.NOT_AUTHENTICATED;
    }

    const user = user_data.user;

    if (user?.isEmailVerified === false) {
        return USER_STATUS.EMAIL_NOT_VERIFIED;
    }

    // TODO: [FUNCTIONAL] Confirm exact field name from body shop API response.
    // Expected: istechnicianprofilecompleted (matches realtor naming convention)
    const isProfileComplete = user?.istechnicianprofilecompleted === true;
    if (!isProfileComplete) {
        return USER_STATUS.PROFILE_INCOMPLETE;
    }

    return USER_STATUS.TECHNICIAN_VERIFIED;
};

export const getAvailableScreens = (userStatus) => {
    switch (userStatus) {
        case USER_STATUS.NOT_AUTHENTICATED:
            return [...all_screens.PUBLIC];

        case USER_STATUS.EMAIL_NOT_VERIFIED:
            return [
                ...all_screens.PUBLIC,
                ...all_screens.VERIFICATION,
            ];

        case USER_STATUS.PROFILE_INCOMPLETE:
            return [
                ...all_screens.PUBLIC,
                ...all_screens.TECHNICIAN_PROFILE_SETUP,
            ];

        case USER_STATUS.TECHNICIAN_VERIFIED:
            return [
                ...all_screens.PUBLIC,
                ...all_screens.TECHNICIAN_PRIVATE,
            ];

        default:
            return [...all_screens.PUBLIC];
    }
};

export const getInitialRoute = (user_data, user_auth) => {
    if (__DEV__) console.log('[getInitialRoute] user_auth:', user_auth, 'has user:', !!user_data?.user);

    const hasToken = user_auth || !!user_data?.accessToken;
    if (!hasToken || !user_data?.user) {
        return 'Splash';
    }

    const status = getUserCompletionStatus(user_data);

    switch (status) {
        case USER_STATUS.NOT_AUTHENTICATED:
            return 'OnboardingScreen';

        case USER_STATUS.EMAIL_NOT_VERIFIED:
            return 'VerifyOtp';

        case USER_STATUS.PROFILE_INCOMPLETE:
            return 'CreateTechnicianProfile';

        case USER_STATUS.TECHNICIAN_VERIFIED:
            return 'TechnicianMainScreen';

        default:
            return 'OnboardingScreen';
    }
};
