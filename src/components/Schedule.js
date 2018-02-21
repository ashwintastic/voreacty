import React, {Component} from 'react';

export const Schedule = (props) => {
    let scheduleProps = props.schedule
    let scheduleArray = [];
    for(let keys in scheduleProps){
      for(let schedule in scheduleProps[keys]){
        let timing = scheduleProps[keys];
        if( timing[schedule] && timing[schedule]!=""){
          scheduleArray.push(
            <li key = {schedule}>
              <div className="col-xs-4"><strong>{schedule[0].toUpperCase() +  schedule.slice(1)}</strong></div>
              <div className="col-xs-8 align-right">{timing[schedule]}</div>
            </li>
          )
      }
      }
    }
    return (
      <div className="col-xs-12 col-md-5 col-lg-4 col-sm-12 hidden-xs">
        <div className="shedule">
        <h2>Schedule</h2>
        <ul className="nav">
          {scheduleArray}
        </ul>
        </div>
      </div>      
    )
}