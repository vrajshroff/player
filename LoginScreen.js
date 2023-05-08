import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import app from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrorMessage("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("./background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.note}>
            Don't have an account? <Text style={styles.blue}>{`Sign up`}</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={[styles.blue, styles.note]}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "80%",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#84d2e2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  blue: {
    color: "blue",
    textDecorationLine: "underline",
  },
  note: { fontStyle: "italic", marginBottom: 15 },
});
