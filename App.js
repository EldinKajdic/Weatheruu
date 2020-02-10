import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import Home from "./components/Home";
import { conditions } from "./models/conditions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleCurrentCondition = condition => {
    this.setState({ condition });
  };
  render() {
    var imageSource = "";
    switch (this.state.condition) {
      case "01d":
        imageSource = conditions.sunny;
        break;
      case "02d":
        imageSource = conditions.sunny;
        break;
      case "03d":
        imageSource = conditions.clouds;
        break;
      case "04d":
        imageSource = conditions.clouds;
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
        imageSource = conditions.cloudy;
        break;
      case "03n":
        imageSource = conditions.cloudy;
        break;
      case "04n":
        imageSource = conditions.clouds_night;
        break;
      case "09n":
        imageSource = conditions.hard_rain;
        break;
      case "10n":
        imageSource = conditions.sunny_dawn;
        break;
      case "11n":
        imageSource = conditions.lightning;
        break;
      case "13n":
        imageSource = conditions.night_snow;
        break;
      case "50n":
        imageSource = conditions.night_fog;
        break;
      default:
        imageSource = conditions.night_fog;
        break;
    }
    return (
      <ScrollView keyboardShouldPersistTaps="never" scrollEnabled="false">
        <View style={styles.container}>
          <ImageBackground source={imageSource} style={styles.overlay}>
            <View style={styles.home}>
              <Home handleCurrentCondition={this.handleCurrentCondition}></Home>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#90caf9",
    alignItems: "center",
    minHeight: "100%"
  },
  overlay: {
    width: "100%",
    height: "100%"
  },
  home: {
    paddingTop: "15%"
  }
});
