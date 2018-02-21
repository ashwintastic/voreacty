import React, {Component} from 'react'

function ServiceSummary(props){
  let service = props.services;
  let summaryArray = [];
  console.log("summary", service)
  for(let s in service){
    if(s == 'data'){continue}
    summaryArray.push(
      <div key ={"summary"+s}>
        <h3>{service[s].service}</h3>
        <p>{service[s].description}</p>
        </div>
    )
  }
  return (<div>{summaryArray}</div>)
}











export default ServiceSummary