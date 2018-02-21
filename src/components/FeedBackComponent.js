import React, {Component} from 'react';
import FeedBackContainer from '../containers/FeedBackContainer'
class FeedBackComponent extends Component{
  constructor(props){
    super(props)
  }

render(){
    return(<FeedBackContainer userProps={this.props.userProps}/>)
}

}
export default FeedBackComponent;