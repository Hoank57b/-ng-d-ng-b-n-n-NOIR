
import React, { useState, useContext, createContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, updateUser , getUserByID } from './UserService';
import { register, insert  } from './UserService';
import constants from '../utils/constants';


export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [profile, setProfile] = useState({});
  const [cart_id, setCart_id] = useState({});

  const [userprofile, setUserProfile] = useState({});


  const onLogin = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result && result.token) {
        await AsyncStorage.setItem(constants.TOKEN_KEY, result.token);


        setIsLoggedIn(true);
      }
      setProfile(result.result);
      console.log(result.result);
    } catch (error) {
      console.log('dang nhap that bai', error);
    }
  }

  const onRegister = async (username, password, confirm_password, name) => {
    try {
      const result = await register(username, password, confirm_password, name);
      return result.status;
    } catch (error) {
      console.log('dang ky that bai', error);
    }
  }

  const onGetUserByID = async (id) => {
    try{
    const user = await getUserByID(id);
    setUserProfile(user);
  } catch (error) {
    console.log("lay san pham chi tiet that bai", error);
  }
}


  const onUpdateUser = async (  username,name, phone_number, address) => {
    try {
      const result = await updateUser( username, name, phone_number, address);
      return result.status;
    } catch (error) {
      console.log('Doi thong tin that bai', error);
    }
  }

  const onInsetcart = async (user_id) => {
    try {
      const result = await insert(user_id);
     setCart_id(result);
      console.log(result);
      
      return result.status;
    } catch (error) {
      console.log('them that bai', error);
    }
  }
  const onLogOut = () => {
    setIsLoggedIn(false);
  }

  return (
    <UserContext.Provider
      value={{
        onLogin, onRegister, isLoggedIn, profile, cart_id , setCart_id , setProfile, onLogOut, onInsetcart, onUpdateUser, onGetUserByID , userprofile
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


export default UserContext

