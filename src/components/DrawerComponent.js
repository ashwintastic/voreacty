import React from 'react';
import {Link} from 'react-router-dom'
import GetQueryString from '../helper/urlQueryStringReader';
import {SERVICES_CATAGORY} from '../config/config';

import ContactHistoryTable from '../components/videocall/ContactHistoryTable'

class DrawerComponent extends React.Component {
  constructor(props){
    super(props)
  }

  filter_by_catagory(){
    // TODO :: remove a tag and user Link
  }

  contactListing(){
    console.log("DrawerComponent Props: ",this.props);
    return (
        <ContactHistoryTable contactHistoryData={this.props.contactHistoryResponse}/>
            );
  }
  
  directoryListing(){
    let params = GetQueryString.getParameterByName('q');
    console.log("params", params)
    let catagories = SERVICES_CATAGORY;

    return catagories.map((catagory) => {
      let style ={};
      if(params == catagory.catagory){
        style={'fontWeight': 'bold'}
      }
      return (

        <li
          key={catagory.catagory}
          onClick={this.filter_by_catagory.bind(this, catagory.catagory)}>
          <a style={style} href={"/discover?q="+catagory.catagory+'&'+'catname='+catagory.name}> {catagory.name}</a>
        </li>
      );
    });

  }


  wishList(){
    let catagories = [
      { catagory: 'cat001', name: 'Art' }, {catagory: 'cat002', name: 'Comics'},
      { catagory: 'cat003', name: 'Engineering' }, { catagory: 'cat004' , name: 'Business'}
    ];
    let key = 0;
    return catagories.map((catagory) => {
      return (
        <li
          key={key+catagory.catagory}
          onClick={this.filter_by_catagory.bind(this)}>
          <a href={"/discover?q=mylist"}> {"MY list-->"+key}</a>
        </li>
      );
      key+=1;
    });
  }

  availabilityFilter(){
    let availabilityArr = {All:'all', Available: 'on'};
    let temp = []
    for(let i in availabilityArr){
      temp.push( <li
        key={"availabilityArr"+i}
        onClick={this.filter_by_catagory.bind(this)}>
        <a href={"/discover?q="+availabilityArr[i]+'&'+'catname='+i}> {i}</a>
      </li>)
    }
    return temp
  }

  render(){
    return(
      !this.props.hideBurger ? (<div className="nav-toggle-popup">
          <div className="vobby-custom-drawer">
            <label htmlFor="trigger">
              <input id="trigger" type="checkbox" />
              <section className="drawer-list">
                <div className="hidden-md hidden-lg">
                {/*<li className="m-t-10">
                    <Link to ="/discover">DISCOVER

                    </Link>
                  </li>
                  */}
                  {this.props.userInfo.isUserLoggedIn ?
                    (
                      <li>
                        <Link to={"/editprofile/"+this.props.userInfo.userId}>PROFILE
                        </Link>
                      </li>
                    ):
                    (
                      <li><Link to="/login">LOGIN</Link></li>
                    )
                  }

                {!this.props.userInfo.isUserLoggedIn  &&
                    <li><Link to="/register">SIGN UP</Link></li>
                }   
               
                <li>
                  <a href="/callhistory">HISTORY
                  </a>
                </li>
                <li>
                    <a href="/favourites?aval=on">FAVORITES
                    </a>
                </li>
                <li>
                    <a href="/support">SUPPORT
                    </a>
                </li>

                {this.props.userInfo.isUserLoggedIn && <li><a onClick={this.props.logout}>LOGOUT</a></li>}
                <div className="dir-seperator"></div>
              </div>
              { /*
              <div className="dir-label"> CATEGORY</div>
              {this.directoryListing()}
              */}


              <div className="drawer-menu hidden-xs hidden-sm">
                <ul>
                    <li><a href="/callhistory">History</a></li>
                    <li><a href="/favourites?aval=on">Favorites</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
              </div>

              <div className="dir-label m-b-10">Recent</div>
              {this.contactListing()}

              {/*<div className="dir-seperator clear-both"></div>
                <div className="dir-label"> MY LIST</div>*/}
                {/* {this.wishList()}*/}

                { /*
                <div className="dir-seperator"></div>
                <div className="dir-label">AVAILABILITY</div>
                {this.availabilityFilter()}
                */ }
              {/*<div className="dir-seperator"></div>*/}
              </section>

              <p className="pointer">
                <i className="fa fa-bars p-tb-3 font-20" aria-hidden="true"></i></p>

            </label>
          </div>
        </div>):(null)
    )
  }
}

export default DrawerComponent

