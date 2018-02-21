import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png';
class CustomNavBarContainer extends Component{

  render() {
    const {videoCallMessage} = this.props;
    return (
      <div className="custom-header-video navbar video-call-container">
        <nav className="navbar-default " role="navigation">
          <div className="container">
            <div className="navbar-header full-width">
              <div className="navbar-brand cursor-pointer p-l-0 col-lg-6 col-sm-6 col-md-6  " >
                <img src={logo} width="110"/></div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="sp-info">
                        <div className="color-grey-3 font-16 font-bold line-height-normal text-overflow-ellipsis sp-name ">{videoCallMessage.display_other_identity}</div>
                        <div className="color-grey-2 font-12 line-height-normal  text-overflow-ellipsis sp-service">{videoCallMessage.room_name}</div>
                    </div>
                </div>



            </div>

          </div>
        </nav>

      </div>
    )
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch)
}


function mapStateToProps (state){
  return {
    videoCallMessage: state.videoCallMessageResponse
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CustomNavBarContainer);
