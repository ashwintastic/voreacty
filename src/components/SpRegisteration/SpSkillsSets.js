import React, {Component} from 'react';
import {SP_SKILL_SETS} from '../../config/config';
class SpSkillsSets extends Component{
  constructor(props){
    super(props);
    this.skillSet = {};
  }

  spSkillSets(){
    let skillSetArray = [];
    for (let i=0; i< SP_SKILL_SETS; i++){
      let index = i+1;
      skillSetArray.push( <div className="m-b-20" key={"skill"+i}>
        <input type="text" className="sp-form-control"
               placeholder={"Speciality "+ index}
               ref={(el) => {this.skillSet[i] = el}}
        />
      </div>)
    }
    return(<div>{skillSetArray}</div>)
  }

  spSkillSetsEdit(knowledge){
    let previousKnowledge = knowledge.split(",").filter(skill => skill!='');
    console.log("previousKnowledge.length",previousKnowledge.length);
    let skillSetArray = [];
    for (let i = 0; i < previousKnowledge.length;i++){
      skillSetArray.push( <div className="m-b-20" key={previousKnowledge[i]+"_"+i}>
        <input type="text" className="sp-form-control" 
          defaultValue = {previousKnowledge[i]}
          ref={(el) => {this.skillSet[i] = el}} />
      </div>)
      console.log(previousKnowledge[i]);
    }
    console.log("SP_SKILL_SETS",SP_SKILL_SETS);
    for (let i=previousKnowledge.length; i< SP_SKILL_SETS; i++){
      skillSetArray.push( <div className="m-b-20" key={"skill"+i}>
        <input type="text" className="sp-form-control"
               placeholder={"Speciality "+(i+1)}
               ref={(el) => {this.skillSet[i] = el}} />
      </div>)
    }
    return(<div>{skillSetArray}</div>)
  }


  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    if(isEdit && this.props.hasOwnProperty('knowledge') && this.props.knowledge){
      return (<div className="sp-input-group">
                <div className="txt-label">
                  Speciality <span className="small-label">  (Eg. 1. Integrated Circuits, 2. Transistors)</span>
                </div>
                {this.spSkillSetsEdit(this.props.knowledge)}
              </div>)
    }
    else
    {
        return (
          <div className="sp-input-group">
              <div className="txt-label">
                  Speciality <span className="small-label">  (Eg. 1. Integrated Circuits, 2. Transistors)</span>
              </div>
              {this.spSkillSets()}
          </div>
        )
    }
  }
}

export default SpSkillsSets;