import React, {Component} from 'react'
//import ReactTelephoneInput  from 'react-telephone-input'
import flags from '../../assets/images/flags.png';
import ReactTelephoneInput from 'react-telephone-input/lib/withStyles'

class SpContactDetails extends Component{

  constructor(props) {
    super(props);
    this.handleFlagChange = this.handleFlagChange.bind(this);
    this.handleFlagBlur =this.handleFlagBlur.bind(this);
    this.phoneNumber = "";
    this.selectedCountry = "";
  }


  handleFlagChange(telNumber, selectedCountry) {
    this.phoneNumber = telNumber;
    this.selectedCountry=selectedCountry['iso2'];
    console.log('input changed. number: ', this.phoneNumber, 'selected country: ', this.selectedCountry);
    console.log(selectedCountry);
  }


 handleFlagBlur(telNumber, selectedCountry) {
    console.log('Focus off the ReactTelephoneInput component. Tel number entered is: ', telNumber, ' selected country is: ', selectedCountry);
    this.selectedCountry = selectedCountry['iso2'];
  }
  render() {
    let isEdit = this.props.hasOwnProperty('edit');

    if(isEdit){
      this.selectedCountry = this.props.country_code;
    }
    return (
      <div>
        <div className="sp-input-group">
          <div className="txt-label">
            Cellphone number <span className="color-red-3">*</span>
            <div className="small-label">(Enter number with country code. E.g. +14158885600)
            </div>
            {/*<div className="small-label">(We will not share this number, it will be used to alert you of incoming
              calls)
            </div>*/}
          </div>
          {isEdit?(<div key = {this.props.phoneNumber} className='spCountry'>
            <ReactTelephoneInput
                defaultCountry= {this.selectedCountry}
                 preferredCountries={['us', 'za']}
                initialValue = {this.props.phoneNumber}
                flagsImagePath={flags}
                onChange={this.handleFlagChange.bind(this)}
                onBlur={this.handleFlagBlur.bind(this)} />
          </div>):(<div className='spCountry'>
            <ReactTelephoneInput
                defaultCountry="za"
                 preferredCountries={['us', 'za']}
                flagsImagePath={flags}
                onChange={this.handleFlagChange.bind(this)}
                onBlur={this.handleFlagBlur.bind(this)} />
          </div>)}
          
        </div>
        <div className="sp-input-group">
          <div className="txt-label">
            Email <span className="color-red-3">*</span>
            <div className="small-label">(This is where you will receive important video call links )</div>
          </div>
          <div className="relative">
            <input type="email" className="sp-form-control" readOnly
                  value={this.props.email}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default SpContactDetails;