import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import Header from "./Header";
import WeatherImage from "./WeatherImage";
import Bottom from "./Bottom";
import { AsyncStorage } from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async getCityFromStorage() {
    try {
      const value = await AsyncStorage.getItem("city");
      if (value !== null) {
        this.setState({ city: value });
      } else {
        this.setState({ city: value });
      }
    } catch (error) {
      this.setState({ city: value });
    }
  }

  async setCityToStorage(city) {
    try {
      await AsyncStorage.setItem("city", city);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCityFromStorage().then(() => {
      this.getCurrentWeather(this.state.city);
      this.getCurrentTime();
      this.interval = setInterval(() => {
        this.getCurrentTime();
        this.getCurrentWeather(this.state.city);
      }, 10000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTextSubmitted = city => {
    city = city.trim();
    this.setCityToStorage(city);
    this.setState({ city });
    this.getCurrentWeather(city);
  };

  getCurrentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var d = today.toLocaleDateString("sv-se", {
      weekday: "long"
    });

    let timestamp =
      d
        .charAt(0)
        .toString()
        .toUpperCase() +
      d.slice(1) +
      ", " +
      h +
      ":" +
      (m.toString().length == 1 ? "0" : "") +
      m;
    this.setState({ timestamp });
  }

  getWeatherForecast() {}

  getCurrentWeather(city) {
    return axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633"
      )
      .then(res => {
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
          cityname: weather.name,
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
        this.props.handleCurrentCondition(this.state.icon);
      })
      .catch(err => {
        console.log("helvete" + err.message);
      });
  }

  render() {
    return (
      <View style={styles.main}>
        <Header
          timestamp={this.state.timestamp}
          cityname={this.state.cityname}
          handleTextSubmitted={this.handleTextSubmitted}
          icon={this.state.icon}
        />
        <View>
          <Text
            style={
              this.state.icon && this.state.icon.includes("d")
                ? styles.subheader
                : styles.subheader_night
            }
          >
            {this.state.temp}°
          </Text>
          <Text
            style={
              this.state.icon && this.state.icon.includes("d")
                ? styles.breadtext
                : styles.breadtext_night
            }
          >
            Känns som {this.state.feelslike}°
          </Text>
        </View>
        <WeatherImage
          humidity={this.state.humidity}
          description={this.state.description}
          icon={this.state.icon}
        />
        <Bottom
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          icon={this.state.icon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center"
  },
  subheader: {
    fontSize: 80,
    fontWeight: "bold",
    marginTop: "5%",
    textAlign: "center"
  },
  subheader_night: {
    fontSize: 80,
    fontWeight: "bold",
    marginTop: "5%",
    textAlign: "center",
    color: "white"
  },
  breadtext: {
    fontSize: 18
  },
  breadtext_night: {
    fontSize: 18,
    color: "white"
  }
});
