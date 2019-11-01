

export default {
  getDataByTableName: function(table_name, that, callback){
    this.postData('/getHomebaseData', { table_name })
        .then(function(res) {      
          if (res.ok) {
            res.json().then(function(data) {
              if(callback){
                callback(data)
              } else {
                that.setState({ 
                  data: data
                });
              }
            });
          } else {
            console.log("Looks like the response wasn't perfect, got status: ", res.status);
          }
        })
  },
  editRecord: function(data, that, callback){ 
    var dataStr = JSON.stringify(data);
    this.postData('/editRecord', { dataStr })
        .then(({ status }) => {
          if (status === 200) {
            that.setState({rowInfo: null});
            callback();
          }
        })
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
  },
  formatDate: function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
