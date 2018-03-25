import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Seminars from '../images/seminar-red.png'
import Mileage from '../images/mileage-brown.png'
import Books from '../images/books-red.png'
import Tips from '../images/tip-black.png'
import Meals from '../images/meals-yellow.png'
import Unknown from '../images/unknown-blue.png'
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

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
    renderSwitch(param) {
        switch(param) {
            case 'Seminars':
                return Seminars;
            case 'Books':
                return Books;
            case 'Miles':
                return Mileage;
            case 'Meals':
                return Meals;
            case 'Tip':
                return Tips;
            default:
            return Unknown;
        }
      }
    renderExpenseList(){
        var gridData = {};
        var gridList = "";
        var i = 0;
        if(this.state.data.length>0){
            gridData = this.loadGridData(this.state.data);
            gridList = (
                <List style={styles.gridList}>
                    {gridData.map((gridItem) => (
                        <ListItem
                            initiallyOpen={((i = i + 1) === 1)?true:false}
                            primaryText={gridItem.month}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                gridItem.data.map((tile) => (
                                    <div key={tile.expenseid}>
                                        <Paper>
                                            <ListItem
                                                key={tile.CategoryImage}
                                                primaryText={tile.Title}
                                                secondaryText={                                         
                                                    (tile.Category === 'Miles') 
                                                        ? <span>Date: <b>{tile.Date}</b> Mileage: <b>{tile.Cost} miles</b></span> 
                                                        : <span>Date: <b>{tile.Date}</b> Cost: <b>${tile.Cost}.00</b></span>}
                                                rightIcon={ <Edit onClick={() => this.props.onItemClick(tile)}/> }
                                                leftAvatar={ <Avatar src={this.renderSwitch(tile.Category)} /> }>
                                            </ListItem>
                                        </Paper>
                                    </div>
                                ), this)
                            ]}
                        />
                    ), this)}
                </List>
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
        width: '100%',
        backgroundColor: 'teal'
    },
};
