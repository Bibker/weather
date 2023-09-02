$(document).ready(function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            getWeatherData(lat, lon)

        })
    }

    else
        alert("Your Browser Does not Support Location Access.\nPlease Choose your City.")

});

function getWeatherData(lat, lon) {
    $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cc09bbdf72f48f618b4b24b31df5548d`, function (weatherData) {
        setWeatherData(weatherData)

    })
}

function setWeatherData(weatherData) {
    console.log(weatherData);
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    const city = weatherData.name;
    const country=weatherData.sys.country;
    const currentDateTime = moment().format('dddd |MMMM  Do | h:mm a')
    const currentTemp = weatherData.main.temp
    const minTemp = weatherData.main.temp_min;
    const maxTemp = weatherData.main.temp_max;
    const minMaxTemp = `MIN ${minTemp}&deg; C | MAX ${maxTemp}&deg; C`;
    $(".weather-condition").attr("src", `img/${weatherCondition}.png`)
    $(".place").html(`${city}, ${country}`);
    $(".day-date-time").html(currentDateTime);
    $(".current-temp").html(`${currentTemp}&deg; C`)
    $(".min-max-temp").html(minMaxTemp)
}

$(".search-button").click(function (e) {
    const cityName = $(".city-name").val();
    $.get(`https://www.mapquestapi.com/geocoding/v1/address?key=ILQMmd2moBecDfMul2FEDWeNGXbRK5yy&location=${cityName}`, function (data) {
        const lat = data.results[0].locations[0].latLng.lat  //Getting lat & Lon for user Entered City Name through MapQuest API
        const lon = data.results[0].locations[0].latLng.lng
        getWeatherData(lat, lon)

    }
    );

});