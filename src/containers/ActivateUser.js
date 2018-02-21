import React from 'react';
import {Link} from 'react-router-dom';
import { GlobalErrorMessages} from '../config/messages'
import queryStringReader from '../helper/urlQueryStringReader';
import ContentPage from '../components/ContentPage'

export default class ActivateUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messageId:-1,
      pageTitle:GlobalErrorMessages['userActivationTitle'],
      pageContent:'',
      pageButton:'login',
    }
  }

  componentWillMount(){
    if(typeof window.location.search != "undefined"){
        let messageId = queryStringReader.searchParamInQueryString(window.location.search,"msg");
        let message = GlobalErrorMessages['NoReason']
        if(messageId==1){
          message = GlobalErrorMessages['userVerified']
        }
        else if(messageId==2){
          message = GlobalErrorMessages['userAlreadyVerified']
        }
        else{
          this.setState({pageButton:''})
        }
        this.setState({pageContent:message})      
    }
  }

  render() {
    return (
      <ContentPage pageTitle={this.state.pageTitle} pageContent={this.state.pageContent} pageButton={this.state.pageButton} />
      )
  //   return (
  //     <div className="page-content-wrapper page-content-container">
  //       <section className="section section-we-made-1">
  //           <div className="container p-0-xs bg-white">

  //               <div className="font-20 color-black-1 font-bold m-b-10 m-t-10">
  //                   User Activation
  //               </div>

  //               <div className="font-18 color-black-1 m-b-10 m-t-10">
  //                   {
  //                   this.state.messageId==1?
  //                   (GlobalErrorMessages['userVerified'])
  //                   :
  //                   (
  //                     this.state.messageId==2?
  //                     (GlobalErrorMessages['userAlreadyVerified']):
  //                     (GlobalErrorMessages['NoReason'])
  //                   )
  //                 }
  //               </div>

  //               <div className="col-md-12 p-0">
  //                {(this.state.messageId==1 || this.state.messageId==2)?
  //                 (<div className="form-group align-center">
  //                       <Link className="btn btn-primary theme-btn p-l-20 p-r-20" to='/login'> Login</Link>
  //                 </div>):(null)
  //                 }

  //               </div>

  //           </div>
  //       </section>
  //   </div>
  //   )
   }
}
