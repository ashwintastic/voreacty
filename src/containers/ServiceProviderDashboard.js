import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import ServiceProviderServices from '../components/ServiceProviderServices';
import ServiceSummarycomponent from '../components/ServiceSummarycomponent'
import ListScheduleComponent from '../components/ListScheduleComponentt'
import ServiceTitleHeadline from '../components/spDashboard/ServiceTitle';
import ServiceDetail from '../components/spDashboard/ServiceDetail';
import ServiceCallHistory from '../components/spDashboard/ServiceCallHistory'
import fetchSPServices from '../actions/fetchSPServicesAction';
import updateSPServices from '../actions/updateSPServicesAction';
import saveServiceImageAction from '../actions/saveServiceImageAction';
import saveServiceBackgroundAction from '../actions/saveServiceBackgroundAction';
import fetchServiceHistory from '../actions/fetchServiceHistory';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationCards from "./NotificationCards";
import LoadingBar from "./LoadingBar";
class ServiceProviderDashboard extends Component {

  constructor(props) {
    super(props);
    this.state= {
      showService: true,
      showSchedule: false,
      showSummary: false
    };
    this.handleOnchange = this.handleOnchange.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.handleOnblur = this.handleOnblur.bind(this);
    this.editServiceData = this.editServiceData.bind(this);
    this.updateServiceInfo = this.updateServiceInfo.bind(this);
    this.updateServiceImage = this.updateServiceImage.bind(this);
    this.fetchServiceHistoryInfo = this.fetchServiceHistoryInfo.bind(this);
    this.updatedData = false;
    this.currentUpdatedService = "";
  }

  

  componentDidMount(){
    let userId = this.props.loggedInStatus.userId;
    
    this.props.fetchSPServices(userId);
  }
  redirectToService(currentService){
    window.location.href="/viewprofile/"+currentService;
  }
  componentWillReceiveProps(nextProps){
    if(typeof nextProps.saveServiceImageResponse.data != "undefined"  ||
      typeof nextProps.saveServiceBackgroundResponse.data != "undefined" ||
      (typeof nextProps.serviceHistoryResponse != "undefined" &&  nextProps.serviceHistoryResponse.length > 0)){

      if(typeof nextProps.saveServiceImageResponse.data != "undefined"){
        nextProps.availableServices[nextProps.saveServiceImageResponse.data.serviceId]['image'] = nextProps.saveServiceImageResponse.data.name;
      }
      if(typeof nextProps.saveServiceBackgroundResponse.data != "undefined"){
        nextProps.availableServices[nextProps.saveServiceBackgroundResponse.data.serviceId]['cover_image'] = nextProps.saveServiceBackgroundResponse.data.name;
      }
      this.setState({showService:!this.state.showService})
    }
    if(nextProps.notificationResponse.hasOwnProperty('message')){
      let currentService = this.currentUpdatedService;
      setTimeout(function()
        {
          this.redirectToService(currentService)
        }
        .bind(this), 3000);
    }

  }
  updateServiceImage(ServiceComponent,imageInfo){
    if(imageInfo.hasOwnProperty('background')){
      this.props.saveServiceBackgroundAction(imageInfo);
    }
    else{
      this.props.saveServiceImageAction(imageInfo);
    }
  }
  fetchServiceHistoryInfo(data){
    this.props.fetchServiceHistory(data,this.props.serviceHistoryResponse);
  }
  updateServiceInfo(ServiceComponent,dataInfo){
      console.log('in dashboard');
      this.currentUpdatedService=dataInfo['id'];
      dataInfo['userId']=this.props.loggedInStatus.userId;
      dataInfo['amountChecked']={
          '0':dataInfo['priceChecked']['price0Checked'],
          '1':dataInfo['priceChecked']['price1Checked'],
          '2':dataInfo['priceChecked']['price2Checked'],
          '3':dataInfo['priceChecked']['price3Checked'],
          '4':dataInfo['priceChecked']['price4Checked'],
      }
      dataInfo['scheduleChecked']={
        'mon': dataInfo['scheduleChecked']['schedulemonChecked'],
        'tue': dataInfo['scheduleChecked']['scheduletueChecked'],
        'wed': dataInfo['scheduleChecked']['schedulewedChecked'],
        'thu': dataInfo['scheduleChecked']['schedulethuChecked'],
        'fri': dataInfo['scheduleChecked']['schedulefriChecked'],
        'sat': dataInfo['scheduleChecked']['schedulesatChecked'],
        'sun': dataInfo['scheduleChecked']['schedulesunChecked'],
      }
      console.log(dataInfo);
      this.props.updateSPServices(dataInfo);
  }
  handleOnchange(e){
    console.log("onchange", e.target.id, e.target.value);
    let data = {id: e.target.id, aval_value: e.target.value };
    this.props.updateSPServices(data)
  }
  renderServices(spServices){
    let serviceComponents = [];
    let avoidKeys = {'data':true,'error':true,'id':true}
    for(let key in spServices){
      if(!avoidKeys.hasOwnProperty(key)){
        let callHistoryData={};
        if(this.props.hasOwnProperty('serviceHistoryResponse')
          && this.props.serviceHistoryResponse.hasOwnProperty(key)
          ){
          callHistoryData[key] = this.props.serviceHistoryResponse[key]
        }

        let changedImage = "";
        if(this.props.hasOwnProperty('saveServiceImageResponse') && 
          typeof this.props.saveServiceImageResponse.data != "undefined"
          && key == this.props.saveServiceImageResponse.data.serviceId)
        {
          changedImage = this.props.saveServiceImageResponse.data.name;
        }

        let changedBackgroundImage = "";
        if(this.props.hasOwnProperty('saveServiceBackgroundResponse') && 
          typeof this.props.saveServiceBackgroundResponse.data != "undefined"
          && key == this.props.saveServiceBackgroundResponse.data.serviceId)
        {
          changedBackgroundImage = this.props.saveServiceBackgroundResponse.data.name;
        }

        serviceComponents.push(<ServiceDetail key = {key}
        serviceId = {key}
        serviceContent = {spServices[key]}
        childVisible = {false}
        updateServiceInfo = {this.updateServiceInfo.bind(this)} 
        updateServiceImage = {this.updateServiceImage.bind(this)} 
        fetchServiceHistoryInfo = {this.fetchServiceHistoryInfo.bind(this)}
        callHistoryData = {callHistoryData}
        changedImage = {changedImage}
        changedBackgroundImage = {changedBackgroundImage} />)
      }
    }
    console.log(spServices);
    return serviceComponents;
  }
  handleOnblur(e){
    console.log("onblur", this.updatedData, e.target.value)
    let data = {}
    if(this.updatedData){
      console.log("inside if",  Object.keys(this.updatedData)[0]);
      let key = Object.keys(this.updatedData)[0];
      switch (key) {
        case 'service':
         data = {id: this.updatedData.id, service: e.target.value};
          break;
        case 'headline':
          data = {id: this.updatedData.id, headline: e.target.value};
          break;
      }
      console.log("data before senfing", data);
      this.props.updateSPServices(data);
      this.updatedData = false
    }
  }

