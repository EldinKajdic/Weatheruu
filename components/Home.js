import React, { Component } from "react";
import { View, Text, StyleSheet, Image, YellowBox } from "react-native";
import axios from "axios";
import Header from "./Header";
import WeatherImage from "./WeatherImage";
import Bottom from "./Bottom";
import { AsyncStorage } from "react-native";
import Forecast from "./Forecast";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
    YellowBox.ignoreWarnings([
      "VirtualizedLists should never be nested" // TODO: Remove when fixed
    ]);
  }

  async getCityFromStorage() {
    try {
      const value = await AsyncStorage.getItem("city");
      if (value !== null) {
        this.setState({ city: value });
      } else {
        this.setState({ city: "Los Angeles" });
      }
    } catch (error) {
      this.setState({ city: "Los Angeles" });
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
    this.displayClock();
    this.getCityFromStorage().then(() => {
      this.getCurrentWeather(this.state.city);
      this.getWeatherForecast(this.state.city).then(() => {
        this.setState({ fetching: false });
      });
      this.interval = setInterval(() => {
        this.getCurrentWeather(this.state.cityname);
        this.getWeatherForecast(this.state.cityname);
      }, 60000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  getStyling(className) {
    let day =
      this.state.icon &&
      this.state.icon.includes("d") &&
      !this.state.icon.includes("10d") &&
      !this.state.icon.includes("50d");

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

  handleTextSubmitted = city => {
    city = city.trim();
    this.getCurrentWeather(city).then(res => {
      if (city !== "" && res !== "Error") {
        this.getWeatherForecast(city);
        this.setCityToStorage(this.state.cityname);
      } else {
        this.setState({ city: this.state.cityname });
      }
    });
  };

  displayClock() {
    this.getCurrentTime();
    this.interval2 = setInterval(() => {
      this.getCurrentTime();
    }, 500);
  }

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
      (h.toString().length == 1 ? "0" : "") +
      h +
      ":" +
      (m.toString().length == 1 ? "0" : "") +
      m;
    this.setState({ timestamp });
  }

  getWeatherForecast(city) {
    return axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633"
      )
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
          cityname: weather.name == "Stockholbma" ? "Stockholm" : weather.name,
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
        console.log(this.state.icon);
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
            timestamp={this.state.timestamp}
            cityname={this.state.cityname}
            handleTextSubmitted={this.handleTextSubmitted}
            icon={this.state.icon}
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
          <Forecast icon={this.state.icon} list={this.state.fc_forecastList} />
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
      return (
        <View style={styles.spinnerMain}>
          <Image
            style={styles.spinner}
            source={require("../assets/images/spinner2.gif")}
          ></Image>
          <Text style={styles.loadingText}>Hämtar väder...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center"
  },
  spinnerMain: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  subheader: {
    fontSize: 80,
    marginTop: "2%",
    textAlign: "center",
    marginLeft: 25,
    fontWeight: 'bold'
  },
  subheader_night: {
    fontSize: 80,
    marginTop: "2%",
    textAlign: "center",
    color: "white",
    marginLeft: 25
  },
  breadtext: {
    fontSize: 18,
    fontWeight: "bold"
  },
  breadtext_night: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 80,
    maxWidth: 200
  },
  loadingText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold"
  }
});
