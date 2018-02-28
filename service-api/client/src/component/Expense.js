import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import Table from '../common/TableComponent';
import '../style/expense.css'

export default class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tableHeight: 0,
            addExpense: false,
            today: "",
            category: [],
            rowInfo: null,
            tableName: 'expenseTable'
        };
    }

    componentDidMount() {
        requests.getDataByTableName("category_view", this, this.getCategory.bind(this));
        this.getExpense();
        var appHeights = this.props.appHeights
        var today = this.formatDate(new Date()); 
        this.setState({
            today: today,
            tableHeight: window.innerHeight - appHeights.tableHeight + 1
        });
        var expenseDate = document.getElementById("expenseDate");
        expenseDate.value = today;
    }

    componentDidUpdate(){
        var category = document.getElementById("categoryid");
        var options = ""
        if(this.state.category)
            this.state.category.forEach(cat => {
                options += "<option data-id=" + cat.categoryid + ">" + cat.CategoryName + "</option>";
            });
        if(!this.state.rowInfo)
            category.innerHTML = options;
        
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    onSubmit(e){
        e.preventDefault();
        const expenseid = document.getElementById("expenseId").value;
        const expense_date = document.getElementById("expenseDate").value;
        const title = document.getElementById("title").value;
        const categoryNode = document.getElementById("categoryid");
        const categoryid = parseInt(categoryNode.childNodes[categoryNode.selectedIndex].getAttribute("data-id"),0);
        const cost = parseInt(document.getElementById("cost").value,0);
        var isactive = 0;
        if(document.getElementById("isactive").checked){
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
        requests.editRecord(data, this, this.getExpense.bind(this))
        this.onCancelExpense();
    }

    onLoadExpense(rowInfo = null){
        if(rowInfo.original){
            document.getElementById("expenseId").value = rowInfo.original.expenseid;
            document.getElementById("expenseDate").value = rowInfo.original.Date;
            document.getElementById("title").value = rowInfo.original.Title;
            document.getElementById("cost").value = rowInfo.original.Cost;
            document.getElementById("isactive").checked = true;
            var category = document.getElementById("categoryid");
            var i = 0;
            category.childNodes.forEach(node => {
                if(rowInfo.original.Category.toLowerCase() === node.innerHTML.toLowerCase()){
                    category.selectedIndex = i;
                    category.value = rowInfo.original.Category;
                }
                i = i + 1;
            });
            
        }else if(this){
            document.getElementById("expenseId").value = 0;
            document.getElementById("expenseDate").value = this.state.today;
            document.getElementById("title").value = "";
            document.getElementById("cost").value = 7;
        }
        var addExpense = document.getElementById("addExpense");
        addExpense.style.display = "block";
        var expenseData = document.getElementById("expenseTable")
        expenseData.style.display = "none";
    }
    onCancelExpense(){
        var addExpense = document.getElementById("addExpense");
        addExpense.style.display = "none";
        var expenseData = document.getElementById("expenseTable")
        expenseData.style.display = "block";
    }

    renderExpenseHeader(){
        return (<form  style={{height: this.props.appHeights.pageHeaderHeight}}>
                <h1>Expense Data</h1>
            </form>
        );
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

    renderExpenseForm(rowInfo = null){

        var expenseId = 0;
        var cost = "7";
        if(rowInfo){
            expenseId = rowInfo.original.expenseid;
        }
        var formWidth = window.innerWidth - 40;
        var inputWidth = formWidth - 70;
        let expenseForm = (
            <form className="categoryForm" onSubmit={this.onSubmit.bind(this)}>
                <h1>Expense Form</h1>
                
                <div className="contentform" style={{overflowY: 'auto', height: this.state.tableHeight + 2}}>
                    <div className="form-group" style={{width: formWidth}}>
                        <p>Expense Id: <span>*</span></p>
                        <span className="icon-case"><i className="material-icons">fingerprint</i></span>
                        <input type="number" id="expenseId" value={expenseId} readOnly style={{width: inputWidth}}/>
                    </div> 
                    
                    <div className="form-group" style={{width: formWidth}}>
                        <p>Expense Date<span>*</span></p>
                        <span className="icon-case"><i className="material-icons">insert_invitation</i></span>
                        <input type="date" id="expenseDate" data-rule="required" style={{width: inputWidth}}/>
                    </div> 

                    <div className="form-group" style={{width: formWidth}}>
                    <p>Expense Title <span>*</span></p>
                    <span className="icon-case"><i className="material-icons">keyboard</i></span>
                        <input type="textarea" name="title" id="title" style={{width: inputWidth}}/>
                    </div>

                    <div className="form-group" style={{width: formWidth}}>
                    <p>Category <span>*</span></p>
                    <span className="icon-case"><i className="material-icons">list</i></span>
                        <select id="categoryid" style={{width: inputWidth + 33}}/>
                    </div>

                    <div className="form-group" style={{width: formWidth}}>
                        <p>Expense Cost <span>*</span></p> 
                        <div className="cost-group"> 
                            <span className="icon-case"><i className="material-icons">monetization_on</i></span>
                            <input type="number" name="cost" id="cost" defaultValue={cost} data-rule="maxlen:10" style={{borderRadius: 0, width: inputWidth - 70}}/>
                        </div>
                        <div>
                            <span className="icon-case" style={{borderRadius: 0, cursor: 'pointer'}} onClick={this.increaseCounter}><i className="material-icons" >add_box</i></span>
                            <span className="icon-case" style={{borderTopRightRadius: 5, 
                                                                borderBottomRightRadius: 5,
                                                                borderTopLeftRadius: 0,
                                                                borderBottomLeftRadius: 0,
                                                                cursor: 'pointer'
                                                                }} onClick={this.decreaseCounter}>
                                        <i className="material-icons">remove_circle</i></span>
                        </div>
                    </div>

                    <div className="form-group" style={{width: formWidth}}>
                        <p>IsActive: </p>
                        <span className="icon-case"><i className="material-icons">done</i></span>
                        <input type="checkbox" id="isactive" defaultChecked={true} style={{width: inputWidth }}/>
                    </div>
                </div>
                <div className="bottomButtons" style={{height: this.props.appHeights.pageFooterHeight}}>
                    <div className="cancelExpense expButtons" onClick={this.onCancelExpense}>
                        <h2>Cancel</h2>
                    </div>
                    <button type="submit" className="saveExpense expButtons" >
                        <h2>Save</h2>
                    </button>
                </div>
            </form> 
        );

        return expenseForm;
    }

    getExpense(){
        const table_name = 'expense_view';
        requests.getDataByTableName(table_name, this);
    }

    getCategory(data){
        this.setState({category: data})
    }

    onRowClick(state, rowInfo, column, instance){
        return {
            onClick: e => {
                this.setState({rowInfo: rowInfo});
            }
        }
    }

    render() {
        var overlay = this.state.rowInfo ? this.onLoadExpense(this.state.rowInfo) : null;
        return (
            <div>
                <div id="expenseTable">
                    {this.renderExpenseHeader()}
                    <Table 
                        data={this.state.data} 
                        tableHight={this.state.tableHeight}
                        onRowClick={this.onRowClick.bind(this)}/>
                    <div className="bottomButtons" style={{height: this.props.appHeights.pageFooterHeight}}>
                        <div className="addExpense expButtons"  onClick={this.onLoadExpense.bind(this)}>
                            <h2>Add Expense</h2>
                        </div>
                    </div>
                </div>
                <div id="addExpense" style={{display: 'none'}}>
                    {this.renderExpenseForm(this.state.rowInfo)}
                </div>
                {overlay}
            </div>
        )
    }
};
