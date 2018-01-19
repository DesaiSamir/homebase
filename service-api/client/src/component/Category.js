import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import Table from '../common/TableComponent';
import '../style/category.css'

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formHeight: 53,
      rowInfo: null
    };
  }

  componentDidMount(){
    this.getCategory()
  }
  
  onSubmit(e){
    e.preventDefault();
    const category = document.getElementById("categoryName").value;
    requests.postData('/createCategory', { category })
      .then(({ status }) => {
        if (status === 200) {
            window.location= "/Category";
        }
      })
  }

  renderCategoryForm(){
    let categoryForm = (
      <form id="Category" style={{height: this.state.formHeight}}>
            <h1>Category</h1>
            
        </form>
    );
    return categoryForm;
  }

  getCategory(){
    
    requests.getData('/category')
    .then(function(res, that) {
      
      if (res.ok) {
        res.json().then(function(data, that) {
          this.setState({ data: data });
        }.bind(this));
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }.bind(this))
  }

  removeRecord(categoryid){
    console.log(categoryid)
    var that = this
    requests.postData('/removeCategory', { categoryid })
      .then(({ status }) => {
        if (status === 200) {
          that.setState({rowInfo: null});
          that.getCategory();
        }
      })
  }

  cancleRecord(){
    this.setState({rowInfo: null});
  }

  loadEditRecordScreen(rowInfo){
    var editRecord = (<div className="editRecordScreen">
        <div className="categoryData">
          CategoryId: {rowInfo.original.categoryid}
          <br/>
          CategoryName: {rowInfo.original.category}
        </div>
        <div className="categoryButtons">
          <div className="cancelCategory cancelExpense expButtons" onClick={this.cancleRecord.bind(this)}>Cancel</div>
          <div className="deleteCategory saveExpense expButtons" onClick={() => this.removeRecord(rowInfo.original.categoryid)}>Delete</div>
        </div>
      </div>);      
      return editRecord;
  }

  onRowClick(state, rowInfo, column, instance){
    return {
      onClick: e => {
        this.setState({rowInfo: rowInfo});
      }
    }
  }

  render() {
    var overlay = this.state.rowInfo ? this.loadEditRecordScreen(this.state.rowInfo) : null;

    return (
      <div>
        {this.renderCategoryForm()}
        <Table 
          data={this.state.data} 
          tableHight={window.innerHeight - this.state.formHeight - 105}
          onRowClick={this.onRowClick.bind(this)}/>
        <div className="category-input">
          <input className="form-field" type="text" id="categoryName" placeholder="Category Name" />
          <input className="form-field addCategory" type="submit" value="Add Category" onSubmit={this.onSubmit} />
        </div>
        {overlay}
      </div>
    )
  }
};
