import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Menu, Provider } from "react-native-paper";
import { db } from "../../Api/Firebase_config";
import { collection, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { EvilIcons } from "@expo/vector-icons";
import FetchBusinessData from "../businessScreens/FetchBusinessData";
import FetchIdeaData from "../ideaScreens/FetchIdeaData";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [collectionData, setCollectionData] = useState([]);
  const [check, setCheck] = useState("");
  const [firstName1, setFirstName1] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [profile, setProfile] = useState("");

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  //get firstname on every change in collectionData
  useEffect(() => {
    getFirstName();
  }, [collectionData]);

  useEffect(() => {
    authListener();
  }, [user]);

  //function to check where this user id == to current user
  const fetchData = async () => {
    const querySnapshot = await getDocs(
      collection(db, "Users"),
      where("UserUid", "==", check)
    );

    let array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push(data);
    });
    setCollectionData(array);
  };

  // function to get current user firstName
  const getFirstName = () => {
    for (let i = 0; i < collectionData.length; i++) {
      if (collectionData[i].UserUid == check) {
        setFirstName1(collectionData[i].FirstName);
      }
    }
  };

  const getUserProfile = () => {
    for (let i = 0; i < collectionData.length; i++) {
      if (collectionData[i].UserUid == check) {
        setProfile(collectionData[i].AccountType);
        if (profile === "Idea Owner") navigation.navigate("Idea");
        else if (profile === "Business Owner") navigation.navigate("Business");
        else if (profile === "Investor") navigation.navigate("Investor");
      }
    }
  };

  const clearFirstName = () => {
    setFirstName1("");
  };

  //call the function
  fetchData();

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
        setCheck(user111.uid);
        setIsLogIn(true);
      } else {
        setUser(null);
        setIsLogIn(false);
      }
    });
  };

  const SignOutUser = async () => {
    clearFirstName();
    await signOut(authentication).then((err) => {
      window.location.reload(false);
      navigation.navigate("Home");
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.buttonView}>
            <View style={{ marginLeft: "1%" }}>
              <Image
                style={{
                  height: Platform.OS === "android" ? 150 : 150,
                  width: Platform.OS === "android" ? 150 : 150,
                }}
                source={require("../../../assets/expo1.png")}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("HowItWork")}
              style={styles.register1}
            >
              <Text>How It Works</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("About")}
              style={styles.register}
            >
              <Text>About</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Contact")}
              style={styles.register}
            >
              <Text>Contact</Text>
            </TouchableOpacity>

            {isLogIn ? (
              <Provider>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: Platform.OS === "android" ? "0%" : "3%",

                    width: "10%",
                    marginLeft: Platform.OS === "android" ? "0%" : "80%",
                  }}
                >
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <Button onPress={openMenu}>
                        <EvilIcons name="user" size={34} color="black" />
                        <Text style={{ color: "black" }}>{firstName1}</Text>
                      </Button>
                    }
                  >
                    <Menu.Item onPress={getUserProfile} title="My Profile" />
                    <Menu.Item onPress={SignOutUser} title="Sign Out" />
                  </Menu>
                </View>
              </Provider>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: Platform.OS === "android" ? "20%" : "3%",
                  marginLeft: Platform.OS === "android" ? "0%" : "60%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={{ marginRight: "35%" }}
                >
                  <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUpUser")}
                >
                  <Text>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.text}>
          Welcome to the tomorrow's future Expo Our goal is help the community{" "}
          {"\n"}Connect investors with ideas owners or business owners at no
          cost! {"\n"} free Exposure and Build Free Business Plan!, and of
          course connect them to the right investor and make thier dream come
          true!{"\n"}
          we belive in people,join us to help others!.
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: Platform.OS === "android" ? 25 : 35,
            fontWeight: "bold",
            marginTop: "5%",
          }}
        >
          Newest Ideas And Businesses On Site
        </Text>

        <View style={{ marginTop: Platform.OS === "android" ? "170%" : "0%" }}>
          <FetchBusinessData />
        </View>

        <View style={{ marginTop: "15%" }}>
          <FetchIdeaData />
        </View>
        <View
          style={{ marginBottom: Platform.OS === "android" ? "200%" : "0%" }}
        ></View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "white",
          height: Platform.OS === "android" ? "18%" : "10%",
          marginTop: Platform.OS === "android" ? "25%" : "5%",
        }}
      >
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <View style={{ flexDirection: "column", marginLeft: "10%" }}>
              <Text style={{ fontSize: 20 }}>Investments</Text>
              <Text>Soon On Expo</Text>
              <Text>Successfully Partnership</Text>
            </View>

            <View style={{ flexDirection: "column", marginLeft: "30%" }}>
              <Text style={{ fontSize: 20 }}>What is it?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("HowItWork")}
              >
                <Text>How It Works</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
                <Text>Contact Us</Text>
              </TouchableOpacity>

              <Text>Raise</Text>
              <Text>Blog</Text>
            </View>

            <View style={{ flexDirection: "column", marginLeft: "25%" }}>
              <Text style={{ fontSize: 20 }}>Additional details</Text>
              <Text>Terms of Use</Text>
              <Text>Privacy Policy</Text>
            </View>
          </View>
          <Text>Copyright 2022 © Expo.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 240, 255)",
  },
  text: {
    fontStyle: "italic",
    marginLeft: "1%",
    marginTop: "5%",
    fontSize: Platform.OS === "android" ? 15 : 25,
  },

  buttonView: {
    width: Platform.OS === "android" ? "100%" : "100%",
    flexDirection: Platform.OS === "android" ? "row" : "row",
    backgroundColor: "white",
  },

  footer: {
    backgroundColor: "white",
    width: Platform.OS === "android" ? "35%" : "100%",
    marginTop: Platform.OS === "android" ? "0%" : "0%",
  },

  signin: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    width: "40%",
    height: 50,
    justifyContent: "center",
    marginLeft: "30%",
    alignItems: "center",
  },

  register: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight: Platform.OS === "android" ? "3%" : "3%",
    marginTop: Platform.OS === "android" ? "15%" : "0%",
  },

  register1: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight: Platform.OS === "android" ? "3%" : "3%",
    marginTop: Platform.OS === "android" ? "15%" : "0%",
    marginLeft: Platform.OS === "android" ? "0%" : "5%",
  },
});

export default HomeScreen;
