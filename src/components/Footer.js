import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {PRODUCT_NAME} from '../config/constants';
import { TERMS_OF_USE_PDF_URL, PRIVACY_POLICY_PDF_URL} from '../config/config'
class Fotter extends Component{

    by_categorybind(){

    }
    render(){
        console.log("fotter", this.props.all)
        return (

            <footer className="layout-footer">

                <div className="container">
          {this.props.hasOwnProperty('showOnlyCopyRight')?
              (<div className="row">
                
                <div className="video-call-container">
                <div className="container">
                  <div className="">
                      <div className="row">
                          <div className="col-sm-9 footer-note">
                            <div className="row">
                            <span>Important:</span> If you experience any problems with this call you can use the reconnect instructions sent to your email.
                          </div></div>
                          <div className="color-ccc font-13 col-sm-3 text-right p-tb-10 p-r-0">Copyright©2017 PULSA, LLC</div>
                      </div>
                  </div></div></div>
              </div>)
              :(<div className="row">
              <div className="col-sm-12 col-md-9 col-lg-9">
                  <div className="row">
                      <ul className="nav navbar-nav navbar-left">
                          <li>
                              <a href="/">How it works</a>
                          </li>

                          <li className="">
                              <Link to ='/spregister'>Create Service</Link>
                          </li>


                          <li>
                              <a href="support">Contact Us</a>
                          </li>

                          {
                          /*<li>
                              <a className="cursor-pointer" onClick={this.by_categorybind(this,'directory')}>Directory</a>
                          </li>*/ }
                          <li>

                            <Link to="/termsofuse">Terms and Conditions</Link>
                            {/*
                              <a target="_blank" href={TERMS_OF_USE_PDF_URL}>Terms and Conditions</a>
                            */}
                            
                          </li>
                          <li>
                          <Link to="/privacypolicy">Privacy Policy</Link>
                          {/*
                              <a target="_blank" href={PRIVACY_POLICY_PDF_URL}>Privacy Policy</a>
                          */}    
                          </li>

                      </ul>
                  </div>
              </div>
              <div className="col-sm-12 col-md-3 col-lg-3">
                  <div className="row">
                      <div className="text-right p-10 full-width color-ccc font-13 text-center-sm">Copyright©2017 PULSA, LLC</div>
                  </div>
              </div>
          </div>)}

                </div>
            </footer>


            )
    }
}



export default Fotter;