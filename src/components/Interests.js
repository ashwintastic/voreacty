import React, {Component} from 'react';
//import {INTEREST_LIST} from '../config/constants';

export const Interests =(props)=> {

	return (
   <div id="Interest_list">
   	 <ol>
     	{props.interestList.map((interest,i) => 
      		<li key = {i}> 
      			<a className='float-right delinterest' onClick={props.unselectInterest.bind(this,interest)}>
      			<i className='fa fa-close float-right'></i></a>
      			<span>{props.selectionData[interest]}</span>
      		</li>
     	)}
     </ol>
   </div>
   );
}