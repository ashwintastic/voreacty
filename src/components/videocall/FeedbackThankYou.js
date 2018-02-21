import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { GlobalErrorMessages} from '../../config/messages'

 const FeedbackThankYou = (props) => {
    // let pageTitle = (props.hasOwnProperty('pageTitle'))?props.pageTitle:'';
    // let pageContent = (props.hasOwnProperty('pageContent'))?props.pageContent:GlobalErrorMessages['NoReason'];
    // let pageButton = (props.hasOwnProperty('pageButton'))?props.pageButton:'';
    // //let systemMessage = GlobalErrorMessages['NoReason'];
    return (
        <div className="">
            <section className="section section-we-made-1">
                <div className="container p-0-xs text-center">
                    <i className="fa fa-check-circle color-red-3 font-250 width-auto m-auto mobile-font-50" aria-hidden="true"></i>
                    <div className="font-26 font-bold color-grey-1">
                        THANK YOU
                    </div>
                    <div className="font-18 p-tb-15">
                        { GlobalErrorMessages.feedBackSuccess}
                    </div>
                    <Link to='/discover' className="color-red-3 m-tb-15 block font-18 text-dec-uline font-bold">
                        CONTINUE
                    </Link>
                </div>
            </section>
        </div>
    )
}
export default FeedbackThankYou;