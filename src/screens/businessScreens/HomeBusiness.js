import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { db } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../Api/Firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";

const HomeBusiness = ({ navigation }) => {
  const [collectionDataBusiness, setCollectionDataBusiness] = useState([]);
  const [user, setUser] = useState();
  const [checkId, setCheckId] = useState(null);

  useEffect(() => {
    authListener();
  }, [user]);

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
        setCheckId(user111.uid);
      } else {
        setUser(null);
      }
    });
  };

  //function to check where this user id == to current user
  const fetchDataBusiness = async () => {
    const q = query(
      collection(db, "AllBusinessUploads"),
      where("UserUid", "==", checkId)
    );

    const querySnapshot = await getDocs(q);
    let array = [];

    //push data into CollectionDataBusiness array
    querySnapshot.forEach((doc) => {
      array.push({
        userUid: doc.id,
        BusinessCategory: doc.data().BusinessCategory,
        BusinessLocation: doc.data().BusinessLocation,
        BusinessPlan: doc.data().BusinessPlan,
        Token: doc.data().Token,
        GiveForInvestment: doc.data.GiveForInvestment,
        InvestmentAmount: doc.data().InvestmentAmount,
        YearSalesRevenue: doc.data().YearSalesRevenue,
        MonthSalesRevenue: doc.data().MonthSalesRevenue,
        PartnerAmount: doc.data().PartnerAmount,
        WhatIsAllAbout: doc.data().WhatIsAllAbout,
      });
    });
    setCollectionDataBusiness(array);
  };

  fetchDataBusiness();

  if (!collectionDataBusiness) {
    return null;
  } else
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginLeft: 20 }}>
          Your Business In The Database
        </Text>

        <View style={styles.imageView}>
          {collectionDataBusiness.map((array) => {
            return (
              <Image
                style={styles.image}
                source={{ uri: array.Token }}
                key={array}
              />
            );
          })}

          <View style={styles.information}>
            <Text style={{ fontSize: 30 }}>Information</Text>
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>Business Category {v.BusinessCategory}</Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>
                Where is The Business Located {v.BusinessLocation}
              </Text>
            ))}

            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>
                How many partners you have : {v.PartnerAmount}
              </Text>
            ))}

            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>MonthSalesRevenue : {v.MonthSalesRevenue}</Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>YearSalesRevenue : {v.YearSalesRevenue}</Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>
                Do You Have Business Plan : {v.BusinessPlan}
              </Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>
                How Much % You Give For Investment : {v.GiveForInvestment}
              </Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>
                How Much Money Do You Need : {v.InvestmentAmount}
              </Text>
            ))}
            {collectionDataBusiness.map((v, index) => (
              <Text key={index}>What Is All About : {v.WhatIsAllAbout}</Text>
            ))}
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
  image: {
    height: Platform.OS === "android" ? "40%" : 500,
    width: Platform.OS === "android" ? "40%" : 500,
    resizeMode: "contain",
    marginLeft: "5%",
  },
  imageView: {
    marginLeft: "0%",
    marginTop: "2%",
    height: Platform.OS === "android" ? "60%" : "100%",
    width: Platform.OS === "android" ? "60%" : "100%",
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
  information: {
    marginLeft: "10%",
  },
});

export default HomeBusiness;
