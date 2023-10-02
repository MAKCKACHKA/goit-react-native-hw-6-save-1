import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
  Pressable,
  ScrollView,
} from "react-native";

import Svg, { G, Path } from "react-native-svg";

import {
  logOutSvg,
  gridSvg,
  plusBtnSvg,
  userSvg,
  messageCircle,
  mapPin,
} from "../assets/svgJS/svg";
import { SvgXml } from "react-native-svg";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  // const navigation = useNavigation();
  const [focusedCreatePosts, setfocusedCreatePosts] = useState(false);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (
            route.name === "Публікації"
            // && focusedCreatePosts === false
          ) {
            return (
              <Image
                style={styles.svg}
                source={require("../assets/svg/grid.svg")}
              />
              // <SvgXml xml={gridSvg} style={styles.svg} />
            );
          } else if (route.name === "Створити пост") {
            return (
              // <Pressable
              //   onPress={() => {
              //     navigation.navigate("CreatePostsScreen");
              //   }}
              // >
              <Image
                style={styles.createBtn}
                source={require("../assets/svg/plusBtn.svg")}
              />
              // </Pressable>

              // <SvgXml xml={plusBtnSvg} style={styles.svg} />
            );
          } else if (route.name === "Профіль") {
            return (
              <Image
                style={styles.svg}
                source={require("../assets/svg/user.svg")}
              />
              // <SvgXml xml={userSvg} style={styles.svg} />
            );
          }
        },
        tabBarStyle: styles.toolbar,
        // headerShown: false,
        showLabel: false,
        headerTitleAlign: "center",
      })}
      // tabBarOptions={{
      //   showLabel: false,
      // }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        initialParams={{ name: "", location: "", Image: "" }}
        options={{
          // headerStyle: { overflow: "visible" },
          headerTitleStyle: {
            alignSelf: "center",
            // marginLeft: "50%",
            // top: "-50%",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Дії, які ви хочете виконати при натисканні на кнопку у хедері
              }}
              style={styles.createBtn}
            >
              <Image
                style={[styles.svg]}
                source={require("../assets/svg/logOut.svg")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити пост"
        component={CreatePostsScreen}
        options={{
          // headerStyle: {},
          headerTitleStyle: {
            // alignSelf: "center", // Це вирівнює текст заголовку по центру
          },
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       // Дії, які ви хочете виконати при натисканні на кнопку у хедері
          //     }}
          //     style={styles.createBtn}
          //   >
          //     <Image
          //       style={[styles.svg]}
          //       source={require("../assets/svg/logOut.svg")}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Tabs.Screen name="Профіль" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeTabs} />
//         <Stack.Screen name="Profile" component={EmptyScreen} />
//         <Stack.Screen name="Settings" component={EmptyScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  svg: {
    width: 24,
    height: 24,
    alignSelf: "center",
    // right: 10,
  },

  createBtn: {
    width: 70,
    height: 40,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    height: 75,
    // height: {focusedCreatePosts === false ? 74 : 0},
  },
});

export default Home;
