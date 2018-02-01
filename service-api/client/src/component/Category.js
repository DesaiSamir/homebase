import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import Table from '../common/TableComponent';
import '../style/category.css'

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableHeight: 0,
      rowInfo: null
    };
  }

  componentDidMount(){
    this.getCategory()

    var appHeights = this.props.appHeights
    this.setState({
      tableHeight: window.innerHeight - appHeights.tableHeight
    })
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
      <form id="Category" style={{height: this.props.appHeights.pageHeaderHeight}}>
            <h1>Category</h1>
            
        </form>
    );
    return categoryForm;
  }

  getCategory(){
    const table_name = 'category_view';
    requests.getDataByTableName(table_name, this);
  }

  removeRecord(categoryid){
    requests.removeRecord('category', 'categoryid', categoryid, this, this.getCategory.bind(this))
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
          tableHight={this.state.tableHeight}
          onRowClick={this.onRowClick.bind(this)}/>
        <div className="category-input" style={{height: this.props.appHeights.pageFooterHeight}}>
          <input className="form-field" type="text" id="categoryName" placeholder="Category Name" />
          <input className="form-field addCategory" type="submit" value="Add Category" onClick={this.onSubmit} />
        </div>
        {overlay}
      </div>
    )
  }
};
