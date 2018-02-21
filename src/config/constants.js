/**
 * Created by root on 26/7/17.
 */

export const  PRODUCT_NAME = "Voxcol"
export const  PRODUCT_SUPPORT_EMAIL = "support@voxcol.me"

export const  IS_USER_LOGGED_IN_STATUS_FETCHING = 'IS_USER_LOGGED_IN_STATUS_FETCHING';
export const  IS_USER_LOGGED_IN_STATUS_FETCHED = 'IS_USER_LOGGED_IN_STATUS_FETCHED';

/* User Registration and Login constants */
export const  REGISTERING_USER_INFO_FETCHING = 'REGISTER_USER_INFO_FETCHING';
export const  REGISTER_USER_INFO_FETCHED = 'REGISTER_USER_INFO_FETCHED';
export const  USER_LOGIN_FETCHING = 'USER_LOGIN_FETCHING';
export const  USER_LOGGEDIN_INFO_FETCHED = 'USER_LOGGEDIN_INFO_FETCHED';
export const  SET_STORE_IF_TOKEN_IS_ABSENT = 'SET_STORE_IF_TOKEN_IS_ABSENT';
export const  SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2 ='SET_STORE_IF_TOKEN_IS_RECEIVED_VIA_OAUTH2';
/* User Registration and Login constants */

/* Video call related constants */
export const  VIDEO_COUNTER_DOWN = true
export const  TIMEOUT_FOR_POLLING = 5*60*1000 // 5 mins 5*60*1000 = ms

export const  CALL_TIMEOUT_WARNING_TIME_MINS = 2 // mins
export const  CALL_TIMEOUT_WARNING_TIME_SECS = 0 // seconds

// Hard stop
export const  GRACE_TIME = 120 // seconds

export const  AUTOREDIRECT_TO_FEEDBACK_PAGE_TIME = 2*1000 //ms

export const  PAYMENT_INITIATE_TTL_MINS = 10 // mins
export const  PAYMENT_INITIATE_TTL_SECS = 0 // seconds
export const  PAYMENT_TTL_MARGIN_ALERT = 60 // in seconds

// If SP doesn't join
export const UNBLOCK_USER_DURATION_SECS = 10*60; // min*secs

export const  CLEAR_VIDEO_CALL_RESPONSE_STORE='CLEAR_VIDEO_CALL_RESPONSE_STORE';
export const  INITIATE_VIDEO_CALL_REQUEST = 'INITIATE_VIDEO_CALL_REQUEST';
export const  NOTIFY_CALL_REQUEST_TO_SP = 'NOTIFY_CALL_REQUEST_TO_SP';
export const  ASCERTAIN_SP_AVAILABLITY = 'ASCERTAIN_SP_AVAILABLITY';
export const  INITIATE_PAYMENT = 'INITIATE_PAYMENT';
export const  LAUNCH_VIDEO_CALL = 'LAUNCH_VIDEO_CALL';

export const  RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED = 'RESPONSE_MESSAGE_FROM_VIDEO_CALL_REQUEST_FETCHED'
export const  SERVICE_PROVIDER_AVAILABILITY_COMFIRMED = 'SERVICE_PROVIDER_AVAILABILITY_COMFIRMED'
export const  AVAILABILITY_OF_SERVICE_FETCHING = "AVAILABILITY_OF_SERVICE_FETCHING";
export const  VIDEO_CALL_REFERENCE_ID = "VIDEO_CALL_REFERENCE_ID";
export const  AVAILABILITY_OF_SERVICE_FETCHED = "AVAILABILITY_OF_SERVICE_RESET";
export const  GET_VIDEO_TOKEN_FETCHING = 'GET_VIDEO_TOKEN_FETCHING';
export const  GET_VIDEO_TOKEN_FETCHED = 'GET_VIDEO_TOKEN_FETCHED';
export const  END_VIDEO_CALL = 'END_VIDEO_CALL';

export const  CALL_HISTORY_FETCHING = 'CALL_HISTORY_FETCHING';
export const  CALL_HISTORY_FETCHED = 'CALL_HISTORY_FETCHED';
export const  CONTACT_HISTORY_FETCHING = 'CONTACT_HISTORY_FETCHING';
export const  CONTACT_HISTORY_FETCHED = 'CONTACT_HISTORY_FETCHED';
   

export const VIDEO_CALL_STATUS = {
    'REQUEST_INITIATED':0,
    'SP_CONFIRMED':1,
    'PAYMENT_INITIATED':2,
    'PAYMENT_SUCCESS':3,
    'VIDEO_LAUNCHED_USER':4,
    'VIDEO_LAUNCHED_SP':5,
    'CALL_TERMINATED':6,
    'SP_REJECTED':7,
    'PAYMENT_FAILURE':8,
    'SP_NOT_JOINED':9
};

