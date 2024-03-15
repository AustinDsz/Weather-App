const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const backclr = document.querySelector(".bg")
const card = document.querySelector(".card");
const apiKey = "<<API-KEY-HERE>>";
var x = window.matchMedia("(max-width: 600px)")

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = cityInput.value;
    
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("please enter a city");
    }
});

async function getWeatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        const response = await fetch(apiUrl);


        if(!response.ok){
            throw new Error("Could not fetch weather data");
        }

        return await response.json();

}

function displayWeatherInfo(data){
    console.log(data);
    const {name: city, 
           main:{temp, humidity, feels_like}, 
           weather:[{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feelsLike = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    feelsLike.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    feelsLike.classList.add("feelsLike");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLike);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);



}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300): //thunderstorm
            thunders();
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400): //drizzle
            thunders();
            return "🌧️";        
        case (weatherId >= 500 && weatherId < 600): //rain
            thunders();
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700): //snow
            return "❄️";
        case (weatherId >= 700 && weatherId < 800): //atmosphere(mist, smoke, haze....)
            hazy(x);
            // x.addEventListener("change", function() {
            //     hazy(x);
            // });
            return "🌫️";
        case (weatherId == 800): //clear
            hazy();
            return "☀️";
        case (weatherId >= 801 && weatherId < 805): //clouds
            thunders();
            return "☁️";
        default:
            return "❓";
    }
    
}

function hazy(){
    backclr.style.background = "no-repeat url('/images/cloudy.svg')";
    backclr.style.backgroundSize = "cover"
}

function thunders(){

    backclr.style.background = "no-repeat url('/images/thunder.svg')";
    backclr.style.backgroundSize = "cover"
}

function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
