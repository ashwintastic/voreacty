import React from 'react';
import {Link} from 'react-router-dom';
import {GlobalErrorMessages} from '../config/messages'
import queryStringReader from '../helper/urlQueryStringReader';
import ContentPage from '../components/ContentPage'
import { connect } from 'react-redux';
import {SERVICE_PROVIDER_REGISTRATION_TOP_CONTENT} from '../config/constants';
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
import SpImageUpload from '../components/SpRegisteration/SpImageUpload'
class SPRegistrationEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageTitle:GlobalErrorMessages['becomeServiceProviderTitle'],
      pageContent:GlobalErrorMessages['becomeServiceProviderContent'],
      pageButton:'SPFormDownload',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  topMostContent(){
    return(
      <div className="container">
        <div className="font-18 color-black-1 font-bold m-b-5 m-b-30">CREATE SERVICE</div>
        <div className="m-b-40">{SERVICE_PROVIDER_REGISTRATION_TOP_CONTENT}</div>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    let serviceDescription = this.refs.SpServiceDesc.serviceDesc.value;
    let serviceTargetedAt = this.refs.SpServiceDesc.serviceTargetedAt.value;
    let sPEducationalDetails = this.refs.SpTraningEdu.checkedValue;
    let spOthersEducationDetails = this.refs.SpTraningEdu.othersEducationDetails.value;
    let spPublishedMaterial = this.refs.SpPublishedMaterial.publishedCat;
    let spSocialMediaFollower = this.refs.SpSocialMediaFollowers.mediaFollowers;
    let spServiceTitle = this.refs.SpServiceTitleAndBAckgroundDetails.serviceTitle;
    let serviceSubTitle = this.refs.SpServiceTitleAndBAckgroundDetails.serviceSubTitle;
    let sPBackground = this.refs.SpServiceTitleAndBAckgroundDetails.sPBackground;
    let spSkillSets = this.refs.SpSkillsSets.skillSet; // object
    let spEmail = this.refs.SpContactDetails.email.value;
    let spPhoneNumber = this.refs.SpContactDetails.phoneNumber.value;
    let pricing = this.refs.SpPricing.pricing; //object
    let payPalEmail = this.refs.SpPaypalDetails.payPalEmail.value;

  }

  serviceProfileSetup(){
    return(
      <div className="col-md-12 m-b-30 m-t-30">
        <div className="">
          <div className="col-md-6 col-lg-6">
            <div className="font-18 color-black-1 font-bold m-b-5">REGISTER YOUR SERVICE</div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="font-18 color-black-1 font-bold m-b-5 p-l-30 hidden-sm  hidden-xs">SERVICE PROFILE SET UP</div>
          </div>
        </div>
      </div>
    )
  }



  render() {
    console.log("render parent");
    window.history.pushState('', '', '/spregister');
    return (
      <div className="">

        <div className="wrapper sp-form">
          <div className=" p-0-xs ">
            <section className="section section-we-made-1">
              {this.topMostContent()}
              <form onSubmit={this.handleSubmit}>

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
                            <ServiceCatagoryAndLanguage/>
                            <SpSkillsSets ref = "SpSkillsSets"/>
                            <SpImageUpload/>
                            <SpContactDetails ref = "SpContactDetails"/>
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
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    }, dispatch)
}


function mapStateToProps (state){
  return {

  };
}

export default connect(mapStateToProps, matchDispatchToProps)(SPRegistrationEdit);
