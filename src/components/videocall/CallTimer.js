import React, {Component} from 'react';
import {
		CALL_TIMEOUT_WARNING_TIME_MINS,
		CALL_TIMEOUT_WARNING_TIME_SECS,
		GRACE_TIME,
		PAYMENT_INITIATE_TTL_MINS,
		PAYMENT_INITIATE_TTL_SECS, 
		PAYMENT_TTL_MARGIN_ALERT,
	} 
		from '../../config/constants'
import { GlobalErrorMessages} from '../../config/messages'

class CallTimer extends Component {
    
	constructor(props){
		super(props);

		this.endVideoFlagVar = false;

		this._minTwoDigits = this._minTwoDigits.bind(this);
		this._handleTimerStart = this._handleTimerStart.bind(this);
		this._handleTimerStop = this._handleTimerStop.bind(this);
		this._handleTimerEnd = this._handleTimerEnd.bind(this);
		this._handleTimerReset = this._handleTimerReset.bind(this);
		this._handleTimeout = this._handleTimeout.bind(this)
		this._getFinalCallDuration = this._getFinalCallDuration.bind(this)

		//alert("last "+props.source)

		//onTimeUp
		let mins_ttl = CALL_TIMEOUT_WARNING_TIME_MINS
		let secs_ttl = CALL_TIMEOUT_WARNING_TIME_SECS
		if(props.source == 'paypal'){
			mins_ttl = PAYMENT_INITIATE_TTL_MINS
			secs_ttl = PAYMENT_INITIATE_TTL_SECS
		}

		let isDownTimer = props.hasOwnProperty('isDownTimer')?props.isDownTimer:false;

		let connectionPath = props.hasOwnProperty('connectionPath')?props.connectionPath:false;

		let initial_mins = 0;
		let initial_secs = 0;

		// console.log("Call Timer Props: ", props);
		if(isDownTimer){
			//initial_mins = props.hasOwnProperty('selectedDuration') && (typeof props.selectedDuration!='undefined') ?props.selectedDuration:0;

			initial_mins = props.hasOwnProperty('startingDurationMins') && (typeof props.startingDurationMins!='undefined') ?props.startingDurationMins:0;
			initial_secs = props.hasOwnProperty('startingDurationSecs') && (typeof props.startingDurationSecs!='undefined') ?props.startingDurationSecs:0;

		}


		console.log("CallTimer:constructor:initial_mins", initial_mins);
		console.log("CallTimer:constructor:initial_secs ", initial_secs);
		console.log("CallTimer:constructor:props.selectedDuration", props.selectedDuration);
		console.log("CallTimer:constructor:mins_ttl ", mins_ttl)
		console.log("CallTimer:constructor:secs_ttl ", secs_ttl)
		console.log("CallTimer:constructor:connectionPath ", connectionPath)

		// In case of reconnec, if the remaining timing is less than 2 mins (warning time), then change the default remaining time to actual remaining
		if(connectionPath=='reconnect'){
			let totalInitialActualSecs = initial_mins*60+initial_secs;
			let totalInitialDefaultSecs = mins_ttl*60+secs_ttl;

			console.log("CallTimer:constructor:totalInitialActualSecs, totalInitialDefaultSecs ", totalInitialActualSecs, totalInitialDefaultSecs);

			if(totalInitialActualSecs < totalInitialDefaultSecs){
				mins_ttl = initial_mins;
				secs_ttl = initial_secs;
			}

			console.log("CallTimer:constructor:NewRemSec ", mins_ttl*60 + secs_ttl);
		}


		this.state ={
		  timer: '',
		  paymentTimeOutMessage: GlobalErrorMessages.paymentTimeOutMessage,
		  minutes: 0,
		  seconds:0,
		  timerCounter:0,
		  timeDisplay: {
					minutes: initial_mins,
					seconds: initial_secs
				},
			timerStarted: props.startTimer,
			timerStoped: props.stopTimer,
			selectedDuration: props.selectedDuration,
			startingDurationMins: props.startingDurationMins,
			startingDurationSecs: props.startingDurationSecs,
			timerEnded: 0,
			//endVideoFlag: false,
			isDownTimer: isDownTimer,
			incrementNegative: false,
			connectionPath: connectionPath,
			remainingSeconds: mins_ttl*60 + secs_ttl,
			remainingTimeDisplay: {
					minutes: mins_ttl,
					seconds: secs_ttl,
					title: GlobalErrorMessages.callRemainingTime
				},		
			
		}
	}
  
