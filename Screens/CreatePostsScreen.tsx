import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";

import Svg, { Path } from "react-native-svg";
import {
  mapPin,
  arrowLeft,
  trash,
  camera,
  cameraBlack,
} from "../assets/svgJS/svg";
import { SvgXml } from "react-native-svg";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const [nameFocused, setNameFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Доступ до геолокації відхилено.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, [Location.getCurrentPositionAsync({})]);

  // useEffect(() => {
  //   if (userLocation) {
  //     // Коли отримуємо нове місцеположення користувача, встановлюємо його як значення `location`
  //     setLocation(
  //       `Місцевість: ${userLocation.coords.latitude}, ${userLocation.coords.longitude}`
  //     );
  //   }
  // }, [userLocation]);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (hasPermission === false) {
      alert("No access to camera");
    }
  }, [Camera.requestCameraPermissionsAsync()]);

  const handleTakePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setImage(uri);
    }
  };
  // useEffect(() => {
  //   navigation.setOptions({
  //     // headerShown: false,
  //     // title: "sadasd",
  //   });
  // }, []);
  const handlePublish = async () => {
    navigation.navigate("Публікації", {
      name: name,
      location: location,
      userLocation: userLocation,
      image: image,
    });
    setName("");
    setImage("");
    setLocation("");
    setUserLocation(null);
  };

  function degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }
  function kMToLongitudes(km, atLatitude) {
    return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.wrapper}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>Створити публікацію</Text>
          <View style={styles.headerLeft}>
            <Image
              style={[styles.svg, { alignSelf: "center" }]}
              source={require("../assets/svg/arrowLeft.svg")}
            /> */}
        {/* <SvgXml
              xml={arrowLeft}
              style={[styles.svg, { alignSelf: "center", top: 10 }]}
            /> */}
        {/* </View> */}
        {/* </View> */}
        <View style={styles.container}>
          <View style={styles.publication}>
            <View style={styles.imageholder}>
              {image ? (
                <Image style={styles.publicationImg} source={{ uri: image }} />
              ) : (
                <Camera
                  style={styles.publicationImg}
                  // type={Camera.Constants.Type.back}
                  ref={setCameraRef}
                />
              )}
              <Pressable
                style={styles.cameraHolder}
                onPress={handleTakePicture}
              >
                {/* <Image
                style={styles.svg}
                tintColor={"rgba(189, 189, 189, 1)"}
                source={require("../assets/svg/camera.svg")}
              /> */}
                {/* <SvgXml xml={camera} style={[styles.svg]} /> */}
                <Image
                  style={styles.svg}
                  tintColor={"rgba(189, 189, 189, 1)"}
                  source={require("../assets/svg/cameraBlack.svg")}
                />
                {/* <SvgXml xml={cameraBlack} style={[styles.svg]} /> */}
              </Pressable>
            </View>
            {image === "" ? (
              <Text style={styles.photoTxt}>Завантажте фото</Text>
            ) : (
              <Text style={styles.photoTxt}>Редагувати фото</Text>
            )}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={styles.wrapper}
            >
              <TextInput
                value={name}
                style={[
                  styles.input,
                  nameFocused === true && styles.focusedInput,
                ]}
                placeholder="Назва..."
                onChangeText={setName}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
              />
              <View
                style={[
                  styles.locationContainer,
                  locationFocused === true && styles.focusedInput,
                ]}
              >
                <Image
                  style={styles.svg}
                  source={require("../assets/svg/mapPin.svg")}
                />
                <TextInput
                  value={location}
                  style={styles.locationInput}
                  placeholder="Місцевість..."
                  onChangeText={setLocation}
                  onFocus={() => setLocationFocused(true)}
                  onBlur={() => setLocationFocused(false)}
                />
              </View>

              {/* {userLocation && (
                <MapView
                  style={styles.imageholder}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  minZoomLevel={10}
                  region={{
                    latitude: userLocation.coords.latitude,
                    latitudeDelta: 0.00001,
                    longitude: userLocation.coords.longitude,
                    longitudeDelta: kMToLongitudes(
                      1.0,
                      userLocation.coords.latitude
                    ),

                    // longitudeDelta: userLocation.coords.latitude,
                    // latitudeDelta: userLocation.coords.longitude,
                  }}
                >
                  <Marker
                    title={name}
                    coordinate={{
                      latitude: userLocation.coords.latitude,
                      longitude: userLocation.coords.longitude,
                    }}
                    description="location"
                  />
                </MapView>
              )} */}

              {/* <MapView
                style={styles.imageholder}
                // showsUserLocation={true}
                // followsUserLocation={true}
                region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                mapType="standard"
                minZoomLevel={1}
                onMapReady={() => console.log("Map is ready")}
                onRegionChange={() => console.log("Region change")}
              >
                <Marker
                  title="I am here"
                  coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                  description="Hello"
                />
              </MapView> */}

              <Pressable
                style={styles.publishBtn}
                onPress={handlePublish}
                disabled={!image || !name || !location}
              >
                <Text style={styles.publishBtnText}>Опублікувати</Text>
              </Pressable>

              <View style={styles.toolbar}>
                <Pressable style={styles.delBtn}>
                  <Image
                    style={styles.svg}
                    source={require("../assets/svg/trash.svg")}
                  />
                  {/* <SvgXml xml={trash} style={styles.svg} /> */}
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageholder: {
    position: "relative",
    width: 343,
    height: 240,
    flexShrink: 0,
    borderRadius: 8,
  },
  cameraHolder: {
    left: "40%",
    top: "40%",
    position: "absolute",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
  },

  publication: {
    marginTop: 32,
    flex: 1,
    width: 343,
  },
  publicationImg: {
    alignSelf: "center",
    width: 343,
    height: 240,
    flexShrink: 0,
    borderRadius: 8,
  },
  photoTxt: {
    top: 8,
    color: "#BDBDBD",
    // font-family: Roboto;
    fontSize: 16,
    fontStyle: "normal",
    marginBottom: 28,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 11,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    position: "relative",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    flex: 1,
    fontSize: 17,
    fontStyle: "normal",
  },
  headerLeft: {
    position: "absolute",
    marginRight: 10,
    left: 16,
  },
  svg: {
    width: 24,
    height: 24,
    alignSelf: "center",
    // right: 10,
  },
  profileData: {
    width: 171,
    height: 60,
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginLeft: 16,
    marginTop: 30,
  },
  delBtn: {
    width: 70,
    height: 40,
    flexShrink: 0,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "center",
    // gap: 39,
    alignItems: "center",
    paddingTop: 100,
    // paddingBottom: 34,
    // borderTopColor: "black",
    // borderTopWidth: 1,
  },
  input: {
    flexShrink: 0,
    width: 343,
    height: 50,
    padding: 10,

    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",

    // fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationContainer: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,

    flexDirection: "row",
    alignItems: "center",

    width: 343,
    height: 50,
    flexShrink: 0,
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
  locationInput: {
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    flex: 1,
    padding: 10,
  },
  publishBtn: {
    padding: 16,
    marginTop: 32,

    borderRadius: 100,
    backgroundColor: "#FF6C00",
    // backgroundColor: "#F6F6F6",

    color: "white",
    textAlign: "center",
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
  },
  publishBtnText: {
    color: "#BDBDBD",
    // color: "#FFF",
    textAlign: "center",
    // fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontStyle: "normal",
  },
});

export default CreatePostsScreen;
