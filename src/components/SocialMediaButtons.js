import React, {Component} from 'react'
import {API_SERVER_WEB_BASE_URL} from '../config/config'
import {Link} from 'react-router-dom'
class SocialMediaButtons extends Component{

	render(){
		return(<div className="row socialite">    
		    <div className="col-sm-12 col-md-12 col-xs-12 m-b-10">
		       <a href={API_SERVER_WEB_BASE_URL + 'login/facebook'} className="btn btn-primary btn-facebook"><i className="m-l-5 m-r-5 font-18 align-middle fa fa-facebook"></i>Login with Facebook</a>
		    </div>
		    <div className="col-sm-12 col-md-12 col-xs-12">
		        <a href ={API_SERVER_WEB_BASE_URL + 'login/google'} className="btn btn-primary btn-google"><i className="m-l-5 m-r-5 font-18 align-middle fa fa-google"></i>Login with Google</a>
		    </div>        
		</div> 
		)
	}
}
export default SocialMediaButtons;



