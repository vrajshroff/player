import React, { Component } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  forgotPassword() {
    const { email, password } = this.state;
    if (email === "") {
      this.setState({ message: "Please enter a email" });
      return;
    }
    this.setState({ message: "" });

    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.setState({ message: "Password reset link sent to your email." });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({ message: errorCode });
      });
  }

  onLogin() {
    const { email, password } = this.state;
    if (email === "") {
      this.setState({ message: "Please enter a email" });
      return;
    }
    if (password === "") {
      this.setState({ message: "Please enter a password" });
      return;
    }
    this.setState({ message: "" });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.setState({ message: "You are now logged in!" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({ message: errorCode });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back! {"\n"}</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={"Email"}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={"Password"}
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={"Forgot your password?"}
          onPress={this.forgotPassword.bind(this)}
        />

        <Button title={"Log In"} onPress={this.onLogin.bind(this)} />

        <Text style={styles.message}>{"\n" + this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  message: {
    color: "red",
    fontStyle: "italic",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
