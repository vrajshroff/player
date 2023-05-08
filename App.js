import React, { useState } from "react";

import { StyleSheet, View, Text, Button, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ title: "" }, { headerShown: false })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
