import React, {Component} from 'react'

class ServiceSchedule extends Component{

    constructor(props) {
        super(props);
        let initialStateObj = {"scheduleState":{}}
        for (let key in this.props.schedule)
        {
            if(key!="edit"){
                let dayStartKey = key + "0";
                let dayEndKey = key + "1";
                let dayCheckedKey = "schedule"+key+"Checked";
                if(!this.props.schedule[key]){
                    initialStateObj['scheduleState'][dayStartKey] = "";
                    initialStateObj['scheduleState'][dayEndKey] = "";
                    initialStateObj['scheduleState'][dayCheckedKey] =false;
                }
                else{
                    initialStateObj['scheduleState'][dayStartKey] = this.props.schedule[key].split(" - ")[0];
                    initialStateObj['scheduleState'][dayEndKey] = this.props.schedule[key].split(" - ")[1];    
                    initialStateObj['scheduleState'][dayCheckedKey] =true;
                }
            }    
        }
        this.state = initialStateObj;
    }
    //"mon0","mon1","scheduleMonChecked"
    componentWillReceiveProps(nextProps){
        let currentStateObj ={};
        for (let key in nextProps.schedule){
            if(key!="edit"){
                let dayStartKey = key + "0";
                let dayEndKey = key + "1";
                let dayCheckedKey = "schedule"+key+"Checked";
                currentStateObj[dayCheckedKey] = nextProps['scheduleChecked'][dayCheckedKey]
                if(!nextProps.schedule[key]){
                    currentStateObj[dayStartKey] = "";
                    currentStateObj[dayEndKey] = "";
                    //currentStateObj[dayCheckedKey] =false;
                }
                else{
                    currentStateObj[dayStartKey] = nextProps.schedule[key].split(" - ")[0];
                    currentStateObj[dayEndKey] = nextProps.schedule[key].split(" - ")[1];    
                    //currentStateObj[dayCheckedKey] =true;
                }
            }
        }
        this.setState({scheduleState:currentStateObj});
         // this.setState(prevState => ({
         //    background: nextProps.background,
         //    price0: nextProps.pricing.amount0,
         //    price1: nextProps.pricing.amount1,
         //    price2: nextProps.pricing.amount2,
         //    price3: nextProps.pricing.amount3,
         //    price4: nextProps.pricing.amount4,
         //    price0Checked: nextProps.pricingChecked.price0Checked,
         //    price1Checked: nextProps.pricingChecked.price1Checked,
         //    price2Checked: nextProps.pricingChecked.price2Checked,
         //    price3Checked: nextProps.pricingChecked.price3Checked,
         //    price4Checked: nextProps.pricingChecked.price4Checked,
         //  }));
        //this.setState({background:nextProps.background});
    }
    renderSchedule(stateInfo)
    {
        let scheduleVal = ['mon','tue','wed','thu','fri','sat','sun'];
        let scheduleHtml = [];
        let dayKeys = {};
        for(let i = 0 ;i < scheduleVal.length;i++){
            let day = scheduleVal[i];
            let startKey = day + "0"
            let endKey = day + "1";
            let startTextIdentifier = "text-start-"+day;
            let endTextIdentifier = "text-end-"+day;
            let checkedKey = "schedule"+day+"Checked";
            let checkboxIdentifier = "checkbox-"+day;
            let displayDay = day.charAt(0).toUpperCase() + day.slice(1);
            scheduleHtml.push(
                 <div className="col-7th text-center" key = {day}>
                    <div className="text-center color-black-1">{displayDay}</div>
                        <div className="input-min-box m-auto">
                            <input type="text" className="custom-form-control" 
                            id = {startTextIdentifier}
                            onChange = {this.props.changeScheduleContent.bind(this)}
                            value = { stateInfo['scheduleState'][startKey] || "" } placeholder="14:00" />
                        </div>
                    <div className="font-12">To</div> <div className="input-min-box m-auto">
                        <input type="text" className="custom-form-control"
                            id = {endTextIdentifier}
                            onChange = {this.props.changeScheduleContent.bind(this)}
                            value = {stateInfo['scheduleState'][endKey] || ""} placeholder="14:00" />
                        <div className="checkbox">
                            <input className="styled-checkbox" id={checkboxIdentifier} type="checkbox" 
                            onChange = {this.props.toggleScheduleCheckbox.bind(this)}
                            checked = {stateInfo['scheduleState'][checkedKey]} />
                            <label htmlFor=""></label>
                        </div>
                    </div>
                </div>
                ) 
        }
        // for(let key in stateInfo){
        //     let identifier = "";
        //     identifier = key.substring(0, key.length-1);
        //     if(!dayKeys.hasOwnProperty(identifier)){
        //         dayKeys[identifier]=true;
        //         let startKey = identifier + "0";
        //         let endKey = identifier + "1";
        //         let checkedKey = "schedule"+ identifier + "Checked";
        //         let day = identifier.charAt(0).toUpperCase() + identifier.slice(1);
        //         scheduleHtml.push(
        //          <div className="col-7th text-center" key = {identifier}>
        //             <div className="text-center color-black-1">{day}</div>
        //                 <div className="input-min-box m-auto">
        //                     <input type="text" className="custom-form-control" 
        //                     value = { stateInfo[startKey] || "" } placeholder="14:00" />
        //                 </div>
        //             <div className="font-12">To</div> <div className="input-min-box m-auto">
        //                 <input type="text" className="custom-form-control"
        //                     value = {stateInfo[endKey] || ""} placeholder="14:00" />
        //                 <div className="checkbox">
        //                     <input className="styled-checkbox" id="" type="checkbox" 
        //                     checked = {propInfo[checkedKey]} />
        //                     <label htmlFor=""></label>
        //                 </div>
        //             </div>
        //         </div>
        //         )     
        //     }
        // }
        return scheduleHtml;
    }
	render(){
		return (
			<div className="p-t-30 clear-both sch-container">
            <div className="color-black-1 font-16 font-bold  m-b-20">Schedule
             <span className="font-normal font-12 f-style-italic inline-block m-l-10">
             	This helps user get an indication of when you are mostly available. plan.
              </span> 
            </div>
            <div>
                {this.renderSchedule(this.state)}
            </div>
        </div>
		)
	}
}

export default ServiceSchedule