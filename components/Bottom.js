import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default class Bottom extends Component {
  state = {
    displayMore: false
  };

  formatTimestamp(timestamp, type) {
    let currentTime = new Date().getHours();
    let date = new Date(timestamp * 1000);
    var hours = date.getHours();
    hours = hours.toString().length == 1 ? "0" + hours : hours;
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);

    if (type === "Sunrise") {
      return currentTime > date.getHours()
        ? "Solen gick upp: " + formattedTime
        : "Solen går upp: " + formattedTime;
    } else {
      return currentTime > date.getHours()
        ? "Solen gick ned: " + formattedTime
        : "Solen går ned: " + formattedTime;
    }
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
      return (
        <View>
          <Text style={styles.smallText}>
            Varmast idag: {this.props.temp_max}°
          </Text>
          <Text style={styles.smallText}>
            Kallast idag: {this.props.temp_min}°
          </Text>
          <Text style={styles.smallText}>
            {this.formatTimestamp(this.props.sunrise, "Sunrise")}
          </Text>
          <Text style={styles.smallText}>
            {this.formatTimestamp(this.props.sunset, "Sunset")}
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
    fontSize: 16
  },
  buttonMoreContainer: {
    marginTop: 20
  },
  buttonLessContainer: {
    marginTop: 10
  },
  displayButton: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#fbc02d",
    padding: 12,
    width: 150,
    alignItems: "center"
  },
  buttonText: {
      fontWeight: 'bold',
      fontSize: 20
  }
});
