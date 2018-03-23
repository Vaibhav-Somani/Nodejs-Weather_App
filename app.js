//var request = require("request");
var yargs = require("yargs");
var geocode = require("./geocode/geocode.js");
var weather = require("./weather/weather.js");
var location = {
	lat : "",
	lon : ""
}

var argv = yargs
	.options ({
		a : {
			demand: true,
			alias : "address",
			describe: "Address to fetch weather for",
			// String takes a boolean. Always parse the address as a string
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;
//console.log(argv);

// The process of abstraction was to hide the process about how the functionality is implemented
// We don't want to know what server is been called, etc..
/*After we get the address from the server, we implement a callback function
which will eith give an error or print out the results
*/
geocode.geocodeAddress(argv.a, (error, results) => {
	if(error){
		console.log(error);
	}
	else{
		// Pretty printing the object
		//console.log(JSON.stringify(results, undefined, 2));
		console.log(results.Address);
		location.lat = results.Latitude;
		location.lon = results.Longitude;
		/*console.log(location.lat);
		console.log(location.lon);*/

		// Chaining the commands
		weather.getWeather(location, (error, weatherResults) => {
		if(error){
			console.log(error);
		}
		else{
			console.log(weatherResults);
		}
});
	}
});

/*weather.getWeather(location, (error, results) => {
	if(error){
		console.log(error);
	}
	else{
		console.log(results);
	}
});*/

