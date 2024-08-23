console.log('Hello World');

async function getWeather(location) {
	try {
		showLoadingIndicator();
		const response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=DPBTZYUK4L6UUS6PNS4DLRLPL&contentType=json`
		);
		const weatherData = await response.json();
		const processedWeatherData = processWeatherData(weatherData);
		console.log(weatherData);
		console.log(processedWeatherData);
		changeDOM(processedWeatherData);
	} catch (error) {
		console.error(error);
	} finally {
		hideLoadingIndicator();
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

function changeDOM(processedWeatherData) {
	// Select the weatherData div
	const weatherDataDiv = document.getElementById('weatherData');
	weatherDataDiv.innerHTML = ''; // Clear previous content

	// Create and append the address section
	const addressSection = document.createElement('div');
	const address = document.createElement('h1');
	address.textContent = `Address: ${processedWeatherData.address}`;
	addressSection.appendChild(address);
	weatherDataDiv.appendChild(addressSection);

	// Create and append the current conditions section
	const currentConditionsSection = document.createElement('div');
	const currentTitle = document.createElement('h2');
	currentTitle.textContent = 'Current Conditions';
	currentConditionsSection.appendChild(currentTitle);

	const ulCurrent = document.createElement('ul');

	const conditions = document.createElement('li');
	conditions.textContent = `Conditions: ${processedWeatherData.currentConditions.conditions}`;
	ulCurrent.appendChild(conditions);

	const temperature = document.createElement('li');
	temperature.textContent = `Temperature: ${processedWeatherData.currentConditions.temprature}°C`;
	ulCurrent.appendChild(temperature);

	const feelslike = document.createElement('li');
	feelslike.textContent = `Feels Like: ${processedWeatherData.currentConditions.feelslike}°C`;
	ulCurrent.appendChild(feelslike);

	const precipprob = document.createElement('li');
	precipprob.textContent = `Precipitation Probability: ${processedWeatherData.currentConditions.precipprob}%`;
	ulCurrent.appendChild(precipprob);

	const precip = document.createElement('li');
	precip.textContent = `Precipitation: ${processedWeatherData.currentConditions.precip}mm`;
	ulCurrent.appendChild(precip);

	const windspeed = document.createElement('li');
	windspeed.textContent = `Wind Speed: ${processedWeatherData.currentConditions.windspeed} km/h`;
	ulCurrent.appendChild(windspeed);

	currentConditionsSection.appendChild(ulCurrent);
	weatherDataDiv.appendChild(currentConditionsSection);

	// Create and append the forecast section
	const forecastSection = document.createElement('div');
	const forecastTitle = document.createElement('h2');
	forecastTitle.textContent = 'Forecast';
	forecastSection.appendChild(forecastTitle);

	const createForecastItem = (time, data) => {
		const item = document.createElement('div');
		const timeTitle = document.createElement('h3');
		timeTitle.textContent = time;
		item.appendChild(timeTitle);

		const ul = document.createElement('ul');

		const conditions = document.createElement('li');
		conditions.textContent = `Conditions: ${data.conditions}`;
		ul.appendChild(conditions);

		const temperature = document.createElement('li');
		temperature.textContent = `Temperature: ${data.temprature}°C`;
		ul.appendChild(temperature);

		const feelslike = document.createElement('li');
		feelslike.textContent = `Feels Like: ${data.feelslike}°C`;
		ul.appendChild(feelslike);

		const precipprob = document.createElement('li');
		precipprob.textContent = `Precipitation Probability: ${data.precipprob}%`;
		ul.appendChild(precipprob);

		const precip = document.createElement('li');
		precip.textContent = `Precipitation: ${data.precip}mm`;
		ul.appendChild(precip);

		const windspeed = document.createElement('li');
		windspeed.textContent = `Wind Speed: ${data.windspeed} km/h`;
		ul.appendChild(windspeed);

		item.appendChild(ul);
		return item;
	};

	// Today's forecast (hourly)
	const todayForecastTitle = document.createElement('h3');
	todayForecastTitle.textContent = "Today's Forecast (Hourly)";
	forecastSection.appendChild(todayForecastTitle);

	const todayForecast = document.createElement('div');
	['6', '9', '12', '15', '18', '21'].forEach((hour) => {
		todayForecast.appendChild(
			createForecastItem(`${hour}:00`, processedWeatherData.forcast.today[hour])
		);
	});
	forecastSection.appendChild(todayForecast);

	// Tomorrow's forecast
	const tomorrowForecastTitle = document.createElement('h3');
	tomorrowForecastTitle.textContent = "Tomorrow's Forecast";
	forecastSection.appendChild(tomorrowForecastTitle);
	forecastSection.appendChild(
		createForecastItem('Tomorrow', processedWeatherData.forcast.tomorrow)
	);

	// Day After Tomorrow's forecast
	const dayAfterTomorrowForecastTitle = document.createElement('h3');
	dayAfterTomorrowForecastTitle.textContent = "Day After Tomorrow's Forecast";
	forecastSection.appendChild(dayAfterTomorrowForecastTitle);
	forecastSection.appendChild(
		createForecastItem(
			'Day After Tomorrow',
			processedWeatherData.forcast.dayAfterTomorrow
		)
	);

	weatherDataDiv.appendChild(forecastSection);
}

function showLoadingIndicator() {
	const weatherDataDiv = document.getElementById('weatherData');

	let loadingIndicator = document.getElementById('loadingIndicator');
	if (!loadingIndicator) {
		loadingIndicator = document.createElement('div');
		loadingIndicator.id = 'loadingIndicator';
		loadingIndicator.textContent = 'Loading...';
		loadingIndicator.style.fontSize = '1.5rem';
		loadingIndicator.style.fontWeight = 'bold';
		loadingIndicator.style.textAlign = 'center';
		weatherDataDiv.appendChild(loadingIndicator);
	} else {
		loadingIndicator.style.display = 'block';
	}
}

function hideLoadingIndicator() {
	const loadingIndicator = document.getElementById('loadingIndicator');
	if (loadingIndicator) {
		loadingIndicator.style.display = 'none';
	}
}
