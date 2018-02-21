import React, {Component} from 'react'
import { GlobalErrorMessages} from '../../config/messages'

export const LoadingMessage = (props) => {
	return (
		<div id="loadingMsg">
            {GlobalErrorMessages[props.message]}
        </div>
	)
}