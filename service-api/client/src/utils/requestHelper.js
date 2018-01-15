// import request from 'superagent';
// import ApiHelper from './apiHelper';

export default {

    getData: function (path, queryString = "", cb) {
    	//pathParam = pathParam.split("/")[1];
        // let path = ApiHelper.doGetEndPoint(pathParam);
        return window.fetch(path, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    },

    postData: function(path, queryString = "", cb) {
        // let path = ApiHelper.doPostEndPoint(pathParam, queryString);
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