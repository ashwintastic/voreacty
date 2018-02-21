/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react';

class SpServiceDescription extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div>
        <div className="sp-input-group">
          <div className="txt-label">
            Describe the service you would like to offer <span className="color-red-3">*</span>
          </div>
         
            {isEdit? (
              <div key = {this.props.desc}>
              <textarea  maxLength ="300" rows="3" className="sp-form-control"
               defaultValue={this.props.desc || ''} ref={(el) => {this.serviceDesc = el}}>
            </textarea></div>
            ):(
              <div>
                <textarea maxLength ="300" rows="3" className="sp-form-control" required
                          ref={(el) => {this.serviceDesc = el}}>
            </textarea>
            </div>
              )}
          
          <div className="small-label">----300 characters max----</div>
        </div>
        <div className="sp-input-group">
          <div className="txt-label">
            Who is the service targeted at? <span className="color-red-3">*</span>
          </div>
            { isEdit? (
              <div key = {this.props.target}>
              <textarea rows="3" className="sp-form-control"
                defaultValue ={this.props.target || ''}
                ref={(el) => {this.serviceTargetedAt = el}} >
            </textarea></div>
            ):(<div>
                <textarea rows="3" className="sp-form-control"
                ref={(el) => {this.serviceTargetedAt = el}}>
                </textarea>
              </div>)
            }
          
        </div>
      </div>
    )
  }
}

export default SpServiceDescription