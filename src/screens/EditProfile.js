import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput, Pressable, ToastAndroid } from 'react-native'
import React, { useState ,useContext } from 'react'
import { UserContext } from "../user/UserContext";
const EditProfile = (props) => {
  const { navigation } = props;
  const { onUpdateUser , profile , userprofile} = useContext(UserContext);
  const [name, setName] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [address, setAddress] = useState('');

  const update = async () => {
    if(name.trim().length == 0 || phone_number.trim().length == 0 || phone_number.trim().length > 10 ||
    address.trim().length == 0) {
      ToastAndroid.show('Vui long nhap day du thong tin', ToastAndroid.CENTER);
      return;
    }
    const res = await onUpdateUser(profile.username , name, phone_number, address);
    if(res == false){
      ToastAndroid.show('Thay doi thong tin that bai', ToastAndroid.CENTER);
    } else {
      navigation.navigate("BottomNavigation");
      ToastAndroid.show('Thay doi thong tin thanh cong', ToastAndroid.CENTER);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Pressable onPress={() => navigation.goBack()} style={{ left: 10, position: "absolute" }}>
          <Image source={require("../assets/images/arrow-Left.png")}></Image>
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Thông tin tài khoản</Text>
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: "500" }}>Họ và tên</Text>
        <TextInput style={styles.inputtext}
         value={name} onChangeText={setName}></TextInput>
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: "500" }}>Số điện thoại</Text>
        <TextInput style={styles.inputtext}
        value={phone_number} onChangeText={setPhone_number}/>
      </View>
      <View style={{ marginVertical: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: "500" }}>Địa chỉ</Text>
        <TextInput style={styles.inputtext}
        value={address} onChangeText={setAddress}/>
      </View>

      <View style={styles.containerLogout}>
        <TouchableOpacity  style={styles.logout}  onPress={() => {update(); }}>
          <Text style={styles.textLogout}>Cập nhật thông tin</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  inputtext: {
    borderWidth: 1.5,
    borderColor: "black",
    width: '100%',
    height: 50,
    paddingHorizontal: 16
  },
  title: {
    marginVertical: 36,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    backgroundColor: "#F8774A",
    borderRadius: 30,
    height: 49,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogout: {
    fontSize: 17,
    fontWeight: "600",
    color: "#F6F6F9",
  },
  containerLogout: {
    paddingHorizontal: 24,
    marginVertical: 24,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#F3F3F3",
    flex: 1,
    paddingHorizontal: 24,
  }
})