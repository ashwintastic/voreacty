import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import userLoginAction from '../actions/userLoginAction'
import SocialMediaButtons from '../components/SocialMediaButtons';
import ShowValidationError from '../components/ShowValidationError';
import callApi from '../helper/callapi';
import LocalStorage from '../helper/localStorage';
import isUserLoggedInAction from '../actions/isUserLoggedInAction'
import Discover from './DiscoverContainer';
import LandingPage from '../components/LandingPage';
import queryStringReader from '../helper/urlQueryStringReader';
import ServiceProviderProfile from '../containers/ServiceProfile';
import {Link} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import {PRODUCT_NAME} from '../config/constants';
import { TERMS_OF_USE_PDF_URL, PRIVACY_POLICY_PDF_URL} from '../config/config'

class Login extends Component{

  constructor(props) {
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind(this)
    this.state = {
      loginError: false,
      loggedInStatus: false,
      serviceId:'',
      videoCallObj:{},
    };
    this.loginError = '';
    this.loggedInStatus = false;
    this.isAdmin = false;
    this.redirectPath = '';
  }

  handleUserLogin(event){
    event.preventDefault();
    let userInfo = {
      email: this.emailField.value,
      password: this.passwordField.value,
    };
    this.props.userLoginAction(userInfo);
  }


  checkIfResponseArrived(){
    let response  = this.props.loginResponse;
    if(response.hasOwnProperty('error') && response.error === true ){
      this.loginError = this.props.loginResponse.reason;
    }
    
    if(typeof this.props.location != "undefined" && typeof this.props.location.search!="undefined" && LocalStorage.readFromLocalStorage("service"))
    {
      let serviceId = LocalStorage.readFromLocalStorage("service");
      let redirectParam = queryStringReader.searchParamInQueryString(this.props.location.search,"path");
      localStorage.removeItem("service");
      this.setState({serviceId:serviceId});
      this.redirectPath = redirectParam;
    }

    if(response.hasOwnProperty('isUserLoggedIn') && response.isUserLoggedIn == true &&  typeof this.props.location != "undefined" && typeof this.props.location.search!="undefined" && LocalStorage.readFromLocalStorage("videoCallId") && queryStringReader.searchParamInQueryString(this.props.location.search,"pathSp"))
    {
      let videoCallId = LocalStorage.readFromLocalStorage("videoCallId");
      let videoServiceId = LocalStorage.readFromLocalStorage("videoServiceId");
      let videoUserId = LocalStorage.readFromLocalStorage("videoUserId");
      let videoToken = LocalStorage.readFromLocalStorage("videoToken");
      localStorage.removeItem("videoCallId");
      localStorage.removeItem("videoServiceId");
      localStorage.removeItem("videoUserId");
      localStorage.removeItem("videoToken");
      let redirectParam = queryStringReader.searchParamInQueryString(this.props.location.search,"pathSp");
      this.setState({videoCallObj:{'serviceId':videoServiceId,
                                   'videoCallId' :videoCallId,
                                   'userId':videoUserId,
                                   'videoToken':videoToken
                                  }});
      this.redirectPath = redirectParam;
    }
    if(response.hasOwnProperty('token')){
      if(response.isAdmin === true){
        window.history.pushState(' ', ' ', '/admin');
        this.isAdmin =  true;
      }
      else{
        window.history.pushState(' ', ' ', '/discover');
      }
      this.loggedInStatus=  true;
    }
    else{
      // System error
    }
  }

  render(){
    let goToService=false;
    let videoProps = false;
    this.checkIfResponseArrived();
    let isUserLoggedIn = this.props.loginResponse.isUserLoggedIn;
    let loggedInStatus = this.loggedInStatus || isUserLoggedIn;
    let isAdmin = this.isAdmin || this.props.loginResponse.isAdmin;
    if(loggedInStatus){
      goToService = this.state.serviceId;
      videoProps = this.state.videoCallObj;
    }
    if(goToService){
     window.location.href = this.redirectPath+this.state.serviceId;    
    }
    if(Object.keys(videoProps).length > 0 && typeof(this.redirectPath)==='string'){
      window.location.href  = this.redirectPath+"?"+"user=sp&"+"token="+videoProps.videoToken
      +"&user_id="+videoProps.userId+"&service_id="+videoProps.serviceId+"&video_call_id="+videoProps.videoCallId;
    }
    else if(isAdmin){
      return (
          <div>
            <AdminDashboard />
          </div>
          )
    }
    else if(loggedInStatus){
      let fromLogin = true;
      return (
          <div>
            <LandingPage fromLogin = {fromLogin} hideFooter={true}/>
          </div>
          )
    }
    else{
    return (
      <div>
            <div className="wrapper">
              <section className="section section-we-made-1">
                <section className="sign-block">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                          <div className="font-20 color-black-1 font-bold m-b-20">Login To Your {PRODUCT_NAME} Account</div>
                      </div>
                    </div>

                    <SocialMediaButtons />

                    <div className="row">
                      <div className="col-md-12">
                        <form className="form-horizontal" id="Register_form" role="form" method="POST"
                              onSubmit={this.handleUserLogin}>

                          <div className="form-group relative">
                              <i className="fa fa-envelope icon-input" aria-hidden="true"></i>
                            <input type="email" ref={(el) => {
                              this.emailField = el
                            }} className="form-control" id="email" name="email" aria-describedby="emailHelp"
                            placeholder="Email*" required autoFocus/>
                          </div>

                          <div className="form-group relative">
                            <label htmlFor="password">Password</label>
                              <i className="fa fa-lock icon-input" aria-hidden="true"></i>
                            <input type="password" ref={(el) => {
                              this.passwordField = el
                            }} className="form-control" id="password" name="password" placeholder="Password*"
                                   required/>
                          </div>

                          <ShowValidationError errorProps={this.loginError}/>


                          <div className="form-group align-center">
                            <div className="col-sm-12">
                              <button type="submit" id="login999" className="btn btn-primary full-width btn-login theme-btn">Login
                              </button>
                            </div>
                          {/*<div className="col-sm-6"><a href="/register" className="btn btn-primary full-width cre-an-acc">Create
                              an account</a></div>*/}
                          </div>

                            <div className=" color-black-1 font-11 bor-bottom-grey-8 p-b-10">
                            By signing up, you agree to our  <Link to="/termsofuse" className="color-red-3 font-bold">Terms and Conditions</Link>
                          {/*<a target="_blank" href={TERMS_OF_USE_PDF_URL} className="color-red-3 font-bold">Terms of Use</a> */} and  <Link to="/privacypolicy" className="color-red-3 font-bold">Privacy Policy</Link> {/*<a target="_blank" href={PRIVACY_POLICY_PDF_URL} className="color-red-3 font-bold">Privacy Policy</a> */}</div>
                            <div className="">
                                <Link to="/forgotpassword" className="forgot-pswd">Forgot your
                                password?</Link>
                            </div>
                            <div className="form-group color-black-1 font-12 text-center">
                            Don't have an account?  Please <Link to="/register" className="color-red-3 font-bold"> Sign Up </Link>here
                            </div>

                        </form>
                      </div>
                    </div>

                  </div>
                </section>
              </section>
            </div>
      </div>
    )
}
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {  userLoginAction: userLoginAction,
      isUserLoggedInAction: isUserLoggedInAction
    }, dispatch)
}

function mapStateToProps (state){
  return {
   loginResponse: state.loggedInUserInfoResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);