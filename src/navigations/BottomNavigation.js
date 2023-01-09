import { Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Favorite from "../screens/Favorite";
import Cart from "../screens/Cart";
import Account from "../screens/Account";
import Home from "../screens/Home";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#F8774A',
      tabBarLabelStyle:{
        fontSize: 12,
      }
    }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Trang chủ",
        tabBarIcon: ({ focused, color }) => (
            <Octicons name="home" size={20} color= {focused ? "#F8774A" : "black" }/>
        ),
      }}
    />
    <Tab.Screen name="Search"
      component={Search}
      options={{
        tabBarLabel: "Tìm kiếm",
        tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="search" size={20} color= {focused ? "#F8774A" : "black" } />
        ),
      }} />
    <Tab.Screen name="Cart"
      component={Cart}
      options={{
        tabBarLabel: "Giỏ hàng",
        tabBarIcon: ({ focused,color }) => (
          <MaterialCommunityIcons name="cart" size={20} color= {focused ? "#F8774A" : "black" } />
        ),
      }} />
      <Tab.Screen name="Account"
      component={Account}
      options={{
        tabBarLabel: "Tài khoản",
        tabBarIcon: ({ focused,color }) => (
            <MaterialCommunityIcons name="account-outline" size={20} color= {focused ? "#F8774A" : "black" } />
        ),
      }} />
  </Tab.Navigator>
  );
};

export default BottomNavigation;