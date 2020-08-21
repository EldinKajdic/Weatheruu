import axios from "axios";

export class WeatherAPI {
  getCurrentWeather(city) {
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&APPID=226fd91c4c5ca42a13fd514c65294633";
    return axios
      .get(url)
      .then((res) => {
        if (res.data) {
          let weather = res.data;
          let obj = {
            base: weather.base,
            clouds: weather.clouds.all,
            cod: weather.cod,
            lat: weather.coord.lat,
            lon: weather.coord.lon,
            dt: weather.dt,
            id: weather.id,
            feelslike:
              weather.main.feels_like.toFixed(0) == "-0"
                ? "0"
                : weather.main.feels_like.toFixed(0),
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            temp:
              weather.main.temp.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp.toFixed(0),
            temp_max:
              weather.main.temp_max.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp_max.toFixed(0),
            temp_min:
              weather.main.temp_min.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp_min.toFixed(0),
            cityname:
              weather.name == "Stockholbma" ? "Stockholm" : weather.name,
            country: weather.sys.country,
            sunrise: weather.sys.sunrise,
            sunset: weather.sys.sunset,
            timezone: weather.timezone,
            visibility: weather.visibility,
            description:
              weather.weather[0].description == "dis"
                ? "Dimma"
                : weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1),
            icon: weather.weather[0].icon,
            info: weather.weather[0].main,
            windDeg: weather.wind.deg,
            windSpeed: weather.wind.speed,
          };

          return obj;
        }
      })
      .catch((err) => {
        return "Error";
      });
  }

  getCurrentWeatherByLocation() {
    let url =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.posLat +
      "&lon=" +
      this.state.posLon +
      "&units=metric&APPID=226fd91c4c5ca42a13fd514c65294633";
    return axios
      .get(url)
      .then((res) => {
        if (res.data) {
          let weather = res.data;
          let obj = {
            base: weather.base,
            clouds: weather.clouds.all,
            cod: weather.cod,
            lat: weather.coord.lat,
            lon: weather.coord.lon,
            dt: weather.dt,
            id: weather.id,
            feelslike:
              weather.main.feels_like.toFixed(0) == "-0"
                ? "0"
                : weather.main.feels_like.toFixed(0),
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            temp:
              weather.main.temp.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp.toFixed(0),
            temp_max:
              weather.main.temp_max.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp_max.toFixed(0),
            temp_min:
              weather.main.temp_min.toFixed(0) == "-0"
                ? "0"
                : weather.main.temp_min.toFixed(0),
            cityname:
              weather.name == "Stockholbma" ? "Stockholm" : weather.name,
            country: weather.sys.country,
            sunrise: weather.sys.sunrise,
            sunset: weather.sys.sunset,
            timezone: weather.timezone,
            visibility: weather.visibility,
            description:
              weather.weather[0].description == "dis"
                ? "Dimma"
                : weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1),
            icon: weather.weather[0].icon,
            info: weather.weather[0].main,
            windDeg: weather.wind.deg,
            windSpeed: weather.wind.speed,
          };

          return obj;
        }
      })
      .catch((err) => {
        return "Error";
      });
  }

  getWeatherForecast(city) {
    let url =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&APPID=226fd91c4c5ca42a13fd514c65294633";
    return axios
      .get(url)
      .then((res) => {
        let weather = res.data;
        return weather.list;
      })
      .catch((err) => {
        console.log(err.message);
        return "Error";
      });
  }

  getWeatherForecastByLocation() {
    let url = (url =
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      this.state.posLat +
      "&lon=" +
      this.state.posLon +
      "&units=metric&APPID=226fd91c4c5ca42a13fd514c65294633");

    return axios
      .get(url)
      .then((res) => {
        let weather = res.data;
        return weather.list;
      })
      .catch((err) => {
        console.log(err.message);
        return "Error";
      });
  }
}
