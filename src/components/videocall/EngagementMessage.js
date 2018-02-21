import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {makePaymentAction, makePaymentCompleteAction } from '../../actions/makePaymentAction'
import LaunchVideoCall from '../../containers/videocall/LaunchVideoCall'
import {Link} from 'react-router-dom';
import { GlobalErrorMessages} from '../../config/messages'
/*
const EngagementMessage = (props) => {
    return (
            props.message
            &&
            <div>
                {props.message}

            </div>

        )
}
*/

class  EngagementMessage extends Component {

  constructor(props){
    super(props);
    //this.makePayment = this.makePayment.bind(this);
    //this.makeVideoCall = this.makeVideoCall.bind(this);
    this.state ={
     // showPayemntmessageFlag: false,
      showVideoPage:false
      //showPaymentMesssage: ''}
  	}
  }

  // makeVideoCall(){
  // 	this.setState({showVideoPage:true})
  // }
  //makePayment(){
   //this.props.makePaymentAction()

    // setTimeout(() => {
    //   this.props.makePaymentCompleteAction()
    //   this.setState({showPayemntmessageFlag: true})
    // }, 3000);
  //}

  render() {
  	if (this.state.showVideoPage){
  		window.history.pushState(' ', ' ', '/videocall')
    	return (<LaunchVideoCall />)
    }

    // if (this.state.showPayemntmessageFlag){
    //   window.history.pushState(' ', ' ', '/payment')
    //   return(
    //     <div>
    //       <div>

    //       	{GlobalErrorMessages['paymentSuccessfulMessage']}

    //       </div>

    //       <div>
    //         <Link className="btn btn-primary theme-btn p-l-10 p-r-10" to='/videocall'> Click for Video Call</Link>
    //       </div>
    //     </div>
    //   )
    // }


    if (this.props.message && !(this.props.showContinueButton)) {
      //let displayMessage = GlobalErrorMessages[this.props.message]
      let displayMessage = (GlobalErrorMessages.hasOwnProperty(this.props.message))?GlobalErrorMessages[this.props.message]:this.props.message;

      displayMessage = typeof displayMessage == 'boolean'?'':displayMessage;

      if(typeof this.props.param1!='undefined' && this.props.param1!=''){
        displayMessage = GlobalErrorMessages[this.props.message].replace(/<<(.*?)>>/, this.props.param1)
      }

      

      //alert(displayMessage)
      return (
        <div
          dangerouslySetInnerHTML={{ __html: displayMessage }}
        />
      )
    }

    

    // if (this.props.showContinueButton) {
    //   return (
    //     <div>
    //       <div>
    //       {GlobalErrorMessages[this.props.message]}
    //       </div>
    //       <div>
    //         <div>
    //           <button className="btn btn-primary theme-btn p-l-10 p-r-10" onClick={this.makePayment}> Continue With Payment</button>            
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
    // else {
    //   return (<div></div>)
    // }
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    // makePaymentAction: makePaymentAction,
    // makePaymentCompleteAction: makePaymentCompleteAction
  }, dispatch)
}


function mapStateToProps (state){
  return {
    isUserLoggedIn: state.isUserLoggedIn
  };
}

export default connect(mapStateToProps,matchDispatchToProps)(EngagementMessage);


//export default EngagementMessage;