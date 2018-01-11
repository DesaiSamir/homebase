import request from 'superagent';
import ApiHelper from './apiHelper';
const endPoint = 'http://tul1dsgdapp01.corporate.local:8089/v1/cqa-reports/';

const Apis = {
	"/": "getData/sports/sportTypes",
	"/sports": "getData/sports/sportsCompetitions",
	"/league": "getData/sports/sportTeams",
	"/matchUpCoverage": "getData/sports/matchUpCoverage",
	"/logoCoverage": "getData/sports/logoCoverage",
	"/team": "getData/sports/sportPlayers",
	"/games": "postData"
};
const queries = {

};
function getPath(url) {
    return Apis[url];
};

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
        let path = ApiHelper.doPostEndPoint(pathParam);
        return request
                .post(path.path)
                .send(path.data)
                .set('Content-Type', 'application/json');
    }
}