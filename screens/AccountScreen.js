  import React from "react";
  import { ActivityIndicator, TouchableOpacity,Button, StyleSheet, Text, View } from "react-native";
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
  const API_DELETE = "/posts/";
 
  //const Tab = createBottomTabNavigator();

  export default function AccountScreen({ navigation }) {

    // This is to set up the top right button
    useEffect(() => {
      console.log("right top");
      navigation.setOptions({ 
          headerRight: () => (
          <TouchableOpacity onPress={()=>navigation.navigate('Create')}>
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
        headerLeft: () => (
          <TouchableOpacity onPress={() => signOut()}
          style={styles.SignOutButton}>
              <Text style={styles.SignOutText}>Quit</Text>
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      });
    });

    useEffect(() => {
      const removeListener = navigation.addListener("focus", () => {
        console.log("running nav listener");
        setUsername(<ActivityIndicator/>);
        getUsername();
        getPosts();
      });
        getUsername();
        getPosts();
      return removeListener;
    }, []);

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
      console.log("account get post ");
      try {
      const response = await axios.get(API + API_POST, {
      });
      console.log("posts here");
      console.log(response);
      setPosts(response.data);
      //console.log("posts=", posts);
      //console.log(response.data[2].title);
  
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


    async function deletePost(id) {

  // const response = await axios.delete(API_MODIFYPOST + "/" + posts.id, { headers: { Authorization: `JWT ${token}` }, });
      try {
        const token = await AsyncStorage.getItem("token");
  
        const response = await axios.delete(API + API_DELETE + id, { headers: { Authorization: `JWT ${token}` }, });
  
        //setIsLoading(false);
        //navigation.navigate('account');
      }
      catch (error) {
        //setIsLoading(false);
  
        if (error.response) {
          if (error.response.status == 401)
            signOut();
          else
            console.log(error.response.data);
        } 
        else
          console.log(error);
      }
      getPosts();
      navigation.navigate("Account");
    }

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
        <Text onPress={() => navigation.navigate("Show", item)}> {item.title}</Text>
   
        <TouchableOpacity onPress={() => deletePost(item.id)}> 
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
        <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    SignOutButton: {
      backgroundColor: "red",
      width: 50,
      alignItems: "center",
      padding: 20,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 20,
    },
    SignOutText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
  });

  /*
          <Tab.Navigator>
          <Tab.Screen name="Index" component={IndexScreen} />
          <Tab.Screen name="Show" component={ShowScreen} />
        </Tab.Navigator>
  */