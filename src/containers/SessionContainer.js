/**
 * Created by root on 8/8/17.
 */
/**
 * Created by root on 28/7/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import spinnerImg from '../assets/images/loadingBarImage.gif';
import isUserLoggedInAction from '../actions/isUserLoggedInAction';
import getContactHistoryAction from '../actions/videocall/getContactHistoryAction';

import {bindActionCreators} from 'redux';
import NavBar from './NavBar'
import Footer from '../components/Footer'
import Login from './Login';
import LocalStorage from '../helper/localStorage';
import {setUserLoggedInstore} from '../actions/setUserLoggedInStoreAction'
class SessionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isUserLoggedIn: 0}
  }


  componentDidMount() {
    this.props.isUserLoggedInAction()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loggedInStatus.isUserLoggedIn=== true){
      this.setState({isUserLoggedIn: 1 })

      let userId = nextProps.loggedInStatus.userId;
      this.props.getContactHistoryAction({userId:userId});
    }

    if(nextProps.loggedInStatus.isUserLoggedIn === false){
      window.history.pushState(' ', ' ', '/login')
      this.setState({isUserLoggedIn: -1})
    }
    if(nextProps.loggedInStatus.error === true){
      window.history.pushState(' ', ' ', '/login')
      this.setState({isUserLoggedIn: -1})
    }
  }

  componentWillMount(){
    this.checkIfLoginViaOauth2(window.location.search);
  }


  checkIfLoginViaOauth2(oAuth2){
   if (oAuth2 != null ){
    let key = oAuth2.slice(0,5)
     if (key == '?tok='){
      let accessToken = oAuth2.split('tok=')[1];
       LocalStorage.writeOnLocalStorage(accessToken);
       this.setState({isUserLoggedIn: 1})
       //this.props.isUserLoggedInAction();
       this.props.setUserLoggedInstore();
     }
   }
  }

  render() {
    if(this.state.isUserLoggedIn == 1) {
      return (
        <div>{this.props.children}</div>
      )
    }

    if(this.state.isUserLoggedIn == -1){
      return(
        <div><NavBar/>
          <Login />
          <Footer/></div>
      )
    }
    if(this.state.isUserLoggedIn == 0){
      return(null)
    }
  }
}



function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    isUserLoggedInAction: isUserLoggedInAction,
    getContactHistoryAction: getContactHistoryAction,
    setUserLoggedInstore: setUserLoggedInstore}, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(SessionContainer);