  deleteService(){
    console.log("deleteService")
  }

  editServiceData(e){
    console.log('changed happened', e)
    this.updatedData = e
  }

  render() {
    return(

      <div className="wrapper">
        <LoadingBar />
          <NotificationCards />
          <section className="section section-we-made-1" >
              <div className="width-68  p-0-xs ">
                    <div className="font-bold font-16  col-md-12 col-sm-6 p-t-15"> DASHBOARD
                    </div>
                    <div className="col-md-12 col-sm-12 m-b-20">
                          <div className="">
                              <div className="col-md-8 col-sm-8  p-t-15">
                                {this.props.availableServices.hasOwnProperty('data')?
                                (this.props.availableServices.data?(
                                  <div className="row">Please click the update button after making changes to the dashboard.
                                  </div>):(<div className="row">
                                    You currently do not have any active services, check back again later
                                  </div>)):
                                (<div className="row"></div>)}
                              </div>
                              <div className="col-md-4 col-sm-4 text-right m-b-20">
                                  <div className="row">
                                    <Link  to ='/spregister' className="btn theme-btn"><i className="fa fa-plus" aria-hidden="true"></i> Add New Service
                                    </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
              
              <div className="col-md-12 col-sm-12 ">
                  {typeof this.props.availableServices!= "undefined" && this.renderServices(this.props.availableServices)}
              </div>
              </div>
          </section>
      </div>
    )

  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    saveServiceImageAction: saveServiceImageAction,
    saveServiceBackgroundAction:saveServiceBackgroundAction,
    fetchSPServices: fetchSPServices,
    updateSPServices: updateSPServices,
    fetchServiceHistory:fetchServiceHistory}, dispatch)
}


function mapStateToProps (state){
  return {
    loggedInStatus: state.loggedInUserInfoResponse,
    availableServices: state.sPDashboardDetails,
    saveServiceImageResponse: state.saveServiceImageResponse,
    saveServiceBackgroundResponse: state.saveServiceBackgroundResponse,
    serviceHistoryResponse:state.serviceHistoryResponse,
    notificationResponse:state.notification
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(ServiceProviderDashboard);
