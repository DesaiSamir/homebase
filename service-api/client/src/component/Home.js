import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Table from '../common/TableComponent';
import requests from '../utils/requestHelper';
import '../style/home.css';
import '../style/react-tabs.css';

export default class Home extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sum_category: [],
            sum_category_by_year:[],
            sum_category_by_month:[],
            tableHeight: 0
        };
    }

    componentDidMount() {
        // requests.getDataByTableName("sum_category", this, this.getSumCategory.bind(this));
        requests.getDataByTableName("sum_category_by_year", this, this.getSumCategoryByYear.bind(this));
        requests.getDataByTableName("sum_category_by_month", this, this.getSumCategoryByMonth.bind(this));
        
        var appHeights = this.props.appHeights
        
        this.setState({
            tableHeight: window.innerHeight - appHeights.tableHeight - 35
        });
    }

    getSumCategory(data){
        this.setState({sum_category: data})
    }

    getSumCategoryByYear(data){
        this.setState({sum_category_by_year: data})
    }

    getSumCategoryByMonth(data){
        this.setState({sum_category_by_month: data})
    }

    renderTabs(){
        let tabs = (
            <Tabs>
                <TabList>
                    <Tab>CategorySum</Tab>
                    {/* <Tab>ByYear</Tab> */}
                    <Tab>ByMonth</Tab>
                </TabList>
                {/* <TabPanel>
                    <Table 
                        data={this.state.sum_category} 
                        tableHight={this.state.tableHeight}/>
                </TabPanel> */}
                <TabPanel>
                    <Table 
                        data={this.state.sum_category_by_year} 
                        tableHight={this.state.tableHeight}/>
                </TabPanel>
                <TabPanel>
                    <Table 
                        data={this.state.sum_category_by_month} 
                        tableHight={this.state.tableHeight}/>
                </TabPanel>
            </Tabs>
        );

        return tabs;
    }

    renderHomePage(){
        var bodyHeight = window.innerHeight - this.props.appHeights.appHeaderHeight - 100;
        let homePage = (
            <div >
                <h1>Home</h1>
                <div className="page-buttons">
                    <div className="button" ><Link to="/Expense">Expenses</Link></div>
                    <div className="button" ><Link to="/Category">Category</Link></div>
                    <div className="button" ><Link to="/About">About Us</Link></div>
                </div>
                <div className="home-page-content" style={{height: bodyHeight}}>
                    <div className="page-content">
                    {this.renderTabs()}
                    </div>
                </div>
            </div>
        );

        return homePage;
    }

    render(){
        return this.renderHomePage()
    }
}