  	_getFinalCallDuration(){
  		let finalLapsedMins = this.state.timeDisplay.minutes;
  		let finalLapsedSecs = this.state.timeDisplay.seconds;
  		let finalPendingMins = this.state.timeDisplay.minutes;
  		let finalPendingSecs = this.state.timeDisplay.seconds;

  		let finalCallDurtion = {}

  		if(this.state.isDownTimer){
			finalLapsedMins = parseInt(this.state.timerCounter/60);
			finalLapsedSecs = parseInt(this.state.timerCounter%60);
		}
		else{
			finalPendingMins = parseInt(this.state.remainingSeconds/60);
			finalPendingSecs = parseInt(this.state.remainingSeconds%60);
		}

		// console.log('CallTimer:_getFinalCallDuration:finalLapsedMins => '+finalLapsedMins);
		// console.log('CallTimer:_getFinalCallDuration:finalLapsedSecs => '+finalLapsedSecs);
		// console.log('CallTimer:_getFinalCallDuration:timerCounter => '+this.state.timerCounter);

  		finalCallDurtion.finalMinutes = this._minTwoDigits(finalLapsedMins);
		finalCallDurtion.finalSeconds = this._minTwoDigits(finalLapsedSecs);

		finalCallDurtion.finalRemainingMinutes = this._minTwoDigits(finalPendingMins);
		finalCallDurtion.finalRemainingSeconds = this._minTwoDigits(finalPendingSecs);

		if(this.state.incrementNegative){
			finalCallDurtion.finalRemainingMinutes= "-"+finalCallDurtion.finalRemainingMinutes
		}
		// console.log('CallTimer:_getFinalCallDuration:finalCallDurtion => ',finalCallDurtion);
		return finalCallDurtion;
  	}

	_handleTimeout(duration,isDownTimer){
		let timeInterval = this.state.timeDisplay.minutes*60 + this.state.timeDisplay.seconds;
		var self = this;
		// console.log('timeInterval => '+timeInterval);
		// console.log('duration => '+duration);
		//if(timeInterval >= duration){
		if(this.props.source == 'paypal'){
			duration=0
		}
		let threshold = duration-timeInterval;
		if(isDownTimer){
			threshold = timeInterval
		}

		// console.log('CallTimer:_handleTimeout:remainingSeconds '+this.state.remainingSeconds);
		// console.log('CallTimer:_handleTimeout:threshold '+threshold);
		// console.log('CallTimer:timeInterval:threshold '+timeInterval);
		// console.log('CallTimer:isDownTimer: '+isDownTimer);
		
		if(this.state.remainingSeconds >= threshold){	
			//console.log('Internal Loop remainingSeconds => '+this.state.remainingSeconds);

			let decrement = this.state.remainingSeconds-1;
			let connectionPath = this.state.connectionPath;
			// if(this.props.source == 'paypal'){
			// 	decrement = this.state.remainingSeconds;
			// }

			//console.log('Internal Loop connectionPath => '+connectionPath);

			//if(decrement<0 && connectionPath!='reconnect'){
			if(decrement<0){	
				decrement=0;
			}

			// console.log('Internal Loop decrement => '+decrement);


			let rmin = parseInt(decrement/60);
			let rsec = parseInt(decrement%60);

			console.log('Internal Loop rmin => '+rmin);
			console.log('Internal Loop rsec => '+rsec);

			let tmpRemainingTimeDisplay = this.state.remainingTimeDisplay;

			// console.log('Internal Loop tmpRemainingTimeDisplay, Before ',tmpRemainingTimeDisplay);

			tmpRemainingTimeDisplay.minutes = rmin
			tmpRemainingTimeDisplay.seconds = rsec

			// console.log('Internal Loop tmpRemainingTimeDisplay, After ',tmpRemainingTimeDisplay);

			this.setState({
				remainingSeconds:decrement,
				remainingTimeDisplay:tmpRemainingTimeDisplay
			}, function(){
				console.log('self remainingSeconds => '+self.state.remainingSeconds);
				if(self.state.remainingSeconds == PAYMENT_TTL_MARGIN_ALERT-1 && this.props.source == 'paypal'){
					alert(GlobalErrorMessages['paymentTimeOutAlert']);
				}
				if(self.state.remainingSeconds == 0){
					//alert("Zero")
					if(this.props.source == 'paypal'){
						self._handleTimerStop()
						setTimeout(function(){
							self.props.onTimeUp()
						}, 1000);
					}
					else if(connectionPath == 'reconnect'){

						// console.log('REONN IN: remainingSeconds',self.state.remainingSeconds);
						// console.log('REONN IN: remainingTimeDisplay',self.state.remainingTimeDisplay);
						// console.log('REONN IN: timeDisplay',self.state.timeDisplay);

						self.setState(
							{
								incrementNegative:true,
							}
						)
						// do nothing
					}
					else{
						self._handleTimerStop();

						self.endVideoFlagVar = true;	
						setTimeout(function(){
							let finalCallDuration = self._getFinalCallDuration()
						    self.props.onTimeUp(
						    	finalCallDuration.finalMinutes,
						    	finalCallDuration.finalSeconds, 
						    	finalCallDuration.finalRemainingMinutes,
						    	finalCallDuration.finalRemainingSeconds, 
						    	true)
						}, 5000);
						// This is additional logic - not required now
						// if(self.state.endVideoFlag){
						// 	self._handleTimerStop()
						// 	setTimeout(function(){
						// 		let finalSeconds = self._minTwoDigits(self.state.timeDisplay.seconds);
						// 		let finalMinutes = self._minTwoDigits(self.state.timeDisplay.minutes);
						// 		self.props.onTimeUp(finalMinutes,finalSeconds, true)
						// 	}, 1000);
							
						// }
						// else{
						// 	self.setState({
						// 		remainingSeconds:GRACE_TIME,
						// 		endVideoFlag: true,
						// 		remainingTimeDisplay:{
						// 			title:GlobalErrorMessages.callTerminateMesage,
						// 			minutes:0,
						// 			seconds:0
						// 		}
						// 	});
						// }
					}
				}
			});
        }
	}

