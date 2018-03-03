import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Line, Pie} from 'react-chartjs-2';
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
            chartHeight: 0,
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
        };
    }

    componentDidMount() {
        requests.getDataByTableName("sum_category_by_year", this, this.getSumCategoryByYear.bind(this));
        requests.getDataByTableName("sum_category_by_month", this, this.getSumCategoryByMonth.bind(this));
        requests.getDataByTableName("chart_view_monthly", this, this.getMonthlyChartData.bind(this));
        requests.getDataByTableName("sum_category_by_year", this, this.getYearlyChartData.bind(this));
        
        var appHeights = this.props.appHeights
        var tableHeight = window.innerHeight - appHeights.tableHeight - 35;
        var chartHeight = tableHeight * 0.40;
        this.setState({
            tableHeight: tableHeight - chartHeight,
            chartHeight: chartHeight
        });
    }

    getSumCategoryByYear(data){
        this.setState({sum_category_by_year: data})
    }

    getSumCategoryByMonth(data){
        this.setState({sum_category_by_month: data})
    }

    getMonthlyChartData(data){
        var datasets = []
        var labels = []
        var miles = []

        var i = 0
        data.forEach(item => {
            item.data = JSON.parse(item.data);
            if(item.name === 'Miles'){
                item.fill = true;
                item.yAxisID = 'right';
            } else {
                item.fill = false;
                item.yAxisID = 'left';
            }
            if(item.name === 'labels'){
                labels = item.data.sort()
            } else {
                var dataPoints = []

                Object.keys(item.data).sort().map(function (key) { 
                    dataPoints.push(item.data[key]);
                    return item.data[key];
                });

                if(item.name === 'Miles'){
                    miles.push(
                    {
                        label: item.name,
                        data: dataPoints,
                        backgroundColor: this.state.backgroundColor[i],
                        borderColor: this.state.backgroundColor[i],
                        fill: item.fill,
                        borderWidth: 4,
                        yAxisID: item.yAxisID
                    })
                } else {
                    datasets.push(
                    {
                        label: item.name,
                        data: dataPoints,
                        backgroundColor: this.state.backgroundColor[i],
                        borderColor: this.state.backgroundColor[i],
                        fill: item.fill,
                        pointRadius: 1,
                        borderWidth: 3,
                        yAxisID: item.yAxisID
                    })
                }
                i = i + 1
            }
        });

        datasets.push(miles[0]);

        var chartData = {
            labels: labels,
            datasets: datasets
        }
        this.setState({chart_data_by_month: chartData})
    }

    renderTabByMonth(){
        let options= {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            maintainAspectRatio: false,
            title:{
                display: false,
                text:'Categories'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        stepSize: 3
                    }
                }],
                yAxes: [{
                    type: "linear", 
                    label: "",
                    display: true,
                    position: "left",
                    id: "left",
                    scaleLabel:{
                        display: true,
                        labelString:'Expenses',
                        fontSize: 16
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                },
                {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "right",
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    scaleLabel:{
                        display: true,
                        labelString:'Miles',
                        fontSize: 16
                    },
                }]
            }
        }
        let tabContent = (
            <div>
                <div style={{height: this.state.chartHeight}}>
                    <Line 
                        data={this.state.chart_data_by_month}
                        options={options}/>
                </div>
                <Table 
                    data={this.state.sum_category_by_month}  
                    tableHight={this.state.tableHeight}
                    filterable={false}/>
            </div>
        );

        return tabContent;
    }

    getYearlyChartData(data){
        var dataset = []
        var labels = []
        var colors = []

        var i = 0
        data.forEach(item => {
            if(item.CategoryName !== 'Miles'){
                dataset.push(item.Total)
                labels.push(item.CategoryName)
                colors.push(this.state.backgroundColor[i])
                i = i + 1
            }
        });

        var chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Categories',
                    backgroundColor: colors,
                    data: dataset
                }
            ]
        }
        this.setState({chart_data_by_year: chartData})
    }

    renderTabByYear(){
        let options= {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            maintainAspectRatio: false,
            title:{
                display: false,
                text:'Categories'
            }
        }
        let tabContent = (
            <div>
                <div style={{height: this.state.chartHeight}}>
                    <Pie 
                        data={this.state.chart_data_by_year}
                        options={options}/>
                </div>
                <Table 
                    data={this.state.sum_category_by_year} 
                    tableHight={this.state.tableHeight}
                    filterable={false}/>
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

