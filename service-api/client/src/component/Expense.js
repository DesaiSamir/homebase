import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import '../style/expense.css'
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
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            gridData:{},
            tableHeight: 0,
            addExpense: false,
            today: "",
            category: [],
            rowInfo: null,
            tableName: 'expenseTable',
            alertOpen: false,
            formOpen: false,
            categoryValue: 1,
            alertMessage: ""
        };
    }

    componentDidMount() {
        requests.getDataByTableName("category_view", this, this.getCategory.bind(this));
        this.getExpense();
        var appHeights = this.props.appHeights
        var today = requests.formatDate(new Date()); 
        this.setState({
            today: today,
            tableHeight: window.innerHeight - appHeights.tableHeight
        });
        
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

    handleCategoryChange = (event, index, value) => {
        this.setState({
            categoryValue: value
        })
    }

    onSubmit(){
        const expenseid = document.getElementById("expenseId").value;
        const expense_date = document.getElementById("expenseDate").value;
        const title = document.getElementById("title").value;
        const categoryid = this.state.categoryValue;
        const cost = parseInt(document.getElementById("cost").value,0);
        var isactive = 0;
        if(document.getElementById("isActive").checked){
            isactive = 1;
        }
        var data =  {
            tableName: this.state.tableName,
            expenseTable: {
                expenseid: expenseid,
                categoryid: categoryid,
                title: title,
                expense_date: expense_date,
                cost: cost,
                isactive: isactive
            }
        };
        
        if(title === "" || cost === 0){
            this.setState({
              alertOpen: true,
              alertMessage: 'All the required fields need to be populated is a required field.'
            })
            return;
        }
        requests.editRecord(data, this, this.getExpense.bind(this))
        this.handleFormClose();
    }


    increaseCounter(){
        var costInput = document.getElementById("cost");
        var val = costInput.valueAsNumber;
        val = val + 1
        costInput.value = val;
    }

    decreaseCounter(){
        var costInput = document.getElementById("cost");
        var val = costInput.valueAsNumber;
        val = val - 1
        costInput.value = val;
    }

    getExpense(){
        const table_name = 'expense_view';
        requests.getDataByTableName(table_name, this);
    }

    getCategory(data){
        this.setState({category: data})
    }

    onItemClick(expense){
        
        var rowInfo = {
            original: expense
        }
        
        this.setState({
            rowInfo: rowInfo,
            formOpen: true,
            categoryValue: expense.categoryid
        });
    }

    renderForm(rowInfo = null){

        var expenseId = 0;
        var title = "";
        var expenseDate = new Date();
        var categoryId = this.state.categoryValue;
        var cost = 7;
        

        if(rowInfo && rowInfo.original){
            expenseId = rowInfo.original.expenseid;
            title = rowInfo.original.Title;
            expenseDate = new Date(new Date(rowInfo.original.Date).getTime()  + 300*60*1000)
            cost = rowInfo.original.Cost;
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
        
        var form = (
          <div>
            <Dialog
              title="Expense"
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
                <TextField
                    id="expenseId"
                    floatingLabelText="Expense Id:"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    defaultValue={expenseId}
                    disabled={true}
                    fullWidth={true}
                />
                <br />
                <DatePicker
                    id="expenseDate"
                    floatingLabelText="Expense Date:"
                    firstDayOfWeek={0}
                    floatingLabelFixed={true}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    fullWidth={true}
                    errorStyle= {styles.errorStyle}
                    defaultDate={expenseDate}
                />
                <TextField
                    id="title"
                    floatingLabelText="Expense Title:"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    errorText="This field is required"
                    errorStyle= {styles.errorStyle}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    defaultValue={title}
                    multiLine={true}
                />
                <br />
                <SelectField
                    id="categoryId"
                    floatingLabelText="Category Name:"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    value={categoryId}
                    onChange={this.handleCategoryChange}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    style={styles.elementStyle}
                >
                    {this.state.category.map((cat) => (
                        <MenuItem value={cat.categoryid} primaryText={cat.CategoryName} />
                    ))}
                </SelectField>
                <br />
                <TextField
                    id="cost"
                    floatingLabelText="Cost:"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    errorText="This field is required"
                    errorStyle= {styles.errorStyle}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    defaultValue={cost}
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
       
        return form;
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
        var expenseView = (
            <div style={styles.loading}>
                <CircularProgress size={80} thickness={5}  />
            </div>
        );

        if(this.state.data.length > 0 && this.state.category.length > 0){
            expenseView = (
                <div style={{height:this.props.appHeights.contentHeight}}>
                    <Paper id="expenseTable" style={styles.content}>
                        <GridList 
                            data={this.state.data}
                            gridHeight={this.state.tableHeight}
                            onItemClick={this.onItemClick.bind(this)}
                            renderScreen='expense' />

                        <FloatingActionButton style={styles.floatingButton} onClick={this.handleFormOpen}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Paper>
                    {this.renderForm(this.state.rowInfo)}
                    {this.renderInvalidDataAlert()}
                </div>
            )
        }

        return expenseView;
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
        textAlign: 'left',
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
    elementStyle: {
        textAlign: 'left',
    },
    loading:{
        paddingTop: '50%'
    }
  };