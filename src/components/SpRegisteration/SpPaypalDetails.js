/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react'

class SpPricing extends Component{
  render() {
    let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div className="sp-input-group m-t-12 m-b-0 m-t-0-mobile">
        <div className="txt-label">
          Receive payment <span className="color-red-3">*</span>
          <div className="small-label">(Enter your paypal email address where you will receive payment).<span
            className="color-red-3">Learn more</span></div>
        </div>
        <div>
        {(isEdit)?
          (<div key = {this.props.paypalEmail}>
                <input type="email" required
                  defaultValue = { this.props.paypalEmail || "" }
                  className="sp-form-control"
                  ref={(el) => {
                     this.payPalEmail = el
                  }} />
            </div>):
          (<div>
            <input type="email" required
                className="sp-form-control"
                ref={(el) => {
                   this.payPalEmail = el
                 }} />
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default SpPricing