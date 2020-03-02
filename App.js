import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  Text,
  Image,
  Animated
} from "react-native";
import Home from "./components/Home";
import { conditions } from "./models/conditions";
import { AsyncStorage } from "react-native";

var deviceWidth = Dimensions.get("window").width;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    //this.resetStorage();
    this.getCitiesFromStorage().then(res => {
      if (res === null) {
        this.setState({
          cities: [{ id: 0, city: "Los Angeles", condition: "01d" }]
        });
      } else {
        this.setState({ cities: JSON.parse(res) });
      }
      this.setState({ loading: false });
    });
  }

  async resetStorage() {
    AsyncStorage.clear();
  }

  handleStorage = weather => {
    if (weather) {
      let cities = [...this.state.cities];
      let index = cities.findIndex(c => c.id === weather.id);
      if (index != -1) {
        cities.splice(index, 1);
        cities.unshift(weather);
      } else {
        cities.unshift(weather);
        if (cities.length > 5) {
          for (let i = cities.length - 1; cities.length > 5; i--) {
            cities.splice(i, 1);
          }
        } else if (cities.some(c => c.id === 0)) {
          let defaultIndex = cities.findIndex(c => c.id === 0);
          cities.splice(defaultIndex, 1);
        }
      }
      cities.forEach(s => console.log(s));
      this.setCityToStorage(JSON.stringify(cities));
      this.setState({ cities });
    }
  };

  getImageSource(condition) {
    var imageSource = "";
    switch (condition) {
      case "01d":
        imageSource = conditions.sunny;
        break;
      case "02d":
        imageSource = conditions.sunny;
        break;
      case "03d":
        imageSource = conditions.cloudy;
        break;
      case "04d":
        imageSource = conditions.cloudy;
        break;
      case "09d":
        imageSource = conditions.hard_rain;
        break;
      case "10d":
        imageSource = conditions.sunny_dawn;
        break;
      case "11d":
        imageSource = conditions.lightning;
        break;
      case "13d":
        imageSource = conditions.snowing;
        break;
      case "50d":
        imageSource = conditions.cloudy;
        break;

      case "01n":
        imageSource = conditions.night;
        break;
      case "02n":
        imageSource = conditions.clouds;
        break;
      case "03n":
        imageSource = conditions.clouds;
        break;
      case "04n":
        imageSource = conditions.clouds_night;
        break;
      case "09n":
        imageSource = conditions.clouds;
        break;
      case "10n":
        imageSource = conditions.sunny_dawn;
        break;
      case "11n":
        imageSource = conditions.lightning;
        break;
      case "13n":
        imageSource = conditions.snowing_night;
        break;
      case "50n":
        imageSource = conditions.clouds_night;
        break;
      default:
        imageSource = conditions.night_fog;
        break;
    }

    return imageSource;
  }

  async getCitiesFromStorage() {
    try {
      let cities = await AsyncStorage.getItem("cities");
      return cities == null ? null : JSON.parse(cities);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async setCityToStorage(city) {
    try {
      await AsyncStorage.setItem("cities", JSON.stringify(city));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={this.state.cities.length > 1}
          >
            {this.state.cities.map(prop => {
              return (
                <View style={styles.weatherComponent} key={prop.id}>
                  <ImageBackground
                    source={this.getImageSource(prop.condition)}
                    style={styles.overlay}
                  >
                    <View style={styles.home}>
                      <Home
                        handleCurrentCondition={this.handleCurrentCondition}
                        city={prop.city}
                        handleStorage={this.handleStorage}
                      ></Home>
                      {/* <Animated.View // we will animate the opacity of the dots later, so use Animated.View instead of View here
                        key={prop.id} // we will use i for the key because no two (or more) elements in an array will have the same index
                        style={{
                          height: 10,
                          width: 10,
                          backgroundColor: "#595959",
                          margin: 8,
                          borderRadius: 5
                        }}
                      /> */}
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.spinnerMain}>
          <Image
            style={styles.spinner}
            source={require("./assets/images/spinner2.gif")}
          ></Image>
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  spinnerMain: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
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
  },
  weatherComponent: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  overlay: {
    width: "100%",
    height: "100%"
  },
  home: {
    paddingTop: "15%"
  }
});
