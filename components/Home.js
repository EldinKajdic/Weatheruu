import React, { Component } from "react";
import { View, Text, StyleSheet, Image, YellowBox } from "react-native";
import axios from "axios";
import Header from "./Header";
import WeatherImage from "./WeatherImage";
import Bottom from "./Bottom";
import { AsyncStorage } from "react-native";
import Forecast from "./Forecast";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      location: null,
      locationErrorMessage: null,
      getByPosition: false
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
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
    this.displayClock();
    this.getCityFromStorage().then(res => {
      if (!res) {
        this.setState({ city: "Los Angeles" });
      }
      this.getCurrentWeather(this.state.city, false);
      this.getWeatherForecast(this.state.city, false).then(() => {
        this.setState({ fetching: false });
        this.interval = setInterval(() => {
          this.getCurrentWeather(this.state.cityname, false);
          this.getWeatherForecast(this.state.cityname, false);
        }, 60000);
      });
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
    this.setState({ getByPosition: false });
    this.getCurrentWeather(city, false).then(res => {
      if (city !== "" && res !== "Error") {
        this.setCityToStorage(this.state.cityname);
      } else {
        this.setState({ city: this.state.cityname });
      }
    });
    this.getWeatherForecast(city, false);
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

  getWeatherForecast(city, getByPosition) {
    let url = "";
    if (getByPosition) {
      url =
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        this.state.posLat +
        "&lon=" +
        this.state.posLon +
        "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    } else {
      url =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    }
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
    let url = "";
    if (getByPosition) {
      url =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        this.state.posLat +
        "&lon=" +
        this.state.posLon +
        "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    } else {
      console.log("notgetby");
      url =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=se&APPID=226fd91c4c5ca42a13fd514c65294633";
    }
    return axios
      .get(url)
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
        if (this.state.getByPosition && this.state.cityname !== weather.name) {
          console.log("entered");
          this.setCityToStorage(this.state.cityname);
        }
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
          <Text style={styles.loadingText}>Loading</Text>
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
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 120,
    maxWidth: 150
  },
  loadingText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    textAlign: "center"
  }
});
