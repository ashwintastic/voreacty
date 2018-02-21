import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import getVideoToken from '../../actions/videocall/getVideoTokenAction'

import endVideoCall from '../../actions/videocall/endVideoCall'

import EngagementMessage from '../../components/videocall/EngagementMessage'
import VideoCall from '../../components/videocall/VideoCall'
import Feedback from '../../containers/Feedback'

import * as constMesg from '../../config/messages'
import {	
		VIDEO_CALL_STATUS, 
		AUTOREDIRECT_TO_FEEDBACK_PAGE_TIME,
		VIDEO_COUNTER_DOWN,
		CALL_TIMEOUT_WARNING_TIME_MINS,
		CALL_TIMEOUT_WARNING_TIME_SECS,
		UNBLOCK_USER_DURATION_SECS,
	} from '../../config/constants'


import '../../assets/css/video.css';

import {getParamObjectForVideoApi} from '../../helper/common'
import {launchPreview, roomJoined, log, previewTracks, hangUpCall, activeRoom1, detachParticipantTracks,attachTracks,
	attachParticipantTracks,
	detachTracks
	} from './twilio_video_utils.js'; 

var Video = require('twilio-video');
var activeRoom;
//var activeRoom;
//var previewTracks;
var identity;
var roomName;


class LaunchVideoCall extends Component{

	constructor(props){
		super(props);
		this.onHangUp = this.onHangUp.bind(this);
		this.onMicClick = this.onMicClick.bind(this);
		this.localRoomJoined = this.localRoomJoined.bind(this);
		this.startTimerFun = this.startTimerFun.bind(this);
		this.stopTimerFun = this.stopTimerFun.bind(this);
		this.handleOnTimeUp = this.handleOnTimeUp.bind(this);
		this.handleMediaAccess = this.handleMediaAccess.bind(this)
		this.showReconnectMessageOnFeedback = this.showReconnectMessageOnFeedback.bind(this);
		this.handleSPTimeout = this.handleSPTimeout.bind(this);
		this.state = {
		 	micMute:false,
		 	engagementMessage:true,
		 	displayRoomName:'',
		 	displayCallerName:'',
		 	displayCategory:'',
		 	startTimerLV:0,
		 	stopTimerLV:0,
		 	callStartTime:null,
		 	callEndTime:null,
		 	showFeedbackPage: false,
		 	callDuration:0,
		 	remainingCallDuration:0,
		 	pricingPlan:'',
		 	userSpecificWaitingMessage:'',
		 	loadingMessage: 'initialVideoCallLoadingMessage',
		 	connectionPath: false,
		 	reconnectId:0,
		 	isJoined:false
		}
	}
	handleSPTimeout(){
		setTimeout(function(){
			let callRequestInfo = getParamObjectForVideoApi(this.props); 
			//debugger;
			if((!callRequestInfo.hasOwnProperty('connectionPath') && 
				 callRequestInfo.connectionPath != 'reconnect' &&
				 !callRequestInfo.hasOwnProperty('userType') && 
				 callRequestInfo.userType != 'sp'
				)										// user connect
				&& !this.state.isJoined
				)
			{
				//alert("S.P. Not Joined");
				//'callinfo':'Service Provider did not join',
				this.onHangUp({'unblock':true});
			}
		}.bind(this),1000*UNBLOCK_USER_DURATION_SECS);
	}
	// Check: Why not call in constructor
	componentDidMount(){
		//alert("LaunchVideoCall Constructor");
		// videoCallReferenceId
		// hasServiceProviderConfirmed
		localStorage.removeItem("videoCallId");
      	localStorage.removeItem("videoServiceId");
      	localStorage.removeItem("videoUserId");
      	localStorage.removeItem("videoToken");
		let callRequestInfo = getParamObjectForVideoApi(this.props)

		
		if(callRequestInfo.hasOwnProperty('isSPUser') && callRequestInfo.isSPUser){
			this.setState({userSpecificWaitingMessage:'waitForUserParticipant'})
		}
		else{
			this.setState({userSpecificWaitingMessage:'waitForSPParticipant'})
			this.handleSPTimeout();
		}

		if(callRequestInfo.hasOwnProperty('connectionPath')){
			this.setState({'connectionPath':callRequestInfo.connectionPath});
	    }
		console.log(callRequestInfo);
	    this.props.getVideoToken(callRequestInfo)
	}
	
