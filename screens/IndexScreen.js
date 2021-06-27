import React from "react";
//import { StyleSheet, Text, View } from "react-native";
//import { commonStyles } from "../styles/commonStyles";
import { SafeAreaView, TouchableOpacity , Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import IndexScreen from "../screens/IndexScreen";
import ShowScreen from "../screens/ShowScreen";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const API = "https://LHT2021.pythonanywhere.com";
const API_WHO = "/whoami";
const API_POST = "/posts";

const hdata = [
 {content: "Drink ---wait till monday..", id: 2, title: "TGIF --- Saturday Pgm"},
 {content: "coca cola sound better", id: 3, title: "TGIF"},
 {content: "finally relaz", id: 4, title: "Hightened alert"},
 {content: "Palying with prgram", id: 5, title: "Saturday Pgm"},
 {content: "Party can?", id: 6, title: "Saturday Pgm"},
 {content: "Only two can go..", id: 7, title: "Saturday Pgm"},
 {content: "wait till monday..", id: 8, title: "Saturday Pgm"},
]

export default function IndexScreen({ navigation }) {

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

  //const PostasObjects = posts.map( (item) =>
    //{return { name : item, } ; })

  const renderName = ({ posts }) => {
      return <Text>{posts.title}</Text>
  };

  function signOut() {
    AsyncStorage.removeItem("token");
    AsyncStorage.getItem("token").then(result => console.log(`Token: ${result}`))
    //navigation.navigate("SignIn");
    navigation.replace("SignIn");
  }

  // The function to render each row in our FlatList
  let iconName;
  function renderItem({ item }) {
    iconName = 'trash' ;
    return (
      <View style={{padding: 10, paddingTop: 20, paddingBottom: 20, 
        borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text onPress={() => navigation.navigate("Update", {item})}> {item.title}</Text>
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

    // This is to set up the top right button
    useEffect(() => {
      console.log("right top");
      navigation.setOptions({ 
          headerRight: () => (
          <TouchableOpacity onPress={signOut}>
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

  return (
    <View style={styles.container}>
        <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

//<Text >Account Screen</Text>
//<Text>{username}</Text>
//<Button title="Sign out" onPress={signOut} />
//<FlatList data={posts} renderItem={ ({item} ) => <Text>{item.content}</Text> } />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});


/*
        <Text >Account Screen</Text>
        <Text>{username}</Text>
        <Text>{posts}</Text>
        <Button title="Sign out" onPress={signOut} />

    <View style={commonStyles.container}>
        <Text>Account Screen</Text>
        <Text>{username}</Text>
        <Button title="Sign out" onPress={signOut} />
    </View>

            <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
*/