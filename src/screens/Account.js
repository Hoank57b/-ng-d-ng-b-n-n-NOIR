import { View, Text ,StyleSheet , Image ,TouchableOpacity, Button , Pressable , ScrollView } from 'react-native'
import React, { useState,useContext,useEffect } from "react";
import EditProfile from './EditProfile';
import { UserContext } from "../user/UserContext";
import { ProductContext } from '../product/ProductContext';

const Account = (props) => {
  const { navigation } = props;

  const {profile , onLogOut , onGetUserByID , userprofile }=useContext(UserContext);
  const {onGetOrders} = useContext(ProductContext);

  useEffect(() => {
    onGetUserByID(profile._id).then();
    return () => {};
  }, []);

  const getAllOrders = async () => {
    await onGetOrders(profile._id);
  };

  const getAllFavorite = async () => {
    navigation.navigate("Favorite", {_id: profile._id });
  };

  const logout = async () => {
    navigation.navigate('Login');
  }
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onGetUserByID(profile._id).then();
    });
    return focusHandler;
}, [navigation]);
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.ViewTitle}>
          <Pressable onPress={() => navigation.navigate("EditProfile")} style = {{  right: 10, position: "absolute",}} >
          <Text style={styles.edittitle} >Chỉnh sửa</Text>
          </Pressable>
          
      </View>
      <View style={styles.containerParsonal}>
        <View>
          <Image
            source={require("../assets/images/avatarmember.png")}
          ></Image>
        </View>
        <View style={styles.textParsonnal}>
          <Text style={styles.textName}>{userprofile.name}</Text>
          <View style={styles.line}></View>
          <Text style={styles.textEmail}>{userprofile.phone_number}</Text>
          <View style={styles.line}></View>
          <Text style={styles.textEmail}>{userprofile.address}</Text>
        </View>
      </View>
      <View></View>
      <Pressable onPress={() => navigation.navigate("Bookmark")}>
      <View style={styles.containerSupportTiny}>
      <Image style={styles.imageSupport}
          source={require("../assets/images/next.png")}
          ></Image>
      <Text style={styles.textSupportTiny}>Đánh dấu</Text>
      </View>
      </Pressable>
      <Pressable onPress={() => {getAllOrders();   navigation.navigate("YourOrder", {id: profile._id });}}>
      <View  style={styles.containerSupport}>
          <Text style={styles.textSupport}>Đơn hàng</Text>
          <Image style={styles.imageSupport}
          source={require("../assets/images/next.png")}
          ></Image>
      </View>
      </Pressable>
      
      <View style={styles.containerSupport}>
          <Text style={styles.textSupport}>Phản hồi & hoàn tiền</Text>
          <Image style={styles.imageSupport}
          source={require("../assets/images/next.png")}
          ></Image>
      </View>
      <Pressable onPress={getAllFavorite}  style={styles.containerSupport}>
          <Text style={styles.textSupport}>Sản phẩm yêu thích</Text>
          <Image style={styles.imageSupport}
          source={require("../assets/images/next.png")}
          ></Image>
      </Pressable>
      <View style={styles.containerSupport}>
          <Text style={styles.textSupport}>Trợ giúp</Text>
          <Image style={styles.imageSupport}
          source={require("../assets/images/next.png")}
          ></Image>
      </View>
      <View style={styles.containerLogout}>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={styles.textLogout}>Đăng xuất</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    </ScrollView>
  )
}

export default Account

const styles = StyleSheet.create({
  logout:{
    backgroundColor: "#F8774A",
    borderRadius: 30,
    height: 49,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogout:{
    fontSize: 17,
    fontWeight: "600",
    color: "#F6F6F9",
  },
  containerLogout:{
    paddingHorizontal: 24,
    marginVertical: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageSupport:{
    right: 24,
    position: 'absolute',
  },
  textSupport:{
    fontSize: 18,
    fontWeight: "600",
  },
  textSupportTiny:{
    fontSize: 18,
    fontWeight: "600",
  },
  containerSupport:{
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  containerSupportTiny:{
    flexDirection: 'row',
    width: "100%",
    height: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  textEmail:{
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.5,
    color: '#000000',
  },
  textName:{
    fontSize: 18,
    fontWeight: '400',
  },
  line:{
    backgroundColor: 'black',
    width: '100%',
    height: 0.5,  
    marginVertical: 4,
    opacity: 0.5,
  },
  textParsonnal:{
    paddingHorizontal: 16,
    width: '75%',
  },
  containerParsonal:{
    width:'100%',
    height:155,
    backgroundColor:'white',
    borderRadius: 20,
    marginTop:25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 31
  },
  edittitle:{
    color: '#FA4A0C',
    fontWeight: '600',
    fontSize: 18,
  
  },  
  title:{
    fontSize: 18,
    fontWeight: '600',
  },
  ViewTitle:{
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 8,
    marginBottom : 12,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#F3F3F3",
    flex: 1,
    paddingHorizontal: 24,
  }
})