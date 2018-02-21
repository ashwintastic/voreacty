import React, {Component} from 'react'
import {IMAGE_BASE_URL} from '../../config/config';
class ServiceTitleHeadline extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		textVal: this.props.headline
    	}
    }
     componentWillReceiveProps(nextProps){
        this.setState({textVal:nextProps.headline});
    }
	render(){
		let image = IMAGE_BASE_URL +"images/users/frame000.png" ;//+'?v=' + Math.ceil(Math.random() * 999999)
		if(this.props.image){
			image = IMAGE_BASE_URL + "storage/app/public/sp/images/users/"+ this.props.image; // +'?v=' + Math.ceil(Math.random() * 999999);
		}
		return (
					<div>
	            	{this.props.isHeadline?
	            		(	<div className="">
		            			<div className="service-dbd-tile bg-white m-b-20">
		            			<div className="service-dbd-header p-lr-15 cursor-pointer" onClick={this.props.toggleServiceDetail.bind(this)}>
	            				<div className="media p-tb-15" id="mediaWrap">
		                				<div className="media-left" id="mediaLeft">
		                    				<div className="service-dbd-profile-pic " id="imageSnap" style={{"backgroundImage": "url("+ image +")", "width": "50px", "height": "50px"}}>
		                    				</div>
		                				</div>
			                			<div className="media-body media-middle" id="mediaMiddle">
			                				<div className="">
		                						<div className="col-sm-9">
		                							<input id ="title0" type="text" className = "cursor-pointer vb-inputText spText"  disabled={true} 
			                    			value={this.state.textVal} />
		                						</div>
		                						<div className="col-sm-3">
		                							<span className="inline-block pull-right">
			                    			 				<i className="font-20 m-t-5 fa fa-angle-down cursor-pointer" aria-hidden="true"></i>
			                    			 		</span>
		                						</div>
			                				</div>
			                			</div>
	            				</div>
	        					</div>
	        					</div>
            				</div>
            			):
	            		( <div className="service-dbd-header p-tb-10  cursor-pointer" id="topDiv" onClick={this.props.toggleServiceDetail.bind(this)}>
        					<div className="col-sm-10">
        						<input type="text" id ="title1" className = "cursor-pointer vb-inputText spText"  disabled={this.props.headlineDisabled} 
        						value={this.state.textVal}
        					onChange = {this.props.handleContentChange.bind(this)} />
        						<span id="headline1" className="cursor-pointer color-blue-2 p-r-5 font-12 font-semibold align-top" 
	        					 onClick={this.props.toggleContentChange.bind(this)} >Edit</span>
        					</div>
        					<div className="col-sm-2" >
	        					<span className="inline-block pull-right p-t-5">	        					 
	        					 <i id= "caratUp" className="font-20 fa fa-angle-up cursor-pointer" aria-hidden="true"></i></span>
	        				</div>
    					</div>
    					)
	            	}
	            	</div>
		)
	}
}

export default ServiceTitleHeadline;