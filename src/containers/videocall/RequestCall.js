import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import initiateVideoCallWithSP from '../../actions/videocall/initiateVideoCallWithSPAction'
import EngagementMessage from '../../components/videocall/EngagementMessage'
import * as constMesg from '../../config/messages'
import ServiceProviderHeaderComponent from '../../components/ServiceProviderHeaderComponent'
import {getParamObjectForVideoApi} from '../../helper/common'
import Paypal from '../Paypal'

class RequestCall extends Component{

	constructor(props){
		//console.log("Location:")
		super(props)
		this.state = {
			engagementMessage:'initiateVideoCallMessage',
      		renderPayment: false
		}
	}
	//
	
	// Check: Why not call in constructor
	componentDidMount(){
			let callRequestInfo = getParamObjectForVideoApi(this.props);
	    	this.props.initiateVideoCallWithSP(callRequestInfo)	;
	}
	
	handleErrorState(response){
		//Show Error Message
	    if(response.hasOwnProperty('error') && response.error ){
	        // show error message
	        let errorMsg = 'NoReason';
	        if(response.reason!=''){
	        	errorMsg = response.reason;
	        }
	        this.setState({engagementMessage:errorMsg});
	    }
	}

	handleSuccessState(response){
		let confimationStatus = response.hasServiceProviderConfirmed;
	    if (confimationStatus){
	      this.setState({renderPayment: true,
	      engagementMessage: 'SPAvailabilityConfirmed'}
	      )
	  	}
	}
	componentWillReceiveProps(nextProps){
		//alert("Parent - RequestCall")
		console.log("RequestCall - componentWillReceiveProps", nextProps)

	    let response  = nextProps.videoCallMessage;
	    this.handleSuccessState(response);
	    this.handleErrorState(response);
  	}

  	// startPoll() {
   //      this.timeout = setTimeout(() => this.props.dataActions.dataFetch(), 15000);
   //  }

  	/**************************************
  	componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {

            clearTimeout(this.timeout);

            // Optionally do something with data

            if (!nextProps.isFetching) {
                this.startPoll();
            }
        }


    }

    componentWillMount() {
        this.props.dataActions.dataFetch();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        this.timeout = setTimeout(() => this.props.dataActions.dataFetch(), 15000);
    }
  	/**************************************/

	render(){
      window.history.pushState('', '', '/requestcall');
		return(
			<div className="">
			    <section className="">
                    <div className="">
                        <div className="">
			    	{ /* wrapper div and section starts */}
                    <div className="">
                        <div className="">
                            { this.state.renderPayment ?

                            	(<Paypal message={this.state.engagementMessage}/>)
                            	:
                            	(<EngagementMessage message={this.state.engagementMessage} showContinueButton = {this.state.renderPayment}/>)	
                            }
                        </div>
                    </div>
                    </div>
				</div>
			    { /* wrapper div and section ends */}
			    </section>

			</div>
		)
	}
}

function mapStateToProps(state, ownProps){
	//console.log("myprops");
	//console.log(ownProps.match.params);
	let sid = -1;let suid = -1;
	if(ownProps.hasOwnProperty('match')){
		sid = ownProps.match.params.sid;
		suid = ownProps.match.params.suid
	}
	
	return {
    	videoCallMessage: state.videoCallMessageResponse,
    	selectedServiceDetails:state.serviceProfileResponse,
    	loggedInUserInfo: state.loggedInUserInfoResponse,
    	serviceId: sid,
    	serviceUserId: suid ,
      	spInfo : state.serviceProfileResponse
    	//loginResponse: state.userLoginResponse
  	};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(
		{
			initiateVideoCallWithSP: initiateVideoCallWithSP
			//confirmVideoCallWithSP: confirmVideoCallWithSP,

		}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestCall)