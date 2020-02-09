import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Bottom extends Component {
  state = {
    displayMore: false
  };

  componentDidUpdate() {
    this.state.sunrise = this.formatTimestamp(this.props.sunrise, "Sunrise");
    this.state.sunset = this.formatTimestamp(this.props.sunset, "Sunset");
  }

  formatTimestamp(timestamp, name) {
    let date = new Date(timestamp * 1000);
    date.setSeconds(this.props.timezone);
    var hours = date.getHours();
    hours = hours.toString().length == 1 ? "0" + hours : hours;
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);

    return (
      (name == "Sunrise" ? "Soluppgång: " : "Solnedgång: ") + formattedTime
    );
  }

  render() {
    if (!this.state.displayMore) {
      return (
        <View style={styles.buttonMoreContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ displayMore: true })}
            style={styles.displayButton}
          >
            <Text style={styles.buttonText}>Visa mer</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      var night = this.props.icon.includes("n");
      return (
        <View style={styles.button}>
          <Text style={night ? styles.smallText_night : styles.smallText}>
            Varmast idag: {this.props.temp_max}° Kallast idag:{" "}
            {this.props.temp_min}°
          </Text>
          <Text style={night ? styles.smallText_night : styles.smallText}>
            {this.state.sunrise} {this.state.sunset}
          </Text>
          <View style={styles.buttonLessContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ displayMore: false })}
              style={styles.displayButton}
            >
              <Text style={styles.buttonText}>Visa mindre</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
    marginTop: 4,
    fontSize: 14,
    color: "white"
  },
  buttonMoreContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  buttonLessContainer: {
    marginTop: 4,
    alignItems: "center"
  },
  displayButton: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#fbc02d",
    padding: 4,
    width: 120,
    height: 45,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20
  }
});
