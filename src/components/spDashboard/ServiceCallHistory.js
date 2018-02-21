import React, {Component} from 'react'
import {IMAGE_BASE_URL} from '../../config/config';
import {CallHistoryItem} from '../videocall/CallHistoryTable';
class ServiceCallHistory extends Component{


    renderCallDetail(CallHistoryData){
        let callDetailHtml = [];
        // let itemObj = {
        //     'id':1,
        //     'name':'Anurag',
        //     'surname':'Bajaj',
        //     'category':'Sports',
        //     'headline':'Expert in football',
        //     'length': '12',
        //     'time_from':'Wed, 20 Sep, 19:23',
        //     'duration': '5',
        //     'isSp':false,
        //     'price':'15',
        //     'category':'cat007,cat008,cat009,cat002'
        // }
        for (let i in CallHistoryData)
        {
            let itemObj = CallHistoryData[i];
            itemObj['serviceDetail'] = true;
            callDetailHtml.push(
             <CallHistoryItem itemObj={itemObj} key={itemObj.id}/ >
            );
        }
        // callDetailHtml.push(
        //     <CallHistoryItem itemObj={itemObj} key={itemObj.id}/ >
        // );
        return callDetailHtml;
    }
    calculateTotalPrice(CallHistoryData){
        let sum = 0;
        for(let i in CallHistoryData){
            let call = CallHistoryData[i]
            sum += Number(call['price']);
            console.log("SUM ",sum);
            console.log("CallPrice ",call['price']);
        }
        return sum.toFixed(2);
    }
	render(){
		let imageUrl = IMAGE_BASE_URL + "images/top-header.png";
        let totalCost = null;
        let totalCalls = null;
        let summaryCarat = "fa-angle-down";
        if(typeof this.props.callHistoryData !="undefined" 
            && Object.keys(this.props.callHistoryData) > 0
            && this.props.callHistoryData.hasOwnProperty(this.props.serviceId)){
            totalCost = this.calculateTotalPrice(this.props.callHistoryData[this.props.serviceId]);
            totalCalls = this.props.callHistoryData[this.props.serviceId].length;
        }
        if(this.props.callHistoryVisible){
            summaryCarat = "fa-angle-up";
        }
		return (
            <div>
                  <div className=" cursor-pointer color-black-1 font-16 font-bold m-t-5 m-b-25" onClick = {this.props.toggleCallHistoryContent.bind(this)}>Summary <span className="pull-right">
                        <i className={summaryCarat + " cursor-pointer font-28 fa"} aria-hidden="true" ></i></span>
                    </div>
                    {this.props.callHistoryVisible?
                    (   <div>
                        <div className="pull-left full-width m-b-25">
                            <div className="pull-left  half-width">
                                <div className="color-black-1 font-semibold line-height-normal font-28 p-tb-25">{totalCalls} calls</div>
                            </div>
                            <div className="inline-block half-width pull-left text-right">
                                <div className="color-black-1 line-height-normal">
                                    Total Earnings
                                </div>
                            <div className="color-black-1  line-height-normal font-bold font-54">
                                {totalCost}$
                            </div>
                            </div>
                    </div>{typeof this.props.callHistoryData!= "undefined" && this.renderCallDetail(this.props.callHistoryData[this.props.serviceId])}
                    </div>
                    ):(<div></div>)}
            </div>
           )
	}
}

export default ServiceCallHistory;