export const FEEDBACK_REDIRECTION_TIMING = 2*1000; // 2 secs

export const PLATFORM_FEEDBACK_OPTIONS = [
      {label: "I think it's super cool", value: 3, default:true},
      {label: "It's just ok", value: 2},
      {label: "It needs improvement", value: 1, sublabel:'(Please tell us how below)'},
    ];

export const SERVICE_PROVIDER_FEEDBACK_OPTIONS = [
      {label: 'Awesome', value: 5, default:true},
      {label: 'Good', value: 4},
      {label: 'Just OK', value: 3},
      {label: 'Bad', value: 2, sublabel:'(Please tell us why below)'},
      {label: 'Horrible', value: 1, sublabel:'(Please tell us why below)'},
    ];



//export const  CONFIRM_MESSAGE_FROM_VIDEO_CALL_REQUEST = 'CONFIRM_MESSAGE_FROM_VIDEO_CALL_REQUEST'
/* Video call related constants */

/* Loading Bar constants */
export const SHOWLOADINGBAR =  'SHOW_LOADING_BAR';
export const HIDELOADINGBAR =  'HIDE_LOADING_BAR';
export const RESETLOADINGBAR = 'RESET_LOADING_BAR';
/* Loading Bar constants */


/* service Provider details Constants*/

export const SERVICE_PROVIDER_DETAILS_FETCHING = 'SERVICE_PROVIDER_DETAILS_FETCHING';
export const SERVICE_PROVIDER_DETAILS_FETCHED = 'SERVICE_PROVIDER_DETAILS_FETCHED';

/* Payment constants */

export const PAYMENT_RESPONSE_FETCHING = 'PAYMENT_RESPONSE_FETCHING';
export const PAYMENT_RESPONSE_FETCHED = 'PAYMENT_RESPONSE_FETCHED';

/*user logout constants*/

export const USER_LOGOUT = 'USER_LOGOUT';



/* services constants */

export const GET_ALL_SERVIVES_FETCHING = 'GET_ALL_SERVIVES_FETCHING';
export const GET_ALL_SERVIVES_FETCHED = 'GET_ALL_SERVIVES_FETCHED';
export const GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY ='GET_ALL_SERVIVES_FETCHED_WITHOUT_CATAGORY';

/* user selecting prices*/

export const SAVE_SELECTED_PRICE_IN_STORE = 'SAVE_SELECTED_PRICE_IN_STORE';



/* system config page constants */

export const SYSTEM_CONFIG_FETCHED = 'SYSTEM_CONFIG_FETCHED';
export const SYSTEM_CONFIG_FETCHING = 'SYSTEM_CONFIG_FETCHING';

/* search constants*/

export const GET_ALL_SEARCHED_DATA_FETCHING  = 'GET_ALL_SEARCHED_DATA_FETCHING';
export const GET_ALL_SEARCHED_DATA_FETCHED = 'GET_ALL_SEARCHED_DATA_FETCHED';

/*reset password constants*/

export const RESET_PASSWORD_RESPONSE_FETCHING = 'RESET_PASSWORD_RESPONSE_FETCHING';
export const RESET_PASSWORD_RESPONSE_FETCHED = 'RESET_PASSWORD_RESPONSE_FETCHED';

/* forgot password constant*/

export const FORGOT_PASSWORD_RESPONSE_FETCHING = 'FORGOT_PASSWORD_RESPONSE_FETCHING';
export const FORGOT_PASSWORD_RESPONSE_FETCHED = 'FORGOT_PASSWORD_RESPONSE_FETCHED';

/*token validation constants*/
export const IS_TOKEN_VALID_FETCHING = 'IS_TOKEN_VALID_FETCHING';
export const IS_TOKEN_VALID_FETCHED = 'IS_TOKEN_VALID_FETCHED';




export const PROFILE_DETAILS_FETCHED = 'PROFILE_DETAILS_FETCHED';
export const PROFILE_DETAILS_FETCHING = 'PROFILE_DETAILS_FETCHING';
export const PROFILE_IMAGE_FETCHING = 'PROFILE_IMAGE_FETCHING';
export const PROFILE_IMAGE_FETCHED = 'PROFILE_IMAGE_FETCHED';

export const SERVICE_PROVIDER_SERVICES_FETCHING ='SERVICE_PROVIDER_SERVICES_FETCHING';
export const SERVICE_PROVIDER_SERVICES_FETCHED = 'SERVICE_PROVIDER_SERVICES_FETCHED';

export const SERVICE_PROVIDER_SERVICES_UPDATING = 'SERVICE_PROVIDER_SERVICES_UPDATING';
export const SERVICE_PROVIDER_SERVICES_UPDATED = 'SERVICE_PROVIDER_SERVICES_UPDATED';


