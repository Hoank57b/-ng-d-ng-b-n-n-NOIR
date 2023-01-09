import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import FogotPassword from "../screens/FogotPassword";
import Productdetail from "../screens/Productdetail";
import BottomNavigation from "./BottomNavigation";
import Cart from "../screens/Cart";
import EditProfile from "../screens/EditProfile";
import Favorite from "../screens/Favorite";
import YourOrder from "../screens/YourOrder";
import YourOderDetail from "../screens/YourOderDetail";
import Comment from "../screens/Comment";
import ListComment from "../screens/ListComment";

const Stack = createNativeStackNavigator();
const MainNavigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Register"} component={Register} />
        <Stack.Screen name={"FogotPassword"} component={FogotPassword} />
        <Stack.Screen name={"BottomNavigation"} component={BottomNavigation} />
        <Stack.Screen name={"Productdetail"} component={Productdetail} />
        <Stack.Screen name={"EditProfile"} component={EditProfile} />
        <Stack.Screen name={"Cart"} component={Cart} />
        <Stack.Screen name={"Favorite"} component={Favorite} />
        <Stack.Screen name={"YourOrder"} component={YourOrder} />
        <Stack.Screen name={"YourOderDetail"} component={YourOderDetail} />
        <Stack.Screen name={"Comment"} component={Comment} />
        <Stack.Screen name={"ListComment"} component={ListComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigations;
