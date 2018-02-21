import React, {Component} from 'react'
import DiscoverContainer from '../containers/DiscoverContainer'
import LandingPage from './LandingPage';
import Cards from './CardsComponent'
class DiscoverComponent extends Component{

  render(){

    return(
      <div className="wrapper" style={{'backgroundColor':'white'}}>
      	<LandingPage hideFooter={true} />
      </div>
    )

    // return(
    //   <div className="wrapper" style={{'backgroundColor':'white'}}>
    //   <DiscoverContainer/>
    //   </div>
    // )
  }
}
export default DiscoverComponent;