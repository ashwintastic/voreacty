/**
 * Created by root on 9/10/17.
 */
import React, {Component}  from 'react';
import {SERVICE_PROVIDER_LINKS} from '../../config/config'

class  ServiceProviderLinks extends Component {

  constructor(props){
    super(props);
    this.spExternalLinks = {}
  }

  handleEditLinks(linkObj){
    let linkContent = [];
    for(let i = 0 ; i < SERVICE_PROVIDER_LINKS.length;i++){
      let type = SERVICE_PROVIDER_LINKS[i];
      let content = linkObj[type.toLowerCase()];
      if(content!=""){
          linkContent.push(
              <div className="m-b-15" key={type+"_"+i}>
              <input type="text"
                  defaultValue = {content}
                  className="sp-form-control italic-placeholder"
                  placeholder={type}
                  ref={(el) => {this.spExternalLinks[type] = el}}/>
              </div>
            );
      }
      else{
        linkContent.push( 
          <div className="m-b-15" key={type}>
            <input type="text"
                className="sp-form-control italic-placeholder"
                placeholder={type}
                ref={(el) => {this.spExternalLinks[type] = el}}/>
          </div>);
      }
    }
    return linkContent;
  }

  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div className="sp-input-group m-b-0">
        <div className="txt-label">
          Please provide links where applicable
        </div>
        {(isEdit && this.props.hasOwnProperty('links') && typeof this.props.links != 'undefined' && Object.keys(this.props.links).length > 0)?
          (<div>{this.handleEditLinks(this.props.links)}</div>):
          (<div>
              {
                  SERVICE_PROVIDER_LINKS.map((l)=>{
                    return(
                      <div className="m-b-15" key={l}>
                        <input type="text"
                          className="sp-form-control italic-placeholder"
                          placeholder={l}
                          ref={(el) => {this.spExternalLinks[l] = el}}/>
                      </div>
                    )
                  })
              }
          </div>)
        }
        
      </div>
    )
  }
}

export default ServiceProviderLinks