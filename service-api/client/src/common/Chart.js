import React, {Component} from 'react';
import {Line, Pie} from 'react-chartjs-2';

export class PieChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData : []
        }
    }

    
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }

    componentWillReceiveProps(){
        console.log(this)
        if(this.props.chartData.datasets){
            this.setState({
                chartData : this.props.chartData
            });
        }
    }

    render(){
        return (
        <div className="chart">
            <Pie
            data={this.state.chartData}/>
        </div>
        )
    }
}

export class LineChart extends Component{
    constructor(props){
      super(props);
      this.state = {
        chartData:[]
      }
    }
  
    componentWillReceiveProps(){
        console.log(this)
        if(this.props.chartData.datasets){
            this.setState({
                chartData : this.props.chartData
            });
        }
    }
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      location:'City'
    }
  
    render(){
      return (
        <div className="chart">
          <Line
            data={this.state.chartData}
          />
        </div>
      )
    }
  }
