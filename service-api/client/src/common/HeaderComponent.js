import React from 'react'
import { CSVLink } from 'react-csv';

export default React.createClass({
    propTypes: {
        showFilters: React.PropTypes.bool,
        showDownloadButton: React.PropTypes.bool,
        downloadData: React.PropTypes.array,
        competitionId: React.PropTypes.string
	},
    getInitialState: function () {
        return {
            show_filters: false,
            show_download_btn: false,
            competitionId: "",
            startDate: "",
            endDate: ""
        };
    },
    componentDidMount: function () {
        this.setState({
            show_filters: this.props.showFilters,
            show_download_btn: this.props.showDownloadButton
        });
         if(typeof window !== 'undefined') { 
                var startDate = new Date(); 
                var endDate = new Date(); 
                if(this.props.startDate){ 
                    startDate = this.props.startDate; 
                    endDate = this.props.endDate; 
                } 
                else{ 
                    startDate = this.formatDate(new Date(startDate.setMonth(startDate.getMonth() - 1))); 
                    endDate = this.formatDate(new Date(endDate.setMonth(endDate.getMonth() + 2))); 
                } 
                this.setState({startDate: startDate, endDate: endDate});
        }
    },
    componentWillReceiveProps: function(nextProps){

    },
    _onDateChange: function(evt) {
        let val = evt.target.getAttribute("data-anchor")
        this.state[val] = evt.target.value;
        this.forceUpdate();
    },
    renderFilters() {
        var filterObjects = <div className="game_filters" id="game_filters"></div>;
        if (this.state.show_filters) {
            filterObjects = <div className="game_filters" id="game_filters">
                <div className="topContentItem" ><input type="date" aria-haspopup="true" aria-expanded="false" id="start_date" data-anchor="startDate" value={this.state.startDate} onChange={this._onDateChange}/></div>
                <div className="topContentItem" ><input type="date" aria-haspopup="true" aria-expanded="false" id="end_date" value={this.state.endDate} data-anchor="endDate" onChange={this._onDateChange}/></div>
                <div className="topContentItem" ><button className="btn btn-default" aria-haspopup="true" aria-expanded="false" id="games_btn" onClick={this.loadGames}>Load Games</button> </div>
            </div>
        }
        return filterObjects;
    },
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
    loadGames: function (item) {
        if(typeof window !== 'undefined') { 
            let startDate = this.state.startDate; 
            let endDate = this.state.endDate; 
            var path = "/games/" + this.props.competitionId + "/" + startDate + "/" + endDate; 
            window.location = path; 
        } 
    },
    renderDownloadButton() {
        if (this.state.show_download_btn) {
            return <div className="topContentItem" >
                <button className="btn btn-default" aria-haspopup="true" aria-expanded="false" id="Download_btn">
                    <span className="glyphicon glyphicon-download-alt"></span>
                    <CSVLink data={this.props.downloadData} filename={"cqa-report.csv"} separator=",">
                        Download To Excel
                    </CSVLink>
                </button>
            </div>
        } else {
            return "";
        }
    },
    loadHeaderHistory(){
        window.location = "/";
    },
    render() {
        return <div className="top_content">
            <div className="topContentItem" >
                <button className="btn btn-default" aria-haspopup="true" aria-expanded="false" id="home_btn" onClick={this.loadHeaderHistory}>Home</button> 
            </div>
            {this.renderDownloadButton()}
            {this.renderFilters()}
        </div>
    }

})