	onMicClick(){
		//alert('mic click')
		var mediaContainer = document.getElementById('local-media');
		// var remoteMediaContainer = document.getElementById('remote-media');
		//var localMedia = activeRoom.localMedia;

		console.log("onMicClick:mediaContainer",mediaContainer);
		//console.log("onMicClick:localMedia",localMedia);
	  	//mediaContainer.pause();

	  	if (mediaContainer.querySelector('audio')) {
			//alert("Audio state changed")
			let toogleMute = !this.state.micMute
		    this.setState({
		    	micMute:toogleMute,
		    	startTimerLV:0,
		 		stopTimerLV:0,
		 		isJoined:true
		 		// function(){
		 		// 	previewTracks[0].enabled
		 		// })

		 });
	    // console.log("micMute previewTracks");
	    // console.log(previewTracks);

	    previewTracks.forEach(function(track) {
	    	console.log("micMute inside tracks");
		    console.log(track);
		    if(track.kind=='audio'){
		    	console.log("in audio ",toogleMute);
		    	track.enabled = toogleMute;

		    	//track.pause();
		    	if(toogleMute){
		    		track.detach();
		    		//track.mediaStreamTrack.stop();
		    	}
		    	else{
		    		track.attach();
		    		//track.mediaStreamTrack.start();
		    	}	
		    }

		    // if(track.kind=='video'){
		    // 	console.log("in video ",toogleMute);
		    // 	track.enabled = toogleMute;
		    // 	//track.pause();
		    // 	// if(toogleMute){
		    // 	// 	track.mediaStreamTrack.stop();
		    // 	// }
		    // 	// else{
		    // 	// 	//track.mediaStreamTrack.start();
		    // 	// }	
		    // }
		    //console.log(track);
		 });

	    //previewTracks[0].enabled = !(myStream.getAudioTracks()[0].enabled);
	    previewTracks[0].enabled = toogleMute;
		    	// ,
		    	// function () {
       //  			alert('state changed'+this.state.micMute);
       				

       //  			mediaContainer.querySelector('audio').muted = this.state.micMute;
		    	// }
		    //)
		}
	}

	onHangUp(info={}){
		if(typeof activeRoom != 'undefined' && activeRoom){
			//alert("on Hangup Launch - activeRoom")
			let callRequestInfo = getParamObjectForVideoApi(this.props)
			if(typeof callRequestInfo.info == 'undefined'){
				callRequestInfo.info ={}
			}
			if(info.callinfo){
				callRequestInfo.info.logInfo = info.callinfo;
			}
			if(info.hasOwnProperty('unblock')){
				callRequestInfo.info.unblock=true;
			}
			activeRoom.disconnect();
			//console.log("Call Duration hangUp : "+this.state.callDuration);
			this.stopTimerFun(callRequestInfo)
		}
	}

	startTimerFun(){
  		this.setState({
			startTimerLV:1,
			stopTimerLV:0,
			callStartTime: new Date().toLocaleString(),
			loadingMessage:'',
			isJoined:true

		})
		//this.setState({loadingMessage:''})
  	}
  	
  	handleOnTimeUp(min,sec, rem_min, rem_sec, timeUp=false){
  		// alert("Final Min "+min);
  		// alert("Final Sec "+sec);
  		// //return "3.30";
  		// alert("handleOnTimeUp Launch")
  		//alert("handleOnTimeUp Launch")
  		this.setState({
			callDuration: min+":"+sec,
			remainingCallDuration: rem_min+":"+rem_sec,
			startTimerLV:0,
		 	stopTimerLV:0,
		},
		function(){
			console.log("Call Duration 1: "+this.state.callDuration);
			if(timeUp){
				this.onHangUp({callinfo:"Ended automatically by Timeout"})
			}
			console.log("timeUp 1: "+timeUp);
		});
  	}

