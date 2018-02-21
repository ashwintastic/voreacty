/**
 * Created by root on 28/7/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import spinnerImg from '../assets/images/sp.gif';


class LoadingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showOverlay: false};
    this.timer = null;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loadingbar > 0) {
      if(this.timer){
        return;
      }
      this.timer =  setTimeout(() => {
        this.setState({showOverlay: true})
      }, 1000);
    }

    if(nextProps.loadingbar === 0){
      if(this.timer){
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.setState({showOverlay: false});
    }
  }

  showSpinner(){
    return (
      <div className="loading-img">
        <div className="img">
          <img src={spinnerImg} alt="img"/>
          {(typeof(this.props.loadingMessage)!="undefined"
            && this.props.loadingMessage!='')
          ?(<p className="callingText">{this.props.loadingMessage}</p>):(null)}
        </div>
      </div>
    )
  }

  render() {
    if (this.state.showOverlay) {
      return (
        this.showSpinner()
      )
    }
    else {
      return(<div></div>)
    }
  }
}

function mapStateToProps (state){
  return {
    loadingbar: state.loadingBar,
    loadingMessage:state.loadingMessage
  };
}

export default (connect(mapStateToProps)(LoadingBar))
