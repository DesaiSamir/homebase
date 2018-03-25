import React, { Component } from 'react';
import ReactTable from "react-table";
import matchSorter from 'match-sorter';
import  '../style/react-table.css';

export default class TableComponent extends Component{
    
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        columns: [],
        rowCount: 25,
        tableHight: window.innerHeight
    };
  }

    componentDidMount() {
        if(this.props.data.length>0){
            let cols = this.getColumnsImfo(this.props.data);
            var rowCount = this.state.rowCount < 25 ? this.props.data.length : this.state.rowCount;
            this.setState({ 
                data: this.props.data, 
                coloumns: cols,
                rowCount: rowCount,
                tableHight: this.props.tableHight
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data.length>0){
            let cols = this.getColumnsImfo(nextProps.data);
            var rowCount = this.state.rowCount < 25 ? this.props.data.length : this.state.rowCount;
            this.setState({ 
                data: nextProps.data, 
                coloumns: cols,
                rowCount: rowCount,
                tableHight: nextProps.tableHight 
            });
        }
    }

    getColumnsImfo(data){
        let cols = [];
        let keys = Object.keys(data[0]);
        keys.map((item) => {
            cols.push({
                Header: (item.endsWith('id')? 'id' : item),
                accessor: item,
                show: (item.endsWith('id')? false : true),
                maxWidth: (item.endsWith('id') || item.endsWith('Cost') ? 50 : 
                            (item.endsWith('Category') || item.endsWith('Date') ? 95 : 1000)),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: [item] }),
                filterAll: true,
                Cell: row => (
                    (new RegExp("([a-zA-Z0-9]+://)").test(row.value)) ? ((row.value.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null) ?
                        (<div style={{
                            backgroundColor: '#545454',
                            textAlign: 'center',
                            maxHeight: 50
                        }}>
                            <a target='_blank' href={`${row.value.replace('/310/', '/')}`}>
                                <img style={{ width: '100%'}} src={`${row.value}`} alt=""></img>
                            </a>
                        </div>) :
                        <a target='_blank' href={`${row.value}`}> {`${row.value}`}</a>
                    ) :
                        row.value
                )
            });
            return true;
        });

        return cols;
    }
    
    renderReactTable() {
        var reactTable = "";
        if(this.state && this.state.data.length>0){

            reactTable = <div id="sports">
                <div id="loadingImg" className="hide"></div>
                <ReactTable 
                    data={this.state.data} 
                    filterable={(typeof this.props.filterable === 'undefined') ? true : this.props.filtertable}
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                    columns={this.state.coloumns} 
                    defaultPageSize={this.state.rowCount} 
                    className="-striped -highlight" 
                    getTrProps={this.props.onRowClick} 
                    style={{height: this.props.tableHight, WebkitOverflowScrolling: 'touch',}}
                    showPageSizeOptions={false}
                    />
            </div>;
        }
        else{
            reactTable = <div id="sports">
                <div id="loadingImg" className="show"></div>
            </div>;
        }

        return reactTable;
    }
    
    render() {
        return <div className="tab-pane active" id="1a">
            {this.renderReactTable()}
        </div>
    }

}