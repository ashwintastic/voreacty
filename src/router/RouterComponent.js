/**
 * Created by root on 11/8/17.
 */
import React, { Component } from 'react';
import routes from './routes';
import NavBar from '../containers/NavBar';
import Footer from '../components/Footer';
import SessionContainer from '../containers/SessionContainer';
import NonAuthContainer from '../containers/NonAuthContainer';
import LocalStorage from '../helper/localStorage';
import queryStringReader from '../helper/urlQueryStringReader';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import CustomNavBarForVideoPage from '../components/CustomNavBarForVideoPage'

class RouterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state ={auth : false}
  }

  routesRequiredAuthentication() {
    return (
      routes.map((r) => {
        return (
          <Route path={r.path} component={r.component} key={r.path} />
        );
      })
    )
  }

  checkIfAuthenticationRequired(props) {
    let currentUrl = props.params.component;
    for(let r of routes){
      if (r.hasOwnProperty('loginFalse') && r.baseUrl == currentUrl) {
        return false;
      }
    }
    return true;
  }


  componentWillReceiveProps(nextprops) {
    let isAuthRequired = this.checkIfAuthenticationRequired(nextprops.match);
    this.setState({auth:isAuthRequired})
  }


  componentDidMount() {
    let isAuthRequired = this.checkIfAuthenticationRequired(this.props.match);
    this.setState({auth:isAuthRequired})
  }

  routesWithoutAuthentication() {
    let routesArray = [];
    routesArray.push(<NavBar key='header'/>);
    routes.map((r) => {
      if (r.hasOwnProperty('loginFalse')) {
        routesArray.push(<Route path={r.path} component={r.component} key={r.path}

        />)
      }
    });
    routesArray.push(<Footer key="footer"/>);
    return routesArray
  }


  render() {
    const url = window.location.pathname;
    //alert(url);
    if(url == '/videocall'){
      if(!this.state.auth && typeof window.location.search != "undefined"){
        let userType = queryStringReader.searchParamInQueryString(window.location.search,"user");
        if(userType === "sp"){
          let videoUserId = queryStringReader.searchParamInQueryString(window.location.search,"user_id");
          let videoServiceId = queryStringReader.searchParamInQueryString(window.location.search,"service_id");
          let videoCallId = queryStringReader.searchParamInQueryString(window.location.search,"video_call_id");
          let videoToken = queryStringReader.searchParamInQueryString(window.location.search,"token");
          LocalStorage.setKeyValuePair("videoUserId",videoUserId);
          LocalStorage.setKeyValuePair("videoServiceId",videoServiceId);
          LocalStorage.setKeyValuePair("videoCallId",videoCallId);
          LocalStorage.setKeyValuePair("videoToken",videoToken);
        }
      }
    }
    return (
      <div>
        {this.state.auth ? (
            <SessionContainer>
              {url == '/videocall' || url == '/reconnect'? (<CustomNavBarForVideoPage pathname={url}/>):(<NavBar pathname={url}/>)}
              <div className="">
                  { this.routesRequiredAuthentication()}
                  </div>

              {url == '/videocall' || url == '/reconnect'? (<Footer showOnlyCopyRight={true}/>):(<Footer/>)}


            </SessionContainer>
          )
          : (<NonAuthContainer>{this.routesWithoutAuthentication()}</NonAuthContainer>)}
      </div>
    )
  }
}

export default RouterComponent;