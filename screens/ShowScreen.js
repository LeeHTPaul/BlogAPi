import React, {useEffect} from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
//import { useEffect } from "react/cjs/react.development";

export default function ShowScreen({ navigation, route }) {

    const post = route.params;
    // This is to set up the top right button
    useEffect(() => {
      console.log("right top", route.params.title, route.params.content);
    });
     // navigation.setOptions({ 
     //     headerRight: () => (
     //     <TouchableOpacity onPress={navigation.goBack()}>
     //       <Ionicons
     //         name="ios-create-outline"
     //         size={30}
     //         color="black"
     //         style={{
     //           color: "#f55",
     //           marginRight: 10,
     //         }}
     //       />
     //     </TouchableOpacity>
     //   ),
     // });
     //});
    //<TouchableOpacity onPress={signOut}> 
  return (
    <View style={{padding: 10, paddingTop: 20, paddingBottom: 20, 
      borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Text style={[commonStyles.title, {fontSize: 18}, {color: 'brown'}]}>Topic: {post.title}</Text>
      <Text style={[commonStyles.subtitle, {marginTop: 30}]}>{post.content}</Text>
    </View>
  );
}

/*
      <View style={{padding: 10, paddingTop: 20, paddingBottom: 20, 
        borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
          <View style={commonStyles.container}>
                <Text style={[commonStyles.title, {textDecorationLine: "underline"}]}>{post.title}</Text>
*/
//const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  title : {
    flex: 1,
    backgroundColor : "yellow",
    alignItems :  "center",
    justifyContent : "center",
  }
});
