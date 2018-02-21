/**
 * Created by root on 14/8/17.
 */
/**
 * Created by root on 8/8/17.
 */
/**
 * Created by root on 28/7/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import isUserLoggedInAction from '../actions/isUserLoggedInAction';
import getContactHistoryAction from '../actions/videocall/getContactHistoryAction';
import {bindActionCreators} from 'redux';
class NonAuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isUserLoggedIn: 0}
  }

  componentDidMount() {
     this.props.isUserLoggedInAction()
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.loggedInStatus.userId !='undefined' && nextProps.loggedInStatus.userId){
        let userId = nextProps.loggedInStatus.userId;
        this.props.getContactHistoryAction({userId:userId});
    }
  }

  render() {
      return (
        <div>{this.props.children}</div>
      )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    isUserLoggedInAction: isUserLoggedInAction,
    getContactHistoryAction: getContactHistoryAction,
  }, 
    dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    searchResultPage: state.searchResultPage
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(NonAuthContainer);
