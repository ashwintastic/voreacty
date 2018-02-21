
import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import addIcon from '../assets/images/web-parts/addlist.png';
import removeIcon from '../assets/images/web-parts/remove-list.png';
import ppFrame from '../assets/images/commun/pp-frame.png';
import {IMAGE_BASE_URL} from '../config/config'
import NoDataFound from '../components/NodataFound'
class CardsComponent extends Component{

  constructor(props){
    super(props);
    this.saveToWishlist=this.saveToWishlist.bind(this);
  }
  redirectToFavorites(){
    window.location.href="/favourites?aval=on";
  }
  componentWillReceiveProps(nextProps){
    if(typeof nextProps.notification != "undefined"
      && nextProps.notification.hasOwnProperty('message')){
      setTimeout(function()
        {
          this.redirectToFavorites()
        }
        .bind(this),1000);
    }
  }
  saveToWishlist(event){
    let paramInfo = event.target.id.split("_");
    let serviceId = paramInfo[0];
    let action = paramInfo[1];
    
    if(action == "add"){
      let data ={
      'serviceId':serviceId,
      'userId':this.props.userId
      }
      this.props.saveToWishlist(data);
    }
    if(action == "delete"){
      let wishlistId = paramInfo[2];
      let data ={
      'wishlistId':wishlistId,
      'isCustom':0,
      'serviceId':serviceId,
      } 
      this.props.removeFromWishlist(data);
    }
  }

  
  renderList(){
    let allservices = [];
    console.log("cardscomponent", this.props.service)
    for(let i in this.props.service){

      if(i=='data') {
        continue;
      }
      let temp = this.props.service[i];
      allservices.push(temp)
    }
        
    let cardHtml = [];
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
    for (let service in allservices){
      let toggleId = allservices[service]['id']+"_add";
      let toggleImg = addIcon;
      if(allservices[service].hasOwnProperty('wishListAdd')){
        toggleId = allservices[service]['id']+"_delete"+"_"+allservices[service]['wishlist_id'];
        toggleImg=removeIcon;
        
      }
      if(allservices[service].hasOwnProperty('wishListRemove')){
        toggleId = allservices[service]['id']+"_add";
        toggleImg=addIcon;
      }
      cardHtml.push(<div className="col-md-5ths col-sm-4 col-xs-12 m-b-17"  key = {allservices[service]['id']}>
          <div className="row">
            <Link to ={"viewprofile/"+allservices[service]['id'] }>
              <div className="helper-box" >
                <div className="thumbnail direc">
                  <img src={ppFrame} alt=""
                       style={{backgroundImage: "url("+IMAGE_BASE_URL+"storage/app/public/sp/images/users/" + allservices[service]['image'] + ")"}}/>
                  <div className="caption">
                    <p className="m-b-5"><Link to= {"viewprofile/"+allservices[service]['id'] } style={ellipsisStyle} >{allservices[service]['headline']}</Link></p>
                    <h5 className="panel-title"><Link to={"viewprofile/"+allservices[service]['id'] } >{allservices[service]['name']} {allservices[service]['surname']}</Link></h5>
                    <h5 className="prof-title">{allservices[service]['service']}</h5>
                    <div>
                      <ul className="act-btn">

                        <li><i className={"fa fa-circle switchto "+ allservices[service]['aval_value']} aria-hidden="true"></i><span>{allservices[service]['calls']} Calls</span></li>

                        <li className="text-right dropup">

                          <a href="#" data-toggle="modal" data-target="#myModal" className=""><img src={toggleImg} id={toggleId} className="vbb-icon" onClick = {this.saveToWishlist.bind(this)} /></a>

                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )
    }
    return cardHtml;
    
  }


  render() {
    console.log("param", this.props.params)
    let dynamicClassName = "container";
    let dynamicsectionClassName = "section section-we-made-1 show-more-result";
    let props = this.props;
    if (props.hasOwnProperty('removeClassName') && props.removeClassName === true){
      dynamicClassName = "";
    }
        if (props.hasOwnProperty('removesectionClassName') && props.removeClassName === true){
            dynamicsectionClassName = "";
        }
        if(props.hasOwnProperty('applyclass') && props.applyclass == true){
          dynamicsectionClassName += '   discover-show-all'
        }

        console.log(props.params);
        let resultText = "Showing results for "+props.params;
        if(props.params == 'Favourites'){
          resultText = "Showing "+props.params.toLowerCase();
        }

    return (<div className="">
      <div className= {dynamicClassName}>
        <section className={dynamicsectionClassName}>
          {props.hasOwnProperty('showDiscoverMore') && props.showDiscoverMore && <div className="font-18 color-black-1 font-bold p-l-10 ">Discover More </div>}
          <div className="contributor-block">
            <div className="">
              {typeof props.params != "undefined" &&
                props.params != "" &&
                typeof this.props.service != 'undefined' &&
                (this.props.service.length != 0) ?  
                  (<div className="font-18 color-black-1 font-bold  m-b-20 p-l-5">
                  {resultText}
                  </div>) : 
                  (null)
              }
              { typeof this.props.service != 'undefined' && 
                this.props.service.length == 0 && 
                (<NoDataFound msg="noFavorites" keyword={props.params}/>)
              }
              {this.renderList()}
            </div>
          </div>
        </section>
      </div>
    </div>)
  }

}



export default CardsComponent;