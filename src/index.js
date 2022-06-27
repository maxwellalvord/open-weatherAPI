import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      try {
        const response = JSON.parse(this.responseText);
        getElements(response);
      } catch(error) {
        console.error(`Red alert! We have an error: ${error.message}`);
      }
    }

    request.open("GET", url, true);
    request.send();


    function getElements(response) {
      const f = 1.8 * (response.main.temp - 273) + 32
      const fmin = 1.8 * (response.main.temp_min - 273) + 32
      const fmax = 1.8 * (response.main.temp_max - 273) + 32
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ` + f  + ` degrees.`);
      $('.showWindSpeed').text(`The wind speed in MPH is ${response.wind.speed}.`);
      $('.showDescript').text(`The weather description is ${response.weather[0].description}.`);
      $('.showTempMin').text(`The low for today is ` + fmin  + ` degrees.`);
      $('.showTempMax').text(`High for today is ` + fmax  + ` degrees.`);
    }
    
  });
});
