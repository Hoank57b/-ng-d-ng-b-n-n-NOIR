import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const FogotPassword = (props) => {
  const {navigation} = props;
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.Container}>
        <View  style={styles.imageContainer}>
          <Image
           
            style={styles.image}
            resizeMethod="auto"
            source={require("../assets/images/NOIRAPP.png")}
          />
        </View>
        
        <View style={styles.textInputContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.imageback}>
            <Image
              source={require("../assets/images/back.png")}
              resizeMethod="auto"
            ></Image>
          </TouchableOpacity>
          <View style={styles.FogotpassContainer}>
            <Text style={styles.FogotpassText}>Quên</Text>
          </View>
          <View style={styles.FogotpassContainer}>
            <Text style={styles.FogotpassText}>mật khẩu?</Text>
          </View>
          <View style={styles.ViewTextInput}>
            <View style={styles.imageMail}>
              <Image
                source={require("../assets/images/Mail.png")}
                resizeMethod="auto"
              ></Image>
            </View>

            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Nhập email của bạn"
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.login}>Gởi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    //</KeyboardAvoidingView>
  );
};
export default FogotPassword;

const styles = StyleSheet.create({
  textInput: {
    height: 22,
    marginVertical: 4,
    paddingHorizontal: 20,
    color: "black",
    width: "80%",
  },
  imageMail: {
    paddingHorizontal: 16,
  },
  ViewTextInput: {
    flexDirection: "row",
    marginTop: 32,
    height: 48,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    alignItems: "center",
  },
  imageback: {
    marginBottom: 16,
  },

  login: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    height: 50,
    backgroundColor: "#F8774A",
    borderRadius: 8,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  text1: {
    color: "#F8774A",
    fontWeight: "700",
    fontSize: 25,
  },

  text: {
    fontSize: 14,
    marginVertical: 7,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  FogotpassText: {
    color: "#F8774A",
    fontWeight: "700",
    fontSize: 40,
  },
  FogotpassContainer: {},
  image: {
    width: "70%",
    height: "70%",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -50,
  },
  Container:{
    width: "100%",
    height: "100%",
    backgroundColor: 'white'
  }
});
