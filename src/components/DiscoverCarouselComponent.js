/**
 * Created by root on 22/8/17.
 */
import React from 'react';
import Slider from  'react-slick';
import {Link} from 'react-router-dom'
import {IMAGE_BASE_URL} from '../config/config'
import CardsComponent from './CardsComponent'
import addIcon from '../assets/images/web-parts/addlist.png';
import ppFrame from '../assets/images/commun/pp-frame.png';
class CarouselComponent extends React.Component {

  constructor(props){
    super(props);
  }

  categorizeServices(data){
    let service = [];
    // TODO :: better approach get array from server side this Loop will be discarded
    for(let i in data){
      let temp = data[i]
      service.push(temp)
    }
    return this.generateSliderForCatagories(service)
  }


  // TODO:: Use CardComponent to show carousel

  generateSliderForCatagories(services){
    const ellipsisStyle={
      display: "block",
      display: "-webkit-box",
      maxWidth: "400px",
      height: "45px",
      margin: "0 auto",
      lineHeight: "1.4",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow:" ellipsis"
    };
    return services.map((service) => {
      return (
        <div className="" key = {service.id}>
          <section className="">
            <div className="contributor-block">
              <div className="">
                <Link to ={"viewprofile/"+service.id }>
                  <div className="helper-box" id="service_13">
                    <div className="thumbnail direc">
                      <img src={ppFrame} alt=""
                           style={{backgroundImage: "url("+IMAGE_BASE_URL+"storage/app/public/sp/images/users/" + service.image + ")"}}/>

                      <div className="caption">
                        <p className="m-b-5"><Link to ={"viewprofile/"+service.id } className="" style={ellipsisStyle} title={service.headline} >{service.headline}</Link></p>
                        <h5 className="panel-title"><Link to ={"viewprofile/"+service.id } >{service.name} {service.surname}</Link></h5>
                        <h5 className="prof-title">{service.service}</h5>
                        <div>
                          <ul className="act-btn">

                            <li><i className={"fa fa-circle switchto "+ service.aval_value} aria-hidden="true"></i><span>{service.calls} Calls</span></li>

                            <li className="text-right dropup">

                              <a href="#"  data-toggle="modal" data-target="#myModal" className=""><img src={addIcon} className="vbb-icon" /></a>

                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )
    })
  }

  renderForcarousel(){
    let allServicesForSlider = new Object();
    let allServices = this.props.allservices;
    for(let key in allServices){
      if(key == 'all' || key=='displayOrder'){continue}
      allServicesForSlider[key] = this.categorizeServices(allServices[key])
    }
    return allServicesForSlider
  }



  showCarousel(list, order){
    var settings ={
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 5,

      responsive:[
        { breakpoint: 2000, settings: { slidesToShow: 5} },
        { breakpoint: 1200, settings: { slidesToShow: 5} },
        { breakpoint: 980, settings: { slidesToShow: 3 , slidesToScroll: 3} },
        { breakpoint: 680, settings: { slidesToShow: 2, slidesToScroll: 2} },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1} }

      ]
    };
    let s = [];
    //for(let i in list){
      for(let j in order) {
        s.push(<div className="container-carousel" key={j}>
          <div className="font-18 color-black-1 font-bold m-t-25 p-l-10">{order[j]}</div>

          <Slider {...settings}>
            {list[order[j]]}
          </Slider>
        </div>)
      }
    //}
    return(s)
  }


  render() {
    let order =[]
    if(typeof this.props.allservices != 'undefined') {
      order = this.props.allservices.displayOrder;
    }

    let list = this.renderForcarousel();
    if(Object.keys(list).length != 0 ) {
      return (
        <div className="">
          <div className="container bg-white ">
            <section className="section section-we-made-1">
              {this.showCarousel(list, order)}
            </section>
          </div>

        </div>
      );
    }
    return null
  }
}
export default CarouselComponent