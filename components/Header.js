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
    displayDefault: true
  };
  render() {
    if (this.state.displayDefault) {
      return (
        <View>
          <Text style={styles.timestamp}>{this.props.timestamp}</Text>
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
          <Text style={styles.timestamp}>{this.props.timestamp}</Text>
          <View style={styles.headerView}>
            <TextInput
              style={styles.header}
              placeholder="Sök stad"
              autoCapitalize="words"
              clearButtonMode
              autoFocus
              clearTextOnFocus
              selectTextOnFocus
              enablesReturnKeyAutomatically
              blurOnSubmit
              onSubmitEditing={(text) => this.props.handleTextSubmitted(text.nativeEvent.text)}
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
    textAlign: 'center'
  },
  timestamp: {
    fontWeight: "bold",
    marginBottom: "2%",
    textAlign: "center"
  }
});
