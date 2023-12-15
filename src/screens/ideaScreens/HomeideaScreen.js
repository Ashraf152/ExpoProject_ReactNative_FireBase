import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { db } from "../../Api/Firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../Api/Firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";

const HomeideaScreens = ({ navigation }) => {
  const [collectionDataIdea, setCollectionDataIdea] = useState([]);
  const [user, setUser] = useState();
  const [userId, setUserID] = useState("");
  const [checkId, setCheckId] = useState(null);
  const [havePatent, setHavePatent] = useState("");

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
  const fetchDataIdea = async () => {
    const q = query(
      collection(db, "AllIdeasUploads"),
      where("UserUid", "==", checkId)
    );

    const querySnapshot = await getDocs(q);
    let array = [];

    //push data into CollectionDataIdea array
    querySnapshot.forEach((doc) => {
      array.push({
        userUid: doc.id,
        GiveForInvestment: doc.data().GiveForInvestment,
        HavePatent: doc.data().HavePatent,
        IdeaCategory: doc.data().IdeaCategory,
        Token: doc.data().Token,
        WhatIsAllAbout: doc.data.WhatIsAllAbout,
        InvestmentAmount: doc.data().InvestmentAmount,
      });
    });
    setCollectionDataIdea(array);
  };

  fetchDataIdea();
  if (!collectionDataIdea) {
    return null;
  } else
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginLeft: 20 }}>
          Your Ideas In The Database
        </Text>

        <View style={styles.imageView}>
          {collectionDataIdea.map((array) => {
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
            {collectionDataIdea.map((v, index) => (
              <Text key={index}>Have Patent ? : {v.HavePatent}</Text>
            ))}

            {collectionDataIdea.map((v, index) => (
              <Text key={index}>
                how much % you give for investment ? : {v.GiveForInvestment}
              </Text>
            ))}

            {collectionDataIdea.map((v, index) => (
              <Text key={index}>
                what is your idea category : {v.IdeaCategory}
              </Text>
            ))}

            {collectionDataIdea.map((v, index) => (
              <Text key={index}>
                how much money you need : {v.InvestmentAmount}
              </Text>
            ))}

            {collectionDataIdea.map((v, index) => (
              <Text key={index}>what is all about : {v.WhatIsAllAbout}</Text>
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

export default HomeideaScreens;
