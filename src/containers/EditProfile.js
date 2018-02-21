import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import getProfileAction from '../actions/getProfileAction';
import saveProfileAction from '../actions/saveProfileAction';
import {Interests} from '../components/Interests'
import {COUNRTY_LIST,SERVICES_CATAGORY_SELECTION} from '../config/constants';
import ImageUploadComponent from '../containers/ImageUploadContainer';
import { GlobalErrorMessages} from '../config/messages'
import NotificationCards from "./NotificationCards";
let containerStyle = {
  width: '100%'
};
let singleMemberStyle = {
  height:'284px'
};
let sectionStyle = {
  height: '65%',
  paddingTop: '145px'
};
class EditProfile extends React.Component{

  constructor(props) {
    super(props);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.unselectInterest = this.unselectInterest.bind(this);
    this.selectedInterest = this.selectedInterest.bind(this);
    this.saveInterestSelection = this.saveInterestSelection.bind(this);
    this.firstTimeLoad =true;
    this.errorMessage = {'profileDoesNotExist':"Incorrect User",
      'profileNotSaved':"Error in saving profile"
    }
    this.createdAt = "";
    this.state = {
      name:'',
      surname: '',
      email: '',
      country:'AA',
      selectedInterest:'cat000',
      interestList:[],
      errors:0,
      errorInfo:'',
      isSaveClicked:false
    };
  }

