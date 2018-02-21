import React, {Component} from 'react';

class SpServicesTitleAndBackground extends Component{

  constructor(props){
    super(props)
  }

  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div>
        <div className="sp-input-group">
          <div className="txt-label">
            Title of the service <span className="color-red-3">*</span> <span className="small-label">  (Eg. Everything about herbs and organic foods)</span>
          </div>
          
          {isEdit?(
            <div key = {this.props.headline}>
            <input className="sp-form-control" required defaultValue={this.props.headline || '' }
                    ref={(el) => {
                                  this.serviceTitle = el
                                  }}  />
             </div>
            ):
            (
              <div>
                <input className="sp-form-control" ref={(el) => {
                  this.serviceTitle = el
                }} required />
               </div>
              )}
        </div>
        <div className="sp-input-group">
          <div className="txt-label">
            Your title for the service <span className="color-red-3">*</span> <span className="small-label">(Eg. Nutritionist)</span>
          </div>
          <div>
            {isEdit?( <div key = {this.props.serviceSubTitle}>
                  <input   className="sp-form-control"  required 
                  defaultValue= {this.props.serviceSubTitle || ""} 
                  ref={(el) => { this.serviceSubTitle = el}} />
                  </div>
                ):
                  (<div>
                    <input   className="sp-form-control" ref={(el) => {
                   this.serviceSubTitle = el
                  }} required/>
                  </div>
                  )
            }
        </div>
        </div>
        <div className="sp-input-group">
          <div className="txt-label">
            Your brief background in relation to the service <span className="color-red-3">*</span> <span className="small-label">  </span>
          </div>
          
            {isEdit?
              (<div key = {this.props.background}>
                <textarea maxLength ="300" className="sp-form-control" rows="3" required
                 defaultValue ={this.props.background || ""}  ref={(el) => {
                  this.sPBackground = el
                  }} >
                </textarea>
                </div>
              ):
              (<div> 
                <textarea maxLength ="300" className="sp-form-control" rows="3" ref={(el) => {
                  this.sPBackground = el
                  }} required></textarea>
              </div>)
            }
          
          <div className="small-label">----300 characters max----</div>
        </div>
      </div>
    )
  }
}

export default SpServicesTitleAndBackground;