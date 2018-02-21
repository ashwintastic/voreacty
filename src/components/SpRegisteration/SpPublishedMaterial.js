import React, {Component} from 'react';
import {SERVICE_PROVIDER_PUBLISHED_CATAGORY} from '../../config/config'

class SpPublishedMaterial extends Component{
  constructor(props){
    super(props)
    this.publishedCat = {}
  }

  handleEditPublication(publicationObj){
    let publicationContent  =[];
    for(let i =0 ;i < SERVICE_PROVIDER_PUBLISHED_CATAGORY.length;i++){
      let type= SERVICE_PROVIDER_PUBLISHED_CATAGORY[i];
      let content = "";
      if(type!="Education"){
        if(Object.keys(publicationObj[type.toLowerCase()]).length > 0){
          content = publicationObj[type.toLowerCase()][0]['link'];
        }
      }
      //let content = publicationObj[type.toLowerCase()][0]['link'];
      if(content!=""){
        publicationContent.push(
          <div className="m-b-10" key={type}>
              <label className="block">{type}</label>
                <div key = {content + "_"+type}>
                <input type="text" className="sp-form-control"
                defaultValue = {content}
                  ref={(el) => {this.publishedCat[type] = el}} />
                </div>
           </div>
        );
      }
      else if(type!="Education"){
        publicationContent.push(
            <div className="m-b-10" key={type}>
              <label className="block">{type}</label>
                <input type="text" className="sp-form-control"
                  ref={(el) => {this.publishedCat[type] = el}} />
           </div>
        );

      }
    }
    return publicationContent;
  }
  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div className="sp-input-group">
        <div className="txt-label">
          If there’s published material related to you offering this service, please provide a link next to the appropriate field.
        </div>
        {(isEdit && this.props.hasOwnProperty('publication') 
          && typeof this.props.publication != 'undefined'
           && Object.keys(this.props.publication).length > 0)?
          (<div>{this.handleEditPublication(this.props.publication)}</div>):
          (<div>{SERVICE_PROVIDER_PUBLISHED_CATAGORY.map((cat)=>{
                  return(
                          <div className="m-b-10" key={cat}>
                            <label className="block">{cat}</label>
                              <input type="text" className="sp-form-control"
                                ref={(el) => {this.publishedCat[cat] = el}} />
                           </div>
                        )
                })}
          </div>) 
        }
      </div>
    )
  }
}

export default SpPublishedMaterial;