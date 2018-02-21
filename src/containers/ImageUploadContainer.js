import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IMAGE_BASE_URL} from '../config/config';
import saveProfileImageAction from '../actions/saveProfileImageAction';

let previewImageStyle =
  {
    background: '#ccc',
    height: 128,
    width: 121
  };
let selectedImageStyle = {
  height:218,
  width:128
}
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultImageUrl = IMAGE_BASE_URL+"images/users/frame000.png"+'?v=' + Math.ceil(Math.random() * 999999);
  }


  componentDidMount() {
    let userInfo ={};
    userInfo['userId']=this.props.userId;
    userInfo['save']=false;
    if(!this.props.hasOwnProperty('spRegistration')) {
      this.props.saveProfileImageAction(userInfo);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  getImageStyle(url) {
    return { backgroundImage: 'url(' + url + ')',
              height: 127 ,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat' 
            }
}
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file);

    let userInfo ={};
    userInfo['userId']=this.props.userId;
    userInfo['file']=file;
    userInfo['save']=true;

    if(!this.props.hasOwnProperty('spRegistration')) {
      this.props.saveProfileImageAction(userInfo);
    }
  }

  componentWillReceiveProps(nextProps){

   if(nextProps.hasOwnProperty('spRegistration')
        && nextProps.hasOwnProperty('serviceImage')
        && typeof nextProps.serviceImage != "undefined"
      ){
        if(nextProps.serviceImage){

          this.setState({imagePreviewUrl:IMAGE_BASE_URL+"storage/app/public/sp/images/users/" + nextProps.serviceImage  + '?v=' + Math.ceil(Math.random() * 999999)})
        }
        else{
          this.setState({imagePreviewUrl:IMAGE_BASE_URL+"storage/app/public/sp/images/users/"+ nextProps.saveProfileImageResponse.picName +'?v=' + Math.ceil(Math.random() * 999999)});
        }
    }
    else if(typeof nextProps.saveProfileImageResponse != "undefined" && typeof nextProps.saveProfileImageResponse.picCheck != "undefined"){
      if(nextProps.saveProfileImageResponse.picCheck){
        if(nextProps.saveProfileImageResponse.picName ==="" ){
          this.setState({imagePreviewUrl:IMAGE_BASE_URL+"images/users/frame000.png"+'?v=' + Math.ceil(Math.random() * 999999)});
        }
        else{
          this.setState({imagePreviewUrl:IMAGE_BASE_URL+"storage/app/public/sp/images/users/"+ nextProps.saveProfileImageResponse.picName +'?v=' + Math.ceil(Math.random() * 999999)});
        }
      }
    }
  }

  render() {
    let isSpRegistrationForm = this.props.hasOwnProperty('spRegistration');
    let imgRequired = '';
    imgRequired=  isSpRegistrationForm ? 'required': '';
    let imageSelectedUrl = this.state.imagePreviewUrl;
    let imagePreview = null;
    if (imageSelectedUrl){
      imagePreview = (<span style = {this.getImageStyle(imageSelectedUrl)}  id="pic_url"
                           className="img-responsive pic_urls"  />);
    }
    else{
      imagePreview = (<span style = {this.getImageStyle(this.defaultImageUrl)} id="pic_url"
                           className="picture_path pic_urls"  />);
    }

    return (
      <div id="editpic" className="form-group">
              <div className="edit-profile">
                <div className={isSpRegistrationForm?"sp-image":"col-sm-4"}>
                    <div className="edit-pic">{imagePreview}</div>
                    <div className="choose-pic">
                    {isSpRegistrationForm?(<div  className="theme-btn btn upload-img">Choose File</div>): (<div  className="btn-link upload-img">Change Image</div>)}
                        <input type="file" onChange={this.handleImageChange.bind(this)}
                        id="ppicture" name="picture"
                        aria-describedby="picture_help" accept="image/*"/>

                    </div>
                </div>

                {/*<div className="form-group element full-width">
                <div className="choose-pic">
                  {isSpRegistrationForm?(<div  className="theme-btn btn upload-img">Choose File</div>): (<i className="fa fa-camera" id="update_pphoto" title="Select Picture"></i>)}
                  <input type="file" onChange={this.handleImageChange.bind(this)}
                           id="ppicture" name="picture"
                            aria-describedby="picture_help" accept="image/*"/>

                </div>
              </div>*/}
        </div>
      </div>
    )
  }

}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveProfileImageAction: saveProfileImageAction
    }, dispatch)
}


function mapStateToProps (state){
  return {
    saveProfileImageResponse: state.saveProfileImageResponse
  }
}

export default connect(mapStateToProps, matchDispatchToProps,  null, {withRef: true})(ImageUpload);