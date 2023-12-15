import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../Api/Firebase_config";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../Api/Firebase_config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Api/Firebase_config";

const NewBusinessUpload = ({ navigation }) => {
  const [whatIsAllAbout, setWhatIsAllAbout] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [user, setUser] = useState();
  const [partnerAmount, setPartnerAmount] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [giveForInvestment, setGiveForInvestment] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [urlError, setUrlError] = useState("");
  const [url, setUrl] = useState("");
  const [monthSalesRevenue, setMonthSalesRevenue] = useState("");
  const [yearSalesRevenue, setYearSalesRevenue] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [whatIsAllAboutError, setWhatIsAllAboutError] = useState("");
  const [businessCategoryError, setBusinessCategoryError] = useState("");
  const [partnerAmountError, setPartnerAmountError] = useState("");
  const [investmentAmountError, setInvestmentAmountError] = useState("");
  const [giveForInvestmentError, setGiveForInvestmentError] = useState("");
  const [businessPlanError, setBusinessPlanError] = useState("");
  const [monthSalesRevenueError, setMonthSalesRevenueError] = useState("");
  const [yearSalesRevenueError, setYearSalesRevenueError] = useState("");
  const [businessLocationError, setBusinessLocationError] = useState("");
  const [progress, setProgress] = useState(0);
  const [token, setToken] = useState("");
  const [userUid, setUserUid] = useState("");
  const [ideaCategory, setIdeaCategory] = useState(" ");

  useEffect(() => {
    authListener();
  }, [user]);

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
        setUserUid(user111.uid);
      } else {
        setUser(null);
      }
    });
  };

  const data = () => {
    const usersRef = collection(db, "AllBusinessUploads");
    // Add data to firestore AllBusinessUploads collection
    setDoc(
      doc(usersRef, user.uid),
      {
        WhatIsAllAbout: whatIsAllAbout,
        GiveForInvestment: giveForInvestment,
        InvestmentAmount: investmentAmount,
        BusinessLocation: businessLocation,
        PartnerAmount: partnerAmount,
        YearSalesRevenue: yearSalesRevenue,
        MonthSalesRevenue: monthSalesRevenue,
        BusinessCategory: businessCategory,
        BusinessPlan: businessPlan,
        Token: token,
        UserUid: userUid,
        IdeaCategory: ideaCategory,
      },
      { merge: true }
    )
      .then(() => {
        alert("Data Successfully Submitted");
        navigation.navigate("Business");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = async (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `Business/${file.name}`);
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
  const clearError = () => {
    setBusinessCategoryError("");
    setWhatIsAllAboutError("");
    setPartnerAmountError("");
    setInvestmentAmountError("");
    setGiveForInvestmentError("");
    setBusinessPlanError("");
    setMonthSalesRevenueError("");
    setYearSalesRevenueError("");
    setBusinessLocationError("");
    setUrlError("");
  };

  //Check for the Email error TextInput
  const checkTextInput = () => {
    clearError();
    if (
      businessCategory == "" ||
      businessCategory.length < 3 ||
      /[0-9]/.test(businessCategory)
    ) {
      setBusinessCategoryError("Business Category Required");
    } else if (
      whatIsAllAbout == "" ||
      whatIsAllAbout.length < 3 ||
      /[0-9]/.test(whatIsAllAbout)
    ) {
      setWhatIsAllAboutError(" What Is All About Required");
    } else if (investmentAmount == "" || isNaN(+investmentAmount)) {
      setInvestmentAmountError("investment Amount Is Required");
    } else if (
      giveForInvestment == "" ||
      isNaN(+giveForInvestment) ||
      giveForInvestment > 100 ||
      giveForInvestment < 1
    ) {
      setGiveForInvestmentError(
        "Give For Investment Required Please Chose 1%-100%"
      );
    } else if (
      partnerAmount == "" ||
      isNaN(+partnerAmount) ||
      partnerAmount > 50
    ) {
      setPartnerAmountError("Partner Amount Required The Max Is 50 People");
    } else if (
      businessPlan == "" ||
      businessPlan.length < 2 ||
      /[0-9]/.test(businessPlan)
    ) {
      setBusinessPlanError("Business Plan Required Answer Yes Or No Please");
    } else if (monthSalesRevenue == "" || isNaN(+monthSalesRevenue)) {
      setMonthSalesRevenueError("Month Sales Revenue Required");
    } else if (yearSalesRevenue == "" || isNaN(+yearSalesRevenue)) {
      setYearSalesRevenueError("year Sales Revenue Required");
    } else if (businessLocation == "" || businessLocation.length < 3) {
      setBusinessLocationError("Business Location Required");
    } else if (url == "") {
      setUrlError("Upload Your Id Or Driver license");
    } else {
      data();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 48, textAlign: "center" }}>
        New Business Upload{" "}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Business Category"
        value={businessCategory}
        onChangeText={(text) => setBusinessCategory(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {businessCategoryError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="What is All About"
        value={whatIsAllAbout}
        onChangeText={(text) => setWhatIsAllAbout(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {whatIsAllAboutError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="How Much Money Investment You Need"
        value={investmentAmount}
        onChangeText={(text) => setInvestmentAmount(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {investmentAmountError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="How Much % Are You Ready To Give For Investment"
        value={giveForInvestment}
        onChangeText={(text) => setGiveForInvestment(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {giveForInvestmentError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="How Many Partners You Have"
        value={partnerAmount}
        onChangeText={(text) => setPartnerAmount(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {partnerAmountError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Do You Have Business Plan"
        value={businessPlan}
        onChangeText={(text) => setBusinessPlan(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {businessPlanError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Month Sales Revenue"
        value={monthSalesRevenue}
        onChangeText={(text) => setMonthSalesRevenue(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {monthSalesRevenueError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Year Sales Revenue"
        value={yearSalesRevenue}
        onChangeText={(text) => setYearSalesRevenue(text)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {yearSalesRevenueError}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Business Location"
        value={businessLocation}
        onChangeText={(value) => setBusinessLocation(value)}
      />
      <Text style={{ textAlign: "center", color: "red" }}>
        {businessLocationError}
      </Text>

      <View style={{ textAlign: "center" }}>
        <form onSubmit={formHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload</button>
        </form>
        <Text>Uploading done {progress}%</Text>
        <Text style={{ textAlign: "center", color: "red" }}>{urlError}</Text>
      </View>

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
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15%",
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "white",
    width: "70%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 240, 255)",
  },
});

export default NewBusinessUpload;
