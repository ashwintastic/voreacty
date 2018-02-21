/**
 * Created by root on 9/8/17.
 */
import React, {Component} from 'react'
import RequestCall from './videocall/RequestCall';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import systemPropsAction from '../actions/systemPropsAction';
import spDeatilsAction from '../actions/sPDetailsAction'
import checkBoxImgs from '../assets/images/checkbox.png';
import crossImg from '../assets/images/cross.png';
import ServiceProviderHeaderComponent from '../components/ServiceProviderHeaderComponent';
import TwilioDeviseCheck from '../helper/twilioDeviseSupport';
import selectedPriceByUserAction from '../actions/selectedPriceByUserAction'
import { GlobalErrorMessages} from '../config/messages'

let sectionStyle = {
  float: 'left'
};
class DeviceSupport extends Component{

  constructor(props){
    super(props);
    this.state ={supportPresent: -1, twilioCheck: ''}
  }

  componentDidMount() {
    this.twilioCheck();
    this.props.systemPropsAction();
    localStorage.removeItem("pricing");
    localStorage.removeItem("service");
    if(this.props.hasOwnProperty('serviceId')){
      this.props.spDeatilsAction(this.props.serviceId);
     
    }
  }

 componentWillReceiveProps(nextProps){
  if(typeof nextProps.spInfo != "undefined" && nextProps.spInfo.data
        && typeof nextProps.spInfo.selectedPrice == "undefined"
      ){
      let priceTimingObj = new Object();
      priceTimingObj['duration'] = this.props.duration;
      priceTimingObj['price'] = this.props.priceSelected;
      this.props.selectedPriceByUserAction(priceTimingObj);
    }
    
    if (typeof nextProps.supportPresent == 'undefined'){
        this.setState({supportPresent: -1})
    }
    else if(nextProps.supportPresent==true){
      this.setState({supportPresent: 1})
    }
    else{
        this.setState({supportPresent: 0})
    }


  }



  browserNotSupportedMessage(){
   const {twilioCheck} = this.state;
   console.log("hehe", twilioCheck )
    return this.displaySupportMessage('browserSupportFailHeading',
      'fa fa-times color-red-3 m-r-10',
      'browserSupportFailMessage',
      twilioCheck)
  }

  displaySupportMessage(heading, headclass, message,  twilioCheck){
    let showContinueBtn = twilioCheck.isCompatible;
    console.log(twilioCheck, "hehe")
    return (
        <div>
          <h2> <i className={headclass} aria-hidden="true"></i>
          {GlobalErrorMessages[heading]}
          </h2>
          <p>{GlobalErrorMessages[message]}</p>
          <p>{twilioCheck.missingMedia}</p>
          { showContinueBtn ? (
              <div className="col-md-3  col-xs-6 col-sm-6">
                <div className="row m-t-10">
                    <Link to="/requestcall/"
                    className="btn btn-primary  full-width theme-btn p-l-10 p-r-10">
                    Continue
                    </Link>
                </div>
              </div>
            )
            : (null)

          }
        </div>

    )
  }
/*  browserSupportedMessage() {
    return this.displaySupportMessage('browserSupportSuccessHeading','fa fa-check-circle color-green m-r-10','browserSupportSuccessMessage',1)
  }*/
  showContinueButton(){
    return(
      <div className="col-md-3  col-xs-6 col-sm-6">
        <div className="row m-t-10">
          <Link to="/requestcall/"
                className="btn btn-primary  full-width theme-btn p-l-10 p-r-10">
            Continue
          </Link>
        </div>
      </div>
    )
  }



  async twilioCheck(){
    let twilioFlag = await TwilioDeviseCheck.isDeviseCompatible();
    console.log("twilioFlag", twilioFlag)
    this.setState({twilioCheck: twilioFlag})
  }

  render(){
    const style = {
      marginLeft: '41%',
      marginTop: '10%'
    };
    const {twilioCheck} = this.state;
    window.history.pushState('', '', '/devicesupport');
    let flag = this.state.supportPresent;
    //console.log("hi", flag , twilioCheck != '', twilioCheck, "**", (flag == 0 || twilioCheck != '') )
    let spInfo = this.props.spInfo;
        return (
            <div className="wrapper">
                <section className="section section-we-made-1">
          <div>
            {Object.keys(spInfo).length > 0 && spInfo.hasOwnProperty('contributor')  && 
              <ServiceProviderHeaderComponent
              spInfo={this.props.spInfo}
              readOnlyPrice={true}
              priceSelected={this.props.priceSelected}
            /> }
            <div className="" >
            <div className="">
                <section className="" >


                <section className="single-brief">
            <div className="single-sp ">
                <div className="">
                    <div className="col-sm-12 col-md-5 col-lg-4 colspan"></div>
                    <div className="col-sm-12  col-md-7 col-lg-8 colspan">
                        <div className="knowledge-skills pull-left">

                            {flag == -1 && (null)}
                            {(flag == 0 || (twilioCheck != '' && twilioCheck.missingMedia != 'none')) ?
                            (this.browserNotSupportedMessage()):(null)}

                            {twilioCheck != '' && twilioCheck.missingMedia == 'none' &&  Object.keys(spInfo).length > 0 && spInfo.hasOwnProperty('contributor')  &&  (<RequestCall/>)}


                          {/* {flag == 1 && (this.browserSupportedMessage())}*/ }
                            </div>
                    </div>
                </div>
            </div>
        </section>


                </section>
            </div>
            </div>
          </div>
                    </section>
                </div>
        )

    }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
                        systemPropsAction: systemPropsAction,
                        spDeatilsAction: spDeatilsAction,
                        selectedPriceByUserAction: selectedPriceByUserAction
                      }, dispatch)
}


function mapStateToProps (state){
  return {
    supportPresent: state.systemConfigResponse.support,
    spInfo: state.serviceProfileResponse,
    userLoggedInfo:state.loggedInUserInfoResponse
  }

}

export default connect(mapStateToProps, matchDispatchToProps)(DeviceSupport);