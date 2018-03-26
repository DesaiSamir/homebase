import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
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

    loadExpenseGridData(data){
        const MONTH_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var gridData = [];
        var girdMonths = {};
        data.map((value, index, array) => {
            var d = new Date(new Date(value['Date']).getTime()  + 300*60*1000);
            var key = MONTH_FULL[d.getMonth()] + ' ' + d.getFullYear();
            value.month = MONTH_SHORT[d.getMonth()]
            value.day = (d.getDate()<10) ? '0' + d.getDate() : d.getDate()
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

    renderSecondaryText(tile){
        var secondarytext = (
            (tile.Category === 'Miles') 
            ? <div style={styles.odometer}><b>{tile.Cost} miles</b></div>
            : <div style={styles.odometer}><b>${tile.Cost}.00</b></div>
        );

        secondarytext = (
            <Paper style={styles.secondaryText}>
                <div style={styles.date}><b>{tile.month} {tile.day}</b></div> {secondarytext}
            </Paper> 
        );
        
        return secondarytext;
    }

    renderPrimaryText(title){
        var primaryText = (
            <Paper  style={styles.primaryText} >
                {title}
            </Paper>
        );

        return primaryText;
    }

    renderExpenseList(){
        var gridData = {};
        var gridList = "";
        var i = 0;
        var j = 0;
        if(this.state.data.length>0){
            gridData = this.loadExpenseGridData(this.state.data);
            gridList = (
                <List style={styles.gridList}>
                    {gridData.map((gridItem) => (
                        <ListItem
                            initiallyOpen={((i += 1) === 1)?true:false}
                            style={{color: 'white'}}
                            primaryText={gridItem.month}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                gridItem.data.map((tile) => (
                                    <Paper>
                                        <ListItem
                                            key={tile.CategoryImage}
                                            primaryText={this.renderPrimaryText(tile.Title)}
                                            style={((j += 1) % 2 === 0)? styles.colorEven : styles.colorOdd}
                                            secondaryText={this.renderSecondaryText(tile)}
                                            rightIcon={ <Edit onClick={() => this.props.onItemClick(tile)}/> }
                                            leftAvatar={ <Avatar src={this.renderSwitch(tile.Category)} /> }>
                                        </ListItem>
                                    </Paper>
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
        return <div style={{height: this.state.gridHeight, WebkitOverflowScrolling: 'touch',}}>
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
        backgroundColor: '#009688',
    },
    colorOdd: {
        backgroundColor: '#B2DFDB',
    },
    colorEven: {
        backgroundColor: '#80CBC4',
    },
    primaryText: {
        backgroundColor: 'transparent',
        fontFamily: '"IBM Plex Mono", monospace',
        textAlign: 'left',
        background: 'rgba(255, 255, 255, 0.1)',
    },
    secondaryText: {
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row wrap',
        height: '1.1em',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'black',
    },
    date: {
        width: '50%',
    },
    odometer:{
        color: 'white',
        display: 'inline-block', 
        background: 'rgba(0, 0, 0, 0.6)',
        width: '50%',
        height: '100%'
    }
};
