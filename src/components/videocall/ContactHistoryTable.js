import React from 'react'
import {Link} from 'react-router-dom'
import {IMAGE_BASE_URL} from '../../config/config'
import DefaultProfileImage from '../../assets/images/default_profile_icon.jpg';



const ContactItem = (itemProps) => {
  let itemObj = itemProps.itemObj
  let id        = itemObj.id;
  let SPName        = itemObj.name+' '+itemObj.surname;
  let headline      = itemObj.headline;
  let nameClass = 'color-blue-2';
  if(!itemObj.isSp){
    headline  = "Caller";
    nameClass = ''
  }
  // else{
  //   headline = <Link className="sp-title" to={"/viewprofile/" + itemObj.service_id}>{headline}</Link>
  // }

  // let sectionStyleURL  = IMAGE_BASE_URL+'images/users/frame000.png?v=32776';
  
  // if(itemObj.image!=''){
  //   sectionStyleURL =  IMAGE_BASE_URL+"/storage/app/public/sp/images/users/"+itemObj.image; 
  // }

  // let sectionStyle = 
  // {
  //     background: "url('"+sectionStyleURL+"') no-repeat center center"
  // };

  let sectionStyleURL, userProfileStyleURL;
  sectionStyleURL =  userProfileStyleURL = DefaultProfileImage;
 // DefaultProfileImage
  
  if(itemObj.image!=''){
    sectionStyleURL =  IMAGE_BASE_URL+"/storage/app/public/sp/images/users/"+itemObj.image; 
  }

  console.log("itemObj ",itemObj);
  if(itemObj.userImage!=''){
    userProfileStyleURL =  IMAGE_BASE_URL+"/storage/app/public/sp/images/users/"+itemObj.userImage; 
  }

  let displayImage = (itemObj.isSp)?sectionStyleURL:userProfileStyleURL;
  let sectionStyle = 
  {
      background: "url('"+displayImage+"') no-repeat center center"
  };

  return (
     <div className="full-width pull-left m-b-20" key={id}>

        { itemObj.isSp ?
           (  <a href={"/viewprofile/"+itemObj.service_id}><div className="profile-pic" style={sectionStyle}></div></a>
            )
           :
           (<div className="profile-pic" style={sectionStyle}>
            </div>)
        }

          <div className="sp-info-container">
            { itemObj.isSp ?
               (<div className={"sp-name "+nameClass}>
                  <a className={"sp-name "+nameClass} href={"/viewprofile/"+itemObj.service_id}>{SPName}</a>
                </div>)
               :
               (<div className={"sp-name "+nameClass}>{SPName}</div>)
            }
            
            <div className="sp-title">{headline}</div>
          </div>
      </div>
    )
}

const ContactHistoryTable = (props) => {
  console.log("contactHistoryData", props.contactHistoryData);
  //console.log("contactHistoryData L", Object.keys(props.contactHistoryData).length);
  //console.log(Object.keys(props.callHistoryData));
  var contactLength = Object.keys(props.contactHistoryData).length;
  console.log("length:",props.contactHistoryData.data);

  if(typeof props.contactHistoryData.data!='undefined' && !props.contactHistoryData.data){
    contactLength=0;
  }
  //for (props.callHistoryData)
  var sectionStyle={}
  var containerClass = (contactLength>0)?'contact-container':'no-contact-container';

  return (
    <div className={containerClass}>
      {
        contactLength > 0?
        (
          Object.keys(props.contactHistoryData).map(function(key){

            return <ContactItem itemObj={props.contactHistoryData[key]} key={key}/>
          })
        )
        :
        (
          <div className="no-contact-msg" key='9900'>You have no contacts yet.
          </div>
        )
      }
    </div>

    
  )
}

export default ContactHistoryTable;
