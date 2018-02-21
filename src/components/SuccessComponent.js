import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { GlobalErrorMessages} from '../config/messages'

 const Success = (props) => {
    // let pageTitle = (props.hasOwnProperty('pageTitle'))?props.pageTitle:'';
    // let pageContent = (props.hasOwnProperty('pageContent'))?props.pageContent:GlobalErrorMessages['NoReason'];
    // let pageButton = (props.hasOwnProperty('pageButton'))?props.pageButton:'';
    // //let systemMessage = GlobalErrorMessages['NoReason'];
    let thankyouMessage = "";
    let message = "";
    let color = "";
    if(props.hasOwnProperty('color')){
        color = props.color;
    }
    if(props.hasOwnProperty('color') && props.fromPage == "feedback"){
        thankyouMessage = "THANK YOU";
        message = GlobalErrorMessages['feedBackSuccess'];
    }
    else if(props.hasOwnProperty('color') && props.fromPage == "spRegister"){
        thankyouMessage = "THANK YOU FOR REGISTERING YOUR SERVICE";
        message = GlobalErrorMessages['serviceSaved'];
    }
    return (
        <div className="wrapper">
            <section className="section section-we-made-1">
                <div className="container p-0-xs text-center">
                    <i className={"fa fa-check-circle " + props.color  + " font-250 width-auto m-auto mobile-font-50"} aria-hidden="true"></i>
                    <div className="font-26 font-bold color-grey-1">
                        {thankyouMessage}
                    </div>
                    <div className="font-18 p-tb-15">
                        {message}
                    </div>
                    <Link to='/discover' className="color-red-3 m-tb-15 block font-18 text-dec-uline font-bold">
                        CONTINUE
                    </Link>
                </div>
            </section>
        </div>
    )
}
export default Success;