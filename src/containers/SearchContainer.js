import Autosuggest from 'react-autosuggest';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import callApi from '../helper/callapi'
import getAllSearchedDataAction from '../actions/getAllSearchedDataAction'
import { GlobalErrorMessages} from '../config/messages'
var searchResult = [];


function getMatchingsearchResult(value) {
  if(typeof searchResult != "undefined" && searchResult.length > 0) {
    return searchResult.filter(searchResult => (searchResult.name));
  }
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function shouldRenderSuggestions(value) {
  return value.trim().length >= 2;

}


function renderSuggestion(suggestion) {
// TODO :: using a tag only for demo purpose fix it soon
  let href='';
  if (suggestion.hasOwnProperty('span') && suggestion.span === true){
    href="javascript:void(0)"
  }
  else{
        href="/search?keyword="+""+"&&"+"serviceId="+suggestion.id+"&&"+"userId="+suggestion.userId
        //href="/search?keyword="+suggestion.name+"&&"+"serviceId="+suggestion.id
  }
  return (
    <a href={href}>
      {suggestion.name}
    </a>
  );
}


const debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

class SearchComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false,
      showSearchDetails: false,
      searchButtonHref: '#'
    };
    this.onSuggestionSelected =  this.onSuggestionSelected.bind(this);
    this.search = this.search.bind(this);
    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 1000);
    //this.onEnterPress = this.onEnterPress.bind(this);
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    this.setState({showSearchDetails:true})
    //this.props.getAllSearchedDataAction(suggestion.id)
   }

  search(){
    let searchvalue = this.state.value;
    if(searchvalue != "") {
      this.serverCall(searchvalue);
      //this.props.getAllSearchedDataAction(this.searchValue)
    }

  }

  onEnterPress(e){
    let value = this.state.value;
    if(value.length > 2 && e.keyCode == 13){
      window.location.href = "/search?keyword="+value+"&&"+"userId="+this.props.loggedInStatus.userId
      this.serverCall(value)

    }
  }

  loadSuggestions(value) {
    // TODO :: don't rely on dom get a better way for this
    let inputObj = document.getElementsByClassName('react-autosuggest__input')[0];
    inputObj.addEventListener("keypress", this.onEnterPress.bind(this));
    console.log("before", this.state.value );
    this.setState({
      isLoading: true,
      searchButtonHref: "/search?keyword="+this.state.value+"&&"+"userId="+this.props.loggedInStatus.userId
    });

    this.serverCall(value)
  }

  serverCall(value){
    let self = this;
   // this.lastRequestId = setTimeout(() => {
      callApi('searchSuggest','post', {keyword: value,userId:this.props.loggedInStatus.userId}).then(function (response) {
        searchResult = response;
        if(searchResult.length == 0){
          self.showSuggestion([{name: GlobalErrorMessages['noResultFound'], span: true}])
        }
        else {
          let matchedValue = getMatchingsearchResult(value);
          self.showSuggestion(matchedValue)
        }
      })
    //}, 1000000);

    this.showSuggestion([{name: GlobalErrorMessages['waitingMessageWhileSearch'], span: true}])
  }

  showSuggestion(matchedValue){
    let self = this;
    if(typeof matchedValue != "undefined") {
      self.setState({
        isLoading: false,
        suggestions: matchedValue
      });
    }
  }

  onChange = (event, { newValue , method }) => {
    console.log("onchange")
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    //this.loadSuggestions(value);
    this.debouncedLoadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentWillUnmount(){
    this.setState({showSearchDetails:false})
  }


  render() {
    // TODO:: don't access DOM
    const { value, suggestions, isLoading, showSearchDetails, searchButtonHref } = this.state;
    let searchvalue =""
    if(typeof value != 'undefined'){
      searchvalue = value
    }

    const status = (isLoading ? 'Please wait...' : 'Search for people');
    const inputProps = {
      placeholder: status,
      value,
      onChange: this.onChange
    };
console.log("button", searchButtonHref)
      return (
        <div className="relative">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            shouldRenderSuggestions={shouldRenderSuggestions}
            onSuggestionSelected={this.onSuggestionSelected}/>
            <a href={searchButtonHref} className="search-btn theme-btn"
               onClick={this.search}>
            <i className="fa fa-search" aria-hidden="true"></i></a>
        </div>
      )


  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}


function mapStateToProps (state){
  return {
    searchResult : state.searchResult,
    allServices: state.allServices,
    loggedInStatus: state.loggedInUserInfoResponse,

}
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchComponent);