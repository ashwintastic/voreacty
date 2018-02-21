import React from 'react';
import { connect } from 'react-redux';
import resetPasswordAction from '../actions/resetPasswordAction';
import {bindActionCreators} from 'redux';
import { GlobalErrorMessages} from '../config/messages'
import isTokenValidAction from '../actions/isTokenValidAction'
import ContentPage from '../components/ContentPage'

class ResetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      response: false,
      errors: '',
      redirectToMessage:false,
      success:false
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);

  }

  componentDidMount(){
    this.props.isTokenValidAction(this.props.match.params.token)
  }
  handleResetPassword(event){
    event.preventDefault();
    let userId = this.props.resetPasswordResponse.istokenValid.userId
    let passwordObj = {
      password : this.pass1.value,
      password_confirmation:this.pass2.value,
      userId: userId
    };
    this.props.resetPasswordAction(passwordObj)
  }

  componentWillReceiveProps(nextProps){
    const {resetPasswordResponse} = this.props;
    if(resetPasswordResponse.hasOwnProperty('istokenValid') && resetPasswordResponse.istokenValid.error){
      this.setState({errors: GlobalErrorMessages['tokenAltered']})
    }
    let response = nextProps.resetPasswordResponse;
    if(response.hasOwnProperty('resetpassword') && response.resetpassword.hasOwnProperty('errors')){
     this.setState({errors: response.resetpassword.errors.password[0]})
    }

    if(response.hasOwnProperty('istokenValid') && response.istokenValid.error && response.istokenValid.reason == "resetTokenExpired"){
      this.setState({redirectToMessage: true,errors:response.istokenValid.reason}) 
    }
    if(response.hasOwnProperty('resetpassword') && response.resetpassword.hasOwnProperty('error') && !response.resetpassword.error ){
      this.setState({errors: GlobalErrorMessages['passwordUpdatesSuccessfully'],success:true})
    }
  }


  checkIfTokenAltered(){
    const {resetPasswordResponse} = this.props;
    if(resetPasswordResponse.hasOwnProperty('istokenValid') && !resetPasswordResponse.istokenValid.error){
      this.error = GlobalErrorMessages[resetPasswordResponse.istokenValid.reason];
    }
    return this.error;
  }

  render() {
    if(this.state.redirectToMessage){
      if(this.state.errors == 'resetTokenExpired'){
        let pageTitle = "Reset Password Link Expired";
        let pageContent = "Link has been expired. Please request a new link."
        return (
              <ContentPage pageTitle={pageTitle} pageContent={pageContent} pageButton="forgotPassword" />
              )
      }

    }
    const {resetPasswordResponse} = this.props;
    const {response} = this.state;
    this.checkIfTokenAltered()
    return (
        <div className="wrapper">
            <section className="section section-we-made-1">
      <section className="sign-block">
        <div className="container">

          <div className="row">
            <div className="col-lg-12">
                <div className="font-20 color-black-1 font-bold m-b-20" style={{'textAlign': 'center'}}>Reset Password</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <form className="form-horizontal" onSubmit={this.handleResetPassword}>
                    <div className="form-group">
                      {resetPasswordResponse.hasOwnProperty('istokenValid')  && <div className="color-black-1" style={{'color': '#757575','textAlign': 'center'}}> {resetPasswordResponse.istokenValid.email}</div>}
                    </div>

                    <div className="form-group relative">
                        <i className="fa fa-lock icon-input" aria-hidden="true"></i>
                      <input type="password" className="form-control" placeholder="Password"
                             required
                             ref={(el) => {this.pass1 = el}}/>

                    </div>

                    <div className="form-group relative">
                        <i className="fa fa-lock icon-input" aria-hidden="true"></i>
                      <input type="password" className="form-control" placeholder="Confirm Password"
                             required
                             ref={(el) => {this.pass2 = el}}/>

                    </div>

                    <div className="form-group align-center">
                      <button type="submit" className="btn btn-primary theme-btn full-width">
                        Reset Password
                      </button>
                    </div>

                <p>{this.error}</p>
                {this.state.success==true?
                  (
                    <div>
                    <div className="col-lg-12">
                      <div className="font-14 font-bold m-b-14 color-red-1" dangerouslySetInnerHTML={{ __html: this.state.errors }} />
                      </div>
                    </div>
                  ):
                  (
                    <div>
                    <div className="col-lg-12">
                      <div className="font-14 font-bold m-b-14 color-red-3" dangerouslySetInnerHTML={{ __html: this.state.errors }} />
                      </div>
                    </div>
                  )
                }
              </form>
            </div>
          </div>
        </div>
      </section>
            </section>
        </div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({resetPasswordAction: resetPasswordAction,
                             isTokenValidAction: isTokenValidAction
  }, dispatch)
}


function mapStateToProps (state){
  return {
    resetPasswordResponse: state.resetPasswordResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
