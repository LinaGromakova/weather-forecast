const apiKey = '979cabd5aa772eae05267fd8575349ad';
const btnEl = document.querySelector('#btn');
const inpEl = document.querySelector('#inp');
const infoForecastHTML = document.querySelector('.js-info-forecast');

let cityValue = '';
let generateHTML = '';

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
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
      <img src="img/icons/${
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
          <svg class="symbol" xmlns="http://www.w3.org/2000/svg" height="55px" viewBox="0 -960 960 960" width="55px" fill="#fff"><path d="M750-614q-27 27-62 41t-70 14q-35 0-69-13.5T488-614l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-689l-75 75-57-57 75-75q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-746l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-671l75-75 57 57-75 75Zm0 200q-27 27-61.5 40.5T619-360q-35 0-69.5-13.5T488-414l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-489l-75 75-57-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-546l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-471l75-75 57 57-75 75Zm-1 200q-27 27-61 40.5T619-160q-35 0-69.5-13.5T488-214l-76-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T266-289l-75 75-56-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-346l75 75q16 16 35.5 23.5T619-240q20 0 39-7.5t35-23.5l75-75 56 57-75 75Z"/></svg>
          </div>
        <div class="column">
          <h6>${response.main.humidity}%</h6>
          <h6>Humidity</h6>
        </div>
      </div>
      <div class="column-values">
        <div class="column">
          <svg class="symbol" xmlns="http://www.w3.org/2000/svg" height="55px" viewBox="0 -960 960 960" width="55px" fill="#fff"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z"/></svg>
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
