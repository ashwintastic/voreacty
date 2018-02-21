import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CardsComponent from '../components/CardsComponent'
import saveWishlistAction from '../actions/saveWishlistAction';
import removeWishlistAction from '../actions/removeWishlistAction';
import getAllSearchedDataAction from '../actions/getAllSearchedDataAction';
import GetQueryString from '../helper/urlQueryStringReader'
import NoDataFound from '../components/NodataFound'
import NotificationCards from "./NotificationCards";
import LoadingBar from "./LoadingBar";
class GlobalSearchPage extends Component{

   constructor(props){
    super(props);
    this.saveToWishlist=this.saveToWishlist.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
  }
  
  parseUrlandGetsearchKeys(){
    let queryParams = this.props.location.search;
    let decodedUrl = decodeURIComponent(queryParams);
    // alert(decodedUrl.substr(1));
    // alert(GetQueryString.getParameterByName('keyword'));
    // alert(GetQueryString.getParameterByName('serviceId'));
    // alert(GetQueryString.getParameterByName('userId'));
    let keyword = GetQueryString.getParameterByName('keyword');
    let serviceId = GetQueryString.getParameterByName('serviceId');
    let userId = GetQueryString.getParameterByName('userId');
    // let queryParamArray = decodedUrl.split("&&");
    // let keyword = queryParamArray[0].split("=")[1];
    // let serviceId = null;
    // if(queryParamArray.length > 1) {
    //   serviceId = queryParamArray[1].split("=")[1];
    // }
    // let userId = "";
    // if(queryParamArray.length==3){
    //   userId = queryParamArray[2].split("=")[1];
    // }
    let data = {
      keyword: keyword,
      serviceId: serviceId,
      userId: userId
    };
    return data
  }
  saveToWishlist(data){
    this.props.saveWishlistAction(data);
  }
  removeFromWishlist(data){
   this.props.removeWishlistAction(data); 
  }
  componentDidMount(){
    let data =this.parseUrlandGetsearchKeys();
    this.props.getAllSearchedDataAction(data)
  }

  componentWillReceiveProps(nextprops){
    let data =this.parseUrlandGetsearchKeys();
    //this.props.getAllSearchedDataAction(data)
  }

  checkPropsStatus(){
    const searchData = this.props.searchedData;
    if(!searchData.hasOwnProperty('data')){
      return -1
    }
    if(searchData.hasOwnProperty('data') && searchData.data){
      return 1
    }
    if(searchData.hasOwnProperty('data') && !searchData.data){
      return 0
    }
  }

  render() {
    const searchData = this.checkPropsStatus();
    console.log("searchdata", searchData)
    let params = GetQueryString.getParameterByName('keyword');
    let serviceData = this.props.searchedData;
    if(this.props.saveWishlistResponse.hasOwnProperty('serviceId')){
      serviceData[this.props.saveWishlistResponse.serviceId]['wishListAdd']=true;
      serviceData[this.props.saveWishlistResponse.serviceId]['wishlist_id']=this.props.saveWishlistResponse.id;
      delete serviceData[this.props.saveWishlistResponse.serviceId]['wishListRemove'];
      this.saveToWishlist({'clear':true});
    }
    if(this.props.deleteWishlistResponse.hasOwnProperty('serviceId')){
      serviceData[this.props.deleteWishlistResponse.serviceId]['wishListRemove']=true;
      delete serviceData[this.props.deleteWishlistResponse.serviceId]['wishListAdd'];
      this.removeFromWishlist({'clear':true});
    }
    return (
      <div className="search-auto">
          <LoadingBar />
          <NotificationCards />
        <div className="search-result">
          {searchData == -1 && (null) }
          {searchData  == 1  && (<CardsComponent
            params={params} service={serviceData}
            saveToWishlist = {this.saveToWishlist.bind(this)}
            removeFromWishlist = {this.removeFromWishlist.bind(this)}
            userId = {this.props.loggedInStatus.userId} />)}
          {searchData == 0 && (<NoDataFound msg="nosearchresultfound" keyword={params}/>)}
        </div>
      </div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllSearchedDataAction: getAllSearchedDataAction,
    saveWishlistAction:saveWishlistAction,
    removeWishlistAction:removeWishlistAction}, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    searchedData : state.searchedData,
    saveWishlistResponse:state.saveWishlistResponse,
    deleteWishlistResponse:state.deleteWishlistResponse
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(GlobalSearchPage);