	_handleTimerStart() {
		//console.log("CallTImer - _handleTimerStart");
		if (this.state.timerEnded) {
			this._handleTimerReset();
			return
		}

		this.setState({
			timerStarted: 1,
			timerStopped: 0,
			timerEnded: 0
		});

		var self = this;
		var time = this.state.timeDisplay;
		var timerCounter = this.state.timerCounter;
		var isDownTimer = this.state.isDownTimer;

		//console.log("selectedDuration -> ",this.state.selectedDuration);
		//let duration = this.state.selectedDuration * 60;

		let duration = this.state.startingDurationMins * 60 + this.state.startingDurationSecs;

		// console.log("RECON:Duration -> ",duration);
		// console.log("RECON:timerCounter -> ",timerCounter);

		// console.log("CallTImer:_handleTimerStart:duration ", duration);
		// console.log("CallTImer:_handleTimerStart:isDownTimer ",isDownTimer);
		this.timer = setInterval(function() {	

			self._handleTimeout(duration,isDownTimer)


			// console.log("CallTImer:incrementNegative ",self.state.incrementNegative);


			if(isDownTimer && !self.state.incrementNegative){
				time.seconds--;
			}
			else{
				// console.log("RECON:Seconds++ -> ",time.seconds);
				time.seconds++;
			}

			timerCounter++;

			self.setState({
				timeDisplay: time,
				timerCounter: timerCounter
			});

			if(isDownTimer && !self.state.incrementNegative){
				if (time.seconds < 0) {
					time.minutes--;
					time.seconds = 59;
					self.setState({
						timeDisplay: time
					});
				}
			}
			else{	
				if (time.seconds === 60) {
					time.minutes++;
					time.seconds = 0;
					self.setState({
						timeDisplay: time
					});
				} 
			}
			//self._handleTimeout(duration)
			// else {
			// 	self._handleTimerEnd();
			// }
			// console.log(self.state.timeDisplay);
		}, 1000);
	}

	_handleTimerStop() {
		//console.log("CallTimer:_handleTimerStop");
		clearInterval(this.timer);
		var self = this;
		this.setState({ 
			timerStarted: 0, 
			timerStopped: 1
		});
	}

	_handleTimerEnd() {
		console.log('Timer Ended');
		clearInterval(this.timer);
		this.setState({ 
			timerStarted: 0, 
			timerEnded: 1 
		});		
	}

	_handleTimerReset() {
		console.log('Timer Reset');
		var self = this;
		var minutes = this.props.minutes;
		var seconds = this.props.seconds;
		this.setState({
			timeDisplay: {
				minutes: minutes,
				seconds: seconds
			},
			timerStarted: 0,
			timerStopped: 0,
			timerEnded: 0,
		});
	}

	_minTwoDigits(n) {
		return (n < 10 ? '0' : '') + n;
	}	

	componentDidMount(){
		//console.log("CallTimer - componentDidMount", this.props)
		if(typeof this.props.source != 'undefined' && this.props.source == 'paypal' && this.props.startTimer){
			//start counter here
			//console.log("CallTimer - componentDidMount Counter Started ")
			this._handleTimerStart()
		}
	}
	
