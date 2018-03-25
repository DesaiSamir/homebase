import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Edit from 'material-ui/svg-icons/image/edit';
import categoryImg from '../images/category.jpg'

export default class MuiGridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            gridHeight: window.innerHeight
        };
    }

    componentDidMount() {
        if(this.props.data.length>0){
            this.setState({ 
                data: this.props.data,
                gridHeight: this.props.gridHeight
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data.length>0){
            this.setState({ 
                data: nextProps.data,
                gridHeight: this.props.gridHeight
            });
        }
    }

    loadGridData(data){
        const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var gridData = [];
        var girdMonths = {};
        data.map((value, index, array) => {
            var d = new Date(new Date(value['Date']).getTime()  + 300*60*1000);
            var key = MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
            d = (d.getFullYear()-1970)*12 + d.getMonth();
            girdMonths[key]=girdMonths[key]||[];
            girdMonths[key].push(value);
            return "";
        });
        Object.keys(girdMonths).map(function (key) { 
            var gridItems = {
                month: key,
                data: girdMonths[key]
            }
            gridData.push(gridItems);
            return "";
        });
        return gridData;
    }

    renderExpenseList(){
        var gridData = {};
        var gridList = "";
        if(this.state.data.length>0){
            gridData = this.loadGridData(this.state.data);
            gridList = (
                    gridData.map((gridItem) => (
                        <GridList
                            cellHeight={70}
                            cols={1}
                            style={styles.gridList}>
                            <Subheader>{gridItem.month}</Subheader>
                            {gridItem.data.map((tile) => (
                                <div style={{height: 68}} key={tile.expenseid}>
                                    <GridTile
                                        key={tile.CategoryImage}
                                        title={tile.Title}
                                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.3) 100%)"
                                        subtitle={                                         
                                            (tile.Category === 'Miles') 
                                                ? <span>Date: {tile.Date}    <b>{tile.Cost} miles</b></span> 
                                                : <span>Date: {tile.Date}    Cost: <b>${tile.Cost}.00</b></span>}
                                        actionIcon={
                                            <IconButton onClick={() => this.props.onItemClick(tile)}>
                                                <Edit color="white" />
                                            </IconButton>}>
                                        <img src={(tile.CategoryImage)?tile.CategoryImage : categoryImg} style={{opacity: 0.7}} alt=""/>
                                    </GridTile>
                                </div>
                            ), this)}
                        </GridList> 
                    ), this)
            )
        }

        return gridList;
    }

    render() {
        return <div style={{height: this.state.gridHeight, overflowY: 'scroll', WebkitOverflowScrolling: 'touch',}}>
            <div style={styles.root}>
                {this.renderExpenseList()}
            </div>
        </div>
    }
}

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'    
    },
    gridList: {
        width: '100%'
    },
};
