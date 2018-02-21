import React, {Component} from 'react'
import {SP_PRICING} from '../../config/config'
class ServiceBackgroundAndPricing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            background: this.props.background,
            price0: this.props.pricing.amount0,
            price1: this.props.pricing.amount1,
            price2: this.props.pricing.amount2,
            price3: this.props.pricing.amount3,
            price4: this.props.pricing.amount4,
            price0Checked: (this.props.pricing.amount0)?true:false,
            price1Checked: (this.props.pricing.amount1)?true:false,
            price2Checked: (this.props.pricing.amount2)?true:false,
            price3Checked: (this.props.pricing.amount3)?true:false,
            price4Checked: (this.props.pricing.amount4)?true:false,
        }
    }
    componentWillReceiveProps(nextProps){
         this.setState(prevState => ({
            background: nextProps.background,
            price0: nextProps.pricing.amount0,
            price1: nextProps.pricing.amount1,
            price2: nextProps.pricing.amount2,
            price3: nextProps.pricing.amount3,
            price4: nextProps.pricing.amount4,
            price0Checked: nextProps.pricingChecked.price0Checked,
            price1Checked: nextProps.pricingChecked.price1Checked,
            price2Checked: nextProps.pricingChecked.price2Checked,
            price3Checked: nextProps.pricingChecked.price3Checked,
            price4Checked: nextProps.pricingChecked.price4Checked,
          }));
        //this.setState({background:nextProps.background});
    }
    renderPricing(stateInfo){
        let pricingHtml = [];
        let priceVal = ['price0','price1','price2','price3','price4'];
        
        for(let i = 0; i< priceVal.length;i++){
            let priceKey = priceVal[i];
            let priceCheckedKey = priceVal[i] + "Checked";
            let checkboxIdentifier = "checkbox-"+i;
            let textIdentifier = "text-"+i
            pricingHtml.push(
                <div className="width-20 pull-left" key = {priceKey}>
                    <div className="checkbox input-min-box pull-right m-r-5">                                
                        <label htmlFor ={checkboxIdentifier}><span className="font-12 font-bold color-black-1">{Object.keys(SP_PRICING[i][1])[0]}</span></label>
                        <input className="styled-checkbox" id={checkboxIdentifier} type="checkbox" 
                        checked = {stateInfo[priceCheckedKey]} onChange = {this.props.togglePriceCheckbox.bind(this)}  />
                    </div>
                    <div className="input-min-box">
                        <input id = {textIdentifier} type="text" className="custom-form-control"
                        value = {(stateInfo[priceCheckedKey] && stateInfo[priceKey]) || ""} placeholder="-"
                        onChange = {this.props.changePriceContent.bind(this)}  />
                    </div>
                </div>
            );
        }
        return pricingHtml;
    }
	render(){
		return (
			<div className="pull-left p-l-40 width-78">
                <div className="color-black-1 font-16 font-bold">My background
                 <span id = "background0" className="cursor-pointer align-xs-top m-t-5 color-blue-2 font-semibold font-12 inline-block m-l-15"
                 onClick={this.props.toggleContentChange.bind(this)} >Edit</span>
                </div>
                <textarea id="background1"  rows="6" className="spBack" 
                onChange = {this.props.handleContentChange.bind(this)}

                disabled={this.props.backgroundDisabled} value={this.state.background || ""} />
                   
                <div className="">
                    <div className="color-black-1 font-16 font-bold m-t-20">Set Pricing</div>
                    <div className="font-normal font-12 f-style-italic">Set pricing plans for your
                        sessions in USD, Click on the check boxes to enable or disable a billing
                        plan.
                    </div>
                    <div className="m-b-20 pull-left full-width set-pricing">
                        {this.renderPricing(this.state)}
                    </div>
                </div>
            </div>
		)
	}
}

export default ServiceBackgroundAndPricing;