	componentWillReceiveProps(nextprops){
		console.log("CallTimer:componentWillReceiveProps:props", nextprops);
		console.log("CallTimer:componentWillReceiveProps:State ", this.state)
		this.setState({
      		timerStarted: nextprops.startTimer,
			timerStoped: nextprops.stopTimer,
			selectedDuration: nextprops.selectedDuration,
			startingDurationMins:nextprops.startingDurationMins,
			startingDurationSecs:nextprops.startingDurationSecs,
  		})

		// console.log("CallTimer:componentWillReceiveProps:StateAfter ", this.state)
		
		//alert(nextprops.startTimer)
		if(nextprops.startTimer){
			this._handleTimerStart()
		}
		//let endVideoFlagVar = false;
		if(nextprops.stopTimer && nextprops.stopTimer!=0){
			//console.log("CallTimer:calling _handleTimerStop", this.state)
			this._handleTimerStop()
			//console.log("CallTimer:called _handleTimerStop", this.state)

			// let finalSeconds = this._minTwoDigits(this.state.timeDisplay.seconds);
			// let finalMinutes = this._minTwoDigits(this.state.timeDisplay.minutes);

			let finalCallDuration = this._getFinalCallDuration();
			// Call only for the video call flow.
			if(this.props.source != 'paypal'){
				this.props.onTimeUp(
					finalCallDuration.finalMinutes,
					finalCallDuration.finalSeconds,
					finalCallDuration.finalRemainingMinutes,
					finalCallDuration.finalRemainingSeconds);
				//this.props.onTimeUp(finalMinutes,finalSeconds)
			}
			this.endVideoFlagVar = true
		}
			
		let isDownTimer = nextprops.hasOwnProperty('isDownTimer')?nextprops.isDownTimer:false;

		let connectionPath = nextprops.hasOwnProperty('connectionPath')?nextprops.connectionPath:false;
		

		if(isDownTimer && !this.endVideoFlagVar){
			//console.log("CallTimer:componentWillReceiveProps:ChangeState", this.state)
			this.setState({
				// timeDisplay:{
				// 			minutes: nextprops.hasOwnProperty('selectedDuration') && (typeof nextprops.selectedDuration!='undefined') ?nextprops.selectedDuration:0,
				// 			seconds: this.state.seconds
				// 			},

				timeDisplay:{
							minutes: nextprops.hasOwnProperty('startingDurationMins') && (typeof nextprops.startingDurationMins!='undefined') ?nextprops.startingDurationMins:0,
							seconds: nextprops.hasOwnProperty('startingDurationSecs') && (typeof nextprops.startingDurationSecs!='undefined') ?nextprops.startingDurationSecs:this.state.seconds
							},

				isDownTimer: nextprops.isDownTimer,
				connectionPath: nextprops.connectionPath	
  			})
		}
	}

	render() {
		// console.log("CallTimer:Render:Props ",this.props)
		// console.log("CallTimer:Render:State ",this.state)

		var seconds = this._minTwoDigits(this.state.timeDisplay.seconds);
		var minutes = this._minTwoDigits(this.state.timeDisplay.minutes);
		
		// Set Timer State
		var timerState = this.state.timerStarted ? 'Running' : 
						(this.state.timerStopped ? 'Stopped' : 
						(this.state.timerEnded ? 'Ended' : 'Ready'));
    
	    this.state.timerStarted ? '' : '';
	    this.state.timerStopped ? '' : ''; 

	    var rseconds = this._minTwoDigits(this.state.remainingTimeDisplay.seconds);
		var rminutes = this._minTwoDigits(this.state.remainingTimeDisplay.minutes);
		var showVideoEndWarning = (this.state.remainingSeconds < CALL_TIMEOUT_WARNING_TIME_MINS*60 + CALL_TIMEOUT_WARNING_TIME_SECS);
	    var showVideoEndWarningClass = 'color-grey-7'	
	    if(showVideoEndWarning){
	    	showVideoEndWarningClass = 'color-red-3';
	    }

	    var showWarningMessage = ''
	    var showNegativeSign = false;
	    if(!this.state.incrementNegative){
	    	showWarningMessage = GlobalErrorMessages.callTerminateMesage;
	    }
	    else{
	    	showWarningMessage = GlobalErrorMessages.reconnectTimeOverSpendMessage;
	    	showNegativeSign = true;
	    }
	    

		return (
			<div>
			{ this.props.source == 'paypal' ? 
				(
				<div className="col-md-12 col-xs-12 col-sm-12 p-t-20">
				<div className="row font-14 color-red-3 line-height-normal">
					{this.state.paymentTimeOutMessage}<strong>{rminutes}:{rseconds}</strong>
				</div>	
				</div>			
				)
			:

			(	<div>
				<div className={showVideoEndWarningClass+" font-21 font-bold width-95 text-right full-width-mobile pull-left"}>
					{showNegativeSign?('-'):(null)}
					{minutes}:{seconds}
				
				</div>	
				<div>
				{ (showVideoEndWarning) ?
				(	
					<div className="font-13 color-red-3 line-height-normal pull-left p-t-10 p-l-10">
					{ /*{this.state.remainingTimeDisplay.title} <strong>{rminutes}:{rseconds}</strong> */}
					{showWarningMessage}
					</div>
					):(null)
				}

				</div>
				</div>
				
			)}
			</div>		
		)
	}

}
export default CallTimer;