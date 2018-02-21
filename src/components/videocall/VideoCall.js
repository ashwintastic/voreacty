import React from 'react'
import CallTimer from './CallTimer'
import {LoadingMessage} from './LoadingMessage'
import spinnerImg from '../../assets/images/sp.gif';

const VideoCall = (props) => {
    //alert("Iv V "+props.startTimerV);
    // alert("Video call Rendered")
    // alert(props.startTimerV)
    // alert(props.stopTimerV)
    //alert("Iv V "+props.selectedDuration)
    console.log("Video Call Props: ", props);
    return (
	          <div>
	            <div className="col-md-12 col-sm-12 col-xs-12 custom-sec hidden">
	            		<div id="room-controls">
			         {/*   <div className="header-info ">

			                <div className="col-md-4 col-sm-4 col-xs-12 bor-right-grey-8 p-t-5 p-b-5">
			                    <div className="color-grey-3 font-22 font-bold line-30 text-overflow-ellipsis font-nowrap overflow-hidden">{props.displayCallerName}</div>
			                    <div className="color-grey-2 font-14 font-bold hidden-xs">{props.displayCategory}</div>
			                </div>

			                <div className="col-md-8 col-xs-12 col-sm-8">
			                  <div className="color-grey-4 font-28 small-txt-xs small-txt-sm p-tb-6-lr-40 sm-m-b-10"> {props.displayRoomName}</div>
			                </div>
			            </div>*/}
			            </div>

	                </div>
	            <div className="call-window" >
                    <div className="parent-window-call" id="remote-media">
                        </div>
	            	<LoadingMessage message={props.loadingMessage}/>
	                <div id="local-media" className="caller-window">
	                	
	                </div>
	            </div>
	            <div className="col-md-12 col-xs-12 col-sm-12 custom-sec">
	            <div className="footer-call-info ">

                    <div className="col-md-4 col-xs-12 col-sm-4 text-center ">
                      <div className="row"><div className="">
                          <CallTimer
                          startTimer={props.startTimerV}
                          stopTimer={props.stopTimerV}
                          onTimeUp = {props.onTimeUp}
                          selectedDuration = {props.selectedDuration}
			        	  startingDurationMins = {props.startingDurationMins}
			        	  startingDurationSecs = {props.startingDurationSecs}


                          isDownTimer = {props.isDownTimer}
                          connectionPath = {props.connectionPath}
                          
                          /></div></div>

                    </div>

	                <div className="col-md-4 col-xs-12 col-sm-4  text-center">
	                    <span id="button-leave" className="inline-block bg-red-3 circle-block pointer" onClick={props.onHangUp}><i className="fa fa-phone rotate-134deg custom-icon" aria-hidden="true"></i></span>
	                    
	                    <span onClick={props.onMicClick} className="inline-block circle-block pointer" ><i className={props.micMute ? "fa fa-microphone-slash custom-icon" : "fa fa-microphone custom-icon"} aria-hidden="true"></i>
	                    </span>
	               </div>
                   <div className="row">
                       <div className="width-200 pull-right text-center-xs hidden-xs">
                           <div className=" font-14  font-bold line-height-normal">  Call billing plan</div>
                           <div className="color-grey-2 font-12">{props.pricingPlan}</div>
                       </div></div>
	            </div>
	                </div>
	                <div id="log" className="hide"></div>
	        </div>
	        
        )
}
export default VideoCall;