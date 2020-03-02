import React, { Component } from "react";
import { View, Text, StyleSheet, YellowBox } from "react-native";
import axios from "axios";
import Header from "./Header";
import WeatherImage from "./WeatherImage";
import Bottom from "./Bottom";
import Forecast from "./Forecast";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationErrorMessage: null,
      city: this.props.city,
      fetching: true
    };
    YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);
  }

  getLocation() {
    this._getLocationAsync().then(loc => {
      if (loc !== null) {
        this.setState({
          posLat: loc.coords.latitude,
          posLon: loc.coords.longitude
        });
        this.getCurrentWeather(this.state.city, true);
        this.getWeatherForecast(this.state.city, true);
      }
    });
  }

  componentDidMount() {
    this.getCurrentWeather(this.state.city, false);
    this.getWeatherForecast(this.state.city, false).then(() => {
      this.setState({ fetching: false });
      this.interval = setInterval(() => {
        this.getCurrentWeather(this.state.city, false);
        this.getWeatherForecast(this.state.city, false);
      }, 60000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStyling(className) {
    let day =
      this.state.icon &&
      this.state.icon.includes("d") &&
      !this.state.icon.includes("10d") &&
      !this.state.icon.includes("13d");

    switch (className) {
      case "subheader":
        if (day) {
          return styles.subheader;
        }
        return styles.subheader_night;
      case "breadtext": {
        if (day) {
          return styles.breadtext;
        }
        return styles.breadtext_night;
      }
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      return null;
    }

    return await Location.getCurrentPositionAsync({});
  };

  handleTextSubmitted = city => {
    city = city.trim();
    this.getCurrentWeather(city, false).then(res => {
      if (city !== "" && res !== "Error") {
        this.props.handleStorage({
          id: this.state.id,
          city: this.state.cityname,
          condition: this.state.icon
        });
      }
    });
    this.getWeatherForecast(city, false);
  };

  getWeatherForecast(city, getByPosition) {
    // let url = "";
    // if (getByPosition) {
    //   url =
    //     "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    //     this.state.posLat +
    //     "&lon=" +
    //     this.state.posLon +
    //     "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    // } else {
    let url =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    // }
    return axios
      .get(url)
      .then(res => {
        let weather = res.data;
        this.setState({
          fc_forecastList: weather.list
        });
      })
      .catch(err => {
        console.log("helvete2: " + err.message);
        return "Error";
      });
  }

  getCurrentWeather(city, getByPosition) {
    // let url = "";
    // if (getByPosition) {
    //   url =
    //     "http://api.openweathermap.org/data/2.5/weather?lat=" +
    //     this.state.posLat +
    //     "&lon=" +
    //     this.state.posLon +
    //     "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    // } else {
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    // }
    return axios
      .get(url)
      .then(res => {
        if (res.data) {
          let weather = res.data;
          this.setState({
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
            windSpeed: weather.wind.speed
          });
          console.log("Icon " + weather.weather[0].icon);
          return "Success";
        }
      })
      .catch(err => {
        console.log("helvete: " + err.message);
        return "Error";
      });
  }

  render() {
    if (!this.state.fetching) {
      return (
        <View style={styles.main}>
          <Header
            cityname={this.state.cityname}
            handleTextSubmitted={this.handleTextSubmitted}
            icon={this.state.icon}
            timezone={this.state.timezone}
          />
          <Text style={this.getStyling("subheader")}>{this.state.temp}°</Text>
          <Text style={this.getStyling("breadtext")}>
            Känns som {this.state.feelslike}°
          </Text>
          <WeatherImage
            humidity={this.state.humidity}
            description={this.state.description}
            icon={this.state.icon}
          />
          <Forecast
            icon={this.state.icon}
            list={this.state.fc_forecastList}
            timezone={this.state.timezone}
          />
          <Bottom
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            icon={this.state.icon}
            timezone={this.state.timezone}
          />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center"
  },
  subheader: {
    fontSize: 80,
    marginTop: "2%",
    textAlign: "center",
    marginLeft: 25,
    fontWeight: "bold"
  },
  subheader_night: {
    fontSize: 80,
    marginTop: "2%",
    textAlign: "center",
    color: "white",
    marginLeft: 20
  },
  breadtext: {
    fontSize: 18,
    fontWeight: "bold"
  },
  breadtext_night: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  }
});
