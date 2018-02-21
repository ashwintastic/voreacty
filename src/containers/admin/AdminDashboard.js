import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AdminDashboardTable from '../../components/admin/AdminDashboardTable'
import getAdminDashboard from '../../actions/admin/getAdminDashboardAction';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //let userId = this.props.loggedInStatus.userId;
    this.props.getAdminDashboard();
  }

  render() {
   window.history.pushState('', '', '/admin');
   console.log("AdminDashboard props ",this.props.adminDashboardServicesInfo);
   console.log("AdminDashboard props ",this.props.adminDashboardServicesInfo.length);

   if(this.props.adminDashboardServicesInfo.hasOwnProperty('error') &&  this.props.adminDashboardServicesInfo.error == 'noAdminAccess')
   {
      window.location = '/discover';
   }
    

   return(
      <div className="wrapper">
        <section className="section section-we-made-1" >
          <div className="container p-0-xs bg-white">
              <div className="font-20 color-black-1 font-bold m-b-10 m-t-10">
                  Admin Dashboard
              </div>
              {this.props.adminDashboardServicesInfo.length>0?
                (<AdminDashboardTable services={this.props.adminDashboardServicesInfo}/>):(null)
              }
          </div>
        </section>
    </div>
    )
  }
}

function mapStateToProps (state){
  console.log("mystate ", state);
  return {
    adminDashboardServicesInfo: state.adminDashboardResponse,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getAdminDashboard: getAdminDashboard
  },dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AdminDashboard);