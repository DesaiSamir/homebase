import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import '../style/category.css'
import GridList from '../common/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/save';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import {teal500, teal900, deepOrange900} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableHeight: 0,
      rowInfo: null,
      tableName: 'categoryTable',
      alertOpen: false,
      formOpen: false,
      alertMessage: '',
    };
  }

  componentDidMount(){
    this.getCategory()

    var appHeights = this.props.appHeights
    this.setState({
      tableHeight: window.innerHeight - appHeights.tableHeight - 2
    })
  }
  
  handleAlertOpen = () => {
    this.setState({alertOpen: true});
  };

  handleAlertClose = () => {
    this.setState({alertOpen: false});
  };
  
  handleFormOpen = () => {
    this.setState({formOpen: true});
  };

  handleFormClose = () => {
    this.setState({
      formOpen: false,
      rowInfo: null
    });
  };

  onSubmit(){
    const categoryId = document.getElementById("categoryId").value;
    const categoryName = document.getElementById("categoryName").value;
    var isactive = 0;
    if(document.getElementById("isActive").checked){
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

    if(categoryName === ""){
      this.setState({
        alertOpen: true,
        alertMessage: 'Category Name is a required field.'
      })
      return;
    }
    
    requests.editRecord(data, this, this.getCategory.bind(this));
    this.handleFormClose();
  }

  getCategory(){
    const table_name = 'category_view';
    requests.getDataByTableName(table_name, this);
  }

  onItemClick(category){
        
    var rowInfo = {
        original: category
    }
    
    this.setState({
      rowInfo: rowInfo,
      formOpen: true
    });
  }

  onRowClick(state, rowInfo, column, instance){
    return {
      onClick: e => {
        this.setState({rowInfo: rowInfo});
      }
    }
  }

  onCancelCategory(){
    var addExpense = document.getElementById("addCategory");
    addExpense.style.display = "none";
    var expenseData = document.getElementById("categoryTable")
    expenseData.style.display = "block";
  }

  renderForm(rowInfo = null){

    var categoryId = 0;
    var categoryName = "";
    
    if(rowInfo && rowInfo.original){
      categoryId = rowInfo.original.categoryid;
      categoryName = rowInfo.original.CategoryName;
    }
    
    const actions = [
      <RaisedButton
        backgroundColor={styles.raisedButton.backgroundColor}
        icon={<ContentClear />}
        style={styles.raisedButton}
        onClick={this.handleFormClose}
      />,
      <RaisedButton
        backgroundColor="#a4c639"
        icon={<ContentSave />}
        style={styles.raisedButton}
        onClick={this.onSubmit.bind(this)}
      />
    ];
    
    var categoryForm = (
      <div>
        <Dialog
          title="Category"
          actions={actions}
          modal={false}
          open={this.state.formOpen}
          onRequestClose={this.handleFormClose}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          bodyStyle={styles.contentForm}
          actionsContainerStyle={styles.contentForm}
          titleStyle={styles.contentForm}
        >
          <br />
          <TextField
            id="categoryId"
            floatingLabelText="Category Id:"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            defaultValue={categoryId}
            disabled={true}
            fullWidth={true}
          />
          <br />
          <TextField
            id="categoryName"
            floatingLabelText="Category Name:"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            errorText="This field is required"
            errorStyle= {styles.errorStyle}
            fullWidth={true}
            floatingLabelFixed={true}
            defaultValue={categoryName}
          />
          <br /><br />
          <Toggle
            id="isActive"
            label="Is Active: "
            labelStyle={styles.floatingLabelStyle}
            defaultToggled={true}
            style={styles.toggle}
          />
        </Dialog>
      </div>
    )
   
    return categoryForm;
  }

  renderInvalidDataAlert(){
    const actions = [
      <RaisedButton
        label="Close"
        primary={false}
        onClick={this.handleAlertClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Form Validation"
          actions={actions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleAlertClose}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
        >
          {this.state.alertMessage}
        </Dialog>
      </div>
    );
  }

  render() {
    
    var categoryView = (
      <div style={styles.loading}>
        <CircularProgress size={80} thickness={5}  />
      </div>
    );

    if(this.state.data.length > 0){
      categoryView = (
        <div style={{height:this.props.appHeights.contentHeight}}>
          
          <Paper id="categoryTable" style={styles.content} >
            <GridList 
              data={this.state.data}
              gridHeight={this.state.tableHeight}
              onItemClick={this.onItemClick.bind(this)}
              renderScreen='category'
              />

            <FloatingActionButton style={styles.floatingButton} onClick={this.handleFormOpen}>
              <ContentAdd />
            </FloatingActionButton>
          </Paper>
          {this.renderForm(this.state.rowInfo)}
          {this.renderInvalidDataAlert()}
        </div>
      )
    }

    return categoryView;
  }
};

const styles = {
  toggle: {
    marginBottom: 16,
    textAlign: 'left',
  },
  errorStyle: {
    textAlign: 'left',
    color: deepOrange900,
  },
  underlineStyle: {
    borderColor: teal900,
  },
  floatingLabelStyle: {
    color: teal900,
  },
  floatingLabelFocusStyle: {
    color: "white",
  },
  floatingButton: {
      position: 'fixed',
      zIndex: 2,
      marginTop: -68,
      right: 5,
  },
  content: {
    height: '100%'
  },
  contentForm: {
    textAlign: 'left',
    backgroundColor: teal500,
  },
  raisedButton: {
    margin: 12,
    width: '40%',
    backgroundColor: deepOrange900
  },
  formButtons: {

  },
  loading:{
      paddingTop: '50%'
  }
};