  redirectToHome(){
    window.location.href="/";
  }
  componentDidMount() {
    this.props.getProfileAction({"userId":this.props.match.params.id});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notificationResponse.hasOwnProperty('message')){
      setTimeout(function()
        {
          this.redirectToHome()
        }
        .bind(this), 2000);
    }
    else{
      if(this.state.isSaveClicked){

        if(typeof nextProps.saveProfileResponse.data != 'undefined' && nextProps.saveProfileResponse.data){
          this.setState(prevState => ({
            name : nextProps.saveProfileResponse.name,
            surname : nextProps.saveProfileResponse.surname,
            country:nextProps.saveProfileResponse.country,
            interestList:nextProps.saveProfileResponse.interestList,
            errors:-1
          }));
        }
        else if(typeof nextProps.saveProfileResponse.error != 'undefined' && nextProps.saveProfileResponse.error)
        {
          this.setState(prevState => ({
            errors:1,
            errorInfo: nextProps.saveProfileResponse.reason
          }));
        }
        this.setState({isSaveClicked:false});
      }
      else
      {
        if(this.firstTimeLoad && typeof nextProps.profileDataResponse.data != 'undefined' && nextProps.profileDataResponse.data){
          //debugger;
          this.firstTimeLoad =false;
          if(nextProps.saveProfileResponse.data != 'undefined' && nextProps.saveProfileResponse.data){
            this.setState(prevState => ({
              name : nextProps.saveProfileResponse.name,
              surname : nextProps.saveProfileResponse.surname,
              email : nextProps.profileDataResponse.email,
              country:nextProps.saveProfileResponse.country,
              interestList:nextProps.saveProfileResponse.interestList
            }));

          }
          else{
            this.createdAt = nextProps.profileDataResponse.createdAt;
            let defaultCountry = this.country = (nextProps.profileDataResponse.country!=null)?
                                                (nextProps.profileDataResponse.country):
                                                (this.state.country);
            
            this.setState(prevState => ({
              name : nextProps.profileDataResponse.name,
              surname : nextProps.profileDataResponse.surname,
              email : nextProps.profileDataResponse.email,
              country:defaultCountry,
              interestList:nextProps.profileDataResponse.interestList
            }));
        }

        }
      }
    }
  }

  createSelectItems(optionData){
    let items = [];
    if(optionData.hasOwnProperty('cat001')){
      items.push(<option key={'cat000'} value={'cat000'}>{'Select an Interest'}</option>)
    }
    Object.keys(optionData).map((t,i) => items.push(<option key={i} value={t}>{optionData[t]}</option>))
    return items;
  }

  unselectInterest(interestValue){
    let currentInterestList = this.state.interestList;
    let index = this.state.interestList.indexOf(interestValue);
    if(index > -1){
      currentInterestList.splice(index,1);
      this.setState({interestList: currentInterestList});
    }

  }
  selectedInterest(interestValue){
    if(interestValue!=="cat000"){
      let currentInterestList = this.state.interestList;
      let index = this.state.interestList.indexOf(interestValue);
      if(index === -1){
        currentInterestList.push(interestValue);
        this.setState({interestList: currentInterestList});
      }
    }
  }
  saveInterestSelection()
  {
    this.selectedInterest(this.state.selectedInterest);
  }
  handleInputChange(event) {
    const target = event.target;
    switch (target.id) {
      case "name":
        this.setState({name:target.value});
        break;
      case "surname":
        this.setState({surname:target.value});
        break;
      case "country":
        this.setState({country:target.value});
        break;
      case "interest":
        this.setState({selectedInterest:target.value});
        break;
      default:
        break;
    }
  }

  handleProfileSave(event){
    event.preventDefault();
    this.setState({isSaveClicked:true});
    let userInfo = {
      userId:this.props.match.params.id,
      name: this.state.name,
      surname: this.state.surname,
      country: this.state.country,
      interestInfo:this.state.interestList
    };
    this.props.saveProfileAction(userInfo);
  }



  render(){
    return (
			<div className="wrapper">
          <NotificationCards />
				<div className="container">
					<section className="section section-we-made-1">
						<div className="container">
							<div className="row user-info-block  edit-member">
								<div className="col-sm-offset-3 col-sm-5 col-sm-offset-3 p-l-15">
									<fieldset className="bg-white">
                    <form className="form-horizontal" id="Register_form" onSubmit={this.handleProfileSave.bind(this)}>
										<div className="font-20 color-black-1 font-bold m-b-20">User Profile</div>
                        
										    <div className="media user-details">
                                                <div className="media-left">
                                                    <ImageUploadComponent userId ={this.props.match.params.id} />
                                                </div>
                                                <div className="media-body media-top">
                                                    <div className="user-details-wrapper m-0">
                                                      <div className="">
                                                        {/*<i className="fa fa-user-o icon-input" aria-hidden="true"></i>*/}
                                                        <input type="text" className="form-control"  id = "name"  placeholder="Name*"
                                                             value={this.state.name} required  onChange={this.handleInputChange.bind(this)} />
                                                      </div>

                                                      <div className="m-t-10">
                                                        {/*<i className="fa fa-user-o icon-input" aria-hidden="true"></i>*/}
                                                        <input type="text" className="form-control"  placeholder="Surname*" id = "surname"
                                                               value={this.state.surname} required  onChange={this.handleInputChange.bind(this)} />
                                                      </div>
                                                        <span className="user-email p-0">{this.state.email}</span>
                                                        <span className="user-joined"><span>Joined: </span>{this.createdAt}</span>
                                                    </div>
                                                </div>
                                            </div>
										<div >

											<div className="col-md-12 m-t-30">
												
                                                {/*<div>
														<div className="form-group relative width-49 pull-left m-r-2-perc">
															<i className="fa fa-user-o icon-input" aria-hidden="true"></i>
															<input type="text" className="form-control"  id = "name"  placeholder="Name*"
																		 value={this.state.name} required  onChange={this.handleInputChange.bind(this)} />
														</div>

														<div className="form-group relative width-49 pull-left">
															<i className="fa fa-user-o icon-input" aria-hidden="true"></i>
															<input type="text" className="form-control"  placeholder="Surname*" id = "surname"
																		 value={this.state.surname} required  onChange={this.handleInputChange.bind(this)} />
														</div>

														<div className="form-group relative clear-both">
															<i className="fa fa-envelope icon-input" aria-hidden="true"></i>
															<input type="email" className="form-control" id="email" readOnly
																		 placeholder="Email*"  value={this.state.email}   />
														</div>
													</div>*/}


													<div className="form-group">
														<select className="form-control" id="country" name="country" onChange={this.handleInputChange.bind(this)}  value={this.state.country}  aria-describedby="countryHelp" placeholder="Country">
                                                            {this.createSelectItems(COUNRTY_LIST)}
														</select>
													</div>

                                                    <div className="form-group">
                                                        <input type="tel" className="form-control" id="phone" name="phone" placeholder="Cellphone" />
                                                    </div>

													<div className="form-group">
														<div className="input-group">
															<select className="form-control" id="interest" name="quali" aria-describedby="quali_help"  onChange={this.handleInputChange.bind(this)} value={this.state.selectedInterest} placeholder="Interest">
                                                                {this.createSelectItems(SERVICES_CATAGORY_SELECTION)}
															</select>
															<span className="input-group-btn"><input className="btn btn-default theme-btn" type="button" id="addinterest" value="Add" onClick = {this.saveInterestSelection.bind(this) }/></span>
														</div>
                                                        <Interests interestList = {this.state.interestList}
                                                        unselectInterest = {this.unselectInterest.bind(this)}
                                                        selectionData = {SERVICES_CATAGORY_SELECTION} />
													</div>
													<div className="form-group">
														<input type="submit" className="btn btn-primary full-width theme-btn" value ="save"/>

													</div>
												
                        
											</div>
										</div>
                     {this.state.errors==-1 ? (
                      <div >

                        <div className="col-lg-12">
                          <div className="font-14 color-red-1 font-bold m-b-14">{GlobalErrorMessages['profileSaved']}</div>
                        </div>
                      </div>
                    ):(this.state.errors==1?(
                        <div >

                          <div className="col-lg-12">
                            <div className="font-14 color-red-1 font-bold m-b-14">{this.errorMessage[this.state.errorInfo]}</div>
                          </div>
                        </div>
                      ):(<div></div>))}
                    </form>
									</fieldset>
                 
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {getProfileAction: getProfileAction,
      saveProfileAction: saveProfileAction
    }, dispatch)
}


function mapStateToProps (state){
  return {
    profileDataResponse: state.profileDataResponse,
    saveProfileResponse: state.saveProfileResponse,
    notificationResponse:state.notification
  }
}




export default connect(mapStateToProps, matchDispatchToProps)(EditProfile);