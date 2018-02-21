import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SuccessComponent from '../components/SuccessComponent';
import {bindActionCreators} from 'redux';
import {sendSpDataForApproval} from "../actions/spRegistrationApproval"

class ServiceSaved extends React.Component {

	componentDidMount(){
		let dataToSend = {"clear":true};
		setTimeout(this.props.sendSpDataForApproval(dataToSend), 2000);
	}
	render() {
		return <SuccessComponent color = "color-green-3" fromPage="spRegister" />
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

export default connect(mapStateToProps, matchDispatchToProps)(ServiceSaved);