	stopTimerFun(callRequestInfo){
		//alert('stop timer')
		console.log("stop timer Duration : "+this.state.callDuration);

		if(typeof callRequestInfo.info == 'undefined'){
			callRequestInfo.info ={}
		}
		let endTime = new Date().toLocaleString()
		
		//let callDuration = 0
		let stateProp = {
			startTimerLV:0,
			stopTimerLV:1,
			callEndTime: endTime,
			loadingMessage:'callEnded'
			//callDuration:callDuration
		};

		if(callRequestInfo.info.hasOwnProperty('unblock')){
			stateProp['engagementMessage']='spNotJoining';
			stateProp['callDuration']='00:00';
			stateProp['remainingCallDuration']=this.state.startingDurationMins+':'+this.state.startingDurationSecs;
		}
  		let self = this;
  		this.setState(stateProp,
		function(){
			//alert('stop timer1')
	  		console.log("ST - Call Duration 2 : "+this.state.callDuration);
	  		callRequestInfo.info.callStartTime = this.state.callStartTime
	  		callRequestInfo.info.callEndTime = endTime
	  		callRequestInfo.info.callDuration = this.state.callDuration
	  		callRequestInfo.info.remainingCallDuration = this.state.remainingCallDuration
	  		if(callRequestInfo.info.hasOwnProperty('unblock')){
	  			callRequestInfo.status = VIDEO_CALL_STATUS.SP_NOT_JOINED
	  		}
	  		else{
	  			callRequestInfo.status = VIDEO_CALL_STATUS.CALL_TERMINATED
	  		}

	  		if(this.state.reconnectId > 0){
				callRequestInfo.reconnectId = this.state.reconnectId	
	  		}

	  		if(callRequestInfo.info.hasOwnProperty('logInfo') && callRequestInfo.info.logInfo!=''){
	  			setTimeout(function(){
	              self.props.endVideoCall(callRequestInfo)
	        	}, 1000);
	  		}
	  		else{
				this.props.endVideoCall(callRequestInfo)
			}
			if(!callRequestInfo.info.hasOwnProperty('unblock'))
			{
			//this.props.endVideoCall(callRequestInfo)
				setTimeout(function(){
	              self.setState({showFeedbackPage:true});
	        	}, AUTOREDIRECT_TO_FEEDBACK_PAGE_TIME);
			}
	    });    
  	}

  	handleMediaAccess(mediaAccess){
  		if(typeof mediaAccess != 'undefined'){
			if(mediaAccess == 'both'){
				this.setState({loadingMessage:'bothMediaNotAccessible'})
			}
			else if(mediaAccess == 'audio'){
				this.setState({loadingMessage:'audioMediaNotAccessible'})
			}
			else if(mediaAccess == 'video'){
				this.setState({loadingMessage:'videoMediaNotAccessible'})
			}
	    }
  	}

  	// async f1(){
  	// 	alert("in f1")
  	// 	let a = await launchPreview();
  	// 	alert("a "+a)
  	// }

	componentWillReceiveProps(nextProps){
	    let response  = nextProps.videoCallMessage;
	    let id = 0
	    let self = this;

	    if(response.hasOwnProperty('video_token')){
	    	
	    	console.log("reconnect props response",response);
	    	roomName = response.room_name
	    	let startingDurationMins = response.selectedDuration;
	    	let startingDurationSecs = 0;
	    	// Set the video display states

	    	if(response.hasOwnProperty('reconnectId') && response.reconnectId!='' ){
	    		let remDurArr = response.remainingDuration.split(":");
	    		startingDurationMins = parseInt(remDurArr[0]);
	    		startingDurationSecs = parseInt(remDurArr[1]);
	  			//console.log("remDurArr - ",remDurArr);
	  			this.setState({
		  			reconnectId:response.reconnectId
		  		});
	    	}

	    	this.setState(
	  		{
	  			engagementMessage:false,
	  			displayRoomName:roomName,
	 			displayCallerName:response.display_other_identity,
	 			displayCategory:response.category,
	 			selectedPrice: response.selectedPrice,
	 			selectedDuration: response.selectedDuration,
	 			startingDurationMins: startingDurationMins,
	 			startingDurationSecs: startingDurationSecs,
	 			pricingPlan: response.selectedPrice+" USD "+response.selectedDuration+ " Minutes"
	  		});

	  		

	      	//roomName = "TestNewRoom";
	      	//setIdentityValue(response.display_identity);
	      	identity = response.display_identity
	      	
		    var connectOptions = {
		      name: roomName,
		      logLevel: 'debug' // error
		    };

		    // console.log("previewTracks");
		    // console.log(previewTracks);

		    if (previewTracks) {
		      connectOptions.tracks = previewTracks;
		    }

		    launchPreview().then(function(mediaResponse){
		    	self.handleMediaAccess(mediaResponse)
		    })
		   
		    this.setState({loadingMessage:this.state.userSpecificWaitingMessage})

		    // Join the Room with the token from the server and the
		    // LocalParticipant's Tracks.
		    Video.connect(response.video_token, connectOptions).
		    	then(
		    		//roomJoined,
		    		this.localRoomJoined,
		    		function(error) {
		    		console.log("ERROR HERE----")
		      		log('Could not connect to Twilio: ' + error.message);
		    });
		  		  
	    }

	    if(response.hasOwnProperty('error')){
	        // show error message
	        this.setState({engagementMessage:response.reason});
	    }
  	}
  	
