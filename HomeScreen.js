import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("./background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require("./logo.png")} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.logInButton]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    width: "40%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#84d2e2",
    marginRight: "5%",
  },
  logInButton: {
    backgroundColor: "#84d2e2",
    marginLeft: "5%",
  },
  buttonText: {
    color: "#486210",
    fontSize: 16,
  },
});
