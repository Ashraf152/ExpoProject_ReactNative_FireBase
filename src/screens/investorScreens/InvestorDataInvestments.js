import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { StyleSheet, View, Text, Image } from "react-native";
import { db } from "../../Api/Firebase_config";
import { authentication } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";

const InvestorDataInvestments = () => {
  const [collectionDataInvest, setCollectionDataInvest] = useState([]);
  const [check, setCheck] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    authListener();
  }, [user]);

  //check user authentication
  const authListener = () => {
    onAuthStateChanged(authentication, (user111) => {
      if (user111) {
        setUser(user111);
        setCheck(user111.uid);
      } else {
        setUser(null);
      }
    });
  };

  //fetch data from ContactFromInvestors from firestore firebase
  const fetchDataInvest = async () => {
    const querySnapshot = await getDocs(collection(db, "ContactFromInvestors"));
    let array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push(data);
    });
    let array1 = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].CheckId == check) {
        array1.push(array[i]);
      }
    }
    setCollectionDataInvest(array1);
  };
  //call the function
  fetchDataInvest();

  return (
    <View>
      <View style={styles.imageView2}>
        {collectionDataInvest.map((v, index) => (
          <View key={index}>
            <View>
              <Image style={styles.image} source={{ uri: v.Token }} />
              <View style={{ marginTop: "3%" }}>
                <Text style={styles.text}>
                  Idea/Business Category:
                  {v.IdeaCategory}
                  {v.BusinessCategory}
                </Text>

                <Text style={styles.text}>
                  Do you Have business Plan :{v.BusinessPlan}
                  {"\n"}
                </Text>
                <Text style={styles.text}>
                  what Is All About :{v.WhatIsAllAbout}
                  {"\n"}
                </Text>
                <Text style={styles.text}>
                  Partner Amount:
                  {v.PartnerAmount}
                  {"\n"}
                </Text>

                <Text style={styles.text}>
                  Month Sales Revenue:
                  {v.MonthSalesRevenue}
                  {"\n"}
                </Text>
                <Text style={styles.text}>
                  Year Sales Revenue:
                  {v.YearSalesRevenue}
                  {"\n"}
                </Text>
                <Text style={styles.text}>
                  Business Location:
                  {v.BusinessLocation}
                  {"\n"}
                </Text>

                <Text style={styles.text}>
                  how much % you give for invest :{v.GiveForInvestment}
                  {"\n"}
                </Text>

                <Text style={styles.text}>
                  how much Investment needed :{v.InvestmentAmount}
                  {"\n"}
                </Text>

                <Text style={styles.text}>
                  Do you Have PATNET :{v.HavePatent}
                  {"\n"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InvestorDataInvestments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(220, 240, 255)",
  },

  text: {
    fontSize: 25,
    fontStyle: "italic",
    marginLeft: "1%",
    textAlign: "center",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    resizeMode: "contain",
    borderRadius: 30,
  },
  imageView2: {
    flexDirection: "row",
    height: "100%",
    width: "85%",
    justifyContent: "space-evenly",
    marginLeft: "7.5%",
  },
});
