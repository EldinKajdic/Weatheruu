import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { images_static } from "../models/images-static";

export default class Forecast extends Component {
  formatTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    var h = date.getHours();
    var m = date.getMinutes();
    var d = date.toLocaleDateString("sv-se", {
      weekday: "short"
    });

    return (
      d
        .charAt(0)
        .toString()
        .toUpperCase() +
      d.slice(1) +
      " " +
      (h.toString().length == 1 ? "0" : "") +
      h +
      ":" +
      (m.toString().length == 1 ? "0" : "") +
      m
    );
  }

  formatDegrees(dgr) {
    return dgr.toFixed(0) == "-0" ? "0°" : dgr.toFixed(0) + "°";
  }

  getStyling(className) {
    let day =
      this.props.icon &&
      this.props.icon.includes("d") &&
      !this.props.icon.includes("10d") &&
      !this.props.icon.includes("13d");

    switch (className) {
      case "degreesText":
        if (day) {
          return styles.degreesText;
        }
        return styles.degreesText_night;
      case "dateText":
        if (day) {
          return styles.dateText;
        }
        return styles.dateText_night;
      case "smallText":
        if (day) {
          return styles.smallText;
        }
        return styles.smallText_night;
      case "indicator":
        if (day) {
          return "black";
        }
        return "white";
      default:
        break;
    }
  }

  getWeatherIcon(icon) {
    switch (icon) {
      case "01d":
        return images_static.n01d;
      case "02d":
        return images_static.n02d;
      case "03d":
        return images_static.n03d;
      case "04d":
        return images_static.n04d;
      case "09d":
        return images_static.n09d;
      case "10d":
        return images_static.n10d;
      case "11d":
        return images_static.n11n;
      case "13d":
        return images_static.n13d;
      case "50d":
        return images_static.n50d;
      case "01n":
        return images_static.n01n;
      case "02n":
        return images_static.n03n;
      case "03n":
        return images_static.n03n;
      case "04n":
        return images_static.n04n;
      case "09n":
        return images_static.n09n;
      case "10n":
        return images_static.n10n;
      case "11n":
        return images_static.n11n;
      case "13n":
        return images_static.n13n;
      case "50n":
        return images_static.n50n;
      default:
        return images_static.spinner;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.list}
          indicatorStyle={this.getStyling("indicator")}
          decelerationRate={0}
          snapToInterval={380}
          snapToAlignment={"center"}
          horizontal={true}
          initialNumToRender={5}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.component}>
                <Text style={this.getStyling("dateText")}>
                  {this.formatTimestamp(item.dt)}
                </Text>
                <Text style={this.getStyling("degreesText")}>
                  {this.formatDegrees(item.main.temp)}
                </Text>
                <Image
                  style={styles.icon}
                  source={this.getWeatherIcon(item.weather[0].icon)}
                />
                <Text style={this.getStyling("smallText")}>
                  {item.weather[0].description == "dis"
                    ? "Dimma"
                    : item.weather[0].description.charAt(0).toUpperCase() +
                      item.weather[0].description.slice(1)}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.dt_txt}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    maxHeight: 120,
    marginLeft: 2
  },
  component: {
    alignItems: "center",
    textAlign: "center",
    width: 90,
    maxWidth: 90,
    marginRight: 3
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 13
  },
  dateText_night: {
    fontWeight: "bold",
    fontSize: 13,
    color: "white"
  },
  degreesText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  degreesText_night: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  smallText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold"
  },
  smallText_night: {
    textAlign: "center",
    fontSize: 14,
    color: "white"
  },
  bold: {
    fontWeight: "bold"
  },
  icon: {
    height: 30,
    width: 30
  }
});
