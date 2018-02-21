/**
 * Created by root on 5/9/17.
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {IMAGE_BASE_URL} from '../config/config'



class SpServicesLising extends Component {

  constructor(props) {
    super(props);
  }

 /* handleOnchange(e){
    console.log("onchange", e.target.id, e.target.value)
  }

  handleOnblur(e){
    console.log("onblur", this.changedData, e.target.value)
  }

  deleteService(){
    console.log("deleteService")
  }

  editServiceData(e){
    console.log('changed happened', e)
    this.changedData = e
  }*/
  showSelectedOption(selectedOption, changedId){
    let optionArr = [];
    if (selectedOption == 'on'){
      optionArr.push(
        <select key="on" id={changedId} onChange={this.props.handleOnchange}>
          <option value="on" selected >on</option>
          <option value="off"  >off</option>
        </select>)
    }

    if(selectedOption == 'off'){
      optionArr.push( <select key = "off" id={changedId} onChange={this.props.handleOnchange}>
        <option value="on"  >on</option>
        <option value="off" selected >off</option>
      </select>)
    }
    return (optionArr)
  }

  renderListing(){
    let service = this.props.service;
    let tableRowAarray = [];
    for (let s in service){
      if (s == 'data'){continue}

      let optionArr =this.showSelectedOption(service[s].aval_value, service[s].id);
      tableRowAarray.push(
        <tr className="odd gradeX" key ={s}>
          <td className="thumb-img" style={{'backgroundImage':
          "url("+service[s].image+")"}}>
          </td>
          <td>
            <input type="text" defaultValue ={service[s].service}
                     onChange={this.props.editServiceData.bind(this, {service: service[s].service, id:service[s].id })}
                   onBlur = {this.props.handleOnblur}

            />
          </td>

          <td>
            <input type="text" defaultValue ={service[s].headline}
                   onBlur = {this.props.handleOnblur}
                   onChange={this.props.editServiceData.bind(this, {headline: service[s].headline, id:service[s].id })}/>
          </td>

          <td className="align-center">
            {optionArr}
          </td>

          <td>
            <Link to="/edit-price" className="color-black-1 font-12"><i className="fa fa-share-square"></i> Edit Price</Link>
          </td>

          <td className="align-center">
            <Link to="/edit-service" className="color-black-1 font-12 m-lr-5"><i className="fa fa-pencil"></i>
              Edit
            </Link>
            <span style={{'cursor': 'pointer'}} onClick={this.props.deleteService} className="m-lr-5 color-black-1 font-12">
            <i className="fa fa-trash-o"></i>
            Delete</span>
          </td>
        </tr>
      );
    }
    if(tableRowAarray.length == 0){
      return <tr>{null}</tr>
    }
    return(tableRowAarray)

  }


  render() {

    return(
      <tbody>{this.renderListing()}</tbody>
    )
  }
}


export default SpServicesLising;