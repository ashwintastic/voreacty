import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import isUserLoggedInAction from '../actions/isUserLoggedInAction'
import {Link} from 'react-router-dom';
class HomePageButtons extends Component {


  componentDidMount(){
    this.props.isUserLoggedInAction();
  }



	render() {
      return (
        <div className="landing-page-btn-container">
            {/* <Link className="btn btn-default login_home theme-btn" to="/discover" >
              Discover
            </Link> */}
        </div>
      )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({isUserLoggedInAction: isUserLoggedInAction}, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse
  };
}

export default connect(mapStateToProps,matchDispatchToProps)(HomePageButtons);

