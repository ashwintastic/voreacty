/**
 * Created by root on 22/8/17.
 */
import React , {Component}from 'react';
import {Link} from 'react-router-dom'
import ppFrame from '../assets/images/commun/pp-frame.png';

import { GlobalErrorMessages} from '../config/messages'
import PricingComponent from '../components/PricingComponent'
import {Schedule} from './Schedule'
import {IMAGE_BASE_URL} from '../config/config'
import {VIDEO_BASE_URL} from '../config/config';
//import DefaultWallpaperImage from '../assets/images/wallpaper_default.jpg';

class ServiceProviderHeaderComponent extends Component{

  
  render()
  {
    let backgroundImagePath = '';
    let styleTag = {};
    if(this.props.spInfo.contributor.cover_image){
      backgroundImagePath = IMAGE_BASE_URL+"storage/app/public/sp/images/users/" +this.props.spInfo.contributor.cover_image;      
      styleTag = {backgroundImage: "url("+backgroundImagePath+")" }
    }
    //styleTag = {backgroundImage: "url("+backgroundImagePath+")" }
    return (

      <section className="single-member bg-profile" style={styleTag}>            

        <div className="main-container single-sp">
          <div className="pull-left top-head">

            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 col-md-push-5 col-lg-push-4 profile-details">
              <h1>{this.props.spInfo.contributor.headline }</h1>
              <h5>{this.props.spInfo.contributor.name } {this.props.spInfo.contributor.surname}</h5>
              <h3>{this.props.spInfo.contributor.service}</h3>


              <ul className="nav stars-rate-index">
                <li>
                  <div className="btn-group stars-rate" role="group" aria-label="...">
                    <button type="button" disabled="true" onClick={this.submitRating} className="btn btn-default"><i
                      className="fa fa-star" aria-hidden="true"></i></button>
                    <button type="button" disabled="true" onClick={this.submitRating} className="btn btn-default"><i
                      className="fa fa-star" aria-hidden="true"></i></button>
                    <button type="button" disabled="true" onClick={this.submitRating} className="btn btn-default"><i
                      className="fa fa-star" aria-hidden="true"></i></button>
                    <button type="button" disabled="true" onClick={this.submitRating} className="btn btn-default"><i
                      className="fa fa-star" aria-hidden="true"></i></button>
                    <button type="button" disabled="true" onClick={this.submitRating} className="btn btn-default"><i
                      className="fa fa-star" aria-hidden="true"></i></button>
                  </div>
                </li>
              </ul>

            </div>
            <div className="col-xs-12 col-md-5 col-sm-12 col-lg-4 col-md-pull-7 col-lg-pull-8">
              <div className="row thumbnail one-sp">
                <div className="video-app">
                  <a href="#" data-html="#ps_video" data-toggle="modal" data-target="#show-video1">

                    <img src={ppFrame} style={{
                      backgroundImage: "url("+IMAGE_BASE_URL+"storage/app/public/sp/images/users/" + this.props.spInfo.contributor.image + ")" ,
                      height: '173px'
                    }}/>


                    {this.props.spInfo.contributor.video && this.props.spInfo.contributor.video != ""  &&
                    (<div className="layover">
                      <div className="inner-layover">
                        <div className="icon-layover">
                          <i className="fa fa-play"></i>
                          <div className="icon-tile">Preview video</div>
                        </div>
                      </div>
                    </div>)}
                  </a>
                  <PricingComponent spInfo ={this.props.spInfo}
                                    handlePriceChange={this.props.handlePriceChange}
                                    readOnlyPrice={this.props.readOnlyPrice}
                                    checkIfUserLoggedIn={this.props.checkIfUserLoggedIn}
                                    priceSelected={this.props.priceSelected}/>

                  {this.props.spInfo.contributor.video && this.props.spInfo.contributor.video != ""  &&
                  (<div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                       id="show-video1">
                    <div className="modal-dialog modal-md" role="document">
                      <div className="modal-content">

                        <video style={{display: 'block'}} id="ps_video" controls preload="none">
                          <source src={VIDEO_BASE_URL+this.props.spInfo.contributor.video}
                                  type="video/mp4"/>
                          <source src={VIDEO_BASE_URL+this.props.spInfo.contributor.video}
                                  type="video/ogg"/>
                          Your browser does not support HTML5 video.
                        </video>
{/*
                        <h2>You do not have promo video!!</h2>

                        <p>Please go to <a href="/dashboard" className="inline-block color-black-1">dashboard</a> to upload video.</p>

*/}
                      </div>
                    </div>
                  </div>)
                  }
                  { (this.props.showWithSelectPriceMessage == 1) ?
                    (<div className="clear-both color-red-3 text-center p-t-10 font-bold">{GlobalErrorMessages['pleaseSelectPricing']}</div>)
                    : (null)
                  }
                </div>
              </div>
            </div>
            <Schedule schedule={this.props.spInfo.schedule}/>
          </div>
        </div>
      </section>
    )
  }
}

export default ServiceProviderHeaderComponent