const apiKey = '7556cca6db5c4d37bd122220251709'; // Your WeatherAPI key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert('Please enter a city name.');
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { location, current } = data;
    weatherResult.innerHTML = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p><strong>Temperature:</strong> ${current.temp_c} °C</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <img src="${current.condition.icon}" alt="Weather Icon">
    `;
}
