import React, {Component} from 'react'
import {Link} from 'react-router-dom';
class ListScheduleComponent extends React.Component {
  render() {
    console.log("schedule", this.props.services)
    const services = this.props.services;
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="">Create or edit your schedule here.</div>
            </div>
            <div className="panel-body">
              <table width="100%" className="table table-hover" id="dataTables-example">
                <thead>
                <TableHeader services={services}/>
                </thead>
                <TableRow services={services}/>
              </table>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListScheduleComponent


function TableRow(props){
  let schedules = props.services;
  let schedulesArray = [];
  for(let i in schedules){
    if(i == 'data'){continue}
    schedulesArray.push(schedules[i])
  }
  if(schedulesArray.length == 0 ){return null}

  let s = schedulesArray.map((s) => {
    return  (
      <tr className="odd gradeX" key={s.id}>
        <td>
          {s.service}
        </td>
        <td>{s.schedule.mon}</td>
        <td>{s.schedule.tue}</td>
        <td>{s.schedule.wed}</td>
        <td>{s.schedule.thu}</td>
        <td>{s.schedule.fri}</td>
        <td>{s.schedule.sat}</td>
        <td>{s.schedule.sun}</td>
        <td className="align-center">
          Edit
        </td>
      </tr>
    )

  });
  return(<tbody>{s}</tbody>)

}

function TableHeader () {
  return(
    <tr>
      <th>Service Name</th>
      <th>MON</th>
      <th>TUE</th>
      <th>WEN</th>
      <th>THU</th>
      <th>FRI</th>
      <th>SAT</th>
      <th>SUN</th>
      <th className="align-center">Edit</th>
    </tr>
  )
}