import React from 'react';
import {Link} from 'react-router-dom';
import {GlobalErrorMessages} from '../config/messages'
import queryStringReader from '../helper/urlQueryStringReader';
import ContentPage from '../components/ContentPage'
import { connect } from 'react-redux';
import {SERVICE_PROVIDER_REGISTRATION_TOP_CONTENT} from '../config/config';
import ServiceProviderLinks from '../components/SpRegisteration/SpExternalLinks'
import SpPricing from '../components/SpRegisteration/SpPricing';
import SpPublishedMaterail from '../components/SpRegisteration/SpPublishedMaterial';
import SpTraningEducation from '../components/SpRegisteration/SpTraningEducation';
import SpSocialMediaFollowers from '../components/SpRegisteration/SpSocialMediaFollowers';
import SpContactDetails from '../components/SpRegisteration/SpContactDetails';
import SpSkillsSets from '../components/SpRegisteration/SpSkillsSets';
import SpServiceDescription from '../components/SpRegisteration/SpServiceDescription';
import SpServiceTitleAndBAckgroundDetails from '../components/SpRegisteration/SpServicesTitleAndBackground'
import ServiceCatagoryAndLanguage from '../components/SpRegisteration/ServiceCatagoryAndLanguage'
import SpPaypalDetails from '../components/SpRegisteration/SpPaypalDetails'
import SpImageUpload from '../components/SpRegisteration/SpImageUpload';
import SuccessComponent from '../components/SuccessComponent';
import ServiceSaved from './ServiceSavedContainer';
import {bindActionCreators} from 'redux';
import {sendSpDataForApproval} from "../actions/spRegistrationApproval"

