const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityname = document.querySelector(".form-control");
const search = document.querySelector(".btn");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    if (response.status == 404) {
        document.getElementById("cityinput").removeAttribute("disabled");
        document.getElementById("srch-btn").removeAttribute("disabled");
        document.getElementById("loading").style.display = "none";
        document.querySelector('#weather-card').style.display = "none";
        document.querySelector('.error').style.display = "block";
    }
    else {
        console.log(data);
        setTimeout(function () {
            document.getElementById("cityinput").removeAttribute("disabled");
            document.getElementById("srch-btn").removeAttribute("disabled");
            document.getElementById("loading").style.display = "none";
            document.querySelector('#weather-card').style.display = "block";
            document.querySelector('#weather-des').innerHTML = data.weather[0].description;
            document.querySelector('.city').innerHTML = data.name + ', ' + data.sys.country;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&deg;C';
            document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
            document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + ' km/h';
            if (data.weather[0].main == 'Clouds') {
                weathericon.src = 'media/cloudy.jpg'
            } else if (data.weather[0].main == 'Clear') {
                weathericon.src = 'media/sunnyday.jpg'
            } else if (data.weather[0].main == 'Rain') {
                weathericon.src = 'media/rainy.jpg'
            } else if (data.weather[0].main == 'Mist') {
                weathericon.src = 'media/foggy.jpg'
            } else if (data.weather[0].main == 'Snow') {
                weathericon.src = 'media/snowy.jpg'
            } else if (data.weather[0].main == 'Thunderstorm') {
                weathericon.src = 'media/stormy.jpg'
            }
            document.querySelector('.error').style.display = "none";
            document.querySelector('#weather-card').style.display = "block";
        }, 500);
    }
}

search.addEventListener("click", () => {
    document.querySelector('#weather-card').style.display = "none";
    document.getElementById("loading").style.display = "block";
    document.getElementById("cityinput").setAttribute("disabled", "true");
    document.getElementById("srch-btn").setAttribute("disabled", "true");
    checkWeather(cityname.value);
})

cityname.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        search.click();
    }
});