import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import isUserLoggedInAction from '../actions/isUserLoggedInAction';
import spDeatilsAction from '../actions/sPDetailsAction'
import Login from './Login'
import RequestCall from './videocall/RequestCall';
import ServiceProviderHeaderComponent from '../components/ServiceProviderHeaderComponent'
import DeviceSupport from '../containers/DeviceSupport';
import selectedPriceByUserAction from '../actions/selectedPriceByUserAction'
import { GlobalErrorMessages} from '../config/messages'
import LocalStorage from '../helper/localStorage';
import {SERVICE_PROVIDER_LINKS} from '../config/config';

class ServiceProviderProfile extends React.Component {

  constructor(props) {
    super(props);
    this.submitRating = this.submitRating.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.checkIfUserLoggedIn = this.checkIfUserLoggedIn.bind(this);
    this.showSpecialityDetails = this.showSpecialityDetails.bind(this);

    this.requestClick = false;
    this.isPriceSet = 0;
    this.currentSelectedPrice = "";
    this.serviceId = "";
    this.state = {
      loginError: false,
      renderLoginPage: false,
      showDeviceSupport: false,
      showWithSelectPriceMessage: 0,
      priceSelected:'',
      backFromLogin:false,
    };
    this.durationFromLogin=''
  }

  checkIfUserLoggedIn(){
    this.props.isUserLoggedInAction();
    this.requestClick = true;
    if(this.isPriceSet == 0){
      this.setState({showWithSelectPriceMessage: 1})
    }
    if(this.isPriceSet == 1) {
       this.isPriceSet = 2
    }
  }

  submitRating(){

  }

  componentDidMount(){
    //TODO later it has to be this.props.params.id
      console.log("in service provider ", this.props.match.params.id)
      this.props.spDeatilsAction(this.props.match.params.id)
      if(LocalStorage.readFromLocalStorage("pricing")){
        
        let pricingString = LocalStorage.readFromLocalStorage("pricing").split('#')
        let priceVal = pricingString[0];
        this.serviceId = this.props.match.params.id;
        localStorage.removeItem("pricing");
        localStorage.removeItem("service");
        this.durationFromLogin = pricingString[1].split(" ")[0];
        
        this.setState({backFromLogin:true,priceSelected:priceVal})
    }
  }
  componentWillReceiveProps(nextProps){
    let islogin = nextProps.userLoggedInStatue.isUserLoggedIn;
    if((islogin === false || typeof islogin == 'undefined') && this.requestClick === true){
      //setTimeout(function(){LocalStorage.removeFromLocalStorage("pricing")}, 1000);
        this.setState({renderLoginPage: true})
      }

    if(nextProps.userLoggedInStatue.isUserLoggedIn === true && this.requestClick === true){
       if(this.isPriceSet == 2) {
         this.setState({showDeviceSupport: true})
       }
    }
  }


  handlePriceChange(e){
    console.log("hey m changed", e.target.value)
    let temp =[];
    temp = e.target.value.split('#');
    this.currentSelectedPrice = e.target.value;
    let priceTimingObj = new Object();
    priceTimingObj['duration'] = temp[1].split(" ")[0];
    priceTimingObj['price'] = temp[0];
    this.props.selectedPriceByUserAction(priceTimingObj)
    this.setState({showWithSelectPriceMessage: 2,priceSelected:''})
    this.isPriceSet = 1;
  }

  amountCharged(defaultPrice){
    let amountChagredarray =[];
    let timing = ['Per Minute', '5 Minute', '10 Minute' , '15 Minute' , '20 Minute', '30 Minute'];
    let index = 0;
    for(let keys in this.props.spInfo.prices){
      for(let price in this.props.spInfo.prices[keys]){
        let temp = this.props.spInfo.prices[keys];
          amountChagredarray.push(
            <li key ={price}>
              <div className="col-xs-5 col-md-5 col-sm-5 align-left p-0  " >
                <strong>
                  <input type="radio" name="optradio"
                         onChange={this.handlePriceChange} className="align-left"
                         value={temp[price]+'#'+timing[index]}/>
                  {temp[price]} USD</strong>
              </div>
              <div className="col-xs-7 col-smm-7 col-md-7 p-0" >
                <span>-</span>{timing[index]}
              </div>
            </li>
        );
        index+=1;
      }
    }
    return(
      amountChagredarray
    )
  }

  // renderSchedule(){
  //   let scheduleArray = [];
  //   for(let keys in this.props.spInfo.schedule){
  //     for(let schedule in this.props.spInfo.schedule[keys]){
  //       let timing = this.props.spInfo.schedule[keys];
  //       scheduleArray.push(
  //         <li key = {schedule}>
  //           <div className="col-xs-4"><strong>{schedule[0].toUpperCase() +  schedule.slice(1)}</strong></div>
  //           <div className="col-xs-8 align-right">{timing[schedule]}</div>
  //         </li>
  //       )
  //     }
  //   }
  //   return(
  //     scheduleArray
  //   )
  // }

  showSpecialityDetails(){
    let specialityArray = [];
    let specialities = this.props.spInfo.knowl_skills.filter(sk=>sk!='');
    specialities.map((skill,i) => {
       specialityArray.push(<li key={i}>{skill}</li>)
    })
    console.log('specialityArray',specialityArray);
    if(specialityArray.length>0){
      return(
        <div className="knowledge-skills knowledge">
        <h2>Speciality</h2>
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <ul className="nav">
              {specialityArray}
              </ul> 
            </div>
          </div>
        </div>       
      )
    }
    else{
      return null;
    }

  }

