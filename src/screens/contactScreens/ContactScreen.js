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
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { db } from "../../Api/Firebase_config";
import { collection, doc, setDoc, getDocs, where } from "firebase/firestore";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Button, Menu, Provider } from "react-native-paper";

const ContactScreen = ({ navigation }) => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [information, setInformation] = useState("");

  const [fullnameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [informationError, setInformationError] = useState("");
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

  const data = () => {
    const usersRef = collection(db, "Contact");
    // Add data to firestore contact collection
    setDoc(doc(usersRef), {
      Fullname: fullname,
      Email: email,
      Phone: phone,
      Subject: subject,
      Information: information,
    })
      .then(() => {
        alert("Data Successfully Submitted");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const clearError=()=>{
    setFullNameError("");
    setEmailError("");
    setPhoneError("");
    setSubjectError("");
    setInformationError("");
  }
  //Check for the Email error TextInput
  const checkTextInput = (e) => {
    clearError();
    if (fullname == "" || fullname.length<3 || /[0-9]/.test(fullname)) {
      setFullNameError("Full Name Requierd");
    } else if (email == "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/.test(email))) {
      setEmailError("Email Requierd");
    } else if (phone.length != 10 || isNaN(+phone) || phone[0]!=0 || phone[1]!=5) {
      setPhoneError("Phone Number Requierd");
    } else if (subject.length<4 || /[0-9]/.test(subject)) {
      setSubjectError("Subject Requierd");
    } else if (information.length<10 || /[0-9]/.test(information)) {
      setInformationError("information Requierd");
    } else {
      data(e);
    }
  };

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

            <TouchableOpacity onPress={() => navigation.navigate("SignUpUser")}>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={{ fontSize: 48, alignItems: "center", textAlign: "center" }}>
        {" "}
        Contact Us
      </Text>

      <View
        style={{
          alignItems: "center",
          marginTop: "5%",
          width: Platform.OS === "android" ? "100%" : "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "50%",
            marginLeft: Platform.OS === "android" ? "0%" : "10%",
            marginRight: Platform.OS === "android" ? "40%" : "0%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Full Name"
              style={styles.fullname}
              onChangeText={(text) => setFullName(text)}
            />
             <Text style={{ textAlign: "center", color: "red" }}>
              {fullnameError}
            </Text>
            <Ionicons
              name="time-outline"
              style={{
                marginTop: "2.20%",
                marginLeft: Platform.OS === "android" ? "5%" : "25%",
              }}
              size={24}
              color="black"
            />
            <Text style={{ marginTop: "2.3%" }}>Office hours: 09:00-18:00</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Email"
              style={styles.email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ textAlign: "center", color: "red" }}>
              {emailError}
            </Text>

            <EvilIcons
              name="location"
              style={{
                marginTop: "2.20%",
                marginLeft: Platform.OS === "android" ? "5%" : "25%",
              }}
              size={24}
              color="black"
            />
            <Text style={{ marginTop: "2.3%" }}>
              Address: 42th Expo st., Tel Aviv, Israel
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Phone Number"
              style={styles.phone}
              onChangeText={(text) => setPhone(text)}
            />
            <Text style={{ textAlign: "center", color: "red" }}>
              {phoneError}
            </Text>

            <MaterialCommunityIcons
              name="fax"
              style={{
                marginTop: "2.20%",
                marginLeft: Platform.OS === "android" ? "5%" : "25%",
              }}
              size={24}
              color="black"
            />
            <Text style={{ marginTop: "2.3%" }}>Fax: +972-555-555556</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Subject"
              style={styles.subject}
              onChangeText={(text) => setSubject(text)}
            />
            <Text style={{ textAlign: "center", color: "red" }}>
              {subjectError}
            </Text>

            <Feather
              name="phone"
              style={{
                marginTop: "2.20%",
                marginLeft: Platform.OS === "android" ? "5%" : "25%",
              }}
              size={24}
              color="black"
            />
            <Text style={{ marginTop: "2.3%" }}>Phone: +972-555-555555</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Enter Information"
              style={styles.enter}
              onChangeText={(text) => setInformation(text)}
            />
            <Text style={{ textAlign: "center", color: "red" }}>
              {informationError}
            </Text>

            <Feather
              name="mail"
              style={{
                marginTop: "2.20%",
                marginLeft: Platform.OS === "android" ? "5%" : "25%",
              }}
              size={24}
              color="black"
            />
            <Text style={{ marginTop: "2.3%" }}>Mail: contact@expo.com</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.send} onPress={checkTextInput}>
              <Text
                style={{ color: "white", textAlign: "center", marginTop: "1%" }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          height: Platform.OS === "android" ? "30%" : "20%",
          marginTop: Platform.OS === "android" ? "11%" : "8%",
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 240, 255)",
  },

  enter: {
    height: Platform.OS === "android" ? 40 : 40,
    width: Platform.OS === "android" ? 150 : 250,
    backgroundColor: "white",
    marginTop: "2%",
  },
  footer: {
    backgroundColor: "white",
    flex: 1,
    width: Platform.OS === "android" ? "35%" : "100%",
  },

  subject: {
    height: Platform.OS === "android" ? 40 : 40,
    width: Platform.OS === "android" ? 150 : 250,
    backgroundColor: "white",
    marginTop: "2%",
  },
  fullname: {
    height: Platform.OS === "android" ? 40 : 40,
    width: Platform.OS === "android" ? 150 : 250,
    backgroundColor: "white",
    marginTop: "2%",
  },
  email: {
    height: Platform.OS === "android" ? 40 : 40,
    width: Platform.OS === "android" ? 150 : 250,
    backgroundColor: "white",
    marginTop: "2%",
  },
  phone: {
    height: Platform.OS === "android" ? 40 : 40,
    width: Platform.OS === "android" ? 150 : 250,
    backgroundColor: "white",
    marginTop: "2%",
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
  send: {
    marginTop: Platform.OS === "android" ? "15%" : "5%",
    marginBottom: Platform.OS === "android" ? "30%" : "0%",
    width: Platform.OS === "android" ? "73%" : "30%",
    height: Platform.OS === "android" ? "73%" : "40%",
    marginLeft: Platform.OS === "android" ? "0%" : "19%",
    backgroundColor: "rgba(69,187,249,255)",
    borderRadius: 30,
  },
});

export default ContactScreen;
