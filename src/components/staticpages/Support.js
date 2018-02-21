import React, {Component} from 'react';
import ContentPage from '../ContentPage'
import { GlobalErrorMessages} from '../../config/messages'
const Support = (props) => {
    return (
            <ContentPage pageTitle="Support" pageContent={GlobalErrorMessages['supportMessage']}  />

        )
}

export default Support;