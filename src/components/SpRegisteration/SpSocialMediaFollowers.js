/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react';
import {SERVICE_PROVIDER_SOCIAL_MEDIA_FOLLOWERS} from '../../config/config'
class SpSocialMediaFollowers extends Component{

  constructor(props){
    super(props)
    //this.handleChange = this.handleChange.bind(this);
    this.state ={
      media: ""
    }
    this.mediaFollowers = "";
  }

  componentWillReceiveProps(nextProps){
    let isEdit = nextProps.hasOwnProperty('edit');
    if(isEdit
      && nextProps.hasOwnProperty("followers")
      && typeof nextProps.followers != "undefined"
      && nextProps.followers >=0)
    {
      this.mediaFollowers = nextProps.followers
      this.setState(prevState => ({
          media : nextProps.followers
        }));
    }
  }

  handleChange(s){
    this.mediaFollowers = s;
    console.log("mediafollowers", this.mediaFollowers);
    this.setState({media: s});
  }

  render() {
    console.log('render child');
    let counter = 0;
    let isEdit = this.props.hasOwnProperty('edit');
    let followers = this.props.followers;
    return (
      <div className="sp-input-group">
        <div className="txt-label">
          How large is your social media following on only one platform where you have the most following or
          subscribers?
        </div>
        {(isEdit 
          && typeof followers != "undefined" 
          && followers >=0)?
          (<div>
            {
                SERVICE_PROVIDER_SOCIAL_MEDIA_FOLLOWERS.map((s,i) => {
                  return (
                    <div className="inline-block width-49 color-black-2 width-100-mobile" key={s+"_"+counter}>
                      <input type="radio" name="optradio" className="align-left"
                        checked = {i == this.state.media}
                        onChange={this.handleChange.bind(this, counter++)} />
                      {s}
                    </div>
                  )
                })
            }
          </div>
          ):
          (<div>
            {
                SERVICE_PROVIDER_SOCIAL_MEDIA_FOLLOWERS.map((s) => {
                  return (
                    <div className="inline-block width-49 color-black-2 width-100-mobile" key={s}>
                      <input type="radio" name="optradio" className="align-left"
                      onChange={this.handleChange.bind(this, counter++)
                      }
                      />
                      {s}
                    </div>
                  )
                })
            }
          </div>
          )
        }
      </div>
    )
  }
}
export default SpSocialMediaFollowers;