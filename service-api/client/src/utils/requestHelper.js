

export default {
  getDataByTableName: function(table_name, that, callback){
    this.postData('/getHomebaseData', { table_name })
        .then(function(res) {      
          if (res.ok) {
            res.json().then(function(data) {
              data.forEach(row => {
                if(row.Date)
                  row.Date = this.formatDate(row.Date)
              });
              if(callback){
                callback(data)
              } else {
                that.setState({ data: data });
              }
            }.bind(this));
          } else {
            console.log("Looks like the response wasn't perfect, got status", res.status);
          }
        }.bind(this))
  },
  removeRecord: function(table_name, key_name, key_value, that, callback){    
    this.postData('/removeRecord', { table_name, key_name, key_value })
        .then(({ status }) => {
          if (status === 200) {
            that.setState({rowInfo: null});
            callback();
          }
        })
  },
  restoreRecord: function(table_name, key_name, key_value, that, callback){    
    this.postData('/restoreRecord', { table_name, key_name, key_value })
        .then(({ status }) => {
          if (status === 200) {
            that.setState({rowInfo: null});
            callback();
          }
        })
  },
  formatDate: function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  },
  getData: function (path, queryString = "", cb) {
    return window.fetch(path, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  },
  postData: function(path, queryString = "", cb) {
    return window.fetch(path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queryString)
    });
  }
}