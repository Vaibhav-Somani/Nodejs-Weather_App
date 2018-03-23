var request = require("request");


var getWeather = (location, callback) => {
	console.log(location);
	request({
	url : `https://api.darksky.net/forecast/3e36c5460c90801457c4928621f6ae8e/${location.lat},${location.lon}`,
	json : true
	}, function(error, response, body){
		/*if(error){
			console.log("Unable to connect to forcast.io servers");
		}
		else if(response.statusCode === 400){
			console.log("Unable to fetch weather");
		}
		else if(response.statusCode === 200){
			console.log(`Temperature: ${body.currently.temperature}`);
		}*/

		// A better way
		if(!error && response.statusCode === 200){
			console.log(`Temperature: ${body.currently.temperature}`);
		}
		else{
			console.log("Unable to fetch weather");
		}
	});
};

module.exports = {
	getWeather
}


