import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import RequestCall from './videocall/RequestCall';

import systemPropsAction  from '../actions/systemPropsAction';
import spDeatilsAction    from '../actions/sPDetailsAction'
import makePaymentAction  from '../actions/makePaymentAction'
import endVideoCall       from '../actions/videocall/endVideoCall'

import ServiceProviderHeaderComponent from '../components/ServiceProviderHeaderComponent'
import EngagementMessage from '../components/videocall/EngagementMessage'
import CallTimer from '../components/videocall/CallTimer'

import {getParamObjectForVideoApi}  from '../helper/common'
import { GlobalErrorMessages}       from '../config/messages'
import {VIDEO_CALL_STATUS}          from '../config/constants'
import {PAYPAL_ENVIRONMENT,PAYPAL_SANDBOX_CLIENT_ID,PAYPAL_PRODUCTION_CLIENT_ID}      from '../config/config'

class Paypal extends Component{

  constructor(props){
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.showPaymentSuccessful = this.showPaymentSuccessful.bind(this);
    this.initiatePayment = this.initiatePayment.bind(this);
    this.paymentInitiationFailed = this.paymentInitiationFailed.bind(this);
    this.paymentInitTimeOut = this.paymentInitTimeOut.bind(this);
    this.paymentTimeUp = this.paymentTimeUp.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    //this.ppxo_close_no_token_cancelurl = this.ppxo_close_no_token_cancelurl(this);
    this.state =
      {
        paymentSuccess: false,
        initiatePayment: false,
        startTimerPP: 0,
        stopTimerPP: 0,
        paymentInitsessionTimeOut: false,
        client: 
        {
          sandbox:PAYPAL_SANDBOX_CLIENT_ID,
          production: PAYPAL_PRODUCTION_CLIENT_ID
        },
        style: {
            label: 'checkout',
            layout: 'horizontal',
            fundingicons:true,
            size:  'responsive',    // small | medium | large | responsive
            shape: 'rect',     // pill | rect
            color: 'gold'      // gold | blue | silver | black
        },
        env: PAYPAL_ENVIRONMENT,
        'currency':'USD',
        'total':0
      }
  }

  onError(err){
      //alert("On Error")
      // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear      
  }

  onCancel(data){
    //alert(console.log('The payment was cancelled - MM !', data));
    // User pressed "cancel" or close Paypal's popup! 
    //alert("cancel")
    console.log('The payment was cancelled - MM Outside !', data);
    //this.props.makePaymentAction(data)
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data 
  }

  // ppxo_close_no_token_cancelurl(data){
  //   console.log("CLose error !", data);
  // }
  onSuccess(payment){
      // Congratulation, it came here means everything's fine! 
      console.log("The payment was succeeded - MM !", payment);

      let callRequestInfo = getParamObjectForVideoApi(this.props)
      let constructPaymentObject = {}

      constructPaymentObject.videoCallId = callRequestInfo.videoCallId;
      constructPaymentObject.userId = callRequestInfo.userId;

      constructPaymentObject.paymentId = payment.paymentID;
      constructPaymentObject.amount = this.state.total;
      constructPaymentObject.paid = payment.paid;
      constructPaymentObject.info = payment;
      
      //console.log("constructPaymentObject --> ",constructPaymentObject);
      this.props.makePaymentAction(constructPaymentObject)
      //this.setState({paymentSuccess: true})
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data 
  }   

  _stopTimer(){
      // Stop timer
      console.log("Paypal - _stopTimer ");
      this.setState({
        paymentInitsessionTimeOut:false,
        startTimerPP:0, // Start Timer
        stopTimerPP:1
      })
  }

  onCancelClick(){
      console.log("Paypal - _stopTimer ");

      let callRequestInfo = getParamObjectForVideoApi(this.props)
      callRequestInfo.info = {}
      callRequestInfo.info.logInfo = GlobalErrorMessages.paymentCancelLog
      callRequestInfo.status = VIDEO_CALL_STATUS.PAYMENT_FAILURE  

      this.setState({
        startTimerPP:0, // Start Timer
        stopTimerPP:1
      },function(){
          this.props.endVideoCall(callRequestInfo)
          setTimeout(function(){
              window.location.href = '/discover'; 
            }, 1000);
        })
  }

