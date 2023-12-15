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
import { Feather } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const passwordValidator = require("password-validator");
const schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const SignUpUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userId, setUserID] = useState("");
  const [user, setUser] = useState();

  //call to functions on every change
  useEffect(() => {
    authListener();
  }, [user]);

  useEffect(() => {
    clearInputs();
    clearErrors();
  }, [hasAccount]);

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

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const checkInputText = () => {
    clearInputs();
    clearErrors();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/.test(email)) {
      setEmailError("Invalid Email");
    } else if (!schema.validate(password)) {
      setPasswordError(
        "Password Invalid \n Minimum length 8 / Maximum length 20 / Must have uppercase letters / Must have lowercase letters / Must have at least 2 digits / Should not have spaces "
      );
    } else {
      SignUp();
    }
  };

  const SignUp = () => {
    clearInputs();
    clearErrors();
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        //ok
        const user = userCredential.user;
        setUserID(user.uid);
        navigation.navigate("Register");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
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

      <Text style={{ textAlign: "center", fontSize: 20 }}>Sign Up To Expo</Text>
      <TextInput
        style={styles.email}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.password}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ justifyContent: "center", textAlign: "center" }}>
        {emailError}
        {passwordError}
      </Text>

      <View>
        <TouchableOpacity style={styles.signin} onPress={checkInputText}>
          <Text>Sign Up</Text>
          <Feather style={styles.icon} name="log-in" />
        </TouchableOpacity>

        {hasAccount ? (
          <View>
            <Text style={{ justifyContent: "center", textAlign: "center" }}>
              Have an account?
              <Text onPress={() => navigation.navigate("Login")}> Sign In</Text>
            </Text>
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

export default SignUpUser;
