console.log('Hello World');

async function getWeather(location) {
	try {
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=DPBTZYUK4L6UUS6PNS4DLRLPL&contentType=json`
		);
		const weatherData = await response.json();
		console.log(weatherData);
		console.log(processWeatherData(weatherData));
	} catch (error) {
		console.error(error);
	}
}

function processWeatherData(weatherData) {
	return {
		address: weatherData.resolvedAddress,
		currentConditions: {
			conditions: weatherData.currentConditions.conditions,
			temprature: weatherData.currentConditions.temp,
			feelslike: weatherData.currentConditions.feelslike,
			precipprob: weatherData.currentConditions.precipprob,
			precip: weatherData.currentConditions.precip,
			windspeed: weatherData.currentConditions.windspeed,
		},
		forcast: {
			today: {
				6: {
					conditions: weatherData.days[0].hours[6].conditions,
					temprature: weatherData.days[0].hours[6].temp,
					feelslike: weatherData.days[0].hours[6].feelslike,
					precipprob: weatherData.days[0].hours[6].precipprob,
					precip: weatherData.days[0].hours[6].precip,
					windspeed: weatherData.days[0].hours[6].windspeed,
				},
				9: {
					conditions: weatherData.days[0].hours[9].conditions,
					temprature: weatherData.days[0].hours[9].temp,
					feelslike: weatherData.days[0].hours[9].feelslike,
					precipprob: weatherData.days[0].hours[9].precipprob,
					precip: weatherData.days[0].hours[9].precip,
					windspeed: weatherData.days[0].hours[9].windspeed,
				},
				12: {
					conditions: weatherData.days[0].hours[12].conditions,
					temprature: weatherData.days[0].hours[12].temp,
					feelslike: weatherData.days[0].hours[12].feelslike,
					precipprob: weatherData.days[0].hours[12].precipprob,
					precip: weatherData.days[0].hours[12].precip,
					windspeed: weatherData.days[0].hours[12].windspeed,
				},
				15: {
					conditions: weatherData.days[0].hours[15].conditions,
					temprature: weatherData.days[0].hours[15].temp,
					feelslike: weatherData.days[0].hours[15].feelslike,
					precipprob: weatherData.days[0].hours[15].precipprob,
					precip: weatherData.days[0].hours[15].precip,
					windspeed: weatherData.days[0].hours[15].windspeed,
				},
				18: {
					conditions: weatherData.days[0].hours[18].conditions,
					temprature: weatherData.days[0].hours[18].temp,
					feelslike: weatherData.days[0].hours[18].feelslike,
					precipprob: weatherData.days[0].hours[18].precipprob,
					precip: weatherData.days[0].hours[18].precip,
					windspeed: weatherData.days[0].hours[18].windspeed,
				},
				21: {
					conditions: weatherData.days[0].hours[21].conditions,
					temprature: weatherData.days[0].hours[21].temp,
					feelslike: weatherData.days[0].hours[21].feelslike,
					precipprob: weatherData.days[0].hours[21].precipprob,
					precip: weatherData.days[0].hours[21].precip,
					windspeed: weatherData.days[0].hours[21].windspeed,
				},
			},
			tomorrow: {
				conditions: weatherData.days[1].conditions,
				temprature: weatherData.days[1].temp,
				feelslike: weatherData.days[1].feelslike,
				precipprob: weatherData.days[1].precipprob,
				precip: weatherData.days[1].precip,
				windspeed: weatherData.days[1].windspeed,
			},
			dayAfterTomorrow: {
				conditions: weatherData.days[2].conditions,
				temprature: weatherData.days[2].temp,
				feelslike: weatherData.days[2].feelslike,
				precipprob: weatherData.days[2].precipprob,
				precip: weatherData.days[2].precip,
				windspeed: weatherData.days[2].windspeed,
			},
		},
	};
}

const locationInput = document.querySelector('#location');
const form = document.querySelector('#searchForm');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (locationInput.value === '' || locationInput.value === null) {
		getWeather('Berlin');
	} else {
		getWeather(locationInput.value);
	}
});
