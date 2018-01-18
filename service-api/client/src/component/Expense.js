import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import Table from '../common/TableComponent';
import '../style/expense.css'

export default class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            formHeight: 80,
            addExpense: false,
            today: "",
            category: []
        };
    }

    componentDidMount() {
        this.getExpense();
        this.getCategory();
        var today = this.formatDate(new Date()); 
        this.setState({today: today});
        var expenseDate = document.getElementById("expenseDate");
        expenseDate.value = today;
        // costInput[0].style.width = costInput[0].style.width - 85;
    }

    componentDidUpdate(){
        var category = document.getElementById("categoryid");
        var options = ""
        this.state.category.forEach(cat => {
            options += "<option data-id=" + cat.categoryid + ">" + cat.category + "</option>";
        });

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
        console.log("Button Clicked!!")
        const expense_date = document.getElementById("expenseDate").value;
        const title = document.getElementById("title").value;
        const categoryid = document.getElementById("categoryid").firstChild.getAttribute("data-id");
        const cost = document.getElementById("cost").value;
        requests.postData('/createExpense', { expense_date, title, categoryid, cost })
        .then(({ status }) => {
            if (status === 200) {
                window.location= "/Expense";
            }
        })
    }

    onLoadExpense(){
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
        return (<form  style={{height: this.state.formHeight}}>
                <h1>Expense Data</h1>
                <div className="addExpense expButtons" onClick={this.onLoadExpense}>Add Expense</div>
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

    renderExpenseForm(){
        var formWidth = window.innerWidth - 40;
        var inputWidth = formWidth - 70;
        let expenseForm = (
            <form className="categoryForm" onSubmit={this.onSubmit} style={{height: window.innerHeight - 50}}>
                <h1>Expense Form</h1>
                
                <div className="contentform" style={{overflowY: 'auto', height: window.innerHeight - 146}}>
                    <div id="sendmessage"> Your message has been sent successfully. Thank you. </div>
                    <div className="form-group" style={{width: formWidth}}>
                        <p>Expense Date<span>*</span></p>
                        <span className="icon-case"><i className="material-icons">insert_invitation</i></span>
                        <input type="date" id="expenseDate" data-rule="required" style={{width: inputWidth}}/>
                    <div className="validation"></div>
                    </div> 

                    <div className="form-group" style={{width: formWidth}}>
                    <p>Expense Title <span>*</span></p>
                    <span className="icon-case"><i className="material-icons">keyboard</i></span>
                        <input type="text" name="title" id="title" data-rule="required" style={{width: inputWidth}}/>
                        <div className="validation"></div>
                    </div>

                    <div className="form-group" style={{width: formWidth}}>
                    <p>Category <span>*</span></p>
                    <span className="icon-case"><i className="material-icons">dialpad</i></span>
                        <select id="categoryid" style={{width: inputWidth + 33}}/>
                        <div className="validation"></div>
                    </div>  

                    <div className="form-group" style={{width: formWidth}}>
                        <p>Expense Cost <span>*</span></p> 
                        <div className="cost-group"> 
                            <span className="icon-case"><i className="material-icons">monetization_on</i></span>
                            <input type="number" name="cost" id="cost" defaultValue="7" data-rule="maxlen:10" style={{borderRadius: 0, width: inputWidth - 70}}/>
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
                        <div className="validation"></div>
                    </div>
                </div>
                <div className="bottomButtons">
                    <div className="cancelExpense expButtons" onClick={this.onCancelExpense}>Cancel</div>
                    <button type="submit" className="saveExpense expButtons" >Save</button>
                </div>
            </form> 
        );

        return expenseForm;
    }

    getExpense(){
        
        requests.getData('/expense')
        .then(function(res) {
        
            if (res.ok) {
                res.json().then(function(data) {
                    data.forEach(row => {
                        row.expense_date = this.formatDate(row.expense_date)
                    });
                    this.setState({ data: data });
                }.bind(this));
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }.bind(this))
    }

    getCategory(){
    
        requests.getData('/category')
        .then(function(res, that) {
          
          if (res.ok) {
            res.json().then(function(data, that) {
                this.setState({ category: data });
            }.bind(this));
          } else {
            console.log("Looks like the response wasn't perfect, got status", res.status);
          }
        }.bind(this))
      }

    render() {
        
        return (
            <div>
                <div id="expenseTable">
                    {this.renderExpenseHeader()}
                    <Table data={this.state.data} tableHight={window.innerHeight - this.state.formHeight - 52}/>
                </div>
                <div id="addExpense" style={{display: 'none'}}>
                    {this.renderExpenseForm()}
                </div>
            </div>
        )
    }
};
