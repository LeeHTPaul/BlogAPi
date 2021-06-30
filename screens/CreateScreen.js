import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

const API_CREATEPOST = "https://LHT2021.pythonanywhere.com/create";

export default function CreateScreen({ navigation }) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  
async function savePost() {
    console.log("savepost", Content," ",Title);
    
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(API_CREATEPOST,
      {
        "title" : Title, 
        "content" : Content
      },
      )
    navigation.navigate("Account"); 
    //{
    //  Title, Content
    //},
  }
//            <Text style={commonStyles.subTitle}>Title</Text>
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginTop: 10 }}>Create your Posts here</Text>
      <Text style={[commonStyles.subTitle, {marginTop : 20} ]}>Title</Text>
      <TextInput style={styles.textInput} autoCapitalize="sentences" value={Title} onChangeText={(input) => setTitle(input)}/>
      <Text style={[commonStyles.subTitle, {marginTop : 10}]}>Content</Text>
      <TextInput style={styles.textInput} multiline={true} autoCapitalize="sentences" value={Content} onChangeText={(input) => setContent(input)}/> 
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress= {savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
