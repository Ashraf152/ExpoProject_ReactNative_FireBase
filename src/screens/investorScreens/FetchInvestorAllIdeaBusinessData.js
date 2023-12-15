import React, { useState, useEffect } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../../Api/Firebase_config";
import { StyleSheet, View, Text, Image, Button, Platform } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../Api/Firebase_config";

const FetchInvestorAllIdeaBusinessData = () => {
  const [collectionDataBusiness, setCollectionDataBusiness] = useState([]);
  const [collectionDataIdea, setCollectionDataIdea] = useState([]);
  const [user, setUser] = useState();
  const [checkId, setCheckId] = useState(null);
  const [x, setX] = useState("1");

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

  //fetch data from AllBusinessUploads from firestore firebase
  const fetchDataBusiness = async () => {
    const querySnapshot = await getDocs(collection(db, "AllBusinessUploads"));
    let array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push(data);
    });
    setCollectionDataBusiness(array);
  };

  //call the function
  fetchDataBusiness();

  //fetch data from AllIdeasUploads from firestore firebase
  const fetchDataIdea = async () => {
    const querySnapshot = await getDocs(collection(db, "AllIdeasUploads"));
    let array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push(data);
    });
    setCollectionDataIdea(array);
  };

  //call the function
  fetchDataIdea();

  //fetch data from businessCollection and Idea and send it to ContactFromInvestors(firestore,firebase)
  const data = (v) => {
    const usersRef = collection(db, "ContactFromInvestors");
    // Add data to firestore ContactFromInvestors collection
    setDoc(doc(usersRef, user.uid + x), {
      CheckId: checkId,
      IdeaOrBusinessChose: v.UserUid,
      Token: v.Token,
      WhatIsAllAbout: v.WhatIsAllAbout,
      GiveForInvestment: v.GiveForInvestment,
      InvestmentAmount: v.InvestmentAmount,
      IdeaCategory: v.IdeaCategory,
      BusinessLocation: v.BusinessLocation,
      PartnerAmount: v.PartnerAmount,
      YearSalesRevenue: v.YearSalesRevenue,
      MonthSalesRevenue: v.MonthSalesRevenue,
      BusinessCategory: v.BusinessCategory,
    })
      .then(() => {
        alert("We have received your request ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setX(x + 1);
  };

  return (
    <View>
      <View style={styles.imageView2}>
        {collectionDataBusiness.map((v, index) => (
          <View key={index}>
            <View>
              <Image style={styles.image} source={{ uri: v.Token }} />
              <View style={{ marginTop: "3%" }}>
                <Text style={styles.text}>
                  Business Category: {"\n"}
                  {v.BusinessCategory}
                </Text>

                <Text style={styles.text}>
                  Business Location: {"\n"}
                  {v.BusinessLocation}
                </Text>
                <Text style={styles.text}>
                  Business Plan: {"\n"}
                  {v.BusinessPlan}
                </Text>
                <Text style={styles.text}>
                  how much % you give for invest :{"\n"}
                  {v.GiveForInvestment}
                </Text>
                <Text style={styles.text}>
                  how much Investment needed :{"\n"}
                  {v.InvestmentAmount}
                </Text>
                <Text style={styles.text}>
                  Month Sales Revenue: {"\n"}
                  {v.MonthSalesRevenue}
                </Text>
                <Text style={styles.text}>
                  Year Sales Revenue: {"\n"}
                  {v.YearSalesRevenue}
                </Text>
                <Text style={styles.text}>
                  Partner Amount: {"\n"}
                  {v.PartnerAmount}
                </Text>
                <Text style={styles.text}>
                  What Is All About: {"\n"}
                  {v.WhatIsAllAbout}
                </Text>
              </View>
              <Button title="Press Here For Contact" onPress={() => data(v)} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.imageView3}>
        {collectionDataIdea.map((v, index) => (
          <View key={index}>
            <View>
              <Image style={styles.image} source={{ uri: v.Token }} />
              <View style={{ marginTop: "3%" }}>
                <Text style={styles.text}>
                  Idea Category:{"\n"}
                  {v.IdeaCategory}
                </Text>
                <Text style={styles.text}>
                  have Patnent? :{"\n"}
                  {v.HavePatent}
                </Text>

                <Text style={styles.text}>
                  how much % you give for invest :{"\n"}
                  {v.GiveForInvestment}
                </Text>
                <Text style={styles.text}>
                  how much Investment needed :{"\n"}
                  {v.InvestmentAmount}
                </Text>
                <Text style={styles.text}>
                  WhatIsAllAbout :{"\n"}
                  {v.WhatIsAllAbout}
                </Text>

                <Button
                  title="Press Here For Contact"
                  onPress={() => data(v)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FetchInvestorAllIdeaBusinessData;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(220, 240, 255)",
  },

  text: {
    fontSize: Platform.OS === "android" ? 15 : 25,
    fontStyle: "italic",
    flexDirection: "row",
    marginLeft: "1%",
    textAlign: "center",
    backgroundColor: "white",
    marginLeft: Platform.OS === "android" ? "45%" : "0%",
    width: Platform.OS === "android" ? "100%" : "100%",
  },

  image: {
    width: Platform.OS === "android" ? "100%" : "100%",
    height: Platform.OS === "android" ? "30%" : "50%",
    backgroundColor: "white",
    marginLeft: Platform.OS === "android" ? "45%" : "0%",
    resizeMode: "contain",
  },
  imageView2: {
    flexDirection: Platform.OS === "android" ? "column" : "row",
    marginTop: Platform.OS === "android" ? "250%" : "0%",
    height: Platform.OS === "android" ? "40%" : "100%",
    width: Platform.OS === "android" ? "40%" : "85%",
    justifyContent: Platform.OS === "android" ? "center" : "space-between",
    marginLeft: Platform.OS === "android" ? "12%" : "8%",
    marginBottom: Platform.OS === "android" ? "20%" : "0%",
  },
  imageView3: {
    flexDirection: Platform.OS === "android" ? "column" : "row",
    marginTop: Platform.OS === "android" ? "150%" : "0%",
    height: Platform.OS === "android" ? "40%" : "100%",
    width: Platform.OS === "android" ? "40%" : "85%",
    justifyContent: Platform.OS === "android" ? "center" : "space-between",
    marginLeft: Platform.OS === "android" ? "10%" : "8%",
  },
});
