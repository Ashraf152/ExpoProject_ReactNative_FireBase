import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { db } from "../../Api/Firebase_config";

const FetchBusinessData = () => {
  const [collectionDataBusiness, setCollectionDataBusiness] = useState([]);

  const fetchDataBusiness = async () => {
    const querySnapshot = await getDocs(collection(db, "AllBusinessUploads"));
    //use array to get data from firestore collection AllBusinessUploads
    let array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push(data);
    });
    setCollectionDataBusiness(array);
  };

  fetchDataBusiness();

  return (
    <View>
      <View style={styles.imageView2}>
        {collectionDataBusiness.map((v, index) => (
          <View key={index}>
            <Image style={styles.image} source={{ uri: v.Token }} />
            <Text style={styles.text}>
              Business Category:
              {v.BusinessCategory}
              {"\n"}
              What Is All About:
              {v.WhatIsAllAbout}
              {"\n"}
              How Much Investment Needed:
              {v.InvestmentAmount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FetchBusinessData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(220, 240, 255)",
  },
  text: {
    fontSize: Platform.OS === "android" ? 15 : 20,
    fontStyle: "italic",
    flexDirection: "row",
    marginLeft: Platform.OS === "android" ? "35%" : "0%",
    width: Platform.OS === "android" ? "200%" : "100%",
    marginTop: Platform.OS === "android" ? "5%" : "0%",
    marginBottom: Platform.OS === "android" ? "65%" : "0%",
  },
  image: {
    width: Platform.OS === "android" ? "180%" : "100%",
    height: Platform.OS === "android" ? "70%" : "100%",
    resizeMode: "contain",
    marginLeft: Platform.OS === "android" ? "35%" : "0%",
    marginTop: Platform.OS === "android" ? "45%" : "0%",
    backgroundColor: "white",
  },
  imageView2: {
    flexDirection: Platform.OS === "android" ? "column" : "row",
    marginTop: Platform.OS === "android" ? "0%" : "10%",
    height: Platform.OS === "android" ? "40%" : "100%",
    width: Platform.OS === "android" ? "40%" : "85%",
    justifyContent: Platform.OS === "android" ? "center" : "space-between",
    marginLeft: Platform.OS === "android" ? "0%" : "8%",
    marginBottom: Platform.OS === "android" ? "20%" : "0%",
  },
});
