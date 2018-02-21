import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {IMAGE_BASE_URL} from '../config/config'
import SpServicesLising from './SpServicesListing'
class ServiceProviderServices extends React.Component {
  render() {
    return (
      <div className="clear-both">
        <div className="">
          <div className="">
            <div className="">
              <div className="m-b-10">If you have more than one service to offer you can create multiple service profiles, click the "Add New Service" below.</div>
            </div>

            <div className="">
              <table width="100%" className="table  table-hover" id="dataTables-example">
                <thead>
                <tr>
                  <th colSpan="2">Service Name</th>
                  <th>Headline</th>
                  <th>Avalibility</th>
                  <th>Package Prices</th>
                  <th className="align-center"><a href="{{url('/service-form')}}" className="color-grey-9"><i className="fa fa-plus"></i> Add New Service</a></th>

                </tr>
                </thead>

                  <SpServicesLising service= {this.props.services}
                                    handleOnchange={this.props.handleOnchange}
                                    handleOnblur={this.props.handleOnblur}
                                    editServiceData={this.props.editServiceData}
                                    deleteService={this.props.deleteService}
                  />

              </table>

            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default ServiceProviderServices