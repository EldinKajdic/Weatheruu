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
    return dgr.toFixed(0) == "-0°" ? "0°" : dgr.toFixed(0) + "°";
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
        return images_static.n02n;
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
        <Text
          style={
            this.props.icon.includes("d") ? styles.header : styles.header_night
          }
        >
          Prognos 5 dagar
        </Text>
        <FlatList
          horizontal
          data={this.props.list}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text
                style={
                  this.props.icon.includes("d")
                    ? styles.dateText
                    : styles.dateText_night
                }
              >
                {this.formatTimestamp(item.dt)}
              </Text>
              <Text
                style={
                  this.props.icon.includes("d")
                    ? styles.degreesText
                    : styles.degreesText_night
                }
              >
                {this.formatDegrees(item.main.temp)}
              </Text>
              <Image
                style={styles.icon}
                source={this.getWeatherIcon(item.weather[0].icon)}
              />
              <Text
                style={
                  this.props.icon.includes("d")
                    ? styles.smallText
                    : styles.smallText_night
                }
              >
                Känns som: {this.formatDegrees(item.main.feels_like)}
              </Text>
              <Text
                style={
                  this.props.icon.includes("d")
                    ? styles.smallText
                    : styles.smallText_night
                }
              >
                {item.weather[0].description == "dis"
                  ? "Dimma"
                  : item.weather[0].description.charAt(0).toUpperCase() +
                    item.weather[0].description.slice(1)}
              </Text>
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
    alignItems: "center",
    textAlign: "center",
    marginTop: 10
  },
  header: {
    fontSize: 20
  },
  header_night: {
    fontSize: 20,
    color: "white"
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 30,
    marginLeft: 20
  },
  dateText_night: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 30,
    marginLeft: 20,
    color: "white"
  },
  degreesText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  degreesText_night: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  smallText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  smallText_night: {
    textAlign: "center",
    fontSize: 15,
    color: "white"
  },
  bold: {
    fontWeight: "bold"
  },
  icon: {
    height: 40,
    width: 40
  }
});