export const SERVICE_APPROVED = 'SERVICE_APPROVING';
export const SERVICE_APPROVING = 'SERVICE_APPROVED';

export const SERVICE_IMAGE_SAVED = 'SERVICE_IMAGE_SAVED';
export const SERVICE_IMAGE_SAVING = 'SERVICE_IMAGE_SAVING';


export const WISHLIST_FETCHING = 'WISHLIST_FETCHING';
export const WISHLIST_FETCHED = 'WISHLIST_FETCHED';

export const WISHLIST_DELETING = 'WISHLIST_DELETING';
export const WISHLIST_DELETED = 'WISHLIST_DELETED';


/* feeedback constants*/
export const SEND_USER_FEEDBACK  = 'SEND_USER_FEEDBACK';

/* Admin constants */
export const ADMIN_DASHBOARD_FETCHING  = 'ADMIN_DASHBOARD_FETCHING';
export const ADMIN_DASHBOARD_FETCHED  = 'ADMIN_DASHBOARD_FETCHED';
export const SERVICE_STATUS = {
    '0': 'Received',
    '1': 'Activated',
    '2': 'In Evaluation',
    '3': 'In Preview'
}

export const SERVICES_HISTORY_FETCHING = 'SERVICES_HISTORY_FETCHING';
export const SERVICES_HISTORY_FETCHED = 'SERVICES_HISTORY_FETCHED';
/* Admin constants */
export const SERVICE_BACKGROUND_SAVED = 'SERVICE_BACKGROUND_SAVED';
export const SERVICE_BACKGROUND_SAVING = 'SERVICE_BACKGROUND_SAVING';



export const SERVICES_CATAGORY_SELECTION = {
"cat001":"Advertising",
"cat002":"Animation",
"cat003":"Art and Creativity",
"cat004":"Business",
"cat032":"Car Wash",
"cat033":"Cleaning",
"cat005":"Coaching",
"cat006":"Computer Science",
"cat007":"Counseling",
"cat008":"Design and Illustration",
"cat009":"Digital Marketing",
"cat010":"Education",
"cat011":"Entertainment",
"cat012":"Fashion",
"cat013":"Film and Television",
"cat014":"Finance",
"cat015":"Fitness",
"cat016":"Food and Travel",
"cat017":"Games",
"cat018":"Growth Hacking",
"cat019":"Health",
"cat020":"Influencer",
"cat021":"Legal",
"cat022":"Lifestyle",
"cat023":"Marketing",
"cat024":"Mind Body & Soul",
"cat025":"Motivational",
"cat027":"Personality",
"cat028":"Psychology",
"cat029":"Religion",
"cat034":"Security",
"cat030":"Sport",
"cat031":"Technology",
"cat035":"Transport",
"cat026":"Other",
};

// export const INTEREST_LIST = {
// 	"interest":"Choose the interest",
// 	"Science":"Science",
// 	"Health":"Health",
// 	"Art":"Art",
// 	"Social Media":"Social Media",
// 	"Business":"Business",
// 	"Marketing":"Marketing",
// 	"Fashion":"Fashion",
// 	"Comics":"Comics",
// 	"Technology":"Technology",
// 	"Business":"Business",
// 	"Celebrity":"Celebrity",
// 	"Engineering":"Engineering",
// 	"ICT":"ICT",
// 	"Design":"Design",
// 	"Film and Video":"Film and Video",
// 	"Games":"Games",
// 	"Lifestyle":"Lifestyle",
// 	"Advertising":"Advertising",
// 	"Digital":"Digital",
// 	"Entrepreneur":"Entrepreneur",
// 	"Promotions":"Promotions",
// 	"Recruitment":"Recruitment",
// };

export const COUNRTY_LIST = {
	'AA': 'Select your country',
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

export const SP_REGISTRATION_RESPONSE_FETCHING = "SP_REGISTRATION_RESPONSE_FETCHING";
export const SP_REGISTRATION_RESPONSE_FETCHED = "SP_REGISTRATION_RESPONSE_FETCHED";

export const SP_SERVICE_FETCHED ="SP_SERVICE_FETCHED";
export const SP_SSRVICE_FETCHING = "SP_SSRVICE_FETCHING";

export const notificationConfig = {
  success: {
    autoDismiss: 5,
    position: 'tc',
    level: 'success'
  },
  error: {
    autoDismiss: 10,
    position: 'tc',
    level: 'error'
  }
};

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const SHOW_ERROR_NOTIFICATION = 'SHOW_ERROR_NOTIFICATION';

export const AVAILABILITY_OF_SERVICE_CALLING = 'AVAILABILITY_OF_SERVICE_CALLING';
export const CALL_ENDED = 'CALL_ENDED'

