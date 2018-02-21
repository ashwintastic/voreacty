import React from 'react'
import { GlobalErrorMessages} from '../config/messages'


const ShowValidationError = (props) => {
  let displayMessage = (GlobalErrorMessages.hasOwnProperty(props.errorProps))?GlobalErrorMessages[props.errorProps]:props.errorProps;
  
  //console.log("displayMessage -> "+displayMessage);
  if(typeof displayMessage === 'string'){
  	return (
     props.errorProps ? (
	    <small className="form-text text-muted" style ={{color:'red'}}>
	      <div
	          dangerouslySetInnerHTML={{ __html: displayMessage }}
	        />
	    </small>
	  ):(null)
	)
  }
  else if(typeof displayMessage === 'object'){
  	return (
     props.errorProps ? (
	    <small className="form-text text-muted" style ={{color:'red'}}>
	      {displayMessage }
	    </small>
	  ):(null)
	)
  }
  else{
  	return (null)
  }
};
export default ShowValidationError;