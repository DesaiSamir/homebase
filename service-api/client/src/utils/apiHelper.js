const endPoint = 'http://localhost:3001';

const Apis = {
	"/login": "/login",
	"/sports": "getData/sports/sportsCompetitions"
};

const queries = {
	"/": "",
	"/sports": "?paramName=sportType&paramValue="
};

function getPath(url) {
    return Apis[url];
};
function getQueryString(url) {
    return queries[url];
};

module.exports = {

	doGetEndPoint: function(url) {
		let path = url.split("/");
		let apiPath = endPoint + getPath("/" + path[1]) + getQueryString("/" + path[1]) + (path[2]?path[2]:"");
		return apiPath;
	},

	doPostEndPoint: function(url, args) {
		let path = url.split("/");
		let apiPath = endPoint + getPath("/" + path[1]);
		let postData = args;
		return {path: apiPath, data: postData};
	}
}