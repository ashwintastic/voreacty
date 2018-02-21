/**
 * Created by root on 11/10/17.
 */
import React, {Component} from 'react'
import ImageUploadContainer from '../../containers/ImageUploadContainer'
class SpImageUpload extends Component{

  constructor(props){
    super(props)
  }



  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    let imagePreview = this.props.image || "";
    return (
      <div>
        <div className="dir-seperator"></div>
        <div className="sp-input-group">
          <div className="txt-label">Upload service profile image <span className="small-label">(Image should not exceed 1mb)</span> <span className="color-red-3">*</span></div>

          
          <div className="inline-block">
            <ImageUploadContainer ref="imageUploadContainer"
             spRegistration={true} serviceImage = {imagePreview} />
          </div>
        </div>
        <div className="dir-seperator"></div>
        <div className="sp-input-group"></div>
      </div>
    )
  }
}
export default SpImageUpload;

