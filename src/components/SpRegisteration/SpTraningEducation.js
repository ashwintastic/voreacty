/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react';
import {SERVICEPROVIDER_QUALIFICATIONS} from '../../config/config'
class SpTraningEducation extends Component{

  constructor(props){
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
    this.state ={
      educationVal: ""
    }
    this.checkedValue=""
  }

  handleChecked(e){
    this.checkedValue = e;
    console.log("radio checked", this.checkedValue)
    this.setState({educationVal: e});
  }

  componentWillReceiveProps(nextProps){
    let isEdit = nextProps.hasOwnProperty('edit');
    if(isEdit && nextProps.hasOwnProperty("publication") 
      && typeof nextProps.publication != 'undefined' 
      && Object.keys(nextProps.publication).length > 0
      && Object.keys(nextProps.publication['education']).length > 0 )
    {
      this.checkedValue = nextProps.publication['education'][0]['name'];
      this.setState(prevState => ({
          educationVal : nextProps.publication['education'][0]['name']
        }));
    }

  }

  handleEducationOptions(publicationObj,educationName){
    let educationContent =[];
    // let educationName = publicationObj['education'][0]['name'];
    // let educationlink = publicationObj['education'][0]['link'];
    
    for(let i = 0;i < SERVICEPROVIDER_QUALIFICATIONS.length;i++){
        let edu = SERVICEPROVIDER_QUALIFICATIONS[i];
        if(typeof edu == 'string'){
          educationContent.push(
            <div key={edu+ "_"+ i}>
                <input type="radio" required
                  name="optRadioEducation"
                  checked = {edu == this.state.educationVal}
                  className="align-left"
                  onChange={this.handleChecked.bind(this, edu)} />
                  { edu }
            </div>
          );
        }
        else{
              educationContent.push(
                <div key={edu[0]+"_"+i}>
                  <input type="radio"
                    name="optRadioEducation"
                    className="align-left" required
                    checked = {edu[0] == this.state.educationVal}
                    onChange={this.handleChecked.bind(this, edu[0])}/>
                      {edu[0]} 
                      <span className="small-label">({edu[1]}) </span>
                </div>
            );
        }
    }
    return educationContent
  }

  render() {
    let isEdit = this.props.hasOwnProperty('edit');

    return (
      <div className="sp-input-group">
        <div className="txt-label">
          What kind of training or education do you have in this field? <span className="color-red-3">*</span>
        </div>
        {(isEdit && this.props.hasOwnProperty('publication')
            && typeof this.props.publication != 'undefined' 
            && Object.keys(this.props.publication).length > 0)?
            (<div>{this.handleEducationOptions(this.props.publication,this.state.educationVal)}</div>):
              (   <div>
                    {SERVICEPROVIDER_QUALIFICATIONS.map((e)=>{
                          if (typeof e == 'string') {
                              return (
                                      <div key={e}>
                                        <input type="radio" required
                                          name="optRadioEducation"
                                          className="align-left"
                                          onChange={this.handleChecked.bind(this, e)} />
                                          { e }
                                    </div>
                                    )
                          }
                          else{
                              return(
                                <div key={e}>
                                  <input type="radio" name="optRadioEducation" className="align-left" required
                                    onChange={this.handleChecked.bind(this, e[0])}/>
                                      {e[0]}
                                       <span className="small-label">({e[1]}) </span>
                                </div>
                              )
                          }
                    })}
                  </div>
              )
        }
        {(isEdit && this.props.hasOwnProperty('publication')
          && typeof this.props.publication != 'undefined'
          && Object.keys(this.props.publication).length > 0
          && Object.keys(this.props.publication['education']).length > 0
          )?(
          <div className="m-t-20" key = {this.props.publication['education'][0]['link']}>
            <textarea rows="3" className="sp-form-control"
            defaultValue = {this.props.publication['education'][0]['link'] || ""}
            ref={(el) => {this.othersEducationDetails = el}}>
            </textarea>
          </div>
          ):(
              <div className="m-t-20">
                <textarea rows="3" className="sp-form-control"
                      ref={(el) => {this.othersEducationDetails = el}}>
                </textarea>
              </div>
            )}
      </div>
    )
  }
}

export default SpTraningEducation;