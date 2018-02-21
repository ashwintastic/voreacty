import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CallHistoryTable from '../../components/videocall/CallHistoryTable'
import {getCallHistoryDetails} from '../../actions/videocall/getCallHistoryAction';

class CallHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let userId = this.props.loggedInUserInfo.userId;
    this.props.getCallHistoryDetails({userId:userId});
  }

  render() {
    window.history.pushState('', '', '/callhistory');
    //console.log("Myprops : ",this.props)
   return(
      <div className="wrapper">
        <section className="p-t-80">
            <CallHistoryTable callHistoryData={this.props.callHistoryInfo}/>
        </section>
    </div>
    )
  }
}

function mapStateToProps (state){
  //console.log("mystate ", state);
  return {
    callHistoryInfo : state.callHistoryResponse,
    loggedInUserInfo: state.loggedInUserInfoResponse,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getCallHistoryDetails: getCallHistoryDetails
  },dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CallHistory);