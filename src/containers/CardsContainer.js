/**
 * Created by root on 28/8/17.
 */
/**
 * Created by root on 9/8/17.
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getAllServicesAction from '../actions/getAllServicesAction';
import {IMAGE_BASE_URL} from '../config/config'
import ppFrame from '../assets/images/commun/pp-frame.png';
let sectionStyle = {
  float: 'left'
};
class CardsContainer extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getAllServicesAction()
  }
  renderList(){
    let allservices = [];
    for(let i in this.props.allservices.new){
      let temp = this.props.allservices.new[i];
      allservices.push(temp)
    }
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

    return allservices.map((service) => {
      console.log("*************0", service)
      return (

                <div className="col-md-2 col-lg-2 col-sm-4 col-xs-12">
                    <div className="row">
                <div className="helper-box" key = {service.id}>
                  <div className="thumbnail direc">
                    <img src={ppFrame} alt=""
                         style={{backgroundImage: "url("+IMAGE_BASE_URL+"storage/app/public/sp/images/users/" + service.image + ")"}}/>
                    <div className="caption">
                      <p className="m-b"><Link to= {"viewprofile/"+service.id } style={ellipsisStyle} title={service.headline}>{service.headline}</Link></p>
                      <h5 className="panel-title"><Link to={"viewprofile/"+service.id } >{service.name} {service.surname}</Link></h5>
                      <h5 className="prof-title">{service.service}</h5>
                    </div>
                  </div> </div>
                </div>
</div>

      )
    })
  }


  render() {
    return (<div className=" wrapper">
        <div className="container bg-white">
            <section className="section section-we-made-1">
                <div className="filter-section row bor-bottom-grey-8">
                    <div className="p-20">
                <label className="lbl-txt">Choose Category : </label>
                    <select className="select-control">
                        <option>Business</option>
                        <option>Creative</option>
                        <option>Counseling</option>
                        <option>Education</option>
                        <option>Fashion</option>
                        <option>Film and Video</option>
                        <option>Games</option>
                        <option>Health and Fitness</option>
                        <option>Lifestyle</option>
                        <option>Sport</option>
                    </select>
                </div>
                </div>
                <div className="contributor-block">
                    <div className="m-b-10 height-120">
                        <div className="md-chip m-r-10 m-b-10">
                            <span>Chip chip chip</span>
                            <button type="button" className="md-chip-remove">
                            </button>
                        </div>
                        <div className="md-chip m-r-10 m-b-10">
                            <span>Chip chip chip</span>
                            <button type="button" className="md-chip-remove">
                            </button>
                        </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div><div className="md-chip m-r-10 m-b-10">
                        <span>Chip chip chip</span>
                        <button type="button" className="md-chip-remove">
                        </button>
                    </div>
                    </div>
                    <div className="">
            {this.renderList()}
                </div>
                </div>
            </section>
        </div>
    </div>)
  }



}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getAllServicesAction: getAllServicesAction}, dispatch)
}


function mapStateToProps (state){
  return {
    allservices: state.allServices
  }

}

export default connect(mapStateToProps, matchDispatchToProps)(CardsContainer);