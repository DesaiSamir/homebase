import request from 'superagent';
import ApiHelper from './apiHelper';

function postRequest(pathParam) {
	let path = ApiHelper.doPostEndPoint(pathParam);
        return request
                .post(path.path)
                .send(path.data)
                .set('Content-Type', 'application/json');
}

export default {

    getData: function (pathParam, queryString = "", cb) {
    	//pathParam = pathParam.split("/")[1];
        let path = ApiHelper.doGetEndPoint(pathParam);
        if(path.indexOf("postData") === -1){
        	return request.get(path);
         } else {
         	return postRequest(pathParam);
         }
    },

    postData: function(pathParam, queryString = "", cb) {
        let path = ApiHelper.doPostEndPoint(pathParam, queryString);
        return window.fetch(path.path, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(path.data)
          });
    }
}