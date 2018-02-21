import React, {Component} from 'react'
import {IMAGE_BASE_URL} from '../../config/config';
class ServiceImageAndAvail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkbox: this.props.avail
        }
        //this.handleImageChange = this.handleImageChange.bind(this);
    }
    getImageStyle(url) {

    return { backgroundImage: 'url(' + url + ')',
              height: 147 ,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat' 
            }
   }
	render(){
        let imageUrl = IMAGE_BASE_URL +"images/users/frame000.png";//+'?v=' + Math.ceil(Math.random() * 999999)
        if(this.props.image){
		  imageUrl = IMAGE_BASE_URL+ "storage/app/public/sp/images/users/"+ this.props.image //+'?v=' + Math.ceil(Math.random() * 999999);
        }
        let imagePreview = null;
        imagePreview = (<span style = {this.getImageStyle(imageUrl)}  id="pic_url"
                           className="img-responsive pic_urls"  />);
		return (
			<div className="pull-left">
                <div className="edit-pic">{imagePreview}</div>
                <div className="choose-pic">
                    <div  className="btn-link upload-img">Change Image</div>
                        <input type="file" 
                        id="ppicture" name="picture" onChange = {this.props.updateServiceImage.bind(this)}
                        aria-describedby="picture_help" accept="image/*"/>
                </div>
                <div className="m-t-75">
                    <div className="color-black-1 font-16 font-bold text-center">Availability</div>
                    <p className="on-off-checkbox text-center m-t-10">
                        <span className="span-on">On</span> <label className="switch ">
                        <input type="checkbox" checked = {this.props.avail} 
                        onClick={this.props.toggleAvalDetail.bind(this)} />
                        <span className="slider round"></span>
                    </label><span className="span-off">Off</span>
                    </p>
                </div>
            </div>
		)
	}
}

export default ServiceImageAndAvail;