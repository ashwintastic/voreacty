/**
 * Created by root on 24/8/17.
 */
import React from 'react'
import {SP_PRICING} from '../config/config'

class PricingComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  
  pricingBlock() {
    let disableClass = ''
    if(this.props.hasOwnProperty('readOnlyPrice') && this.props.readOnlyPrice === true){
      disableClass = ' disabled-btn'
    }
    return(
      <div>
        <div >
          <div className="row m-0">
            <p className="col-xs-12 p-0 status-line">
              <i className={"fa fa-circle switchto "+ this.props.spInfo.contributor.aval_value}
                 aria-hidden="true"></i> {(this.props.spInfo.contributor.aval_value)?
                  (this.props.spInfo.contributor.aval_value=='on'?('Available'):('Not available')):('Not available') }</p>
          </div>
        </div>
    <div className="pricing-block">
      <h2>Choose your pricing</h2>
      <ul className="nav">
        {this.amountCharged()}
      </ul>
      <p className="col-xs-12 p-0">
        <a className={'btn btn-primary theme-btn full-width'+disableClass} role="button" data-toggle="modal"
           id="request_button"
           onClick={this.props.checkIfUserLoggedIn}

           disabled={this.props.hasOwnProperty('readOnlyPrice') && this.props.readOnlyPrice === true}

        >Request</a></p>
    </div>
      </div>
    )
  }


  amountCharged(){
    let amountChagredarray =[];
    console.log(this.props.spInfo.prices);
    //let timing = ['Per Minute', '5 Minute', '10 Minute' , '15 Minute' , '20 Minute', '30 Minute'];
    let timing = ['10 Minute', '15 Minute', '20 Minute' , '30 Minute' , '45 Minute', '30 Minute'];
    //let timing = ['5 Minute', '10 Minute' , '15 Minute' , '20 Minute', '30 Minute'];
    let index = 0;
    let disabled = false;
    if(this.props.hasOwnProperty('readOnlyPrice') && this.props.readOnlyPrice === true) {
      disabled = true;
    }
    let checked=''
    //alert('Hi');
    //if(this.props.spInfo.selectedPrice.price)

    for(let keys in this.props.spInfo.prices){
      console.log("inloop")
      for(let price in this.props.spInfo.prices[keys]){
        let checked=false;
        let scheduleTime = timing[index].split(" ")[0];
        //let scheduleTime = SP_PRICING[index][3];
        console.log(SP_PRICING[index]);
        if(typeof SP_PRICING[index] !="undefined"){
            let scheduleTime = SP_PRICING[index][3];
            if((typeof this.props.spInfo.selectedPrice!='undefined' 
              && this.props.spInfo.selectedPrice.price == this.props.spInfo.prices[keys][price]
              && this.props.spInfo.selectedPrice.duration == scheduleTime
              ) || (this.props.priceSelected == this.props.spInfo.prices[keys][price])){
              
              checked=true;
            }
            
            let temp = this.props.spInfo.prices[keys];
            //let scheduleTime = SP_PRICING[index][3];
            let displayTime = SP_PRICING[index][2];
            
            if(temp[price] && temp[price] != ""){
              amountChagredarray.push(
                <li key = {'pricing_'+price+'_'+scheduleTime}>
                  <div className="col-xs-6 col-md-6 col-sm-6 align-left p-0  " >
                    <strong>
                      <input type="radio" name="optradio"
                             onChange={this.props.handlePriceChange} className="align-left"
                             value={temp[price]+'#'+scheduleTime+ '  minute'} disabled={disabled} defaultChecked={checked} />
                      {temp[price]} USD</strong>
                  </div>
                  <div className="col-xs-6 col-smm-6 col-md-6 p-0" >
                    <span>-</span>{displayTime}
                  </div>
                </li>
              );
            }
      }
        index+=1;
      }
    }
    return(
      amountChagredarray
    )
  }

  // selectedPrice(){
  //   return(
  //     <div className="color-red-3 m-t-10">
  //       <div>Price selected: {this.props.spInfo.selectedPrice.price}</div>
  //       <div>Duration: {this.props.spInfo.selectedPrice.duration}</div>
  //     </div>
  //   )
  // }


  render() {
    // if(this.props.hasOwnProperty('readOnlyPrice') && this.props.readOnlyPrice === true){
    //   return(
    //     <div>{this.selectedPrice()}</div>
    //   )
    // }
   // let amountListing =  this.amountCharged();
    return(
      (<div>{this.pricingBlock()}</div>)
      //amountListing.length > 0 ? (<div>{this.pricingBlock()}</div>): (null)
    )
  }
}


export default PricingComponent;