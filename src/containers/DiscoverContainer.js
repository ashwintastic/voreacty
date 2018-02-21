/**
 * Created by root on 7/8/17.
 */
/**
 * Created by root on 28/7/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import CardsComponent from '../components/CardsComponent'
import {Link} from 'react-router-dom';
import getAllServicesAction from '../actions/getAllServicesAction'
import saveWishlistAction from '../actions/saveWishlistAction';
import removeWishlistAction from '../actions/removeWishlistAction';
import {bindActionCreators} from 'redux';
import CarouselComponent from '../components/DiscoverCarouselComponent'
import GetQueryString from '../helper/urlQueryStringReader'
import NotificationCards from "./NotificationCards";
import LoadingBar from "./LoadingBar";

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      allServices:{},
      showAllServicesButton: true,
      showAllservices: true
    };
    this.showAllServices = this.showAllServices.bind(this);
    this.saveToWishlist=this.saveToWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
  }

  checkIfParamsExist(){
    let params = GetQueryString.getParameterByName('q');
    if(params == null){
      false
    }
    return true
  }

  saveToWishlist(data){
    this.props.saveWishlistAction(data);
  }
  removeFromWishlist(data){
   this.props.removeWishlistAction(data); 
  }

  componentDidMount(){
    if(typeof this.props.fromLogin == "undefined"){
        localStorage.removeItem("pricing");
        localStorage.removeItem("service");
        localStorage.removeItem("videoCallId");
        localStorage.removeItem("videoServiceId");
        localStorage.removeItem("videoUserId");
        localStorage.removeItem("videoToken");
    }
    let params = GetQueryString.getParameterByName('aval');
    if (params == null) {
      this.props.getAllServicesAction();
    }
    else{
      params={};
      params['userId']=this.props.loggedInStatus.userId;
      params['aval']='on';
      params['cat']='wishlist';
      this.props.getAllServicesAction(params)
    }

  }

  urlHandler() {
    if(!this.checkIfParamsExist()){
      window.history.pushState(' ', ' ', '/discover');
    }
  }

  showAllServices(){
    this.setState({showAllservices: true, showAllServicesButton: false})
  }

  filterOnModuloBasis(countOfServices, allservices){
    let currentWidth = window.screen.width;
    let remainder = 0;
    return allservices;
    if(currentWidth >=  250 && currentWidth <= 500){
      return allservices
    }

    if(currentWidth >= 501 && currentWidth <= 991){
      remainder = countOfServices % 3;

      for(let i in allservices){
        if(remainder == 0){return allservices}
        delete allservices[i];
        remainder -= 1;
      }
    }
    if(currentWidth >= 992){
      remainder = countOfServices % 5;
      for(let i in allservices){
        if(remainder == 0){return allservices}
        delete allservices[i];
        remainder -= 1;
      }
    }
  }

  adJustWithWidthDisplay(allServicesToShow){
    return allServicesToShow;

    if(this.props.allServices.hasOwnProperty('allsevicesWithoutCat'))
    {
      return this.props.allServices.allsevicesWithoutCat
    }
    return this.props.allServices;
    let discoverMoreServices = this.props.allServices.allsevicesWithCat.all;
    let countOfServices = Object.keys(this.props.allServices.allsevicesWithCat.all).length;
    return this.filterOnModuloBasis(countOfServices, discoverMoreServices);
  }

  sendServicesToCardComponent(){
    let allServices = this.props.allServices.allsevicesWithoutCat;
    let countOfServices = 0;
    if(typeof allServices != 'undefined') {
       countOfServices = Object.keys(this.props.allServices.allsevicesWithoutCat).length;
    }
    let params = GetQueryString.getParameterByName('q');
    if(params == 'all' ){
      return this.filterOnModuloBasis(countOfServices, allServices);
    }
    return allServices;
  }

  render() {
    let params = GetQueryString.getParameterByName('catname');
    const {allServices, showAllServicesButton, showAllservices} = this.state;
    this.urlHandler();
    let servicesToShowAsCard = this.sendServicesToCardComponent();
    

    let allServicesToShow = {};
    if(this.props.allServices.hasOwnProperty('allsevicesWithoutCat'))
    {
      allServicesToShow = this.props.allServices.allsevicesWithoutCat
    }
    if(this.props.saveWishlistResponse.hasOwnProperty('serviceId')){ 
      allServicesToShow[this.props.saveWishlistResponse.serviceId]['wishListAdd']=true;
      allServicesToShow[this.props.saveWishlistResponse.serviceId]['wishlist_id']=this.props.saveWishlistResponse.id;
      delete allServicesToShow[this.props.saveWishlistResponse.serviceId]['wishListRemove'];
      this.saveToWishlist({'clear':true})
      
    }
    if(this.props.deleteWishlistResponse.hasOwnProperty('serviceId')){
        allServicesToShow[this.props.deleteWishlistResponse.serviceId]['wishListRemove']=true;
        delete allServicesToShow[this.props.deleteWishlistResponse.serviceId]['wishListAdd'];
        this.removeFromWishlist({'clear':true});
    }
    return (
       
        <div className="search-auto">
          <LoadingBar />
          <NotificationCards />
          <div className="search-result">
      <div>
        {params == null ? <CarouselComponent allservices={this.props.allServices.allsevicesWithCat}/>:(
            <div className="search-auto">
                <div className="search-result">
                    <div className="">
                        <div className="container">
                            <section className="section section-we-made-1">
                                <div className="contributor-block">
                                    <CardsComponent params ={params} service = {servicesToShowAsCard} removeClassName={true}  removesectionClassName={true}/>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

          )
        }
        {showAllservices ? (<CardsComponent service = {this.adJustWithWidthDisplay(allServicesToShow)}
                                            
                                            params= {"Favourites"}
                                            saveToWishlist = {this.saveToWishlist.bind(this)}
                                            removeFromWishlist = {this.removeFromWishlist.bind(this)}
                                            userId = {this.props.loggedInStatus.userId}
                                            notification = {this.props.notificationResponse} />):(null)}
      </div>
      </div>
      </div>
     
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllServicesAction: getAllServicesAction,
    saveWishlistAction:saveWishlistAction,
    removeWishlistAction:removeWishlistAction
  }, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    allServices: state.allServices,
    saveWishlistResponse:state.saveWishlistResponse,
    deleteWishlistResponse:state.deleteWishlistResponse,
    notificationResponse:state.notification
  };
}

export default (connect(mapStateToProps, matchDispatchToProps)(Discover))