  socialMediaDetails(){
    let socialNetworkArray = [];
    for (let i =0;i< SERVICE_PROVIDER_LINKS.length;i++){
        let link = SERVICE_PROVIDER_LINKS[i].charAt(0).toLowerCase()+ SERVICE_PROVIDER_LINKS[i].slice(1);
        console.log(link);
        if(this.props.spInfo.contributor.hasOwnProperty(link)
          && this.props.spInfo.contributor[link]
          && this.props.spInfo.contributor[link]!=""){
            socialNetworkArray.push(<li key={link}>
              <a href={this.props.spInfo.contributor[link]} target="_blank">{SERVICE_PROVIDER_LINKS[i]}</a>
            </li>)
        }
    }
    console.log('socialNetworkArray',socialNetworkArray.length);
    if(socialNetworkArray.length>0){
      return(
        <div className="knowledge-skills knowledge SocialMedia">
        <h2>Website & Social Media</h2>
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <ul className="nav">
              {socialNetworkArray}
              </ul> 
            </div>
          </div>
        </div>       
      )
    }
    else{
      return null;
    }
  }



  serviceProviderPage(){
    if(this.props.spInfo.data == true) {
      return (
        <div>

          <ServiceProviderHeaderComponent
            spInfo={this.props.spInfo}
            amountCharged={this.amountCharged()}
            checkIfUserLoggedIn = {this.checkIfUserLoggedIn.bind(this)}
            handlePriceChange={this.handlePriceChange.bind(this)}
            showWithSelectPriceMessage={this.state.showWithSelectPriceMessage}/>


          <section className="single-brief">
            <div className="single-sp">
              <div className="">
                <div className="col-sm-12 col-md-5 col-lg-4 colspan">

                </div>
                <div className="col-sm-12  col-md-7 col-lg-8 colspan">

                  <div className="knowledge-skills">

                    <h2>About</h2>
                    <p>
                      {this.props.spInfo.contributor.background || ""}
                    </p>

                  </div>

                  {this.showSpecialityDetails()}

                  
                  { /*
                  <div className="knowledge-skills knowledge">

                    <h2>Accorlades</h2>

                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <ul className="nav">

                          {this.props.spInfo.accorlades.map((accrolade) => {
                            return(<li key={accrolade}>{accrolade}</li>)
                          })}

                        </ul>
                      </div>
                    </div>
                  </div>
                */ }
                 
                  {this.socialMediaDetails()}

                  <div className="knowledge-skills knowledge">
                    <h2>Languages</h2>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <ul className="nav">
                          {this.props.spInfo.languages.map((lang) => {
                            return(  <li key={lang}>{lang}</li>)
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <div className="modal fade bd-example-modal-sm" id="confirmpricing" tabIndex="-1" role="dialog"
               aria-labelledby="exampleModalLabel" aria-hidden="true" style={{top: '33%'}}>
            <div className="modal-dialog modal-sm" role="document">
              <div className="modal-content">
                <div className="modal-body align-center">

                  <div id="choice_price"></div>

                  Are you sure you want to choose this pricing plan?
                </div>
                <div className="modal-footer align-center">
                  <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-times"></i>NO
                  </button>
                  <a href="url('/chat')}}/{{$contributor->user_id}}/{{$contributor->id" className="btn btn-primary"><i
                    className="fa fa-check"></i>YES</a>
                  <input type="hidden" id="price_id"/>
                </div>
              </div>
            </div>
          </div>


        </div>
      )
    }

  }

  render(){
    if(this.state.backFromLogin){
      window.history.pushState('page2', 'Title', '/deviceSupport')
        return(<DeviceSupport serviceId={this.serviceId} priceSelected={this.state.priceSelected} duration = {this.durationFromLogin} />)
    }
    else{
      if (this.state.showDeviceSupport && this.state.showWithSelectPriceMessage > 1){
        window.history.pushState('page2', 'Title', '/deviceSupport')
        return(<DeviceSupport priceSelected={this.state.priceSelected} />)
      }

      if(this.state.renderLoginPage && this.isPriceSet > 1){
        LocalStorage.setKeyValuePair("pricing",this.currentSelectedPrice);
        LocalStorage.setKeyValuePair("service",this.props.match.params.id);
        setTimeout(function(){localStorage.removeItem("pricing")}, 60000*3);
        setTimeout(function(){localStorage.removeItem("service")}, 60000*3);
        return(
          <div>
            <Login/>
          </div>
        )
      }
      if(!this.state.renderLoginPage ||  this.state.showWithSelectPriceMessage !=0){
        return(
          <div className="wrapper">
            <section className="section section-we-made-1">
              {this.serviceProviderPage()}
            </section>
          </div>
        )
      }
  }

  }

}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    isUserLoggedInAction: isUserLoggedInAction,
    spDeatilsAction: spDeatilsAction,
    selectedPriceByUserAction: selectedPriceByUserAction
  }, dispatch)
}


function mapStateToProps (state){
  return {
    userLoggedInStatue: state.loggedInUserInfoResponse,
    spInfo: state.serviceProfileResponse
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ServiceProviderProfile);
