const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "de44ca241a0736658ff3666a11828b14";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weattherData = await getWeatherdata(city);
      displayWeatherInfo(weattherData);
    } catch (error) {
      console.error(error);
      displayErrar("Please Enter City Name");
    }
  } else {
    displayErrar("Please Enter City Name");
  }
});

async function getWeatherdata(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  if (!response.ok) {
    throw new Error("Couldn't fetch weather data");
  } else {
    return await response.json();
  }
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex"

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("displaycity")
  card.appendChild(cityDisplay)

  tempDisplay.textContent = `${Math.round(temp - 273)}°C`;
  tempDisplay.classList.add("gg");
  card.appendChild(tempDisplay);

  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("displayHumidity");
  card.appendChild(humidityDisplay);

  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWeatheremoji(id);
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(weatherEmoji);
}
function getWeatheremoji(weathId) {

  switch (true) {
    case (weathId >= 200 && weathId < 300):
      return '🌩️';
    case (weathId >= 300 && weathId < 400):
      return '⛈️';
    case (weathId >= 500 && weathId < 600):
      return "⛈️";
    case (weathId >= 600 && weathId < 700):
      return "🌨️";
    case (weathId >= 700 && weathId < 800):
      return "🌫️";
    case (weathId === 800):
      return "☀️";
    case (weathId >= 801 && weathId < 810):
      return "⛅";
    default:
      return "☀️";
  }

}

function displayErrar(massage) {
  const errorDisplay = document.createElement("p");
  errorDisplay.innerHTML = massage;
  errorDisplay.classList.add("displayerror");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
