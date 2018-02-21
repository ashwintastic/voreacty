// import React from 'react'
// import {Link} from 'react-router-dom';
import {PRODUCT_NAME,PRODUCT_SUPPORT_EMAIL} from '../config/constants';

let productName = PRODUCT_NAME;
let productSupportEmail = PRODUCT_SUPPORT_EMAIL;
/* Global Messages */
export const GlobalErrorMessages = {
	//'tokenExpired': 'Your session has expired. Please login again',
	'tokenExpired': '',
	'tokenInvalid': '',
	'invalidUserName': 'Please check your email and password.',
	'invalidPassword': 'Please check your email and password.',
	'tokenAbsent': '',
	'notVerified':'User not activated.',
	'The email has already been taken.':'This email id already exists. You may <a class="color-blue-default pointer" href="/forgotpassword">reset password</a> or <a class="color-blue-default pointer" href="/register">sign up</a> with a different email id.',
	//'registrationSuccessMessage': 'Thanks for signing up. <p>We\'ve just sent you an email.<br>Click the verification link in the message you received at <b><<your email>></b> to activate your account.</p>',

	'registrationSuccessTitle': 'THANK YOU FOR SIGNING UP',
	'registrationSuccessMessage': 'We have sent an email to <<email>>. Please follow instructions in the email to activate your account.',
	
	'spNotJoining': 'We are sorry. It seems the service provider is not able to get on the call. We shall process your refund. For any other assistance please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a>.',

	'userActivationTitle':'YOUR ACCOUNT HAS BEEN ACTIVATED',
	'userVerified':'Please <a href="/login" class="color-red-3 pointer">login</a> to access your account.',

	'userAlreadyVerified':'Your account has already been activated. Please <a href="/login" class="color-red-3 pointer">login</a> to access your account.',

	'becomeServiceProviderTitle': 'Become A Service Provider',
	'becomeServiceProviderContent': 'Thank you for your interest in signing up as a service provider with us. Please download the form below, fill up details and send to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a>',
	
	/* Video call related messages */
	'initiateVideoCallMessage': 'Please wait while we check service provider\'s availability. This may take a few minutes ...',
	'serviceOff': 'We are sorry, the service provider is not available at the moment. Please try after some time. Meanwhile, <a href="/discover" class="color-red-3 pointer">discover</a> other services available on '+productName+'.',
	'selfServiceRequest':'Oops! you are trying to call your own service. Please try with different user or different service.',
	'serviceProviderEngaged': 'We are sorry, the service provider is on another call. Please try after some time. Meanwhile, <a href="/discover" class="color-red-3 pointer">discover</a> other services available on '+productName+'.',
	'NoReason': 'We are sorry, there seems a technical difficulty. Please try after some time.',
	'multipleEntries': 'We are sorry, there seems a technical difficulty. Please try after some time.',
	'incorrectUserId': 'We are sorry, there seems a technical difficulty. Please try after some time.',
	'SPAvailabilityConfirmed':'Bingo! The service provider has confirmed availability for call. Please continue with payment.',
	'paymentSuccessfulMessage':'Your payment received successfully. Thank You!',
	'paymentTimeOutMessage':'The service provider is waiting on you please make payment now to start the call ',
	'videoSessionInvalid': 'Invalid session for the call. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.',
	'videoTokenInvalid': 'Invalid token for the call. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.',
	'videoTokenExpired': 'Invalid or expired token for the call. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.',

	'invalidServiceProviderUser':'Invalid credentials. Enter the ones you had used while registering this service.',
	'pollingTimeOut': 'We are sorry, the service provider is not available at the moment. Please try after some time. Meanwhile, <a href="/discover" class="color-red-3 pointer">discover</a> other services available on '+productName+'.',

	'invalidRequestCall':'We are sorry, it looks like this session has expired. If you think this is an error please contact <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the problem in detail.',

	'videoStatusInvalid':'We are sorry, it looks like this session has expired. If you think this is an error please contact <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the problem in detail.',
	

	'phoneNumberMissing': 'Phone number not available',
	'phoneCallFailed': 'We are sorry, the service provider is not available at the moment. Please try after some time. Meanwhile, <a href="/discover" class="color-red-3 pointer">discover</a> other services available on '+productName+'.',

	'phoneCallRejected': 'We are sorry, the service provider is not available at the moment. Please try after some time. Meanwhile, <a href="/discover" class="color-red-3 pointer">discover</a> other services available on '+productName+'.',
	'phoneCallServerError': 'We are sorry. There seems a technical difficulty. Please try after some time.',

  	'pleaseSelectPricing': 'Please select pricing!',
	'initialVideoCallLoadingMessage':'Please wait while we connect you with the other participant',

	'waitForOtherParticipant':'Please wait while the other participant joins',

	'waitForSPParticipant':'Please wait while the service provider joins. This may take a few minutes ...',
	'waitForUserParticipant':'Please wait while we connect you to the caller. This may take a few minutes ...',

	//'callEnded':'Call completed. We shall route you to a feedback page in 10 seconds. Appreciate your time!',
	'callEnded':'Call ended',
	'callTerminateMesage':'Session ending soon!',
	'callRemainingTime':'Remaining Time:',
	//'callRemainingTime':'Remaining Time:',
	


	'bothMediaNotAccessible': 'Your browser does not provide access to camera and microphone. Please upgrade or check the browser settings. In the meantime you may use a different browser which supports WebRTC.',
	'audioMediaNotAccessible': 'Your browser does not provide access to microphone. Please upgrade or check the browser settings. In the meantime you may use a different browser which supports WebRTC.',
	'videoMediaNotAccessible': 'Your browser does not provide access to camera. Please upgrade or check the browser settings. In the meantime you may use a different browser which supports WebRTC.',

	/* Video call related messages */
	/* Payment */
	'paymentInitiationFailed':'Invalid session for the payment process. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.',
	'paymentInitTimeOutMessage': '<p>Your request for the call has timed out as payment not completed in time. You would need to check availability again to get on a call with this service provider.</p><p>If your payment was in flight already and you got billed, please reach out to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> and include transaction reference.</p>',

	'paymentTimeOutAlert': 'Your request for the call is close to timing out. We advise you to reinitiate the request by checking availability of the service provider again.\n\nIf your payment was in flight already and is successful you should see a Video Call button. If you get billed and do not see a Video Call button, please reach out to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> and include transaction reference.',

	'paymentFailureLog':'Automatically terminating the call request as payment not completed in time',
	'paymentCancelLog':'Automatically terminating the call request as user cancelled the payment',
	/* */

	'browserSupportSuccessHeading':'Congratulations!',
	'browserSupportSuccessMessage':'Your browser supports video calling. Click continue to check service provider\'s availability',
	'browserSupportFailHeading':'Oops!',
	'browserSupportFailMessage':'',

	'resetPasswordError' : 'This email is not registered with us',
	'resetPasswordSuccess': 'Password reset link has been sent to your email id',
  	'waitingMessageWhileSearch': 'Please wait...',
  	'noResultFound': 'Your filter did not match any services available in the platform. Try browsing by other categories',
  	'noFavorites':'You have not added any services to favorites',
	'emailDoesNotExist': 'This account is not signed up with us. Please re-check the email id you have entered. Or you may <a href="/register" class="color-red-3 pointer">sign up</a> now!<p></p> ',
	'passwordUpdatesSuccessfully' : 'Your password reset is successful. Please <a href="/login" class="color-red-3 pointer">login</a> with your new password.',
	'resetTokenInvalid': 'Invalid token',

	'twilioDeviseCheckError': 'Your browser does not provide access to camera or microphone. Please upgrade or check the browser settings. In the meantime you may use a different browser which supports WebRTC.',
  'nosearchresultfound': 'Your search <i> <<search string>> </i> did not match any services available in the platform. Try different keywords or <div for="trigger" > browse by categories.</div>',
	  
	 'feedBackSuccess': 'PLEASE GIVE US FEEDBACK AGAIN NEXT TIME',
	 'serviceSaved':'We will send you a confirmation email in less than 24hrs once your service is active',
     'profileSaved': 'Profile updated successfully',
     'supportMessage': 'If you would like to report an error, lodge a complain, claim a refund or have any other issue please email us on <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a>',

    'recconectUserNotValid': 'Invalid credentials for reconnection. Enter the ones you had used while registering this service.',
    'reconnectVideoParamNotValid': 'Invalid session for the call reconnect. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 
    'reconnectVideoNotTerminatedProperly': 'Invalid video session for the call reconnect. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 
      
	'reconnectPaymentMissing': 'Invalid session for the call reconnect. It seems that the payment information is missing. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 

	'reconnectVideoInvalidToken': 'Invalid token for the call reconnect. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 
	'reconnectVideoTokenExpired': 'Expired token for the call reconnect. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 

 	'reconnectVideoNotAllowed': 'Video reconnect is not allowed for this request. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 
 	'reconnectCallDurationOver': 'Video reconnect is not allowed for this request, as the paid timing is over. If you think this is an error, please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 

	'reconnectUnknownError': 'We are sorry, there seems a technical difficulty while reconncting you. Please send a note to <a class="color-red-3 pointer" href="mailto:'+productSupportEmail+'">'+productSupportEmail+'</a> describing the steps on how you encountered this issue.', 
	'reconnectTimeOverSpendMessage':'Time overdue!',	
}