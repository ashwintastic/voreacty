/**
 * Created by root on 24/7/17.
 */
import { combineReducers } from 'redux'
import userRegistrationResponse from './userRegistrationReducer'
import loadingBar from './loadingBar'
import loadingMessage from './loadingMessage'
import loggedInUserInfoResponse from './userLoginReducer'
import serviceProfileResponse from './serviceProvider'
import videoCallMessageResponse from './videoCallMessageReducer'
import allServices from './allServicesReducers'
import systemConfigResponse from './systemConfigReducer'
import searchedData from './showSearchedDataReducer'
import resetPasswordResponse from './resetPasswordReducer'
import forgotPasswordResponse from './forgotPasswordReducer'
import paymentInfoResponse from './paymentReducer'
import profileDataResponse from './getProfileReducer'
import saveProfileResponse from './saveProfileReducer'
import saveProfileImageResponse from './saveProfileImageReducer'
import saveServiceImageResponse from './saveServiceImageReducer'
import saveServiceBackgroundResponse from './saveServiceBackgroundReducer'
import sPDashboardDetails from './sPDashboardDeatilsReducer'
import feedBackResponse from './feedBackReducer'
import adminDashboardResponse from './adminReducer'
import spRegistrationresponse from './spRegistrationReducer'
import callHistoryResponse from './callHistoryReducer'
import contactHistoryResponse from './contactHistoryReducer'
import sPserviceDetails from './spServiceDetails';
import serviceApproveResponse from './approveServiceReducer';
import notification from './NotificationReducer'
import serviceHistoryResponse from './ServiceHistoryReducer';
import saveWishlistResponse from './saveWishlistReducer';
import deleteWishlistResponse from './deleteWishlistReducer'
const allReducers = combineReducers({
  userRegistrationResponse,
  loggedInUserInfoResponse,
  loadingBar,
  loadingMessage,
  serviceProfileResponse,
  videoCallMessageResponse,
  allServices,
  systemConfigResponse,
  searchedData,
  resetPasswordResponse,
  forgotPasswordResponse,
  paymentInfoResponse,
  profileDataResponse,
  saveProfileResponse,
  saveProfileImageResponse,
  saveServiceImageResponse,
  saveServiceBackgroundResponse,
  sPDashboardDetails,
  saveProfileImageResponse,
  feedBackResponse,
  adminDashboardResponse,
  callHistoryResponse,
  contactHistoryResponse,
  sPserviceDetails,
  spRegistrationresponse,
  serviceApproveResponse,
  notification,
  serviceHistoryResponse,
  saveWishlistResponse,
  deleteWishlistResponse
});
export default allReducers