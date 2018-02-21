import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import { GlobalErrorMessages} from '../config/messages'
import { DOWNLOAD_PDF_URL} from '../config/config'

 const ContentPage = (props) => {

	let pageTitle = (props.hasOwnProperty('pageTitle'))?props.pageTitle:'';
	let pageContent = (props.hasOwnProperty('pageContent'))?props.pageContent:GlobalErrorMessages['NoReason'];
	let pageButton = (props.hasOwnProperty('pageButton'))?props.pageButton:'';
	//let systemMessage = GlobalErrorMessages['NoReason'];
  let displayMessage = "<span class='heading'>"+pageTitle+"</span>"+pageContent;
    return (

<div className="wrapper">
          <div className="container">
          <section className="section section-we-made-1">
        <div className="contributor-block">
              <div className="unit-container">
                  <div className="center-message">
                    <div className="table-cell">
                    <div className="msg-container">

                    <p
                      dangerouslySetInnerHTML={{ __html: displayMessage }} />
                    
                      <div className="col-md-12 p-0">
                      {pageButton == 'login'?
                        (<div className="form-group align-center">
                              <Link className="btn btn-primary theme-btn p-l-20 p-r-20" to='/login'> Login</Link>
                        </div>):

                          (pageButton == 'discover'?
                            (<div className="form-group align-center">
                                <Link className="btn btn-primary theme-btn p-l-20 p-r-20" to='/discover'> Discover</Link>
                            </div>):
                            (pageButton == 'SPFormDownload')?
                            (
                              <div className="form-group align-center">
                                <a className="btn btn-primary theme-btn p-l-20 p-r-20" target="_blank" href={DOWNLOAD_PDF_URL}>Download</a>
                            </div>
                            ):
                            (pageButton == 'forgotPassword')?
                            (
                              <div className="form-group align-center">
                              <Link className="btn btn-primary theme-btn p-l-20 p-r-20" to='/forgotpassword'> Forgot Password</Link>
                            </div>
                            )
                            :
                            (null)
                          )
                      }
                      </div>
                      </div>
                      </div>
                    </div>

              </div>
              </div>  
          </section>
         </div>
        </div>            
    )
}

export default ContentPage;