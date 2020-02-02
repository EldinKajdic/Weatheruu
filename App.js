import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./components/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90caf9",
    alignItems: "center",
    paddingTop: '15%'
  }
});
