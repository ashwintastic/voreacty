/**
 * Created by root on 9/10/17.
 */
import React, {Component} from 'react';
import {SERVICES_CATAGORY_SELECTION} from '../../config/constants'
import {Interests} from '../../components/Interests'
class ServiceCatagoryAndLanguage extends Component {

  constructor(props){
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createCategoryList = this.createCategoryList.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.saveCategorySelection = this.saveCategorySelection.bind(this);
    this.selectedCategory = this.selectedCategory.bind(this);
    this.unselectCategory = this.unselectCategory.bind(this);
    this.expanded = false;
    this.catagory = [];
    this.previousSelection = [];
     this.state = {
      catagory:[],
      selectedCategory:"cat000"
     }
     this.configCategory = SERVICES_CATAGORY_SELECTION;
  }
  componentWillReceiveProps(nextProps){
    
    let isEdit = nextProps.hasOwnProperty('edit');
    if(isEdit && nextProps.hasOwnProperty("category") && nextProps.category)
    {  
      if(typeof nextProps.savedCategories != "undefined"
        && nextProps.savedCategories != ""){

        this.catagory = nextProps.savedCategories.split(",");
        this.setState(prevState => ({
          catagory : nextProps.savedCategories.split(",")
        }));

      }
      else{
      this.catagory = nextProps.category.split(",");
      this.setState(prevState => ({
          catagory : nextProps.category.split(",")
        }));
      }
    }

  }

  unselectCategory(categoryValue){
    let currentCatagory = this.state.catagory;
    let index = this.state.catagory.indexOf(categoryValue);
    if(index > -1){
      currentCatagory.splice(index,1);
      this.setState({catagory: currentCatagory});
    }
    this.catagory = currentCatagory;
  }
  selectedCategory(categoryValue){
    let currentCatagory =this.state.catagory;
    if(categoryValue!=="cat000"){
      let index = this.state.catagory.indexOf(categoryValue);
      if(index === -1 && currentCatagory.length < 2){
        currentCatagory.push(categoryValue);
        this.setState({catagory: currentCatagory});
      }
    }
    this.catagory = currentCatagory;
  }

  saveCategorySelection()
  {
    this.selectedCategory(this.state.selectedCategory);
  }
  createSelectItems(optionData){
    let items = [];
    let initialKey="cat000";
    let initialDisplay = 'Select Category';
    items.push(<option key ={initialKey} value={initialKey}>{initialDisplay}</option> )
    Object.keys(optionData).map((t,i) => items.push(<option key={i+1} value={t}>{optionData[t]}</option>))
    return items;
  }

  // checkDisableStatus(configCategory,currentCategory,allEnable){
  //   return configCategory.map(function(cat){
  //     if(allEnable){
  //       cat.disabled = false;
  //     }
  //     else{
  //       if(currentCategory.indexOf(cat.catagory) > -1){
  //         cat.disabled = false;
  //       }
  //       else{
  //         cat.disabled = true;
  //       }
  //     }
  //     return cat
  //   }
  //   );
  // }
  handleInputChange(event){
    this.setState({selectedCategory:event.target.value})

    /*
    console.log("in handleInputChange");
    let currentCategory = this.state.catagory;
    let index = currentCategory.indexOf(catagory);
    if(currentCategory.length == 2)
    {
        if(index > -1){
          currentCategory.splice(index,1);
          this.catagory = currentCategory;
          this.configCategory = this.checkDisableStatus(this.configCategory,this.catagory,true);
          this.setState(prevState => ({
          catagory : currentCategory
           }));
        }
    }
    else{
      if(index > -1 ){
        currentCategory.splice(index,1);
      }
      else{
        currentCategory.push(catagory);
      }
      this.catagory = currentCategory;
      if(this.catagory.length ==2){
        this.configCategory = this.checkDisableStatus(this.configCategory,this.catagory);
      }
      this.setState(prevState => ({
          catagory : currentCategory
      }));

    }
    // this.catagory.push(catagory);
    */
    //console.log("oooo", currentCategory)
  }

  createCategoryList(optionData,selectedOptions){
    let items = [];
    console.log("inside");
    console.log(selectedOptions);
    optionData.map((c,i) => items.push(<label key ={c.catagory}>
                                      <input type="checkbox" id= {"c_"+c.catagory} checked = { selectedOptions.indexOf(c.catagory) > -1}
                                        disabled = {c.disabled}
                                        onChange={this.handleInputChange.bind(this, c.catagory)} />
                                        {c.name}
                                      </label>));
    return items;
  }
  showCheckboxes() {
   var checkboxes = document.getElementById("checkboxes");
  if (!this.expanded) {
    checkboxes.style.display = "block";
    this.expanded = true;
  } else {
    checkboxes.style.display = "none";
    this.expanded = false;
  }
}



  render() {
   let isEdit = this.props.hasOwnProperty('edit');
    return (
      <div>
        <div className="sp-input-group">
          <div className="txt-label">
            Category <span className="color-red-3">* (Maximum two categories)</span>
          </div>
          <div>
              <div>
                <div className="">
                    <div className="col-sm-10 p-l-0"><select className="form-control" id="category" name="quali" onChange={this.handleInputChange.bind(this)} 
                    value = {this.state.selectedCategory} aria-describedby="quali_help"  placeholder="Interest">
                      {this.createSelectItems(SERVICES_CATAGORY_SELECTION)}
                    </select></div>
                    <div className="col-sm-2 text-right p-l-0"><span className=""><input className="btn btn-default theme-btn"
                     type="button" id="addinterest" value="Add" onClick = {this.saveCategorySelection.bind(this) } /></span></div>
                     <Interests interestList = {this.state.catagory}
                                unselectInterest = {this.unselectCategory.bind(this)}
                                selectionData = {SERVICES_CATAGORY_SELECTION}
                                isCategory={true} />
                </div>
              </div>
          </div>
        </div>

        <div className="sp-input-group">
          <div className="txt-label p-t-5">
            Language <span className="color-red-3">*</span>
          </div>
          
          {isEdit?(
            <div key = {this.props.language}>
            <input type="text" className="sp-form-control" required defaultValue={this.props.language || ""}
                    ref={(el) => {
                     this.language = el}} />
            </div>):
          (
            <div>
            <input type="text" className="sp-form-control" required
                   ref={(el) => {
                     this.language = el}} />
            </div>
            )}
          
        </div>
      </div>
    )
  }
}

export default ServiceCatagoryAndLanguage;