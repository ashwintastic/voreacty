import React, {Component} from 'react'
import ServiceTitleHeadline from './ServiceTitle';
import ServiceImageAndAvail from './ServiceImageAndAvail';
import ServiceBackgroundAndPricing from './ServiceBackgroundAndPricing';
import ServiceSchedule from './ServiceSchedule';
import ServiceCallHistory from './ServiceCallHistory'
import {IMAGE_BASE_URL} from '../../config/config';
//import DefaultWallpaperImage from '../../assets/images/wallpaper_default.jpg';
//import updateSPServices from '../actions/updateSPServicesAction';
class ServiceDetail extends React.Component{
	constructor(props) {
    	super(props);
    	this.toggleServiceDetail = this.toggleServiceDetail.bind(this);
    	this.toggleAvalVal = this.toggleAvalVal.bind(this);
    	this.toggleContentChange = this.toggleContentChange.bind(this);
    	this.handleContentChange = this.handleContentChange.bind(this);
    	this.togglePriceCheckbox = this.togglePriceCheckbox.bind(this);
    	this.changePriceContent = this.changePriceContent.bind(this);
    	this.toggleScheduleCheckbox = this.toggleScheduleCheckbox.bind(this);
    	this.changeScheduleContent = this.changeScheduleContent.bind(this);
    	this.updateServiceInfo = this.updateServiceInfo.bind(this);
    	this.updateServiceImage = this.updateServiceImage.bind(this);
    	this.toggleCallHistoryContent = this.toggleCallHistoryContent.bind(this);
    	this.fetchServiceHistoryInfo = this.fetchServiceHistoryInfo.bind(this);
    	this.avalVal = false;
    	this.updateServiceCover = this.updateServiceCover.bind(this);
    	if(typeof props.serviceContent.aval_value != "null" && props.serviceContent.aval_value == "on"){
    		this.avalVal = true;
    	}
    	this.priceChecked = {
    		'price0Checked': (props.serviceContent.price.amount0)?true:false,
    		'price1Checked': (props.serviceContent.price.amount1)?true:false,
    		'price2Checked': (props.serviceContent.price.amount2)?true:false,
    		'price3Checked': (props.serviceContent.price.amount3)?true:false,
    		'price4Checked': (props.serviceContent.price.amount4)?true:false,
    	}
    	this.scheduleChecked = {
    		'schedulemonChecked': (props.serviceContent.schedule.mon)?true:false,
    		'scheduletueChecked': (props.serviceContent.schedule.tue)?true:false,
    		'schedulewedChecked': (props.serviceContent.schedule.wed)?true:false,
    		'schedulethuChecked': (props.serviceContent.schedule.thu)?true:false,
    		'schedulefriChecked': (props.serviceContent.schedule.fri)?true:false,
    		'schedulesatChecked': (props.serviceContent.schedule.sat)?true:false,
    		'schedulesunChecked': (props.serviceContent.schedule.sun)?true:false,
    	}
    	this.state = {
      		serviceId:props.serviceId,
      		headline: props.serviceContent.headline,
      		headlineDisabled:true,
      		background:props.serviceContent.background,
      		backgroundDisabled:true,
      		image:props.serviceContent.image,
      		coverImage:props.serviceContent.cover_image,
      		pricing:props.serviceContent.price,
      		pricingChecked:this.priceChecked,
      		schedule:props.serviceContent.schedule,
      		scheduleChecked: this.scheduleChecked,
      		avalVal:this.avalVal,
      		childVisible:props.childVisible,
      		callHistoryVisible:false,
      		callHistoryData:props.callHistoryData
    	};
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.changedImage != ""){
			this.setState({image: nextProps.changedImage})
		}
		if(nextProps.changedBackgroundImage != ""){
			this.setState({coverImage: nextProps.changedBackgroundImage})
		}
	}
	fetchServiceHistoryInfo(data){
		this.props.fetchServiceHistoryInfo(data);
	}
	toggleCallHistoryContent(){
		if(!this.state.callHistoryVisible.hasOwnProperty(this.state.serviceId)){
			this.fetchServiceHistoryInfo({serviceId:this.state.serviceId})
		}
		this.setState({callHistoryVisible: !this.state.callHistoryVisible});
	}
	updateServiceCover(e){
		e.preventDefault();
		let reader = new FileReader();
    	let file = e.target.files[0];
    	reader.readAsDataURL(file);
    	let imageInfo ={};
    	imageInfo['serviceId']=this.state.serviceId;
    	imageInfo['file']=file;
    	imageInfo['background']=true;
    	console.log(imageInfo);
		this.props.updateServiceImage(this,imageInfo)
	}
	updateServiceImage(e){
		e.preventDefault();
    	let reader = new FileReader();
    	let file = e.target.files[0];

    	
      	
    	reader.readAsDataURL(file);

    	let imageInfo ={};
    	imageInfo['serviceId']=this.state.serviceId;
    	imageInfo['file']=file;
    	console.log(imageInfo);
		this.props.updateServiceImage(this,imageInfo)
	}
	updateServiceInfo(){
		let dataToSend = {};
		dataToSend['id'] = this.state.serviceId;
		dataToSend['headline'] = this.state.headline;
		dataToSend['background'] = this.state.background;
		dataToSend['avalVal'] = this.state.avalVal;
		dataToSend['priceChecked'] = this.state.pricingChecked;
		dataToSend['pricing'] = this.state.pricing;
		dataToSend['schedule'] = this.state.schedule;
		dataToSend['scheduleChecked'] = this.state.scheduleChecked;
		console.log('update Data');
		this.props.updateServiceInfo(this,dataToSend);
		//console.log(dataToSend);
	}
	toggleScheduleCheckbox(event){
		let checkboxId = "schedule"+ event.target.id.split("-")[1] + "Checked";
		let scheduleChecked = this.state.scheduleChecked;
		scheduleChecked[checkboxId] = !scheduleChecked[checkboxId];
		this.setState(prevState => ({
            		scheduleChecked : scheduleChecked,
          			}));
	}
	changeScheduleContent(event){
		let dayType = event.target.id.split("-")[1];
		let day = event.target.id.split("-")[2];
		let schedule = this.state.schedule;
		switch(dayType){
			case 'start':
				if(schedule[day]){
					let endTime = schedule[day].split(" - ")[1]
					schedule[day]= event.target.value + " - " + endTime;
				}
				else{
					let endTime = "";
					schedule[day]=event.target.value + " - " + endTime;
				}
				break;
			case 'end':
				if(schedule[day]){
					let startTime = schedule[day].split(" - ")[0]
					schedule[day] = startTime + " - " + event.target.value;	
				}
				else{
					let startTime = "";
					schedule[day] = startTime + " - " + event.target.value;
				}
				
				break;
		}
		this.setState(prevState => ({
            		schedule : schedule,
          			})); 
	}
	togglePriceCheckbox(event){
		let checkboxId = "price" + event.target.id.split("-")[1] + "Checked";
		let priceChecked = this.state.pricingChecked;
		priceChecked[checkboxId] = !priceChecked[checkboxId];
		this.setState(prevState => ({
            		pricingChecked : priceChecked,
          			}));		
		
		}
	changePriceContent(event){
		let textBoxId = "amount"+ event.target.id.split("-")[1];
		let priceInfo = this.state.pricing;
		priceInfo[textBoxId] = event.target.value;
		this.setState(prevState => ({
            		pricing : priceInfo,
          			}));	
	}
	toggleServiceDetail(event){
		
		 if(event.target.id != 'headline1'){
		 	if(event.target.id =='title1' && event.target.disabled)
		 	{
		 		this.setState({childVisible: !this.state.childVisible});
		 	}
		 	else if(event.target.id !="title1"){
		 		this.setState({childVisible: !this.state.childVisible});
		 	}
		 }
	}
	toggleAvalVal(){
		this.setState({avalVal: !this.state.avalVal});	
	}
	toggleContentChange(event){
		switch(event.target.id){
			case 'headline0':
				this.setState({headlineDisabled: !this.state.headlineDisabled});				
				break;
			case 'headline1':
				this.setState({headlineDisabled: !this.state.headlineDisabled});				
				break;
			case 'background0':
				this.setState({backgroundDisabled: !this.state.backgroundDisabled});				
				break;
			default:
        		break;
		}
	}
	handleContentChange(event){
		//event.stopPropagation();
		//event.nativeEvent.stopImmediatePropagation();
		switch(event.target.id){
			case 'title0':
				this.setState({headline: event.target.value});				
				break;
			case 'title1':
				this.setState({headline: event.target.value});				
				break;
			case 'background1':
				this.setState({background: event.target.value});				
				break;
			default:
        		break;
		}
	}
	render(){
		// let coverImageUrl = DefaultWallpaperImage;
  //       if(this.state.coverImage){
		//   coverImageUrl = IMAGE_BASE_URL+ "storage/app/public/sp/images/users/"+ this.state.coverImage; //+'?v=' + Math.ceil(Math.random() * 999999);
  //       }

        let coverImageUrl = "";
		let styleTag = {};
        if(this.state.coverImage){
		  coverImageUrl = IMAGE_BASE_URL+ "storage/app/public/sp/images/users/"+ this.state.coverImage; //+'?v=' + Math.ceil(Math.random() * 999999);
		  styleTag = {backgroundImage: "url("+coverImageUrl+")" }
        }

		return (
			<div>
				
				{this.state.childVisible?
				(
					<div>
						<div className="service-dbd-tile bg-white">
			                  <ServiceTitleHeadline headline={this.state.headline}
			                  isHeadline = {false} image={this.state.image}
			                  toggleServiceDetail = {this.toggleServiceDetail.bind(this)} 
			                  toggleContentChange = {this.toggleContentChange.bind(this)}
			                  headlineDisabled = {this.state.headlineDisabled}
			                  handleContentChange = {this.handleContentChange.bind(this)} />
                            <div className="bg-profile cover-pic" style={styleTag}>
                                {(coverImageUrl)?(<img src={coverImageUrl} />):(null)}
                                <div className="change-pic">
                                    <a href="#" className="">Add Wallpaper</a>
                                    <input type='file' className="" onChange = {this.updateServiceCover.bind(this)} />
                                </div>
                            </div>
							<div className="service-dbd-body p-t-25 clear-both p-lr-25">
								<div>
									<ServiceImageAndAvail image={this.state.image} 
									avail = {this.state.avalVal} 
									toggleAvalDetail = {this.toggleAvalVal.bind(this)}
									updateServiceImage = {this.updateServiceImage.bind(this)} />
									<ServiceBackgroundAndPricing  
									 background={this.state.background} 
									 pricing = {this.state.pricing}
									 pricingChecked = {this.state.pricingChecked}
									 toggleContentChange = {this.toggleContentChange.bind(this)}
									 backgroundDisabled = {this.state.backgroundDisabled}
									 handleContentChange = {this.handleContentChange.bind(this)}
									 togglePriceCheckbox = {this.togglePriceCheckbox.bind(this)} 
									 changePriceContent = {this.changePriceContent.bind(this)}   />
									<ServiceSchedule schedule = {this.state.schedule} 
									  scheduleChecked = {this.state.scheduleChecked}
									  toggleScheduleCheckbox = {this.toggleScheduleCheckbox.bind(this)} 
									 changeScheduleContent = {this.changeScheduleContent.bind(this)} />
									<div className="pull-right m-tb-20">
					    				<button className="btn theme-btn p-lr-25" onClick = {this.updateServiceInfo.bind(this)}>Update</button>
									</div>
								</div>
							</div>
						</div>
						<div className="call-info-container p-lr-25 p-t-20">
			                    <ServiceCallHistory
			                    callHistoryVisible = {this.state.callHistoryVisible} 
			                    toggleCallHistoryContent = {this.toggleCallHistoryContent.bind(this)}
			                    callHistoryData = {this.props.callHistoryData}
			                    serviceId = {this.state.serviceId} />
			              </div>
			        </div>
			       ):
				(<ServiceTitleHeadline headline={this.state.headline}
					isHeadline = {true} image={this.state.image}
				headlineDisabled = {this.state.headlineDisabled}
				 toggleServiceDetail = {this.toggleServiceDetail.bind(this)}
				 toggleContentChange = {this.toggleContentChange.bind(this)}
				 handleContentChange = {this.handleContentChange.bind(this)} />
				)
	          }
             </div>	
		)
	}
}

export default ServiceDetail;