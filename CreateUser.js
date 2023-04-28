import React, { Component } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  Linking,
} from "react-native";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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
      showLogIn: false,
    };
  }

  onLogin() {
    const { email, password } = this.state;
    if (email === "") {
      this.setState({ message: "Please enter a email", showLogIn: false });
      return;
    }
    if (password === "") {
      this.setState({ message: "Please enter a password", showLogIn: false });
      return;
    }
    this.setState({ message: "", showLogIn: false });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser).then(() => {
          this.setState({
            message: "Open your verification email.",
            showLogIn: true,
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({
          message: "An error occured: " + errorCode,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account {"\n"}</Text>
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
        <Button title={"Sign Up"} onPress={this.onLogin.bind(this)} />

        <Text style={styles.message}>
          {"\n" + this.state.message}

          {this.state.showLogIn && (
            <Text>
              {" Then log in "}
              <Text
                style={styles.navigate}
                onPress={() => Linking.openURL("http://google.com")}
              >
                here.
              </Text>
            </Text>
          )}
        </Text>
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
  navigate: {
    color: "blue",
    textDecorationLine: "underline",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
