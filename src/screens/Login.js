import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Dimensions
} from "react-native";
import React, { useState, useContext } from "react";
import UserContext from "../user/UserContext";

import AppIntroSlider from "react-native-app-intro-slider";

const {width} = Dimensions.get("window");
const {height} = Dimensions.get("window");

const Login = (props) => {
  const { navigation } = props;

  
  const [showSlider, setShowSlider] = useState(true);
  const slides = [ {
    key: '1',
    title: '',
    text: '',
    image: require('../assets/images/intro1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Save Food with our new Feature!',
    text: '',
    image: require('../assets/images/intro2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Fast, rescued food at your service.',
    text: '',
    image: require('../assets/images/intro3.png'),
    backgroundColor: '#22bcb5',
  }]
  const { onLogin , profile } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (
      !username ||
      !password ||
      username.trim().length == 0 ||
      password.trim().length == 0
    ) {
      ToastAndroid.show("Vui long nhap day du thong tin", ToastAndroid.CENTER);
      return;
    }
    const res = await onLogin(username, password);
    if (res == false) {
      ToastAndroid.show("Dang nhap khong thanh cong", ToastAndroid.CENTER);
    }else {
      ToastAndroid.show("Dang nhap thanh cong", ToastAndroid.CENTER);
      navigation.navigate('BottomNavigation');
    }
  };
  const renderSlide = ({item}) => {
    return <View style={styles.slide}>
       <Text style={styles.titleintro}>{item.title}</Text>
        <Image style={styles.imageintro} source={item.image} />
        <Text style={styles.textintro}>{item.text}</Text>
    </View>
  };
  return (
    <ScrollView style={styles.introContainer}>
      <View>
        {showSlider ? <AppIntroSlider  
        data = {slides} 
        renderItem={renderSlide} 
        showSkipButton = {true}
        onDone={()=>{setShowSlider(false)}}
        onSkip={()=>{setShowSlider(false)}}
        /> : <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    resizeMethod="auto"
                    source={require("../assets/images/NOIRAPP.png")}
                  />
                </View>
                <View style={styles.plantaContainer}>
                  <Text style={styles.plantaText}>Đăng nhập</Text>
                </View>
                <View style={styles.textInputContainer}>
                  <View style={styles.ViewTextInput}>
                    <TextInput
                      placeholderTextColor={"#9098B1"}
                      placeholder="Tên đăng nhập"
                      style={styles.textInput}
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>
                  <View style={styles.ViewTextInput}>
                    <TextInput
                      placeholderTextColor={"#9098B1"}
                      placeholder="Mật khẩu"
                      style={styles.textInput}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    ></TextInput>
                  </View>

                  <View style={styles.ForgotpasswordContainer}>
                    <Text
                      onPress={() => navigation.navigate("FogotPassword")}
                      style={styles.forgotpassword}
                    >
                      Quên mật khẩu?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => {login(); /*insert_cart();*/}}  style={styles.Button}>
                    <Text style={styles.TextButton}>Đăng nhập</Text>
                  </TouchableOpacity>

                  <View style={styles.orContainer}>
                    <View style={styles.line1}></View>
                    <View>
                      <Text style={styles.orText}>Hoặc</Text>
                    </View>
                    <View style={styles.line2}></View>
                  </View>

                  <TouchableOpacity>
                    <View style={styles.containerLogin}>
                      <View style={styles.ImageEmail}>
                        <Image
                          source={require("../assets/images/google.jpg")}
                        ></Image>
                      </View>
                      <View style={styles.TextContainer}>
                        <Text style={styles.TextLogin}>Đăng nhập với Google</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <View style={styles.containerFace}>
                      <View style={styles.ImageEmail}>
                        <Image
                          source={require("../assets/images/face.jpg")}
                        ></Image>
                      </View>
                      <View style={styles.TextContainer}>
                        <Text style={styles.TextLoginFace}>
                        Đăng nhập với Facebook
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.containerText}>
                    <View style={styles.containerText2}>
                      <Text style={styles.Text4}>Chưa có tài khoản? </Text>
                      <Text
                        onPress={() => navigation.navigate("Register")}
                        style={styles.Text5}
                      >
                        Đăng ký
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        }
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({

  // slide: {
  //   flex: 1,
  //   width: "100%",
  //   height: 100000,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#FF4B3A',
  // },
  // imageintro:{
  //   width: "100%",
  //   height: "60%",
  // },
  // textintro: {
  //   color: 'rgba(255, 255, 255, 0.8)',
  //   textAlign: 'center',
  // },
  // titleintro: {
  //   fontSize: 22,
  //   color: 'white',
  //   textAlign: 'center',
  // },
  slide: {
    flex: 1,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4B3A',
  },
  imageintro: {
    width: width,
    height: 400,
    marginVertical: 32,
  },
  textintro: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  titleintro: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },

  Text5: {
    fontWeight: "700",
    fontSize: 16,
    color: "#40BFFF",
  },
  Text4: {
    fontWeight: "400",
    fontSize: 16,
    color: "#9098B1",
  },
  containerText2: {
    marginTop: 8,
    flexDirection: "row",
  },
  containerText: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  Button: {
    marginTop: 16,
    height: 48,
    backgroundColor: "#F8774A",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  TextLoginFace: {
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  containerFace: {
    backgroundColor: "blue",
    height: 48,
    borderColor: "1877F2",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  TextFacebook: {
    paddingHorizontal: 74,
  },
  TextLogin: {
    fontWeight: "700",
    fontSize: 14,
    color: "#9098B1",
  },
  TextContainer: {
    paddingHorizontal: 80,
  },
  ImageEmail: {
    marginLeft: 18,
  },
  containerLogin: {
    marginTop: 8,
    height: 48,
    borderColor: "#EBF0FF",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
  },
  loginFacebook: {
    backgroundColor: "#1877F2",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    textAlign: "center",
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  ViewTextInput: {
    marginTop: 16,
    height: 48,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  line2: {
    width: 135,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginLeft: 20,
  },
  orText: {
    fontWeight: "bold",
    color: "#9098B1",
  },
  line1: {
    width: 135,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 20,
  },
  orContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  ForgotpasswordContainer: {
    flexDirection: "row",
  },
  forgotpassword: {
    marginTop: 16,
    color: "red",
    borderBottomColor: "red",
    borderBottomWidth: 1.5,
  },
  register: {
    color: "red",
    borderBottomColor: "red",
    borderBottomWidth: 1.5,
  },
  face: {
    position: "absolute",
    top: 25,
    left: 22,
  },
  faceText: {
    color: "white",
  },
  google: {
    position: "absolute",
    top: 14,
    left: 22,
  },
  googleText: {
    backgroundColor: "#FFFFFF",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    color: "black",
    textAlign: "center",
    borderRadius: 10,
    padding: 15,
  },
  loginContainer: {
    padding: 1,
  },
  textInputContainer: {
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  textInput: {
    height: 22,
    marginVertical: 4,
    paddingHorizontal: 20,
    color: "black",
    width: "100%",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginVertical: 7,
  },
  text1: {
    color: "#F8774A",
    fontWeight: "700",
    fontSize: 25,
  },
  plantaText: {
    color: "#F8774A",
    fontWeight: "700",
    fontSize: 40,
  },
  plantaContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  image: {
    width: "70%",
    height: "70%",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
