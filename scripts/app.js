const apiKey = '979cabd5aa772eae05267fd8575349ad';
const btnEl = document.querySelector('#btn');
const inpEl = document.querySelector('#inp');
const infoForecastHTML = document.querySelector('.js-info-forecast');

let cityValue = '';
let generateHTML = '';

btnEl.addEventListener('click', () => {
  cityValue = inpEl.value;
  getWeather();
});
async function getWeather() {
  let url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${apiKey}`
  );
  let response = await url.json();
  if (!response.ok) {
    generateHTML = `
    <h1 class="error-title">404</h1>
    <h3 class="error-subtitle">Not Found</h3>
    <p class="error-par">Maybe you're wrong. Try again</p>
    `;
    infoForecastHTML.innerHTML = generateHTML;
  }

  let date = '';
  response.dt >= response.sys.sunrise && response.dt < response.sys.sunset
    ? (date = 'day')
    : (date = 'night');
  generateHTML = `
    <div class="wrapper">
      <img src="img/${
        response.weather[0].main
      }-${date}.png" alt="weather-icon" />
      <div class="temperature">
        <span>${Math.floor(response.main.temp).toFixed(0)}</span>
        <span class="celsius">℃</span>
      </div>
      <h3>${response.weather[0].main}</h3>
      <div class="column-wrapper-values">
      <div class="column-values">
        <div class="column">
          <h3 class="symbol">&#8779;</h3>
        </div>
        <div class="column">
          <h6>${response.main.humidity}%</h6>
          <h6>Humidity</h6>
        </div>
      </div>
      <div class="column-values">
        <div class="column">
          <h3 class="symbol">༄</h3>
        </div>
        <div class="column">
          <h6>${Math.floor(response.wind.speed)}Km/h</h6>
          <h6>Wind Speed</h6>
        </div>
      </div>
    </div>
    `;
  localStorage.setItem('card', JSON.stringify(generateHTML));
  localStorage.setItem('city', inpEl.value);
  return (infoForecastHTML.innerHTML = generateHTML);
}
infoForecastHTML.innerHTML = JSON.parse(localStorage.getItem('card'));
inpEl.value = localStorage.getItem('city');
