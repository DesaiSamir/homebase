import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import '../style/category.css'
import GridList from '../common/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/save';
import Paper from 'material-ui/Paper';

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableHeight: 0,
      rowInfo: null,
      tableName: 'categoryTable'
    };
  }

  componentDidMount(){
    this.getCategory()

    var appHeights = this.props.appHeights
    this.setState({
      tableHeight: window.innerHeight - appHeights.tableHeight - 2
    })
  }
  
  onSubmit(){
    const categoryId = document.getElementById("categoryId").value;
    const categoryName = document.getElementById("categoryName").value;
    var isactive = 0;
    if(document.getElementById("isactive").checked){
        isactive = 1;
    }
    var data =  {
        tableName: this.state.tableName,
        categoryTable: {
          categoryid: categoryId,
          category: categoryName,
          isactive: isactive
        }
      };
    requests.editRecord(data, this, this.getCategory.bind(this));
    this.onCancelCategory();
  }


  getCategory(){
    const table_name = 'category_view';
    requests.getDataByTableName(table_name, this);
  }
  onItemClick(category){
        
    var rowInfo = {
        original: category
    }
    
    this.setState({rowInfo: rowInfo});
  }
  onRowClick(state, rowInfo, column, instance){
    return {
      onClick: e => {
        this.setState({rowInfo: rowInfo});
      }
    }
  }
  onLoadCategory(rowInfo = null){
    if(rowInfo.original){
      document.getElementById("categoryId").value = rowInfo.original.categoryid;
      document.getElementById("categoryName").value = rowInfo.original.CategoryName;
      document.getElementById("isactive").checked = true;
    }else if(this){
      document.getElementById("categoryId").value = 0;
      document.getElementById("categoryName").value = "";
    }
    var addExpense = document.getElementById("addCategory");
    addExpense.style.display = "block";
    var expenseData = document.getElementById("categoryTable")
    expenseData.style.display = "none";
  }
  onCancelCategory(){
    var addExpense = document.getElementById("addCategory");
    addExpense.style.display = "none";
    var expenseData = document.getElementById("categoryTable")
    expenseData.style.display = "block";
  }

  renderCategoryForm(rowInfo = null){
    var categoryId = 0;
    if(rowInfo){
      categoryId = rowInfo.original.categoryid;
    }
    var formWidth = window.innerWidth - 40;
    var inputWidth = formWidth - 70;
    let categoryForm = (
      <form className="categoryForm">
          <h1>Category</h1>
          
          <div className="contentform" style={{overflowY: 'auto', height: this.state.tableHeight + 3}}>
              <div className="form-group" style={{width: formWidth}}>
                  <p>Category Id: <span>*</span></p>
                  <span className="icon-case"><i className="material-icons">fingerprint</i></span>
                  <input type="number" id="categoryId" value={categoryId} readOnly style={{width: inputWidth}}/>
              </div> 

              <div className="form-group" style={{width: formWidth}}>
              <p>Category Name <span>*</span></p>
              <span className="icon-case"><i className="material-icons">keyboard</i></span>
                  <input type="textarea" name="categoryName" id="categoryName" style={{width: inputWidth}}/>
              </div>

              <div className="form-group" style={{width: formWidth}}>
                  <p>IsActive: </p>
                  <span className="icon-case"><i className="material-icons">done</i></span>
                  <input type="checkbox" id="isactive" defaultChecked={true} style={{width: inputWidth }}/>
              </div>
              <Paper style={{textAlign:'center', height:150}}>
                        <FloatingActionButton backgroundColor='red' onClick={this.onCancelCategory} style={{marginRight:50, marginTop:6}}>
                            <ContentClear />
                        </FloatingActionButton>
                        <FloatingActionButton backgroundColor='green' onClick={this.onSubmit.bind(this)} style={{marginLeft:50, marginTop:6}}>
                            <ContentSave />
                        </FloatingActionButton>
                    </Paper>
          </div>
      </form> 
    );
    return categoryForm;
  }

  render() {
    var overlay = this.state.rowInfo ? this.onLoadCategory(this.state.rowInfo) : null;

    return (
      <div style={{height:this.props.appHeights.contentHeight}}>
          <Paper id="categoryTable" style={styles.content} >
            <GridList 
              data={this.state.data}
              gridHeight={this.state.tableHeight}
              onItemClick={this.onItemClick.bind(this)}
              renderScreen='category'
              />

            <FloatingActionButton style={styles.floatingButton} onClick={this.onLoadCategory.bind(this)}>
              <ContentAdd />
            </FloatingActionButton>
          </Paper>
        <div id="addCategory" style={{display: 'none'}}>
          {this.renderCategoryForm(this.state.rowInfo)}
        </div>
        {overlay}
      </div>
    )
  }
};

const styles = {
  floatingButton: {
      position: 'fixed',
      zIndex: 2,
      marginTop: -68,
      right: 5,
  },
  content: {
    height: '100%'
  }
};