/**
 * Created by root on 28/7/17.
 */

let environment = 'staging'; // This is API server
let paymentEnv = 'production'; //Payment environment: valid values, sandbox or production
let apiURL;
let baseURL;
let imageURL;
export const  ENABLE_LOGGER = true;

if(environment == 'local'){
	baseURL=  "http://localhost:8083/"
}
else if (environment == 'staging'){
	baseURL =  "https://api-staging.voxcol.me/"
}
else if (environment == 'production'){
	baseURL =  "https://api.voxcol.me/"
}
else if (environment == 'localip'){
	baseURL =  "http://172.19.4.15:8083/";
}
else if (environment == 'ec2'){
	baseURL =  "http://ec2-13-59-243-62.us-east-2.compute.amazonaws.com:8083/";
}

apiURL = baseURL + "api/";
imageURL = baseURL;

export const TERMS_OF_USE_PDF_URL = baseURL+'storage/Voxcol - Terms of Use and Privacy Policy.pdf';

export const PRIVACY_POLICY_PDF_URL = baseURL+'storage/Voxcol - Terms of Use and Privacy Policy.pdf#page=3';

export const API_SERVER_URL = apiURL;
export const API_SERVER_WEB_BASE_URL = baseURL;
export const IMAGE_BASE_URL = imageURL;
export const VIDEO_BASE_URL = "https://api-staging.voxcol.me/storage/app/public/sp/videos/users/";
export const DOWNLOAD_PDF_URL = 'https://api-staging.voxcol.me/storage/Become a service provider.pdf';

// Paypal configurations
export const PAYPAL_ENVIRONMENT = paymentEnv;

// App: Voxcol
export const PAYPAL_SANDBOX_CLIENT_ID = 'Aehi2LNZ7uDxjHczJsmDwLcCjgyqa7W74DPynTu07Lm0vHcxgJLb6tFgsS05swmcjYmFDxTZ99cHv2-t';

// App: Voxcol
export const PAYPAL_PRODUCTION_CLIENT_ID = 'AVLPHFikueKs1wGZrwB_ZAJh7xGwxt1JwEGf_2Bz6duDmU8ZNdtEmzaLcB2XGeye0CvHRJnpGRhjyjW9';


/*SERVICE PROVIDER REGISTRATION CONFIG*/

export const SERVICE_PROVIDER_REGISTRATION_TOP_CONTENT = 'Please take a few minutes to complete this form, it helps us verify you and recommend your service to relevant users.';

export const SERVICEPROVIDER_QUALIFICATIONS = [
  ['Formally educated and qualified', 'Describe your qualifications below'],
  'I have a diploma',
  'Self taught',
  ['Other', 'Describe your qualifications below']
];

export const SERVICE_PROVIDER_PUBLISHED_CATAGORY  = [
  'Book',
  'Website',
  'Video',
  'Article',
  'Podcast'
];

export const SERVICE_PROVIDER_SOCIAL_MEDIA_FOLLOWERS = [
  'Less than 10 000',
  '10 000 - 50 000',
  '50 000 - 100 000',
  '100 000 - 500 000',
  '500 000 - 1M',
  'More than 1M'
];

export const SERVICE_PROVIDER_LINKS = [
  'Instagram',
  'Youtube',
  'Facebook',
  'Twitter',
  'Website'
];

export const SP_SKILL_SETS = 4;

export const SP_PRICING = [
  ['amount0', {'10min': 10},'10  Minute','10'],
  ['amount1', {'20min': 20},'20  Minute','20'],
  ['amount2', {'30min': 30},'30  Minute','30'],
  ['amount3', {'45min': 45},'45  Minute','45'],
  ['amount4', {'1hour': 60},'1  hour','60']
];

