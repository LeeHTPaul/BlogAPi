  import React from "react";
  import {  TouchableOpacity,Button, StyleSheet, Text, View } from "react-native";
  import { commonStyles } from "../styles/commonStyles";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import IndexScreen from "../screens/IndexScreen";
  import ShowScreen from "../screens/ShowScreen";
  import { FlatList, ScrollView } from "react-native-gesture-handler";
  import { Ionicons } from "@expo/vector-icons";

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


  //const Tab = createBottomTabNavigator();

  export default function AccountScreen({ navigation }) {

    // This is to set up the top right button
    useEffect(() => {
      console.log("right top");
      navigation.setOptions({ 
          headerRight: () => (
          <TouchableOpacity onPress={()=>navigation.navigate('Stack', { screen: 'Show'})}>
            <Ionicons
              name="ios-create-outline"
              size={30}
              color="black"
              style={{
                color: "#f55",
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        ),
      });
    });

    //    navigation.navigate('AuthStack', { screen: 'SignIn' });
    function signOut() {
      AsyncStorage.removeItem("token");
      AsyncStorage.getItem("token").then(result => console.log(`Token: ${result}`))
      navigation.navigate("SignIn");
      //navigation.replace("SignIn");
    }

    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);
  
      async function getUsername() {
        console.log(" acct get user ");
        const token = await AsyncStorage.getItem("token");
        console.log(`token = ${token}`);
        try {
        const response = await axios.get(API + API_WHO, {
          headers: { Authorization : `JWT ${token}`},
        });
        //console.log("user here");
        //console.log(response);
        setUsername(response.data.username);
        } catch (error) {
          console.log("Error get user");
          if (error.response) {
            console.log(error.response.data);
          } else { console.log(error);
          }
        }
      }
  
    async function getPosts() {
      console.log(" index get post ");
      try {
      const response = await axios.get(API + API_POST, {
      });
      console.log("posts here");
      console.log(response);
      setPosts(response.data);
      //console.log("posts=", posts);
      console.log(response.data[2].title);
  
      } catch (error) {
        console.log("Error get posts");
        if (error.response) {
          console.log(error.response.data);
        } else { console.log(error);
        }
      }
    }
  
    useEffect(() => {
      getUsername();
      getPosts();
    }, []  );

  // The function to render each row in FlatList
  let iconName;
  function renderItem({ item }) {
    iconName = 'trash' ;
    return (
      <View style={{padding: 10, paddingTop: 20, paddingBottom: 20, 
        borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text onPress={() => navigation.navigate("Show", {item})}> {item.title}</Text>
        <TouchableOpacity onPress={() => signOut()}> 
        <Ionicons
           name={iconName} 
           size={16}
           color="red" 
           style={{ marginLeft: 100 }}
         />
        </TouchableOpacity>
      </View>
    );
  }

    return (
      <View style={styles.container}>
        <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    );
  }

  const styles = StyleSheet.create({});

  /*
          <Tab.Navigator>
          <Tab.Screen name="Index" component={IndexScreen} />
          <Tab.Screen name="Show" component={ShowScreen} />
        </Tab.Navigator>
  */