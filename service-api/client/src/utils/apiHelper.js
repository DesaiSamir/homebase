const endPoint = 'http://localhost:3001/';

const Apis = {
	"/login": "/login",
	"/sports": "getData/sports/sportsCompetitions",
	"/league": "getData/sports/sportTeams",
	"/matchUpCoverage": "getData/sports/matchUpCoverage",
	"/logoCoverage": "getData/sports/logoCoverage",
	"/team": "getData/sports/sportPlayers",
	"/games": "postData"
};

const queries = {
	"/": "",
	"/sports": "?paramName=sportType&paramValue=",
	"/league": "?paramName=competitionId&paramValue=",
	"/matchUpCoverage": "?paramName=competitionId&paramValue=",
	"/logoCoverage": "?paramName=competitionId&paramValue=",
	"/team": "?paramName=teamId&paramValue="
};

function getPostData(query, args) {
	if(query.indexOf("games") !== -1)
		return getGamesPostData(args);
}
function getPath(url) {
    return Apis[url];
};
function getQueryString(url) {
    return queries[url];
};
function getGamesPostData(args) {
	var params = [];
        var param = {
            paramName: "startDate",
            paramValue: args[1]
        };
        params.push(param);

        param = {
            paramName: "endDate",
            paramValue: args[2]
        };
        params.push(param);

        param = {
            paramName: "competitionId",
            paramValue: args[0]
        };
        params.push(param);
        var postData = {
            pathKey: "sports",
            queryName: "sportGames",
            params: params
        };
    return postData;
};

module.exports = {

	doGetEndPoint: function(url) {
		let path = url.split("/");
		let apiPath = endPoint + getPath("/" + path[1]) + getQueryString("/" + path[1]) + (path[2]?path[2]:"");
		return apiPath;
	},

	doPostEndPoint: function(url) {
		let path = url.split("/");
		let apiPath = endPoint + getPath("/" + path[1]);
		let postData = getPostData(path[1], [path[2], path[3], path[4]]);
		return {path: apiPath, data: postData};
	}
}