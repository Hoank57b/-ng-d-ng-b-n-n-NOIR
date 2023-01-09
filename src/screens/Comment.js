import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, {  useContext, useEffect , useState } from "react";
import { ProductContext } from "../product/ProductContext";
import { UserContext } from "../user/UserContext";

const Comment = (props) => {
  const {
    navigation,
    route: {
      params: { _id },
    },
  } = props;
  const [text, setText] = useState('');
  const {profile }=useContext(UserContext);
  const {onInsertCommnet} = useContext(ProductContext);
  const comment = async () => {
    if (
      !text ||
      text.trim().length == 0
    ) {
      ToastAndroid.show("Bạn chưa viết bình luận gì", ToastAndroid.CENTER);
      return;
    }
    const res = await onInsertCommnet(profile.name, text , _id);
    if (res == false) {
      ToastAndroid.show("Dang nhap khong thanh cong", ToastAndroid.CENTER);
    }else{
      navigation.navigate('ListComment' ,  {_id});
    }
  };


  return (
    <View style={styles.Container}>
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#FF785B",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ left: 16, position: "absolute" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ with: 16, height: 24 }}
              source={require("../assets/images/backwhite.png")}
            ></Image>
          </Pressable>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            Bình luận đánh giá
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", height: 60, paddingHorizontal: 16 , marginTop: 24}}>
        <View  style={{ height: 60, backgroundColor: "white" , borderRadius: 10, paddingHorizontal: 16, paddingVertical: 16, }}>
          <TextInput
          placeholder="Đánh giá của bạn"
          value={text}
          onChangeText={setText}
           style = {styles.textinput}></TextInput>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          bottom: 12,
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={comment} style={styles.butttoncomment}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
            Đăng tải
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  textinput:{
    height: 'auto',
    fontSize: 18
  },
  butttoncomment: {
    height: 46,
    backgroundColor: "#FF785B",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewComment: {
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "white",
    paddingVertical: 8,
  },
  Container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
});
