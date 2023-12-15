import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { authentication } from "./Firebase_config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./Firebase_config";

const Firebase = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userId, setUserID] = useState("");
  const [user, setUser] = useState();

  //call to functions on every change
  useEffect(
    () => {
      authListener();
      clearInputs();
      clearErrors();
    },
    [user],
    [hasAccount]
  );

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
      } else {
        setUser(null);
      }
    });
  };

  //reset Password function
  const forgotPassword = (e) => {
    if (email == "") setEmailError("email is requierd");
    else if (email != authentication) setEmailError("auth/invalid-email");

    sendPasswordResetEmail(authentication, email)
      .then(() => {
        alert("reset password sent to " + email + " check in spam");
        console.log(email);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  //clear all errors on screen after it show it once
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  //sign in user with firebase
  const SignInUser = () => {
    clearInputs();
    clearErrors();
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        //ok
        const user = userCredential.user;

        setUserID(user.uid);
        const myDoc = doc(db, "Users", user.uid);
        getDoc(myDoc).then((snapshot) => {
          //check user account type to navigate the use to the correct page
          if (snapshot.exists) {
            if (snapshot.data().AccountType === "Idea Owner")
              navigation.navigate("Idea");
            else if (snapshot.data().AccountType === "Business Owner")
              navigation.navigate("Business");
            else if (snapshot.data().AccountType === "Investor")
              navigation.navigate("Investor");
            else navigation.navigate("Afterlogin");
          }
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          style={{
            width: 150,
            height: 150,
            marginLeft: "47%",
            marginTop: "3%",
          }}
          source={require("../../assets/expo1.png")}
        />
      </TouchableOpacity>

      <Text style={{ textAlign: "center", fontSize: 20 }}>Connect To Expo</Text>
      <TextInput
        style={styles.email}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={{ justifyContent: "center", textAlign: "center" }}>
        {emailError}
      </Text>

      <TextInput
        style={styles.password}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ justifyContent: "center", textAlign: "center" }}>
        {passwordError}
      </Text>

      {hasAccount ? (
        <View>
          <TouchableOpacity style={styles.signin} onPress={SignInUser}>
            <Text>Sign In</Text>
            <Feather style={styles.icon} name="log-in" />
          </TouchableOpacity>

          <Text style={{ justifyContent: "center", textAlign: "center" }}>
            Don't have an account?
            <Text onPress={() => navigation.navigate("SignUpUser")}>
              {" "}
              Sign up
            </Text>
          </Text>
          <TouchableOpacity
            onPress={forgotPassword}
            style={{ textAlign: "center" }}
          >
            <Text style={{ color: "red" }}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.signin}
            onPress={() => navigation.navigate("SignUpUser")}
          >
            <Text>Sign Up</Text>
            <Feather style={styles.icon} name="log-in" />
          </TouchableOpacity>

          <Text style={{ justifyContent: "center", textAlign: "center" }}>
            Have an account?
            <Text onPress={() => setHasAccount(!hasAccount)}> Sign in</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "rgb(220, 240, 255)",
  },
  email: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRadius: 30,
    marginLeft: "20%",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 100,
  },
  password: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRadius: 30,
    marginLeft: "20%",
    borderWidth: 1,
    backgroundColor: "white",
  },
  signin: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    borderRadius: 10,
    marginLeft: "20%",
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default Firebase;
