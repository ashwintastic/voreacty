/**
 * Created by root on 10/8/17.
 */
import LandingPage from '../components/LandingPage';
import Support from '../components/staticpages/Support';
import PrivacyPolicy from '../components/staticpages/PrivacyPolicy';
import TermsOfUse from '../components/staticpages/TermsOfUse';

import Login from '../containers/Login';
import Registration from '../containers/Registration';
import ServiceProviderRegistration from '../containers/ServiceProviderRegistration';
import RequestCall from '../containers/videocall/RequestCall';
import LaunchVideoCall from '../containers/videocall/LaunchVideoCall';
import CallHistory from '../containers/videocall/CallHistory';
import DiscoverComponent from '../components/DiscoverComponent';
import DiscoverContainer from '../containers/DiscoverContainer';
import DeviceSupport from '../containers/DeviceSupport';
import ServiceProviderProfile from '../containers/ServiceProfile';
import GlobalSearchPage from '../containers/GlobalSearchPage';

import ServiceProviderDashboard from '../containers/ServiceProviderDashboard';
import ForgotPassword from '../containers/ForgotPassword';
import ActivateUser from '../containers/ActivateUser';
import ResetPassword from '../containers/ResetPassword'
import Feedback from '../containers/Feedback';
import Paypal from '../containers/Paypal';
import EditProfile from '../containers/EditProfile';
import AdminDashboard from '../containers/admin/AdminDashboard';
import ServiceProviderEdit from '../containers/ServiceProviderEdit'

const routes = [


  { path: '/requestcall',
    component: DeviceSupport
  },

  { path: '/favourites',
    component: DiscoverContainer,
  },

  { path: '/discover',
    component: DiscoverComponent,
    loginFalse: false,
    baseUrl: 'discover'
  },

  { path: '/videocall',
    component: LaunchVideoCall
  },

  { path: '/reconnect',
    component: LaunchVideoCall
  },

  { path: '/callhistory',
    component: CallHistory
  },

  { path: '/viewprofile/:id',
    component: ServiceProviderProfile,
    loginFalse: false,
    baseUrl: 'viewprofile'
  },
  { path: '/editprofile/:id',
    component: EditProfile,
    baseUrl:'editprofile'
  },
  { path: '/editservice/:id',
    component: EditProfile,
    baseUrl:'editprofile'
  },
  { path: '/login',
    component: Login
  },

  { path: '/register',
    component: Registration,
    loginFalse: false,
    baseUrl: 'register'
  },
  
  { path: '/spregister',
    component: ServiceProviderRegistration
  },
  { path: '/service/:id/edit',
    component: ServiceProviderEdit
  },
  { path: '/devicesupport',
    component: DeviceSupport
  },

  { path: '/search',
    component: GlobalSearchPage,
    loginFalse: false,
    baseUrl: 'search'
  },

  { path: '/dashboard',
    component: ServiceProviderDashboard
  },
  { path: '/forgotpassword',
    component: ForgotPassword,
    loginFalse: false,
    baseUrl: 'forgotpassword'
  },
  { path: '/activateuser',
    component: ActivateUser,
    loginFalse: false,
    baseUrl: 'activateuser'
  },
  { path: '/support',
    component: Support,
    loginFalse: false,
    baseUrl: 'support'
  },

  { path: '/privacypolicy',
    component: PrivacyPolicy,
    loginFalse: false,
    baseUrl: 'privacypolicy'
  },
  
   { path: '/termsofuse',
    component: TermsOfUse,
    loginFalse: false,
    baseUrl: 'termsofuse'
  },

  { path: '/resetpassword/token/:token',
    component: ResetPassword,
    loginFalse: false,
    baseUrl: 'resetpassword'
  },

  { path: '/payment',
    component: Paypal
  },
  // { path: '/feedback',
  //   component: Feedback
  // }

  /* Admin routes */
  {
    path: '/admin',
    component: AdminDashboard
  },
  {
    path: '/admin/previewprofile/:id',
    component: ServiceProviderProfile
  }
  /* Admin routes */

];

export default routes;