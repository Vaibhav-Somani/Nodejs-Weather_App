var request = require("request");

var geocodeAddress = function(address, callback){
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		// To indicate that incoming request is JSON and convert it to an object
		json: true

		// The body is the data that comes back from the server
	}, function(error, response, body){
		// Formatting the body to print it to the console
		// We returned the body as a object from above. Now we again convert to JSON to print all the properties
		//console.log(JSON.stringify(body, undefined, 2)); 
		if(error){
			callback("Unable to connect to google servers");
		}
		// This error is specific to google geo code API. 
		else if(body.status === "ZERO_RESULTS"){
			callback("Unable to find that address");
		}
		else if(body.status === "OK"){
			callback(undefined, {
				Address: body.results[0].formatted_address,
				Latitude: body.results[0].geometry.location.lat,
				Longitude: body.results[0].geometry.location.lng
			})
		}	
	});
}
	
module.exports = {
	geocodeAddress
}

// 3e36c5460c90801457c4928621f6ae8e