import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { LineChart, PieChart } from 'react-chartkick';
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
            chart_data_by_month:[],
            chart_data_by_year:[],
            tableHeight: 0,
            chartHeight: 0
        };
    }

    componentDidMount() {
        requests.getDataByTableName("sum_category_by_year", this, this.getSumCategoryByYear.bind(this));
        requests.getDataByTableName("sum_category_by_month", this, this.getSumCategoryByMonth.bind(this));
        requests.getDataByTableName("chart_view_monthly", this, this.getMonthlyChartData.bind(this));
        requests.getDataByTableName("chart_view_yearly", this, this.getYearlyChartData.bind(this));
        
        var appHeights = this.props.appHeights
        var tableHeight = window.innerHeight - appHeights.tableHeight - 35;
        var chartHeight = tableHeight * 0.40;
        this.setState({
            tableHeight: tableHeight - chartHeight,
            chartHeight: chartHeight
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

    getMonthlyChartData(data){
        data.forEach(item => {
            item.data = JSON.parse(item.data);
        });
        this.setState({chart_data_by_month: data})
    }

    getYearlyChartData(data){
        var chartData = []

        data.forEach(item => {
            chartData.push(JSON.parse(item.DataPoint))
        });
        this.setState({chart_data_by_year: chartData})
    }

    renderTabByMonth(){

        let tabContent = (
            <div>
                <LineChart 
                    data={this.state.chart_data_by_month}
                    prefix="$" 
                    height={this.state.chartHeight}/>
                <Table 
                    data={this.state.sum_category_by_month} 
                    tableHight={this.state.tableHeight}/>
            </div>
        );

        return tabContent;
    }

    renderTabByYear(){

        let tabContent = (
            <div>
                <PieChart 
                    data={this.state.chart_data_by_year}
                    prefix="$"
                    height={this.state.chartHeight}/>
                <Table 
                    data={this.state.sum_category_by_year} 
                    tableHight={this.state.tableHeight}/>
            </div>
        );

        return tabContent;
    }

    renderTabs(){
        let tabs = (
            <Tabs>
                <TabList>
                    <Tab>Yearly</Tab>
                    <Tab>Monthly</Tab>
                </TabList>
                <TabPanel>
                    {this.renderTabByYear()}
                </TabPanel>
                <TabPanel>
                    {this.renderTabByMonth()}
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

