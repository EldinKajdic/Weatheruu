import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class Header extends Component {
  state = {
    displayDefault: true,
    current: ""
  };

  componentDidMount() {
    this.displayClock();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  displayClock() {
    this.getCurrentTime();
    this.interval = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    var today = new Date();
    today.setTime(today.getTime() + this.props.timezone * 1000);
    var h = today.getUTCHours();
    var m = today.getMinutes();
    var d = today.toLocaleDateString("en-US", {
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

  getStyling(className) {
    let day =
      this.props.icon &&
      this.props.icon.includes("d") &&
      !this.props.icon.includes("10d") &&
      !this.props.icon.includes("13d");

    switch (className) {
      case "timestamp":
        if (day) {
          return styles.timestamp;
        }
        return styles.timestamp_night;
      case "header":
        if (day) {
          return styles.header;
        }
        return styles.header_night;
    }
  }

  getPlaceholderColor() {
    let day = this.props.icon.includes("d") && !this.props.icon.includes("10d");
    if (day) {
      return "#454545";
    } else {
      return "#C7C7CD";
    }
  }

  render() {
    if (this.state.displayDefault) {
      return (
        <View>
          <Text style={this.getStyling("timestamp")}>
            {this.state.timestamp}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ displayDefault: false })}
          >
            <View style={styles.headerView}>
              <Text style={this.getStyling("header")}>
                {this.props.cityname}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={this.getStyling("timestamp")}>
            {this.state.timestamp}
          </Text>
          <View style={styles.headerView}>
            <TextInput
              style={this.getStyling("header")}
              placeholder="Search..."
              autoCapitalize="words"
              placeholderTextColor={this.getPlaceholderColor()}
              clearButtonMode="while-editing"
              autoFocus
              onBlur={text => {
                if (text.nativeEvent.text == "") {
                  this.setState({
                    current: this.state.previous
                  });
                }
              }}
              onFocus={() => {
                this.setState({
                  previous: this.props.cityname,
                  current: ""
                });
              }}
              onChangeText={text => {
                this.setState({ current: text });
              }}
              value={this.state.current}
              selectTextOnFocus
              enablesReturnKeyAutomatically
              blurOnSubmit
              clearTextOnFocus
              keyboardAppearance="dark"
              onSubmitEditing={text =>
                this.props.handleTextSubmitted(text.nativeEvent.text)
              }
            ></TextInput>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 55,
    fontWeight: "bold",
    minWidth: 300,
    textAlign: "center"
  },
  header_night: {
    fontSize: 55,
    fontWeight: "bold",
    minWidth: 300,
    textAlign: "center",
    color: "white"
  },
  timestamp: {
    fontWeight: "bold",
    marginBottom: "2%",
    textAlign: "center"
  },
  timestamp_night: {
    fontWeight: "bold",
    marginBottom: "2%",
    textAlign: "center",
    color: "white"
  }
});
