import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect} from "react";
import { TouchableOpacity, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import AccountScreen from "./screens/AccountScreen";
import ShowScreen from "./screens/ShowScreen";
import CreateScreen from "./screens/CreateScreen";
//CreateScreen
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ signedIn ? "Account" : "SignIn"}>
        <Stack.Screen component={AccountScreen} name="Account" />
        <Stack.Screen component={ShowScreen} name="Show" />
        <Stack.Screen component={CreateScreen} name="Create" />
        <Stack.Screen options={{headerShown: false}} component={SignInScreen} name="SignIn" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//headerMode="none"  
//      <Stack.Navigator mode="modal" 