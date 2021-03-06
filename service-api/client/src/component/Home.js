import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {Line, Pie} from 'react-chartjs-2';
import {defineSwipe, Swipeable} from 'react-touch';
import Tabs, { Tab } from 'material-ui/Tabs';
import Table from '../common/TableComponent';
import SupportTouch from '../common/SupportTouch';
import requests from '../utils/requestHelper';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
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
            tabIndex: 0,
            totalTabs: 2,
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
        var tableHeight = window.innerHeight - appHeights.tableHeight - 50;
        var chartHeight = tableHeight * 0.50;
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
                        pointRadius: 3,
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
                        pointRadius: 2,
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

    _onSwipe(increment) {
        var tabIndex = this.state.tabIndex;
        var totalTabs = this.state.totalTabs - 1;

        if((tabIndex + increment) > totalTabs){
            tabIndex = 0;
        } else if((tabIndex + increment) < 0){
            tabIndex = totalTabs;
        } else {
            tabIndex = tabIndex + increment;
        }

        this.setState({tabIndex: tabIndex});
    }

    renderSwipeTabs(){
        const swipe = defineSwipe({swipeDistance: 50});

        let swipeTabs = (
            <Swipeable config={swipe} onSwipeLeft={() => this._onSwipe(1)} onSwipeRight={() => this._onSwipe(-1)}>
                {this.renderTabs()}
            </Swipeable>
        );
        return swipeTabs;
    }
    handleChange = (value, event, that) => {
        this.setState({
            tabIndex: that.props.index
        });
    };
    
    handleChangeIndex = index => {
        this.setState({
            tabIndex: index
        });
    };
    renderTabs(){
        const { tabIndex } = this.state;
        let tabs = (
            <SupportTouch>
                <Tabs value={tabIndex} onChange={this.handleChange} style={styles.tabs}>
                    <Tab value={0} label="Yearly"/>
                    <Tab value={1} label="Monthly"/>
                </Tabs>
                <SwipeableViews index={tabIndex} onChangeIndex={this.handleChangeIndex}>
                    <div title="Yearly">
                        {this.renderTabByYear()}
                    </div>
                    <div title="Monthly">
                        {this.renderTabByMonth()}
                    </div>
                </SwipeableViews>
            </SupportTouch>
        );

        return tabs;
    }

    state = {
        selectedIndex: 0,
    };
    
    select = (index) => this.setState({selectedIndex: index});

    render(){
        var homeView = (
            <div style={styles.loading}>
                <CircularProgress size={80} thickness={5}  />
            </div>
        );
    
        if(this.state.sum_category_by_year.length > 0){
            homeView = (
                <Paper >
                    {this.renderTabs()}
                </Paper>
            )
        }
        return homeView;
    }
}

const styles = {
    tabs: {
      background: '#fff'
    },
    slide: {
      padding: 15,
      minHeight: 100,
      color: '#fff'
    },
    slide1: {
      backgroundColor: '#FEA900'
    },
    slide2: {
      backgroundColor: '#B3DC4A'
    },
    slide3: {
      backgroundColor: '#6AC0FF'
    },
    root: {
        color: '#6AC0FF',
        fontWeight: 500,
        fontSize: 14,
        width: 100,
        textTransform: 'uppercase',
        padding: 0,
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48
    },
    loading:{
        paddingTop: '50%'
    }
  };