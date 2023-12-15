import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";

const ScreenAfterLogin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input1}
        onPress={() => navigation.navigate("Home")}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 48, textAlign: "center" }}>
        Screen After Login{" "}
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Idea")}
      >
        <Text>Idea Owner User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Investor")}
      >
        <Text>Investor User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Business")}
      >
        <Text>Business Owner User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#49bcfa",
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    marginLeft: "20%",
    borderRadius: 30,
    backgroundColor: "white",
  },
  input1: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    width: "20%",
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: "78%",
  },
});

export default ScreenAfterLogin;
