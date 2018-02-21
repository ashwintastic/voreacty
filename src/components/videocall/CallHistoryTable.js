import React from 'react'
import {Link} from 'react-router-dom'
import {IMAGE_BASE_URL, SERVICES_CATAGORY} from '../../config/config'

export const CallHistoryItem = (itemProps) => {
  // let index = rowprops.index+1;

  let itemObj = itemProps.itemObj
  let SPName        = itemObj.name+' '+itemObj.surname;
  let title         = itemObj.service;
  let category      = itemObj.category;
  let headline      = itemObj.headline;
  let callDuration  = itemObj.length;
  let callStartedAt = itemObj.time_from;
  let billingPlan   = itemObj.duration+' min Billing Plan'
  let role          = (itemObj.isSp)?'<Link to="/discover">Service Provider</Link>':'';

   let isSP         = itemObj.isSp;

   if(isSP){
      callStartedAt = itemObj.call_start_time_local_user;
   }
   else{
      callStartedAt = itemObj.call_start_time_local_sp;
   }

  let priceSign     = (itemObj.isSp)?'-':'';
  if(itemObj.hasOwnProperty('serviceDetail')){
    priceSign = '';
  } 
  console.log("itemObj",itemProps);

  
  let cost          = priceSign+'$'+itemObj.price
  
  let sectionStyleURL, userProfileStyleURL;
  sectionStyleURL =  userProfileStyleURL = IMAGE_BASE_URL+'images/users/frame000.png?v=32776';
  
  console.log(itemObj.id);
  console.log(sectionStyleURL);

  if(itemObj.image!=''){
    sectionStyleURL =  IMAGE_BASE_URL+"/storage/app/public/sp/images/users/"+itemObj.image; 
  }
  console.log(sectionStyleURL);
  if(itemObj.userImage!=''){
    userProfileStyleURL =  IMAGE_BASE_URL+"/storage/app/public/sp/images/users/"+itemObj.userImage; 
  }

  let displayImage = (itemObj.isSp)?sectionStyleURL:userProfileStyleURL;
  let sectionStyle = 
  {
      background: "url('"+displayImage+"') no-repeat center center"
  };
    
  let catDisplayArray = {}
  SERVICES_CATAGORY.map((c)=>{
                      catDisplayArray[c.catagory] = c.name;
                    })
  //console.log("catDisplayArray",catDisplayArray);
  let displayCategory = '';  
  if(category!=''){ 
    //alert(category);
    let catArr = category.split(',');
    displayCategory = catDisplayArray[catArr[0]];
    if(typeof catArr[1] !='undefined' && catArr[1]!=''){
      displayCategory = displayCategory+' | '+catDisplayArray[catArr[1]]
    }
  } 
  let bgClass = 'bg-white';
  if(!itemObj.isSp){
    displayCategory = '';
    title = 'Caller'
    bgClass = 'bg-grey';
  }
  if(itemObj.hasOwnProperty('serviceDetail')){
    bgClass = 'bg-white';
    displayCategory = '';
  }
  //console.log("In Item")
  return (
    <div className={"contact-tile  "+bgClass+" col-md-12"} key={itemObj.id}>
      <div className="row">
           <div className="col-md-5 col-lg-5 col-xs-12 col-sm-5">
               <div className="profile-pic" style={sectionStyle}></div>
               <div className="sp-info-container">
                   <div className="sp-name">{SPName}</div>
                   <div className="sp-title">{title}</div>
                   <div className="sp-category">{displayCategory}</div>
                   <div className="service-title">{headline}</div>

               </div>
           </div>
           <div className="col-md-3 col-lg-3 col-xs-12 col-sm-3 ">
               <div className="call-started-dt">{callStartedAt}</div>
               <div className="call-duration">{callDuration}</div>

           </div>
           <div className="col-md-4 col-lg-4 text-right col-xs-12 text-mobile-left col-sm-4">
               <div className="money">{cost}</div>
               <div className="billing-plan">{billingPlan}</div>

               <div className="role">{
                isSP?(<Link className="role" to={"/viewprofile/"+itemObj.service_id}>Service Provider</Link>):(null)
               }</div>

           </div>
       </div>
      </div>
    )
}

const CallHistoryMonthSection = (monthProps) => {
  //console.log("monthProps", monthProps);
  return <div className="font-13 font-bold color-grey-9 m-b-5 " key={monthProps.key1}>{monthProps.key1}</div>
}

const CallHistoryTable = (props) => {
  console.log("callHistoryData", props.callHistoryData);
  //console.log(Object.keys(props.callHistoryData));
  var array = []
  //for (props.callHistoryData)
  return (
    <div className="call-his-container p-0-xs">
      <div className="font-38 color-black-1 m-b-20 ">Call History</div>
      {
         Object.keys(props.callHistoryData).map(function(key1){
            array.push(<CallHistoryMonthSection key1={key1} key={key1} />
            )
            props.callHistoryData[key1].map(function(itemObj, key){
             array.push(<CallHistoryItem itemObj={itemObj} key={itemObj.id}/ >)
            })  
         })
      }
      {array}
      { /*
      <div className="font-13 font-bold color-grey-9 m-b-5 ">November 2016</div>
      <CallHistoryItem />
      <CallHistoryItem />
      <div className="font-13 font-bold color-grey-9 m-b-5 ">October 2016</div>
      <CallHistoryItem />
      <CallHistoryItem />
    */ }
    </div>
  )
}

export default CallHistoryTable;
