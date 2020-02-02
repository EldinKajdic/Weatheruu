import React, { Component } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { images } from "../models/images";

export default class WeatherImage extends Component {
  render() {
    var imageSource = "";
    switch (this.props.icon) {
      case "01d":
        imageSource = images.n01d;
        break;
      case "02d":
        imageSource = images.n02d;
        break;
      case "03d":
        imageSource = images.n03d;
        break;
      case "04d":
        imageSource = images.n04d;
        break;
      case "09d":
        imageSource = images.n09d;
        break;
      case "10d":
        imageSource = images.n10d;
        break;
      case "11d":
        imageSource = images.n11n;
        break;
      case "13d":
        imageSource = images.n13d;
        break;
      case "50d":
        imageSource = images.n13d;
        break;

      case "01n":
        imageSource = images.n01n;
        break;
      case "02n":
        imageSource = images.n02n;
        break;
      case "03n":
        imageSource = images.n03n;
        break;
      case "04n":
        imageSource = images.n04n;
        break;
      case "09n":
        imageSource = images.n09n;
        break;
      case "10n":
        imageSource = images.n10n;
        break;
      case "11n":
        imageSource = images.n11n;
        break;
      case "13n":
        imageSource = images.n13n;
        break;
      case "50n":
        imageSource = images.n50n;
        break;
      default:
        imageSource = images.n50d;
        break;
    }

    return (
      <View style={styles.iconView}>
        <Image
          style={{
            minWidth: 200,
            minHeight: 200,
            maxWidth: 300,
            maxHeight: 230
          }}
          source={imageSource}
        />
        <Text style={styles.description}>{this.props.description}</Text>
        <Text style={styles.smallText}>
          {this.props.humidity > 30
            ? "Risk för regn: " + this.props.humidity + "%"
            : ""}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
    fontSize: 16
  },
  iconView: {
    marginTop: "5%"
  },
  description: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: "5%"
  }
});
