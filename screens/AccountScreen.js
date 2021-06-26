  import React from "react";
  import { Button, StyleSheet, Text, View } from "react-native";
  import { commonStyles } from "../styles/commonStyles";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import IndexScreen from "../screens/IndexScreen";
  import ShowScreen from "../screens/ShowScreen";

  const API = "https://LHT2021.pythonanywhere.com";
  const API_WHO = "/whoami";
  const API_POST = "/posts";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
  export default function AccountScreen({ navigation }) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Index" component={IndexScreen} />
        <Tab.Screen name="Show" component={ShowScreen} />
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({});

  /*
          <Tab.Navigator>
          <Tab.Screen name="Index" component={IndexScreen} />
          <Tab.Screen name="Show" component={ShowScreen} />
        </Tab.Navigator>
  */