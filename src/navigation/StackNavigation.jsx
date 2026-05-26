import SplashScreen from "../screens/StartScreens/SplashScreen.jsx";
import SignupScreen from "../screens/Auth/Signup.jsx";
import LoginScreen from "../screens/Auth/Login.jsx";
import ForgetPasswordScreen from "../screens/Auth/ForgotPassword.jsx";
import ForgetPasswordAccountVerification from "../screens/Auth/ForgetPasswordAccoutVerification.jsx";
import CreateNewPassword from "../screens/Auth/CreatenewPassword.jsx";
import PhoneVerification from "../screens/Auth/PhoneVerification.jsx";
import TechnicianProfileScreen from "../screens/Auth/CreateTechnicianProfile.jsx";
import ResumeTemplateScreen from "../screens/Auth/ResumeTemplateScreen.jsx";
import ProfilePreviewScreen from "../screens/Auth/ProfilePreviewScreen.jsx";
import UploadPhotosScreen from "../screens/Auth/ProfileUpload.jsx";
import ChooseEmojiScreen from "../screens/Auth/ChooseEmoji.jsx";
import ProfileReadyScreen from "../screens/Auth/ProfileReady.jsx";
import ChoosePlanScreen from "../screens/Auth/ChoosePlan.jsx";
import ChoosePlan from "../screens/Auth/SecureYourSubscription.jsx";
import MembershipActivated from "../screens/Auth/MembershipActivated.jsx";
import BottomNavigation from '../navigation/TechnicianBottomNavigation.jsx';
import TechnicianPersonalInformationScreen from "../screens/TechnicianSetttingScreen/ClientPersonalInformationScreen.jsx";
import TechnicianChangePasswordScreen from "../screens/TechnicianSetttingScreen/ClientChangePasswordScreen.jsx";
import TechnicianMyResumeScreen from "../screens/TechnicianSetttingScreen/TechnicianMyResume.jsx";
import TechnicianMyPostsScreen from "../screens/TechnicianSetttingScreen/TechnicianMyPost.jsx";
import TechnicianSubscriptionScreen from "../screens/TechnicianSetttingScreen/ClientSubscriptionScreen.jsx";
import TermsAndConditionsScreen from "../screens/TechnicianSetttingScreen/ClientTermsAndConditionScreen.jsx";
import PrivacyPolicyScreen from "../screens/TechnicianSetttingScreen/ClientPrivacyPolicyScreen.jsx";
import LogSubmittedScreen from "../screens/TechnicianTaskScreen/LogSubmitted.jsx";
import LogApprovedScreen from "../screens/TechnicianTaskScreen/LogApproved.jsx";
import LogNewTaskScreen from "../screens/TechnicianTaskScreen/LogNewTask.jsx";
import CreatePostScreen from "../screens/Community/CreatePost.jsx";
import MarketplaceScreen from "../screens/Community/MarketplaceScreen.jsx";
import JobOffersScreen from "../screens/Community/JobOffersScreen.jsx";
import ApplyScreen from "../screens/Community/ApplyScreen.jsx";
import ApplicationSentScreen from "../screens/Community/ApplicationSentScreen.jsx";
import MarketplaceCreatePost from "../screens/Community/MarketplaceCreatePost.jsx";

const AUTH_ROUTES = [

    {
        name: "splash_screen",
        component: SplashScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "signup",
        component: SignupScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "login",
        component: LoginScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "phone_verification",
        component: PhoneVerification,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "CreateTechnicianProfile",
        component: TechnicianProfileScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "technician_resume_template",
        component: ResumeTemplateScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "ProfilePreview",
        component: ProfilePreviewScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "upload_photos",
        component: UploadPhotosScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "choose_emoji",
        component: ChooseEmojiScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "profile_ready",
        component: ProfileReadyScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "choose_plan",
        component: ChoosePlanScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "secure_subscription",
        component: ChoosePlan,
        options: { headerShown: false, gestureEnabled: false }
    },

    {
        name: "membership_activated",
        component: MembershipActivated,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "forgot_password",
        component: ForgetPasswordScreen,
        options: { headerShown: false, gestureEnabled: false }

    },

    {
        name: "forget_password_account_verification",
        component: ForgetPasswordAccountVerification,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "create_new_password",
        component: CreateNewPassword,
        options: { headerShown: false, gestureEnabled: false }

    },
    
    {
        name: "personal_information",
        component: TechnicianPersonalInformationScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "change_password",
        component: TechnicianChangePasswordScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "my_resume",
        component: TechnicianMyResumeScreen,
        options: { headerShown: false, gestureEnabled: false }

    },
    {
        name: "my_posts",
        component: TechnicianMyPostsScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "subscription",
        component: TechnicianSubscriptionScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "terms_conditions",
        component: TermsAndConditionsScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "privacy_policy",
        component: PrivacyPolicyScreen,
        options: { headerShown: false, gestureEnabled: false }
    },

    {
        name: "log_submitted",
        component: LogSubmittedScreen,
        options: { headerShown: false, gestureEnabled: false }
    },

    {
        name: "log_approved",
        component: LogApprovedScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    
    {
        name: "log_new_task",
        component: LogNewTaskScreen,
        options: { headerShown: false, gestureEnabled: false }
    },

    {
        name: "create_post",
        component: CreatePostScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "market_place",
        component: MarketplaceScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "job_offers",
        component: JobOffersScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "apply_screen",
        component: ApplyScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "application_sent",
        component: ApplicationSentScreen,
        options: { headerShown: false, gestureEnabled: false }
    },
    {
        name: "marketplace_create_post",
        component: MarketplaceCreatePost,
        options: { headerShown: false, gestureEnabled: false }
    },


    // // New Screen end not a auth screen part

    {
        name: "technician_home_screen",
        component: BottomNavigation,
        options: {
            headerShown: false,
            gestureEnabled: false
        },
        authRequired: false,
    },


]


export const getAuthScreens = () => {
    return Object.values(AUTH_ROUTES).filter(route => route.authRequired === false);
};

export const getProtectedScreens = () => {
    return Object.values(AUTH_ROUTES).filter(route => route.authRequired === true);
};

export const getScreenOptions = (routeName) => {
    return Routes[routeName]?.options || {};
};

export default AUTH_ROUTES;