class ServiceProviderRegistration extends React.Component {
  constructor(props){
    super(props);
     window.history.pushState('', '', '/spregister');
    this.state = {
      pageTitle:GlobalErrorMessages['becomeServiceProviderTitle'],
      pageContent:GlobalErrorMessages['becomeServiceProviderContent'],
      pageButton:'SPFormDownload',
    };
    this.saved = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  topMostContent(){
    return(
      <div className="container">
        <div className="font-18 color-black-1 font-bold m-b-0 m-t-40">CREATE SERVICE</div>
        <div className="m-b-40">{SERVICE_PROVIDER_REGISTRATION_TOP_CONTENT}</div>
      </div>
    )
  }

  objectValueExtractor(obj){
    console.log("*******************>", obj)
    let temp ={};
    let value = "";
    for(let i in obj){
      if(obj[i] != null ){
        value = obj[i].value;
      }
      temp[i[0].toLowerCase() + i.substr(1)] = value ;
      if(i =='unit'){
        temp[i]= obj[i];
      }
    }
    return temp;
  }

  valueExtractorForPublication(obj, edu, otheredu){
    let publicationObj = {};
    let value = "";
    for(let i in obj){
      publicationObj[i.toLowerCase()] = [];
      let temp = {};
      if(obj[i] != null){
        value = obj[i].value;
      }
      temp = {
        name : "",
        link: value,
        image: ""
      };
      publicationObj[i.toLowerCase()].push(temp);
    }
    publicationObj['education'] = [];
    let educationobj = {};
    educationobj['name'] = edu;
    educationobj['link'] = otheredu;
    educationobj['image'] = "";
    publicationObj['education'] = [educationobj];
    return publicationObj;
  }

  knowledgeExtractor(obj){
    let temp = [];
    for(let i in obj){
      if(obj[i] != null) {
        temp.push(obj[i].value)
      }
    }
    return temp.toString()
  }

  handleSubmit(e){
    e.preventDefault();
    let dataToSend = {};
    let serviceDescription = this.refs.SpServiceDesc.serviceDesc.value;
    let serviceTargetedAt = this.refs.SpServiceDesc.serviceTargetedAt.value;
    let sPEducationalDetails = this.refs.SpTraningEdu.checkedValue;
    let spOthersEducationDetails = this.refs.SpTraningEdu.othersEducationDetails.value;
    let spPublishedMaterial = this.refs.SpPublishedMaterial.publishedCat; //obj
    let spSocialMediaFollower = this.refs.SpSocialMediaFollowers.mediaFollowers;
    let spServiceTitle = this.refs.SpServiceTitleAndBAckgroundDetails.serviceTitle.value;
    let serviceSubTitle = this.refs.SpServiceTitleAndBAckgroundDetails.serviceSubTitle.value;
    let sPBackground = this.refs.SpServiceTitleAndBAckgroundDetails.sPBackground.value;
    let spSkillSets = this.refs.SpSkillsSets.skillSet; // object
    let spPhoneNumber = this.refs.SpContactDetails.phoneNumber;  //.value;
    let spPhoneCountry = this.refs.SpContactDetails.selectedCountry;
    let pricing = this.refs.SpPricing.pricing; //object
    let payPalEmail = this.refs.SpPaypalDetails.payPalEmail.value;
    let catagory = this.refs.ServiceCatagoryAndLanguage.catagory;
    let language = this.refs.ServiceCatagoryAndLanguage.language.value;
    let links = this.refs.ServiceProviderLinks.spExternalLinks; //obj
    let spImage = this.refs.SpImageUpload.refs.imageUploadContainer.wrappedInstance.state.file;

    /*preparing service provider json*/
    dataToSend['userId'] = this.props.loggedUserInfo.userId;
    dataToSend['headline'] = spServiceTitle;
    dataToSend['service'] = serviceSubTitle;
    dataToSend['description'] = serviceDescription;
    dataToSend['background'] = sPBackground;
    dataToSend['target'] = serviceTargetedAt;
    dataToSend['language'] = language;
    dataToSend['phoneNo'] = spPhoneNumber;
    dataToSend['country'] = spPhoneCountry;
    dataToSend['followers'] = spSocialMediaFollower || null;
    dataToSend['links'] = this.objectValueExtractor(links);
    dataToSend['price'] = this.objectValueExtractor(pricing);
    dataToSend['knowledge'] = this.knowledgeExtractor(spSkillSets);
    dataToSend['paypalEmail'] = payPalEmail;
    dataToSend['category'] = catagory.toString();
    dataToSend['spImage'] = spImage;
    dataToSend['publication'] = this.valueExtractorForPublication(spPublishedMaterial, sPEducationalDetails, spOthersEducationDetails);
    console.log("service provider data", dataToSend);
    this.props.sendSpDataForApproval(dataToSend);
  }

  serviceProfileSetup(){
    return(
      <div className="col-md-12 m-b-30 m-t-30">
        <div className="">
          <div className="col-md-6 col-lg-6">
            <div className="font-18 color-black-1 font-bold m-b-5">REGISTER YOUR SERVICE</div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="font-18 color-black-1 font-bold m-b-5 p-l-30 hidden-sm hidden-xs">SERVICE PROFILE SET UP</div>
          </div>
        </div>
      </div>
    )
  }

  // clearRegistrationState(){
  //   let dataToSend = {"clear":true};
  //   this.props.sendSpDataForApproval(dataToSend);
  // }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.spRegistrationresponse.hasOwnProperty('data')
  //         && nextProps.spRegistrationresponse.data.hasOwnProperty('serviceId')
  //         && nextProps.spRegistrationresponse.data.serviceId
  //     ){
  //     setTimeout(this.clearRegistrationState(), 2000);
  //   }

  // }
  render() {
    window.history.pushState('', '', '/spregister');
    if(this.saved){
        //this.saved = false;
      return (<ServiceSaved />)
    }
    if(!this.saved && this.props.spRegistrationresponse.hasOwnProperty('data')
          && this.props.spRegistrationresponse.data.hasOwnProperty('serviceId')
          && this.props.spRegistrationresponse.data.serviceId
      ){
      this.saved = true;
      return (
        <ServiceSaved />
        )
    }
    else if(!this.saved){
    return (
      <div className="">

        <div className="wrapper sp-form">
          <div className=" p-0-xs ">
            <section className="section section-we-made-1">
              {this.topMostContent()}
              <form onSubmit={this.handleSubmit} name="myform" >

                <div className="container ">
                  <div className="bg-white pull-left full-width">
                    {this.serviceProfileSetup()}
                    <div className="col-md-12">
                      <div className="">
                        <div className="col-md-6 col-lg-6 bor-right-grey-9 bor-right-mobile-none">

                          <div className="p-r-30 p-r-0-mobile">
                            <SpServiceDescription ref = "SpServiceDesc" />
                            <div className="dir-seperator"></div>
                            <SpTraningEducation ref = "SpTraningEdu"/>
                            <div className="dir-seperator"></div>
                            <SpPublishedMaterail ref ="SpPublishedMaterial"/>
                            <div className="dir-seperator"></div>
                            <SpSocialMediaFollowers ref = "SpSocialMediaFollowers"/>
                            <div className="dir-seperator"></div>
                            <ServiceProviderLinks ref = "ServiceProviderLinks"/>
                          </div>

                        </div>
                        <div className="col-md-6 col-lg-6">
                          <div className="hidden-lg hidden-md font-18 color-black-1 font-bold m-b-5 m-t-20">SERVICE PROFILE SET UP</div>
                          <div className="p-l-30 p-l-0-mobile">

                            <SpServiceTitleAndBAckgroundDetails ref ="SpServiceTitleAndBAckgroundDetails"/>
                            <ServiceCatagoryAndLanguage ref = "ServiceCatagoryAndLanguage"/>
                            <SpSkillsSets ref = "SpSkillsSets"/>
                            <SpImageUpload ref ="SpImageUpload"/>
                            <SpContactDetails ref = "SpContactDetails" email={this.props.loggedUserInfo.email}/>
                            <div className="sp-input-group">
                              <SpPricing ref="SpPricing"/>
                            </div>
                            <SpPaypalDetails ref="SpPaypalDetails"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="text-center m-t-30 m-b-30">
                        <button className="theme-btn btn p-lr-50">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>

      </div>
    )}
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    sendSpDataForApproval: sendSpDataForApproval}, dispatch)
}


function mapStateToProps (state){
  return {
   loggedUserInfo: state.loggedInUserInfoResponse,
   spRegistrationresponse:state.spRegistrationresponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ServiceProviderRegistration);
