import React from 'react';
import { connect } from 'react-redux';
import forgotPasswordAction from '../actions/forgotPasswordAction';
import {bindActionCreators} from 'redux';
import { GlobalErrorMessages} from '../config/messages'
class ResetPassword extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      response: true,

    };
    this.handleForgetPassword = this.handleForgetPassword.bind(this);

  }

  handleForgetPassword(event){
    event.preventDefault();
    console.log("m clickedc", this.email.value);
    this.props.forgotPasswordAction(this.email.value)
  }

  renderMessage(){
    const {forgotPasswordResponse} = this.props;
    let msg = ''
    if(forgotPasswordResponse.hasOwnProperty('error') && !forgotPasswordResponse.error){
     msg = 'resetPasswordSuccess'
    }
    if(forgotPasswordResponse.hasOwnProperty('error') && forgotPasswordResponse.error){
      msg = forgotPasswordResponse.reason
    }
    return msg;
  }

  render() {
    const {response} = this.state;
    let msg = this.renderMessage();
    return (
        <div className="wrapper">
            <section className="section section-we-made-1">

      <section className="sign-block">
        <div className="container">

          <div className="row">
            <div className="col-lg-12">
                <div className="font-20 color-black-1 font-bold m-b-20">Reset your password</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 p-0">

              <form className="form-horizontal" onSubmit={this.handleForgetPassword} id="Register_form">
                  <div className="form-group relative">
                      <i className="fa fa-envelope icon-input" aria-hidden="true"></i>
                    <input type="email" className="form-control"
                           placeholder="Email Address" required autoFocus
                           ref={(el) => {this.email = el}}/>
                  </div>

                {response  ? (<div dangerouslySetInnerHTML={{ __html: GlobalErrorMessages[msg]} } />): (null)}
                  <div className="form-group align-center">
                    <button type="submit" className="btn btn-primary theme-btn full-width">
                      Send Password Reset Link
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </section>
            </section></div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({forgotPasswordAction: forgotPasswordAction}, dispatch)
}


function mapStateToProps (state){

  return {
    forgotPasswordResponse: state.forgotPasswordResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ResetPassword);