  	localRoomJoined(roomResponse){
  		let self = this
  		activeRoom = roomResponse;

  		// console.log("preview inside room");
  		// console.log(previewTracks);
		
		var previewContainer = document.getElementById('local-media');
		if (!previewContainer.querySelector('video')) {
		  	attachParticipantTracks(roomResponse.localParticipant, previewContainer);

		  	//alert('previewContainer 1')
		  	//self.setState({loadingMessage:'waitForOtherParticipant'})
		}

	  	// Attach the Tracks of the Room's Participants.
	  	roomResponse.participants.forEach(function(participant) {
		  	//alert("Already in Room: '" + participant.identity + "'");
		  	//alert('Already in Room 2')
		  	//self.setState({loadingMessage:'waitForOtherParticipant'})
		    log("Already in Room: '" + participant.identity + "'");
	    	var previewContainer = document.getElementById('remote-media');

	    	//self.setState({loadingMessage:''})
	    	self.startTimerFun()

	    	attachParticipantTracks(participant, previewContainer);
	    	//alert('startCounter for Remote');
	  		//self.startTimerFun()
	  	});
			
		roomResponse.on('participantConnected', function(participant) {
	  		//alert("Joining React PARTICIPANT: '" + participant.identity + "'");
	  		//alert('startCounter');
	  		//alert('Joining React PARTICIPANT 3')
	  		//self.setState({loadingMessage:''})
	  		self.startTimerFun()
	    	log("Joining: '" + participant.identity + "'");
	  	});

	  	// When a Participant adds a Track, attach it to the DOM.
	  	roomResponse.on('trackAdded', function(track, participant) {
	  		//alert(participant.identity + " added track: " + track.kind);
	  		//alert('Track Added 3')
	  		//self.setState({loadingMessage:'waitForOtherParticipant'})
	    	log(participant.identity + " added track: " + track.kind);
	    	var previewContainer = document.getElementById('remote-media');
	    	attachTracks([track], previewContainer);
	  	});

	  	// When a Participant removes a Track, detach it from the DOM.
	  	roomResponse.on('trackRemoved', function(track, participant) {
	    	log(participant.identity + " removed track: " + track.kind);
	    	detachTracks([track]);
	  	});

	  	// When a Participant leaves the Room, detach its Tracks.
	  	roomResponse.on('participantDisconnected', function(participant) {
	    	log("Participant '" + participant.identity + "' left the room");
	    	//alert("Participant '" + participant.identity + "' left the room");	
	    	// Call hangup when disconnected
	    	self.onHangUp({'callinfo':"Participant '" + participant.identity + "' left the room"});
	    	detachParticipantTracks(participant);
	  	});

		roomResponse.on('disconnected', function() {
		    log('Left');
		    //alert('left')
		    if (previewTracks) {
		      previewTracks.forEach(function(track) {
		        track.stop();
		      });
		    }
		    detachParticipantTracks(roomResponse.localParticipant);
		    roomResponse.participants.forEach(detachParticipantTracks);
		    activeRoom = null;
		    //document.getElementById('button-join').style.display = 'inline';
		    //document.getElementById('button-leave').style.display = 'none';
		});
  	}

