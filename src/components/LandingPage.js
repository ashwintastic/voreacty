import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import HomePageButtons from '../containers/HomePageButtons.js';

import NavBar from '../containers/NavBar';
import Footer from './Footer';
import {PRODUCT_NAME} from '../config/constants'

import isUserLoggedInAction from '../actions/isUserLoggedInAction';
import getContactHistoryAction from '../actions/videocall/getContactHistoryAction';

import logo from '../assets/images/logo.png';
import howItWorksRight from '../assets/images/how-it-works-right.png';
import howItWorks from '../assets/images/how-it-works.jpg';
import voxcolSearch from '../assets/images/voxcol-search.jpg';
import finAdvise from '../assets/images/fin-advise.jpg';
import dashboard from '../assets/images/dashboard.jpg';
import insta from '../assets/images/insta.jpg';
import dashboard2 from '../assets/images/dashboard2.jpg';
class LandingPage extends Component {
    componentDidMount(){
        if(typeof this.props.fromLogin == "undefined"){
            localStorage.removeItem("pricing");
            localStorage.removeItem("service");
            localStorage.removeItem("videoCallId");
            localStorage.removeItem("videoServiceId");
            localStorage.removeItem("videoUserId");
            localStorage.removeItem("videoToken");
        }
        this.props.isUserLoggedInAction() 
    }

    componentWillReceiveProps(nextProps){
        if(typeof nextProps.loggedInStatus.userId !='undefined' && nextProps.loggedInStatus.userId){
            let userId = nextProps.loggedInStatus.userId;
            this.props.getContactHistoryAction({userId:userId});
        }
    }
    render() {
        return (
            <div>
                <NavBar hideBurger = {true}/>
                <header id="homepg" className="aa">
                    <div className="overlay">
                        <div className="image-text">
                            <div className="div-inner  container">
                                <div className="col-sm-5">
                                    <div className="banner-img"></div>
                                </div>
                                <div className="col-sm-7 banner-text-top text-left">
                                    <h2>"Pay to Video Call" Service.</h2>
                                    <p>
                                    Built for professionals, businesses, entrepreneurs and organizations wanting to offer remote consultation services. Our video calling is integrated with a payment system and management tools allowing you to bill your clients.
                                    </p>
                                    <Link to ='/spregister' className="inline-block m-t-20 btn-red">CREATE SERVICE</Link>

                                </div>
                                <HomePageButtons />
                            </div>
                        </div>
                        <div className="concave"></div>
                    </div>
                </header>

<section className="how-it-works">
    <div className="left-design"></div>
    <div className="container p-t-80">
        <div className="row">
            <div className="col-sm-6 text-right col-left">
                <h4>How it works </h4>
                <p>
                Voxcol is a "pay to video call" service designed for <br/>
                professionals and organizations looking to conduct <br/>
                paid video calls for person to person services <br/>
                such as consultations and expert advise. The Voxcol <br/>
                dashboard allows you to set your own pricing packages, <br/>
                manage your transactions and seamlessly <br/>
                receive payments once your availability is <br/>
                confirmed or an appointment is set.
                </p>
            </div>
            <div className="col-sm-6 text-right col-right">
                <img src={howItWorksRight} width='80%' />
            </div>
        </div>
        <div className="row m-t-50">
            <div className="col-sm-6 col-left">
                <img src={howItWorks} width='80%' className="howitworksimg" />
            </div>
            <div className="col-sm-6 m-t-50 col-right">
                <p>
                It’s easy to use, all you have to do is sign up, click the "Create Service" button, provide the information needed,
                hit submit and that’s it!
                </p>
            </div>
        </div>
    </div>
    <div className="right-design"></div>
</section>

<section className="intruction-block">

<div className="container">
     <div className="row">
        <div className="col-sm-6 text-right col-left">
            <p>
            Once your service is authenticated, you can share <br />
            your Voxcol link with your clients by sms, email or on <br />
            your social media bio. Clients can also find your <br />
            service by inputing your name on the search bar.
            </p>

            <img className="p-tb-50" src={voxcolSearch} width='100%' />
            <img src={finAdvise} width='100%' className="p-tb-50" />
            <h4 className="m-t-50">Payments</h4>
            <p>
            Voxcol gives you control over your transactions and <br/>
            helps you keep track of your earned money which is <br/>
            paid to your wallet or account.
            </p>
            <img className="m-t-50" src={dashboard} width='105%' />
        </div>
         <div className="col-sm-6 col-right">
             <img src={insta} width='100%' className="p-tb-50" />
             <p>
             It’s used by doctors, educators, coaches, nutritionists, lawyers,
             influencers and fitness specialists among other experts, the list
             includes organizations such as law firms, hospitals, schools,
             counceling forums and help desks.
             </p>
             <h4 className="m-t-100">More possibilities </h4>
             <p>
             Voxcol is an open ended tool allowing you to be creative
             with your service offering, whether you are an individual,
             want to start a business with a small team or you are a
             large organization offering consultations or other person
             to person interactive services. Voxcol has made it all
             possible and seamless.
             </p>
             <img src={dashboard2} width='100%' className="p-tb-50" />
             <h4 className="m-t-50">Global reach  </h4>
             <p>
             Voxcol opens you up to new markets in your area or
             globally by making you visible to users seeking the services
             you offer. Join our growing community today!
             </p>
             <div className="social-icons m-t-60">
                <a href="#" className="insta"></a>
                <a href="#" className="twitter"></a>
                <a href="#" className="fb"></a>
                <a href="#" className="you"></a>
             </div>
        </div>
    </div>
</div>

</section>

<section className="subscribe-block text-center">
<div className="container">

    <div className="row">
        <div className="col-md-12">
        </div>
    </div>

</div>
</section>
            {this.props.hideFooter==true?(null):(<Footer />)}
            </div>

        );
    }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    isUserLoggedInAction: isUserLoggedInAction,
    getContactHistoryAction: getContactHistoryAction,
  }, 
    dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    searchResultPage: state.searchResultPage
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(LandingPage);