import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import isUserLoggedInAction from '../actions/isUserLoggedInAction'
import getContactHistoryAction from '../actions/videocall/getContactHistoryAction';

import LocalStorage from '../helper/localStorage';
import userLogOutAction from '../actions/userLogOutAction'
import SearchContainer from './SearchContainer'
import logo from '../assets/images/logo.png';
import home from '../assets/images/home.png';
import DrawerComponent from '../components/DrawerComponent';
import getAllServicesAction from '../actions/getAllServicesAction'
import RouterComponent from '../router/RouterComponent'
import {IMAGE_BASE_URL} from '../config/config';

let profileImageStyle = {
  height:80,
  width:80
}
class NavBar extends Component{

  constructor(props){
    super(props);
    this.state ={showrequestcall: false,
      isLoggedOut: false,
      profilePicName:''
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.showMobileSearchBar = this.showMobileSearchBar.bind(this);
    this.hideMobileSearchBar = this.hideMobileSearchBar.bind(this);
    this.defaultImageUrl = IMAGE_BASE_URL+"images/users/frame000.png" +'?v=' + Math.ceil(Math.random() * 999999);
  }

  by_category(){
    /** TODO:: API CALL TO FETCH OUR SERVISES
     * **/
    console.log("by catagoruy")
  }

  dropDownSubMenu() {
    return(
      <li className="dropdown-submenu hidden-sm">
        <a className="visible-xs visible-sm" role="button" data-toggle="collapse" href="#xs_sm_nav" aria-expanded="false" aria-controls="xs_sm_nav">
        </a>
        <ul className="dropdown-menu submenu-flop hidden-xs hidden-sm">
          <li><a href="{{ url('/edit-profile') }}" ><i className="fa fa-user pull-left"></i>My Profile</a></li>
          <li><a href="#"><i className="fa fa-credit-card pull-left"></i>Make deposit</a></li>
          <li><a href="{{ url('/history') }}" ><i className="fa fa-history pull-left"></i>History</a></li>
          <li><a href="{{ url('/record') }}" ><i className="fa fa-microphone pull-left"></i>Recorded Calls</a></li>
          <li><a href="#"><i className="fa fa-comments pull-left"></i>Messages</a></li>
          <li><a href="{{ url('/support') }}"><i className="fa fa-info-circle pull-left"></i>Support</a></li>
        </ul>

      </li>
    )
  }

  showMobileSearchBar(){
    var elem = this.refs.searchmobileview;
    elem.style.display = 'block';
  }

  hideMobileSearchBar(){
    var elem = this.refs.searchmobileview;
    elem.style.display = 'none';
  }

  navTaggle(){
    return(
      <li className="search-mobile hidden-md hidden-lg" onClick={this.showMobileSearchBar}>
        <button className="search-btn-container m-r-15 p-l-15 p-r-15">
          <i className="fa fa-search color-red-3 font-22" aria-hidden="true"></i>
        </button>
      </li>
    )
  }

  triggerOnclickLinkDiscover(e){
    this.props.getAllServicesAction();
  }

  sideNavigationBar(){
    return(
      <li className="sidebar-nav">
        <a href="{{url('/discover')}}/new" data-scroll="true" data-id="#workflow">
          Discover
        </a>

        <ul className="direct">
          <li><a className="cursor-pointer" onClick={this.by_category.bind(this,'new')}>New</a></li>
          <li><a className="cursor-pointer" onClick={this.by_category.bind(this, 'featured')} >Featured</a></li>
          <li><a className="cursor-pointer" onClick={this.by_category.bind(this, 'trending')} >Trending</a></li>
        </ul>
      </li>)
  }

  header(imagePreview){
    const navStyle = {
      position: 'fixed',
      top: '0',
    };
    return(
      <nav className="navbar navbar-default navbar-fixed-top navbar-burger"
           role="navigation" >
        <div className="container">
          <div className="navbar-header">
            <div id="navbar" >

              <ul className="nav navbar-nav">


                <li className="hidden-xs">
                  <Link to ='/' className="cursor-pointer" onClick={this.triggerOnclickLinkDiscover.bind(this)} ><img src={home} width="21" />
                  </Link>
                </li>

                <li className="hidden-xs">
                  { this.props.loggedInStatus.isUserLoggedIn === true ?(
                    this.props.loggedInStatus.isSp === true?(<Link to ='/dashboard' className="cursor-pointer">Dashboard</Link>)
                    :(<Link to ='/spregister' className="cursor-pointer">Create Service</Link>))
                    :(null)
                  }
                </li>
                {this.dropDownSubMenu()}
                {this.props.loggedInStatus.error === true ?(
                    <li className="hidden-xs">
                      <Link to='/login' id="signin" >login</Link>
                    </li>
                  ): (null)}
                {this.props.loggedInStatus.error === true ?(
                    <li className="hidden-xs">
                      <Link to="/register" id="signup" >sign up</Link>
                    </li>):(null)}

                { this.props.loggedInStatus.isUserLoggedIn === true ?
                  
                  (
                  <li className="user-profile hidden-xs hidden-sm" >
                      <ul className="nav navbar-nav ">
                      <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                              <span className="glyphicon glyphicon-user"></span>&nbsp;
                              <strong>{this.props.loggedInStatus.firstName} </strong>
                              <span className="fa fa-caret-down"></span>
                          </a>
                          <ul className="dropdown-menu">
                              <li className="pull-left full-width">
                                  <div className="navbar-login">
                                      <div className="row">
                                          <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                                                  <span className="w-h-80 inline-block ">
                                                    {imagePreview}
                                                  </span>
                                          </div>
                                          <div className="col-lg-8 col-sm-8 col-xs-8 col-md-8 m-t-10">
                                              <div className="row">
                                                  <div className="text-left"><strong>{this.props.loggedInStatus.name}</strong></div>
                                                  <div className="text-left small">{this.props.loggedInStatus.email}</div>
                                                  {/*<a className="text-left font-14 color-red-3 text-dec-uline" href="/callhistory">Call History</a>*/}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                              <li className="divider pull-left full-width"></li>
                              
                              <li>
                                  <div className="clear-both navbar-login navbar-login-session">
                                      <div className="row">
                                          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">
                                                  <Link className="btn theme-btn btn-block" to={'/editprofile/' + this.props.loggedInStatus.userId}>Edit Profile</Link>
                                                
                                          </div>
                                          <div className="col-lg-6 col-sm-6 col-md-6 col-xs-6">

                                              <a href="javascript:void(0)" className="btn custom-btn btn-block" onClick={this.handleLogout}>Logout</a>

                                          </div>
                                      </div>
                                  </div>
                              </li>
                          </ul>
                      </li>
                  </ul></li> ) : (null)}
                {this.navTaggle()}
                  <li>  
                  <DrawerComponent 
                    logout     = {this.handleLogout}
                    userInfo   = {this.props.loggedInStatus}
                  /*hideBurger = {this.props.hideBurger}*/
                    contactHistoryResponse = {this.props.contactHistoryResponse}
                  /></li>
              </ul>
            </div>
              <div className="pull-right col-md-3 col-lg-5 col-xs-12 col-sm-3 search-mobile-view"  ref={"searchmobileview"}>

                <div className="search">
                    <i className="fa fa-times search-close hidden-md hidden-lg" aria-hidden="true" onClick={this.hideMobileSearchBar}></i>
                  <SearchContainer/>


                    </div>
              </div>


            <Link to="/" className="navbar-brand cursor-pointer" ><img src={logo} width="110"/></Link>
          </div>
          <div className="collapse navbar-collapse ">

            <ul className="nav navbar-nav navbar-right navbar-uppercase">
              <li className="social-links"></li>
              <li className="sidebar-nav">
                <a className="cursor-pointer" onClick={this.by_category.bind(this, 'directory')}>
                  Directory
                </a>


                {/*using recat */}
              </li>
              {this.sideNavigationBar()}
              <li className="sidebar-nav">

              {/*<a href="" data-scroll="true" data-id="#projects">
                  My List
                </a>*/}

                <div className="licontent hideContent" id="navsydlist"></div>
                <div className="mylist-loader"><img src="images/web-parts/ajax-loader.gif" /></div>
                <div className="show-more">
                  <a href="#">Show more</a>
                </div>

              </li>
              <li className="sidebar-nav">
                <a href="" data-scroll="true" data-id="#clients">
                  Sort By
                </a>
                <ul className="direct">
                  <li><a className="cursor-pointer" onClick={this.by_category.bind(this, 'directory')} >All</a></li>
                  <li><a className="cursor-pointer" onClick={this.by_category.bind(this, 'directory')} >Available</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }



  handleLogout(){
    LocalStorage.removeFromLocalStorage('accessToken');
    this.props.userLogOutAction();
    window.location.href = "/login";
  }

componentWillReceiveProps(nextProps){
if(typeof nextProps.loggedInStatus != "undefined"){
  this.setState({profilePicName:nextProps.loggedInStatus.profilePic});
  // let userId = nextProps.loggedInStatus.userId;
  // this.props.getContactHistoryAction({userId:userId});
}

}
  render(){
    let profilePicName = this.state.profilePicName;
    let imagePreview = null;
    if (profilePicName) {
      let profilePicUrl = IMAGE_BASE_URL+"storage/app/public/sp/images/users/"+profilePicName +'?v=' + Math.ceil(Math.random() * 999999);  
      imagePreview = (<span  style={{backgroundImage: "url("+profilePicUrl +")" }} className="background-clip" />);
    }
    else{
      imagePreview = (<span style={{backgroundImage: "url("+this.defaultImageUrl +")" }}  className="background-clip" />);
    }
    return(
      <div>
        {this.props.children}
        {this.header(imagePreview)}
      </div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    isUserLoggedInAction: isUserLoggedInAction,
    userLogOutAction: userLogOutAction,
    //getContactHistoryAction: getContactHistoryAction,
    getAllServicesAction: getAllServicesAction
  }, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    contactHistoryResponse: state.contactHistoryResponse,
    allServices: state.allServices,
    saveProfileImageResponse: state.saveProfileImageResponse
  };
}

export default connect(mapStateToProps,matchDispatchToProps)(NavBar);
