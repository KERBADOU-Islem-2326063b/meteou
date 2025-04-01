import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Header/Header";

export default function Home({ username, onLogout }) {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
