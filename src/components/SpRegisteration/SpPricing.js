/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react'
import {SP_PRICING} from '../../config/config'

class SpPricing extends Component{

  constructor(props){
    super(props);
    this.pricing = {};
    this.pricing['unit'] = 'USD'
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.pricing['unit'] = e.target.value;
  }
  handleEditPricing(priceObj){
    let pricingContent = [];
    for(let i = 0 ; i< SP_PRICING.length ;i++){
      let key =SP_PRICING[i][0];
      let timing = Object.keys(SP_PRICING[i][1])[0]
      if(priceObj && priceObj.hasOwnProperty(key) && priceObj[key]!=""){
        let val = priceObj[key]
        let combineKey = timing+'_'+val;
        pricingContent.push(
          <div className="inline-block width-49 color-black-2 width-100-mobile"
                      key={combineKey}>
                    <input type="number" 
                      step="0.01"
                      min="-9999999999.99"
                      max="9999999999.99" required defaultValue = {val}
                      className="sp-form-control sp-min text-right"
                      ref={(el) => {
                           this.pricing[key] = el
                        }}
                      placeholder="0" />
                  <label className="txt-label m-tb-15-lr-10">for {timing}</label>
          </div>
        );
      }
      else{
        pricingContent.push(
             <div className="inline-block width-49 color-black-2 width-100-mobile">
                    <input type="number" step="0.01"
                          min="-9999999999.99"
                          max="9999999999.99" 
                          required 
                          className="sp-form-control sp-min text-right"
                          ref={(el) => {
                           this.pricing[key] = el
                         }}
                         placeholder="0" />
                  <label className="txt-label m-tb-15-lr-10">for {timing}</label>
          </div>
        );

      }
    }

  return pricingContent;
  }
  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div className="sp-input-group">
        <div className="txt-label">
          Set pricing <div className="small-label">(Set pricing plans for your sessions)</div>
        </div>

        {(isEdit && this.props.hasOwnProperty('pricing') && typeof this.props.pricing != 'undefined' && Object.keys(this.props.pricing).length > 0)
         ?(
          <div className="">
           {this.handleEditPricing(this.props.pricing)}
            <div className="inline-block width-49 color-black-2 width-100-mobile">
                <div className="width-25">
                    <select className="sp-form-control font-13 font-bold"
                        onChange={this.handleChange}>
                      <option value="USD">USD</option>
                   </select>
                </div>
           </div>

          </div>
         
          ):(
          <div className="">
            {
              SP_PRICING.map((p) => {
                let timing = Object.keys(p[1])[0];
                let timingvalue = p[timing];
                return (
                  <div className="inline-block width-49 color-black-2 width-100-mobile"
                      key={"pricing"+p[0]}>
                  <input type="number"
                        step="0.01"
                        min="-9999999999.99"
                        max="9999999999.99"
                        required
                        className="sp-form-control sp-min text-right"
                        ref={(el) => {
                           this.pricing[p[0]] = el
                         }}
                         placeholder="0"/>
                  <label className="txt-label m-tb-15-lr-10">for {timing}</label>
                </div>
              )
            })
          }
          <div className="inline-block width-49 color-black-2 width-100-mobile">
              <div className="width-25">
                  <select className="sp-form-control font-13 font-bold"
                        onChange={this.handleChange}>
                      <option value="USD">USD</option>
                  </select>
              </div>
          </div>
      </div>)}
      </div>
    )
  }
}

export default SpPricing