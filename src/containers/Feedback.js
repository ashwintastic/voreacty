import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {userFeedBackAction, spFeedBackAction} from '../actions/FeedBackAction';

import FeedbackThankYou from '../components/videocall/FeedbackThankYou'
import SuccessComponent from '../components/SuccessComponent';
import {GlobalErrorMessages} from '../config/messages';
import {PLATFORM_FEEDBACK_OPTIONS, SERVICE_PROVIDER_FEEDBACK_OPTIONS} from '../config/constants';

import {getParamObjectForVideoApi} from '../helper/common';
import {FEEDBACK_REDIRECTION_TIMING} from '../config/constants';
class Feedback extends Component{
  constructor(props){
    super(props);
    this.handleUserFeedBack = this.handleUserFeedBack.bind(this);
    this.showReconnectMessage = this.showReconnectMessage.bind(this);
    //this.handleSkip = this.handleSkip.bind(this);
    // this.handleChecked = this.handleChecked.bind(this)
    this.suggestion = {};
  }

  // componentWillReceiveProps(nextprops){
  //   console.log("Feedback:componentWillReceiveProps ", nextprops);
  // }

  handleUserFeedBack(event){
    //const {videocallObj , loggedInUserInfo } = this.props;
    event.preventDefault();
    
    console.log("Feedback:handleUserFeedBack:Before ", this.props);
    let callRequestInfo = getParamObjectForVideoApi(this.props.userProps);
    console.log("Feedback:handleUserFeedBack:callRequestInfo ", callRequestInfo);
    
    let commentsPlatform = (typeof this.comment != 'undefined')?this.comment.value:'';

    this.suggestion['videoCallId'] = callRequestInfo.videoCallId;
    this.suggestion['serviceId'] = callRequestInfo.serviceId;

    if(!callRequestInfo.isSPUser){
      this.suggestion['userId'] = callRequestInfo.userId;
      this.suggestion['spId'] = callRequestInfo.serviceUserId;
      this.suggestion['userPfComments'] = commentsPlatform;
       console.log("handleUserFeedBack:suggestion:user",this.suggestion)
      this.props.userFeedBackAction(this.suggestion)
    }
    else{
      this.suggestion['spId'] = callRequestInfo.userId;
      this.suggestion['spPfComments'] = commentsPlatform;
       console.log("handleUserFeedBack:suggestion:sp",this.suggestion)
      this.props.spFeedBackAction(this.suggestion)
    }

    // setTimeout(() => {
    //   window.location.href = "/discover"
    // }, FEEDBACK_REDIRECTION_TIMING);
  }

  handleChecked(key, val){
    this.suggestion[key] =val;
  }

  // One time feedback from User to SP (Star Rating)
  userFeedbackForSP(){
    let options = SERVICE_PROVIDER_FEEDBACK_OPTIONS;

    return(options.map((op)=>{
        let checked = false;
      if(op.hasOwnProperty('default') && op.default == true){
        checked = true;
        this.suggestion['userSpStar'] = op.value;
      }
        return(
          <p key={op.label}>
            <input type="radio"  name="radio-group"
                   defaultChecked={checked}
                   onChange={this.handleChecked.bind(this, 'userSpStar', op.value)}
            />
            <label className="font-bold color-black-1 p-l-5">{op.label} <span className="font-normal font-12 f-style-italic">{op.sublabel}</span>
            </label>
          </p>
        )
      })
    )
  }


  // Feedback from User to Platform (Star Ratings)
  // Feedback from SP to Platform (Star Ratings)
  userFeedbackForPlatform(isSpUser) {
    let options = PLATFORM_FEEDBACK_OPTIONS;
    let startRating = 'userPfStar'
    if(isSpUser){
      startRating = 'spPfStar';
    }

    return(options.map((op) =>{
      let checked = false;
      if(op.hasOwnProperty('default') && op.default == true){  
        checked = true;
        this.suggestion[startRating] = op.value;
      }
        return(
          <p key={op.label}>
            <input type="radio" name="radio-group-one"
                   onChange={this.handleChecked.bind(this, startRating,  op.value)}
                   defaultChecked={checked}
            />
            <label className="font-bold color-black-1 p-l-5" >{op.label} <span className="font-normal font-12 f-style-italic">{op.sublabel}</span></label>
          </p>
        )
      })
    )
  }
  showReconnectMessage(){
    return ( 
      <div className="m-b-10">Your call seems to have ended before stipulated time. If you think this is an error, you may follow instructions in the email to reconnect.
      </div>
    )
  }

  render(){
    console.log("Feedback:handleUserFeedBack:Before ", this.props);
    //let callRequestInfo = {}
    let callRequestInfo = getParamObjectForVideoApi(this.props.userProps);
    //console.log("Feedback:handleUserFeedBack:Render ", callRequestInfo);
    return (
      <div className="">
      {this.props.feedBack.hasOwnProperty('feedbackId') ? 
      (
        <SuccessComponent color = "color-red-3" fromPage="feedback" />
      )
      :
      (
        <div className="">
          <div className="">
            <section className="" >
              <div className="">
                <form id="contact" onSubmit={this.handleUserFeedBack}>

                {this.props.showReconnectMessageOnFeedback == true && (this.showReconnectMessage())}
                
               

                { !callRequestInfo.isSPUser ?
                  (<div>

                    <div className="font-20 color-black-1 m-b-10 font-bold line-height-normal">How do you rate your experience
                      with the Service Provider?
                    </div>
                    <div className="m-b-10">
                      {this.userFeedbackForSP()}
                    </div>
                  </div>
                  ):(null)
                }
                  <div className="clear-both">
                    <div className="font-20 color-black-1 font-bold m-b-10 line-height-normal">What are your thoughts on this product in general?
                    </div>
                    <div className="m-b-10">
                      {this.userFeedbackForPlatform(callRequestInfo.isSPUser)}
                    </div>
                  </div>

                  <textarea placeholder="Add your comment" tabIndex="5" ref={(el) => {this.comment = el}}></textarea>
                  <div className="f-style-italic font-12 color-black-1  m-t-10  m-b-10">Your ratings and comments are private</div>
                  <fieldset >
                    <div className="col-md-4 col-sm-5 col-xs-5">
                      <div className="row">
                        <button name="submit" type="submit" className="btn btn-primary full-width btn-login theme-btn"  data-submit="...Sending">Submit</button>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-5 col-xs-5 m-l-15">
                      <div className="row">
                        <Link to="/discover" className="btn btn-primary full-width custom-btn">Skip</Link>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </section>
          </div>
        </div>      
      )
      }
      </div>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userFeedBackAction: userFeedBackAction,
      spFeedBackAction: spFeedBackAction
    }, dispatch)
}


function mapStateToProps (state, ownprops){
  console.log("Feedback:Store:state",state);
  console.log("Feedback:Store:ownprops",ownprops);
  return {
    //videocallObj: state.videoCallMessageResponse,
    // videoCallMessage: state.videoCallMessageResponse,
    // selectedServiceDetails: state.serviceProfileResponse,
    // loggedInUserInfo: state.loggedInUserInfoResponse,
    feedBack: state.feedBackResponse
  }

}

export default connect(mapStateToProps, matchDispatchToProps)(Feedback);