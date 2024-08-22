console.log('Hello World');

async function getWeather(location) {
	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=DPBTZYUK4L6UUS6PNS4DLRLPL&contentType=json`
		);
		const weatherData = await response.json();
		console.log(weatherData);
	} catch (error) {
		console.error(error);
	}
}

getWeather('Stuttgart');
