import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Picker,
  Image,
  CheckBox,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "./Firebase_config";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase_config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./Firebase_config";
import "react-phone-input-2/lib/style.css";

const RegisterScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserID] = useState("");
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");
  const [accountTypeError, setAccountTypeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedError, setSelectionError] = useState(false);

  useEffect(() => {
    authListener();
  }, [user]);

  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        //setUserID(user.uid);
        setUser(user111);
      } else {
        setUser(null);
      }
    });
  };

  const data = (e) => {
    e.preventDefault();
    const usersRef = collection(db, "Users");

    // Add data to the firestore Users Collection
    setDoc(doc(usersRef, user.uid), {
      FirstName: firstName,
      LastName: lastName,
      Age: age,
      AccountType: accountType,
      Address: address,
      Phonenumber: phonenumber,
      Token: token,
      UserUid: user.uid,
    })
      .then(() => {
        alert("Register Successfully Submitted");
        if (accountType === "Idea Owner") {
          navigation.navigate("Idea");
        } else if (accountType === "Business Owner") {
          navigation.navigate("Business");
        } else if (accountType === "Investor") {
          navigation.navigate("Investor");
        } else navigation.navigate("Afterlogin");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const clearError = () => {
    setLastNameError("");
    setFirstNameError("");
    setAgeError("");
    setPhonenumberError("");
    setAccountTypeError("");
    setAddressError("");
    setUrlError("");
  };

  //Check for the Email  error TextInput
  const checkTextInput = (e) => {
    clearError();
    if (firstName == "" || firstName.length < 3 || /[0-9]/.test(firstName)) {
      setFirstNameError("First Name Required");
    } else if (
      lastName == "" ||
      lastName.length < 3 ||
      /[0-9]/.test(lastName)
    ) {
      setLastNameError("Last Name Required");
    } else if (age == "" || Number(age) < 18 || isNaN(+age) || age > 140) {
      // if Empty or less 18 or have input Character not number
      setAgeError("Age Required");
    } else if (address == "" || address.length < 3) {
      setAddressError("Address Is Required");
    } else if (
      phonenumber.length != 10 ||
      isNaN(+phonenumber) ||
      phonenumber[0] != 0 ||
      phonenumber[1] != 5 
      
    ) {
      setPhonenumberError("Phone Number Required");
    } else if (accountType == "") {
      setAccountTypeError("Account Type Is Required");
    } else if (url == "") {
      setUrlError("Upload ID Or Driver license Photo");
    } else if (isSelected == false) {
      setSelectionError(
        "To Continue You need To Check The Box For Terms of Use and Privacy Policy "
      );
    } else {
      data(e);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  //function for upload the file to firebase storage
  const uploadFiles = async (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `ID/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          setToken(downloadURL);
        });
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      
        <Image
          style={{
            width: 150,
            height: 150,
            marginLeft: "47%",
            marginTop: "3%",
          }}
          source={require("../../assets/expo1.png")}
        />
      

      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Register To Expo
      </Text>

      <TextInput
        style={styles.email}
        placeholder="First Name"
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {firstNameError}
      </Text>
      <TextInput
        style={styles.password}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(value) => setLastName(value)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>{lastNameError}</Text>

      <TextInput
        style={styles.password}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>{ageError}</Text>

      <TextInput
        style={styles.password}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>{addressError}</Text>

      <TextInput
        style={styles.password}
        placeholder="Phone Number"
        value={phonenumber}
        onChangeText={(text) => setPhonenumber(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {phonenumberError}
      </Text>

      <Picker
        value={accountType}
        style={styles.password}
        onValueChange={(itemValue) => setAccountType(itemValue)}
      >
        <Picker.Item label="Please Chose User Account" />
        <Picker.Item label="Idea Owner" value="Idea Owner" />
        <Picker.Item label="Investor" value="Investor" />
        <Picker.Item label="Business Owner" value="Business Owner" />
      </Picker>
      <Text style={{ textAlign: "center", color: "red" }}>
        {accountTypeError}
      </Text>
      <Text style={{ textAlign: "center" }}>
        Please Upload ID Or Driver License
      </Text>

      <View style={{ textAlign: "center" }}>
        <form onSubmit={formHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload</button>
        </form>
        <Text>Uploading done {progress}%</Text>
        <Text style={{ textAlign: "center", color: "red", marginBottom: "1%" }}>
          {urlError}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={{ marginRight: "0.5%", marginTop: "0.1%" }}
        />
        <Text>
          At registration I read and approved the Terms of Use and Privacy
          Policy
        </Text>
      </View>

      <Text style={{ textAlign: "center", color: "red" }}>
        {isSelectedError}
      </Text>


    


      

      <TouchableOpacity
        style={{ textAlign: "center" }}
        onPress={checkTextInput}
      >
        <Text style={{ textAlign: "center", marginTop: "3%" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginTop: 10,
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default RegisterScreen;

/*
 
 */
