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
  render() {
    if (this.state.displayDefault) {
      return (
        <View>
          <Text
            style={
              this.props.icon.includes("d")
                ? styles.timestamp
                : styles.timestamp_night
            }
          >
            {this.props.timestamp}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ displayDefault: false })}
          >
            <View style={styles.headerView}>
              <Text style={styles.header}>{this.props.cityname}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text
            style={
              this.props.icon.includes("d")
                ? styles.timestamp
                : styles.timestamp_night
            }
          >
            {this.props.timestamp}
          </Text>
          <View style={styles.headerView}>
            <TextInput
              style={styles.header}
              placeholder="Sök stad"
              autoCapitalize="words"
              clearButtonMode="while-editing"
              autoFocus
              onBlur={text => {
                if (text.nativeEvent.text == "") {
                  this.setState({ current: this.state.previous });
                }
              }}
              onFocus={() => {
                this.setState({ previous: this.props.cityname, current: "" });
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
  headerView: {
    backgroundColor: "#fbc02d",
    borderRadius: 50,
    padding: 14,
    borderWidth: 2
  },
  header: {
    fontSize: 45,
    fontWeight: "bold",
    minWidth: 300,
    textAlign: "center"
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
