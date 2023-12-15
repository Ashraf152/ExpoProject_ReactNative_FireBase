import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { db } from "../../Api/Firebase_config";
import { collection, getDocs, where } from "firebase/firestore";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Button, Menu, Provider } from "react-native-paper";

const HowItWorksScreen = ({ navigation }) => {
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
    getFirsName();
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

  const getFirsName = () => {
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
      <Text style={{ fontSize: 30, marginLeft: "1%" }}>How Does It Work</Text>
      <Text style={{ fontSize: 15, marginLeft: "1%" }}>
        It works like this If you have an idea and you don't have the financial
        ability to develop the product or publish it or register it as a patent
        And of course finding an investor is a difficult thing. We are here to
        help you find an investor at no cost, which means you will get
        advertising, you will get help building a business plan for free and in
        the end we will find the right investor for you together. In addition,
        this service is also for business owners who wish to expand their
        business activities and do not have the financial ability to find a
        partner, business expansion, etc. On the other hand, if you are
        interested in investing, we are a platform that can help you invest the
        money in the weak community and help people realize their dreams, and of
        course help you earn
      </Text>
      <View
        style={{
          backgroundColor: "white",
          height: Platform.OS === "android" ? "31%" : "20%",
          marginTop: Platform.OS === "android" ? "49%" : "30%",
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
        </View>
        <Text>Copyright 2022 © Expo.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 240, 255)",
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
  buttonView: {
    flexDirection: "row",
    backgroundColor: "white",
  },
});

export default HowItWorksScreen;
