import React, { Component} from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View>
        <Text style={styles.timestamp}>{this.props.timestamp}</Text>
        <View style={styles.headerView}>
          <Text style={styles.header}>{this.props.cityname}</Text>
        </View>
      </View>
    );
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
    fontSize: 50,
    fontWeight: "bold"
  },
  timestamp: {
    fontWeight: "bold",
    marginBottom: "2%",
    textAlign: "center"
  }
});