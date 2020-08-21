import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Bottom extends Component {
  state = {
    displayMore: false
  };

  formatTimestamp(timestamp, name) {
    let date = new Date(timestamp * 1000);
    date.setSeconds(this.props.timezone);
    var hours = date.getHours();
    hours = hours.toString().length == 1 ? "0" + hours : hours;
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);

    return (
      (name == "Sunrise" ? "Sunrise: " : "Sunset: ") + formattedTime
    );
  }

  render() {
    let day =
      this.props.icon &&
      this.props.icon.includes("d") &&
      !this.props.icon.includes("10d") &&
      !this.props.icon.includes("13d");
    return (
      <View style={styles.container}>
        {this.props.sunrise && (
          <Text style={day ? styles.smallText : styles.smallText_night}>
            Highest today: {this.props.temp_max}° | Lowest today:{" "}
            {this.props.temp_min}°
          </Text>
        )}
        {this.props.sunrise && (
          <Text style={day ? styles.smallText : styles.smallText_night}>
            {this.formatTimestamp(this.props.sunrise, "Sunrise") +
              " | " +
              this.formatTimestamp(this.props.sunset, "Sunset")}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
    fontSize: 14
  },
  smallText_night: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    color: "white"
  },
  container: {
    alignItems: "center"
  }
});