  componentDidMount() {
    //this.props.systemPropsAction();
    //this.props.spDeatilsAction(91)
    //this.props.makePaymentAction(constructPaymentObject)
    //alert('did mount')
    //this.props.makePaymentDummyAction({})
    
  }

  componentWillMount(){
     // This will initiated from Request call
    console.log("Paypal - componentWillMount", this.props)
    if(this.props.hasOwnProperty('message') && this.props.message!=''){
      console.log("Paypal - componentWillMount Counter Started ")
      this.setState({
        initiatePayment: true,
        startTimerPP:1, // Start Timer
        stopTimerPP:0
      })

      // Start countdown for the click event
      // Start Timer
    // this.setState({
    //   startTimerPP:1,
    //   stopTimerPP:0
    // })

    }

    // Set the price
    let spInfo = this.props.selectedServiceDetails;
    if(spInfo.hasOwnProperty('selectedPrice') 
        && typeof spInfo.selectedPrice.price !='undefined' 
        && spInfo.selectedPrice.price!=''
        && spInfo.selectedPrice.price!=0
        )
    {
      this.setState({total: parseFloat(spInfo.selectedPrice.price) })
    }
    else{
      //alert("false")
      this.setState({initiatePayment: false})
    }
    // testing
    //this.setState({initiatePayment: true})
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      startTimerPP:0,
      stopTimerPP:0
    })

    console.log("Paypal - componentWillReceiveProps", nextProps)
    let paymentInfoProps = nextProps.paymentInfo
    if (paymentInfoProps.hasOwnProperty('paid') && paymentInfoProps.paid==true){
        
        let self = this
        //end timer here 
        this.setState({
          startTimerPP:0, 
          stopTimerPP:1,
          paymentInitsessionTimeOut:false
        },function(){
          setTimeout(function(){
              self.setState({paymentInitsessionTimeOut:false,paymentSuccess: true}) 
            }, 1000);
          
        })
    }
  }

  showPaymentSuccessful(){
    return (
          <div>
          <EngagementMessage message='paymentSuccessfulMessage' /> 
          <div className="col-md-3  col-xs-6 col-sm-6">
                <div className="row m-t-10">
            <Link className="btn btn-primary theme-btn p-l-10 p-r-10" to='/videocall'> Click for Video Call</Link>
          </div></div>
          </div>
    )
  }

  // This is callback from the CallTimer
  paymentTimeUp(){
    console.log('pay timeup')
    let callRequestInfo = getParamObjectForVideoApi(this.props)
    callRequestInfo.info = {}
    callRequestInfo.info.logInfo = GlobalErrorMessages.paymentFailureLog
    callRequestInfo.status = VIDEO_CALL_STATUS.PAYMENT_FAILURE  

    this.props.endVideoCall(callRequestInfo)

    this.setState({
     paymentInitsessionTimeOut:true,
     initiatePayment:false,
    })
  }

  paymentInitTimeOut(){
    return (
        <div>
        <EngagementMessage message='paymentInitTimeOutMessage' /> 
        </div>
    )
  }

  // onPaypalClick(){
  //   //alert("paypal click");
  //   console.log("Hurray !!! paypal click found");
  // }
  
  initiatePayment(){
    console.log("initiatePayment: ",this.state);
    //alert('ip')
    // Start Timer
    // this.setState({
    //   startTimerPP:1,
    //   stopTimerPP:0
    // })

    // return (
    //   <div className="wrapper"> 
    //     <div className="container">
    //       <section className="section section-we-made-1"> 
    //         <div className="contributor-block">
    //             <div className="unit-container">
    //                 <EngagementMessage message="Payment testing" />
    //             <div className="col-md-3  col-xs-6 col-sm-6">
    //             <div className="row m-t-10">
    //               <PaypalExpressBtn 
    //               env={this.state.env} 
    //               client={this.state.client} 
    //               currency={this.state.currency} 
    //               total={this.state.total} 
    //               onError={this.onError} 
    //               onSuccess={this.onSuccess} 
    //               onCancel={this.onCancel} />
    //             </div>

              
    //           <CallTimer
    //               source = 'paypal'
    //               startTimer = "1"
    //               stopTimer = "0"
    //               onTimeUp = {this.paymentTimeUp}
    //            />
              
    //         </div>

    //             </div>
    //         </div>  
    //       </section>
    //     </div>    
    //   </div>
    // );
    // <EngagementMessage message={this.props.message} />
               

     return (
     
          <div>
          {/* Header - Remove This *
          <div className="wrapper"> 
        <div className="container">
          <section className="section section-we-made-1"> 
            <div className="contributor-block">
                <div className="unit-container">
          {/* Header - Remove This */}

      <EngagementMessage message={this.props.message} />
          <div className="col-md-3  col-xs-6 col-sm-6">
                <div className="row m-t-10">
                  <PaypalExpressBtn 
                  env={this.state.env} 
                  client={this.state.client}
                  style={this.state.style} 
                  currency={this.state.currency} 
                  total={this.state.total} 
                  onError={this.onError} 
                  onSuccess={this.onSuccess} 
                  onCancel={this.onCancel} 
                  //onClick={this.onPaypalClick}
                  />
                </div>
            </div>
            <div className="col-md-3  col-xs-6 col-sm-6 m-t-10"> 
                  <button className="btn custom-btn" onClick={this.onCancelClick}>Cancel</button>
            </div>
            <div>
              <CallTimer
                    source = 'paypal'
                    startTimer = {this.state.startTimerPP}
                    stopTimer = {this.state.stopTimerPP}
                    onTimeUp = {this.paymentTimeUp}
              />
            </div>

          {/* Bottom - Remove This *
          </div></div></section></div></div>
          {/* Bottom - Remove This */}

            
      </div>
       
    );
  }
  paymentInitiationFailed(){
     return (
      <div className="wrapper"> 
        <div className="container">
          <section className="section section-we-made-1"> 
            <div className="contributor-block">
                <div className="unit-container">
                    <EngagementMessage message='paymentInitiationFailed' /> 
                </div>
            </div>  
          </section>
        </div>    
      </div>
    );
  }
  render(){
    console.log("Paypal Render - ",this.state);

    if(document.querySelector('[id^="xcomponent-paypal-button-"]')!=null){
      let mid = document.querySelector('[id^="xcomponent-paypal-button-"]').id;
      //alert(mid);
      //console.log(actions);

      // if ($('div.container iframe').length) {
      //   alert('frame exists');
      //   $('<div class="icon"></div>');
      // }

      //xcomponent-outlet

      //document.getElementById(mid).onclick = this.onPaypalClick
    //   alert('hi')
    }

    window.history.pushState('', '', '/payment');
    //let spInfo = this.props.spInfo;
        return (
              <div>
                  {this.state.paymentSuccess == true && (this.showPaymentSuccessful())}
                  {this.state.paymentInitsessionTimeOut == false && this.state.paymentSuccess == false && this.state.initiatePayment == true && (this.initiatePayment())}
                  {this.state.paymentInitsessionTimeOut == true && (this.paymentInitTimeOut())}
                  {this.state.paymentInitsessionTimeOut == false && this.state.paymentSuccess == false && this.state.initiatePayment == false && (this.paymentInitiationFailed())}                    
              </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      spDeatilsAction: spDeatilsAction,
      makePaymentAction: makePaymentAction,
      endVideoCall: endVideoCall
    }
    , dispatch)
}

function mapStateToProps (state){
  console.log(" -- paymentInfoResponse -- ");
  console.log(state)
  // 
  return {
    videoCallMessage: state.videoCallMessageResponse,
    selectedServiceDetails: state.serviceProfileResponse,
    loggedInUserInfo: state.loggedInUserInfoResponse,
    paymentInfo: state.paymentInfoResponse
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Paypal);