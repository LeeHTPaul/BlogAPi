  import React from "react";
  import { Button, StyleSheet, Text, View } from "react-native";
  import { commonStyles } from "../styles/commonStyles";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import { useEffect, useState } from "react";

  const API = "https://LHT2021.pythonanywhere.com";
  const API_WHO = "/whoami";
  const API_POST = "/posts";

  export default function AccountScreen({ navigation }) {
    const [username, setUsername] = useState("");

    async function getUsername() {
      console.log(" acct get user ");
      const token = await AsyncStorage.getItem("token");
      console.log(`token = ${token}`);
      try {
      const response = await axios.get(API + API_WHO, {
        headers: { Authorization : `JWT ${token}`},
      });
      console.log("user here");
      console.log(response);
      setUsername(response.data.username);
      } catch (error) {
        console.log("Error get user");
        if (error.response) {
          console.log(error.response.data);
        } else { console.log(error);
        }
      }
    }

    useEffect(() => {
      getUsername();
    }, []  );


    function signOut() {
      AsyncStorage.removeItem("token");
      AsyncStorage.getItem("token").then(result => console.log(`Token: ${result}`))
      //navigation.navigate("SignIn");
      navigation.replace("SignIn");
    }

    return (
      <View style={commonStyles.container}>
        <Text>Account Screen</Text>
        <Text>{username}</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }

  const styles = StyleSheet.create({});
