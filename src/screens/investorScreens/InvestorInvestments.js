import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import InvestorDataInvestments from "./InvestorDataInvestments";
import { Ionicons } from "@expo/vector-icons";

const InvestorInvestments = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    authListener();
  }, [user]);

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
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
                  </Button>
                }
              >
                <Menu.Item onPress={SignOutUser} title="Sign Out" />
              </Menu>
            </View>
          </Provider>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginTop: "3.5%",
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

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Investor");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />

          <Text> Go Back</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", fontSize: 25 }}>
          Ideas Or Business That You Request to Contact With
        </Text>

        <InvestorDataInvestments />
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: Platform.OS === "android" ? "31%" : "18%",
          marginTop: Platform.OS === "android" ? "49%" : "33%",
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

export default InvestorInvestments;

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
    marginTop: "25%",
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
    marginLeft: "9%",
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
