import React from "react";
import { StyleSheet } from "react-native";
import InvestorScreen from "./src/screens/investorScreens/InvestorScreen";
import IdeaOwnerScreen from "./src/screens/ideaScreens/IdeaOwnerScreen";
import BusinessOwnerScreen from "./src/screens/businessScreens/BusinessOwnerScreen";
import InvestorInvestments from "./src/screens/investorScreens/InvestorInvestments";
import HowItWorksScreen from "./src/screens/howItWorksScreens/HowItWorksScreen";
import AboutScreen from "./src/screens/aboutScreens/AboutScreen";
import ContactScreen from "./src/screens/contactScreens/ContactScreen";
import NewIdeaUpload from "./src/screens/ideaScreens/NewIdeaUpload";
import ScreenAfterLogin from "./src/screens/ScreenAfterLogin";
import Firebase from "./src/Api/Firebase";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./src/Api/RegisterScreen";
import SignUpUser from "./src/Api/SignUpUser";
import HomeideaScreens from "./src/screens/ideaScreens/HomeideaScreen";
import HomeBusiness from "./src/screens/businessScreens/HomeBusiness";
import HomeScreen from "./src/screens/homeScreens/HomeScreen";
import InvestorDataInvestments from "./src/screens/investorScreens/InvestorDataInvestments";
import NewBusinessUpload from "./src/screens/businessScreens/NewBusinessUpload";
import FetchBusinessData from "./src/screens/businessScreens/FetchBusinessData";
import FetchIdeaData from "./src/screens/ideaScreens/FetchIdeaData";
import FetchInvestorAllIdeaBusinessData from "./src/screens/investorScreens/FetchInvestorAllIdeaBusinessData";

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Investor"
        component={InvestorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Idea"
        component={IdeaOwnerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Business"
        component={BusinessOwnerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HowItWork"
        component={HowItWorksScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewideaUpload"
        component={NewIdeaUpload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Investorinv"
        component={InvestorInvestments}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NewbusinessUpload"
        component={NewBusinessUpload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Afterlogin"
        component={ScreenAfterLogin}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Firebase}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOut"
        component={Firebase}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpUser"
        component={SignUpUser}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Homeideascreens"
        component={HomeideaScreens}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="homeBusiness"
        component={HomeBusiness}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FetchBusinessData"
        component={FetchBusinessData}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FetchIdeaData"
        component={FetchIdeaData}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FetchInvestorAllIdeaBusinessData"
        component={FetchInvestorAllIdeaBusinessData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvestorDataInvestments"
        component={InvestorDataInvestments}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});

export default App;
