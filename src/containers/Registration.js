import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import sendUserInfo from '../actions/registerUserAction'
import {Link} from 'react-router-dom'
import SocialMediaButtons from '../components/SocialMediaButtons';
import ShowValidationError from '../components/ShowValidationError';
import EngagementMessage from '../components/videocall/EngagementMessage';
import {PRODUCT_NAME} from '../config/constants';
import { GlobalErrorMessages} from '../config/messages'
import ContentPage from '../components/ContentPage'
import { TERMS_OF_USE_PDF_URL, PRIVACY_POLICY_PDF_URL} from '../config/config'

class Registration extends Component{

  constructor(props) {
    super(props);
    this.state = {
      registrationErrors: false,
      emailError: false,
      passwordError: [],
      registrationSuccess: false,
      successMessage: 'registrationSuccessMessage'
    };
  }

  handleUserRegistration(event){
    event.preventDefault();
    let userInfo = {
      email: this.email.value,
      name: this.name.value,
      surname: this.surname.value,
      password: this.password.value,
      password_confirmation: this.confirmPassword.value
    };
    this.props.sendUserInfo(userInfo);
  }

  componentWillReceiveProps(nextProps){

    let response  = nextProps.registrationResponse;
    let isError = response.hasOwnProperty('errors');
    let passwordError1 = [];
    let emailError1 = [];
    if(isError){
      let error = response.errors;
      if (error.hasOwnProperty('password')){
        error.password.map((pass) => {
          passwordError1.push(<div key ={pass}>{pass}</div>)
        })

      }
      if(error.hasOwnProperty('email')){
        error.email.map((email) => {
          emailError1.push(email)
        })
      }
      this.setState({emailError: emailError1, passwordError: passwordError1})
    }
    if(response.hasOwnProperty('status') && response.status){
      this.setState({emailError: '', passwordError: '', registrationSuccess:true})
    }
  }


  render(){
    let displayMessage ="";
    let registrationSuccessTitle=""
    if(this.state.registrationSuccess){
      registrationSuccessTitle = GlobalErrorMessages['registrationSuccessTitle'];
       displayMessage = GlobalErrorMessages[this.state.successMessage].replace(/<<(.*?)>>/, this.email.value)   
    }
      return(
          <div>
            {this.state.registrationSuccess ? (
              <ContentPage pageTitle={registrationSuccessTitle} pageContent={displayMessage} />
             
            ) : (

          <div className="wrapper">
              <div className="container">
              <section className="section section-we-made-1">

            <section className="sign-block">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                      <div className="font-20 color-black-1 font-bold m-b-20">Sign Up For Your {PRODUCT_NAME} Account</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <form className="form-horizontal" id="Register_form"
                      onSubmit={this.handleUserRegistration.bind(this)}>
                    
                    <div>
                      <div className="form-group relative width-49 pull-left m-r-2-perc">
                          <i className="fa fa-user-o icon-input" aria-hidden="true"></i>
                        <input type="text" className="form-control" required placeholder="Firstname*"
                               ref={(name) => this.name = name}/>
                      </div>

                      <div className="form-group relative width-49 pull-left">
                          <i className="fa fa-user-o icon-input" aria-hidden="true"></i>
                        <input type="text" className="form-control" required placeholder="Lastname*"
                               ref={(surname) => this.surname = surname}/>
                      </div>

                      <div className="form-group relative clear-both">
                          <i className="fa fa-envelope icon-input" aria-hidden="true"></i>
                        <input type="email" className="form-control"
                               placeholder="Email*" required ref={(email) => this.email = email}/>
                      </div>
                    </div>

                    <div className="form-group relative width-49 pull-left m-r-2-perc">
                        <i className="fa fa-lock icon-input" aria-hidden="true"></i>
                      <input type="password" className="form-control"
                             placeholder="Password*" required ref={(password) => this.password = password}/>
                    </div>
                    
                    <div className="form-group relative width-49 pull-left">
                        <i className="fa fa-lock icon-input" aria-hidden="true"></i>
                      <input type="password" className="form-control"
                             id="password_confirmation"  placeholder="Confirm Password*" required
                             ref={(confirmPassword) => this.confirmPassword = confirmPassword}
                      />
                    </div>
                    
                    <ShowValidationError errorProps={this.state.emailError}/>
                    <ShowValidationError errorProps={this.state.passwordError}/>

                    <div className="form-group">
                      <input type="submit" className="btn btn-primary full-width theme-btn" value ="Create An Account"/>
                    </div>
                      <div className=" color-black-1 font-11 bor-bottom-grey-8 p-b-10">
                      By signing up, you agree to our 
                      <Link to="/termsofuse" className="color-red-3 font-bold">Terms and Conditions</Link>
                    {/*<a target="_blank" href={TERMS_OF_USE_PDF_URL} className="color-red-3 font-bold">Terms of Use</a>*/} and <Link to="/privacypolicy" className="color-red-3 font-bold">Privacy Policy</Link>{/*<a target="_blank" href={PRIVACY_POLICY_PDF_URL} className="color-red-3 font-bold">Privacy Policy</a>*/}</div>
                      <div className="form-group color-black-1 font-12 text-center p-t-5">
                      Already have an Account? Please <Link to="/login" className="color-red-3 font-bold"> Login </Link>here
                      </div>
                  </form>
                  </div>
                </div>
              </div>
            </section></section>
        </div>
        </div> )
          }
          </div>
      )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({sendUserInfo: sendUserInfo}, dispatch)
}


function mapStateToProps (state){

  return {
    isUserLoggedIn: state.isUserLoggedIn,
    registrationResponse: state.userRegistrationResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Registration);