// export const  SERVICES_CATAGORY = [
//   {catagory: 'cat001', name: 'Health',"disabled":false}, 
//   {catagory: 'cat002', name: 'Fitness',"disabled":false},
//   {catagory: 'cat003', name: 'Lifestyle',"disabled":false}, 
//   {catagory: 'cat004', name: 'Influencer',"disabled":false},
//   {catagory: 'cat005', name: 'Business',"disabled":false}, 
//   {catagory: 'cat006', name: 'Legal',"disabled":false},
//   {catagory: 'cat007', name: 'Education',"disabled":false}, 
//   {catagory: 'cat008', name: 'Finance',"disabled":false},
//   {catagory: 'cat009', name: 'Computer Science',"disabled":false},  
//   {catagory: 'cat010', name: 'Marketing',"disabled":false},
//   {catagory: 'cat011', name: 'Growth Hacking',"disabled":false},
//   {catagory: 'cat012', name: 'Advertising',"disabled":false},
//   {catagory: 'cat013', name: 'Coaching',"disabled":false},
//   {catagory: 'cat014', name: 'Motivational',"disabled":false},
//   {catagory: 'cat015', name: 'Animation',"disabled":false},
//   {catagory: 'cat016', name: 'Design and illustration',"disabled":false},
//   {catagory: 'cat017', name: 'Film and Television',"disabled":false},
//   {catagory: 'cat018', name: 'Entertainment',"disabled":false},
//   {catagory: 'cat019', name: 'Food and travel',"disabled":false},
//   {catagory: 'cat020', name: 'Religion',"disabled":false},
//   {catagory: 'cat021', name: 'Councilling',"disabled":false},
//   {catagory: 'cat022', name: 'Fashion',"disabled":false},
//   {catagory: 'cat023', name: 'Digital Marketing',"disabled":false},
//   {catagory: 'cat024', name: 'Psychology',"disabled":false},
//   {catagory: 'cat025', name: 'Technology',"disabled":false},
//   {catagory: 'cat026', name: 'Personality',"disabled":false},
//   {catagory: 'cat027', name: 'Mind body & soul',"disabled":false},
//   {catagory: 'cat028', name: 'Games',"disabled":false},
//   {catagory: 'cat029', name: 'Sport',"disabled":false},
//   {catagory: 'cat030', name: 'Art and Creativity',"disabled":false},
//   {catagory: 'cat031', name: 'Other',"disabled":false}
// ];
export const SERVICES_CATAGORY = [
{catagory: "cat001", name: "Advertising", disabled: false},
{catagory: "cat002", name: "Animation", disabled: false},
{catagory: "cat003", name: "Art and Creativity", disabled: false},
{catagory: "cat004", name: "Business", disabled: false},

{catagory: "cat032", name: "Car Wash", disabled: false},
{catagory: "cat033", name: "Cleaning", disabled: false},
{catagory: "cat005", name: "Coaching", disabled: false},
{catagory: "cat006", name: "Computer Science", disabled: false},
{catagory: "cat007", name: "Counseling", disabled: false},

{catagory: "cat008", name: "Design and Illustration", disabled: false},
{catagory: "cat009", name: "Digital Marketing", disabled: false},
{catagory: "cat010", name: "Education", disabled: false},
{catagory: "cat011", name: "Entertainment", disabled: false},
{catagory: "cat012", name: "Fashion", disabled: false},
{catagory: "cat013", name: "Film and Television", disabled: false},
{catagory: "cat014", name: "Finance", disabled: false},
{catagory: "cat015", name: "Fitness", disabled: false},
{catagory: "cat016", name: "Food and Travel", disabled: false},
{catagory: "cat017", name: "Games", disabled: false},
{catagory: "cat018", name: "Growth Hacking", disabled: false},
{catagory: "cat019", name: "Health", disabled: false},
{catagory: "cat020", name: "Influencer", disabled: false},
{catagory: "cat021", name: "Legal", disabled: false},
{catagory: "cat022", name: "Lifestyle", disabled: false},
{catagory: "cat023", name: "Marketing", disabled: false},
{catagory: "cat024", name: "Mind Body & Soul", disabled: false},
{catagory: "cat025", name: "Motivational", disabled: false},
{catagory: "cat027", name: "Personality", disabled: false},
{catagory: "cat028", name: "Psychology", disabled: false},
{catagory: "cat029", name: "Religion", disabled: false},
{catagory: "cat034", name: "Security", disabled: false},
{catagory: "cat030", name: "Sport", disabled: false},
{catagory: "cat031", name: "Technology", disabled: false},
{catagory: "cat035", name: "Transport", disabled: false},
{catagory: "cat026", name: "Other", disabled: false},
];