  	showReconnectMessageOnFeedback(){
  		let duration = this.state.remainingCallDuration;
  		let showReconnectMessageOnFeedback = false;

  		console.log("remaining Duration before feedback:",this.state.remainingCallDuration);

  		if(this.state.connectionPath != 'reconnect'){
	        let durArr = duration.split(":");
	        let durInSecs = parseInt(durArr[0]*60+durArr[1]);
	        
	        let callTimeOutWarningSecs = parseInt(CALL_TIMEOUT_WARNING_TIME_MINS*60+ CALL_TIMEOUT_WARNING_TIME_SECS);

	        console.log("showReconnectMessageOnFeedback:callTimeOutWarningSecs > "+callTimeOutWarningSecs);
	        console.log("showReconnectMessageOnFeedback:durInSecs > "+durInSecs);

	        if(durInSecs>callTimeOutWarningSecs){
	        	showReconnectMessageOnFeedback = true;
	        }
	    }
	    //console.log("return showReconnectMessageOnFeedback: "+showReconnectMessageOnFeedback);
	    return showReconnectMessageOnFeedback;
    }

  	render(){
  		let extraClassForFeedback = '';
  		let videoContainerClass='video-call-container'
  		let showReconnectMessageOnFeedback = false
		if (this.state.showFeedbackPage){
			
			 // showReconnectMessageOnFeedback = this.showReconnectMessageOnFeedback();

			// console.log("showReconnectMessageOnFeedback before feedback:",showReconnectMessageOnFeedback);

    		extraClassForFeedback = 'p-t-80';
    		videoContainerClass='';
		}

		console.log("LaunchVideoCall:Render:Before route",this.props);
		if(this.state.connectionPath){
			window.history.pushState('', '', "/"+this.state.connectionPath+this.props.location.search);
		}
		// else{
  // 			window.history.pushState('', '', "/videocall"+this.props.location.search);
  // 		}
  		console.log("LaunchVideoCall:Render:After route",this.props);
  		//let oldProps = this.props.location
		return(
			<div className={"video-wrapper"+' '+videoContainerClass}> 
				<div className="container">
			    <section className={"section section-we-made-1" + ' '+ extraClassForFeedback}>
			    { /* wrapper div and section starts */}
			    { this.state.showFeedbackPage ?
			    (
			    	<Feedback userProps={this.props} showReconnectMessageOnFeedback={showReconnectMessageOnFeedback}/>
			    ) : (
			    this.state.engagementMessage ? (
			    	<div className="contributor-block">
			    		<div className="unit-container">
			        		<EngagementMessage message={this.state.engagementMessage} /> 
			        	</div>
			        </div>	
			      ) : (

			        <VideoCall 
			        	loadingMessage = {this.state.loadingMessage}
			        	onTimeUp = {this.handleOnTimeUp}
			        	
			        	selectedDuration = {this.state.selectedDuration}
			        	startingDurationMins = {this.state.startingDurationMins}
			        	startingDurationSecs = {this.state.startingDurationSecs}

			        	pricingPlan = {this.state.pricingPlan}
			        	startTimerV = {this.state.startTimerLV}
			        	stopTimerV = {this.state.stopTimerLV}
			        	onHangUp = {this.onHangUp}
			        	onMicClick = {this.onMicClick}
			        	micMute = {this.state.micMute}
			    		displayRoomName={this.state.displayRoomName}
			    		displayCallerName={this.state.displayCallerName}
			    		displayCategory={this.state.displayCategory}
			    		isDownTimer = {VIDEO_COUNTER_DOWN}
			    		connectionPath = {this.state.connectionPath}

		    		/>
			      )
			      )	
			  	  }		    
			    { /* wrapper div and section ends */}
			    </section> 
			</div>
		  </div>
		)
	}
}

function mapStateToProps(state){
	return {
    	videoCallMessage: state.videoCallMessageResponse,
    	selectedServiceDetails: state.serviceProfileResponse,
    	loggedInUserInfo: state.loggedInUserInfoResponse,
  	};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(
		{
			getVideoToken: getVideoToken,
			endVideoCall: endVideoCall
			//confirmVideoCallWithSP: confirmVideoCallWithSP,

		}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchVideoCall)