import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../Api/Firebase_config";
import { Button, Menu, Provider } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import FetchInvestorAllIdeaBusinessData from "./FetchInvestorAllIdeaBusinessData";

const InvestorScreen = ({ navigation }) => {
  const [check, setCheck] = useState("");
  const [visible, setVisible] = useState(false);
  const [firstName1, setFirstName1] = useState("");
  const [collectionData, setCollectionData] = useState([]);
  const [isLogIn, setIsLogIn] = useState(false);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    authListener();
  }, [user]);

  //get firstname on every change in collectionData
  useEffect(() => {
    getFirstName();
  }, [collectionData]);

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

  fetchData();

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <View style={{ marginLeft: "1%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              style={{
                height: Platform.OS === "android" ? 150 : 150,
                width: Platform.OS === "android" ? 150 : 150,
              }}
              source={require("../../../assets/expo1.png")}
            />
          </TouchableOpacity>
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
              marginTop: "3%",
              marginLeft: "60%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{ marginRight: "35%" }}
            >
              <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUpUser")}>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30 }}>
              Welcome {firstName1} This Is Your Personal Investing Home Page
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Investorinv");
              }}
              style={styles.uploadButton1}
            >
              <Text> My potential investments</Text>
            </TouchableOpacity>
          </View>
          <FetchInvestorAllIdeaBusinessData />
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: Platform.OS === "android" ? "31%" : "9%",
            marginTop: Platform.OS === "android" ? "120%" : "45%",
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

                <Text>How It Works</Text>

                <Text>Contact Us</Text>

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
      </ScrollView>
    </View>
  );
};

export default InvestorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 240, 255)",
  },
  uploadButton: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    marginLeft: "70%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  uploadButton1: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    height: 40,
    margin: 10,
    color: "red",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    marginLeft: "70%",
    marginBottom: "3%",
    marginTop: "15%",
  },
  image: {
    width: 350,
    height: "100%",
    borderColor: "white",
    borderRadius: 30,
    backgroundColor: "white",
  },
  buttonView: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  imageView2: {
    flexDirection: "row",
    marginTop: "5%",
    height: "100%",
    width: "85%",
    justifyContent: "space-evenly",
    marginLeft: "7.5%",
  },
  footer: {
    width: Platform.OS === "android" ? "35%" : "100%",
  },
  register: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight: "3%",
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
