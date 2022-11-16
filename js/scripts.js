const apiKey = "e46224870ee964c3086ebd50a7b9e115";
const apiCountryURL = "https://countryflagsapi.com/svg/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";


const cityinput = document.querySelector("#city-input");
const searchbtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

const getWeatherData = async(city) => {
    toggleLoader();


    const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br';
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();
    return data

};

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };

  const showWeatherData = async (city) => {
    hideInformation();


  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText= data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
   
   );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerText = '${data.main.humidity}%';
  windElement.innerText = '${data.wind.speed}km/h';

};

document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");


searchbtn.addEventListener("click", async (e) =>{
    e.preventDefault();
    const city = cityinput.value;
    
    showWeatherData(city);
});

cityinput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });
  
  
  suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });