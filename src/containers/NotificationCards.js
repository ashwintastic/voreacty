import React, {Component} from 'react'
import  ReactDOM from 'react-dom';
import  NotificationSystem  from 'react-notification-system';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class NotificationCards extends Component{

  constructor(props){
    super(props)
    this._notificationSystem = null;
    this._addNotification = this._addNotification.bind(this)
  }


  _addNotification(data) {
    this._notificationSystem.addNotification({
      message: data.message,
      level: data.level,
      position: data.position
    });
  }

  componentWillReceiveProps(nextProps){
    this._addNotification(nextProps.notification)
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }

}

function mapStateToProps (state){
  return {
    notification: state.notification
  };
}

export default connect(mapStateToProps)(NotificationCards)





/*
NotificationCards.propTypes = {
  data: PropTypes.object
};*/
