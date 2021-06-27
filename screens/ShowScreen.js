import React, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
//import { useEffect } from "react/cjs/react.development";

export default function ShowScreen({ navigation, route }) {

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
    <View style={commonStyles.container}>
      <Text>Show Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
