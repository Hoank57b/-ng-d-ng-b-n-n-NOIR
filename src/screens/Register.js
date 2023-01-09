import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
}  from 'react-native'
  import React , {useState, useContext} from 'react'
  import UserContext from '../user/UserContext';

const Register = (props) => {
  const {navigation} = props;
  const {onRegister} = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [name, setName] = useState('');

  const register = async () => {
      if (!username || !password || username.trim().length == 0 || password.trim().length == 0 ||
      !confirm_password || confirm_password.trim().length == 0 || !name || name.trim().length == 0 ) {
        ToastAndroid.show('Vui long nhap day du thong tin', ToastAndroid.CENTER);
        return;
      }
      if(password != confirm_password){
          ToastAndroid.show('Xac nhan mat khau khong dung', ToastAndroid.CENTER);
      }
      const res = await onRegister(username, password , confirm_password , name);
      if (res == false) {
        ToastAndroid.show('Dang ky khong thanh cong', ToastAndroid.CENTER);
      }else{
          navigation.navigate('Login')
      }
    }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.containerRegister}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMethod="auto"
            source={require("../assets/images/NOIRAPP.png")}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.plantaContainer}>
            <View style={styles.TitleContainer}>
              <Text style={styles.plantaText}>Đăng ký</Text>
            </View>
          </View>

          <View style={styles.ViewTextInput}>
            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Tên đăng nhập"
              style={styles.textInput}
              value={username} onChangeText={setUsername}
            />
          </View>
          {/* <View style={styles.ViewTextInput}>
            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Mobile Number"
              style={styles.textInput}
            /> 
          </View> */}
          <View style={styles.ViewTextInput}>
            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Mật khẩu"
              style={styles.textInput}
              secureTextEntry
              value={password} onChangeText={setPassword}
            />
          </View>
          <View style={styles.ViewTextInput}>
            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Xác nhận mật khẩu"
              style={styles.textInput}
              secureTextEntry
              value={confirm_password} onChangeText={setConfirm_password}
            />
          </View>
          <View style={styles.ViewTextInput}>
            <TextInput
              placeholderTextColor={"#9098B1"}
              placeholder="Họ và tên"
              style={styles.textInput}
              value={name} onChangeText={setName}
            />
          </View>
          <TouchableOpacity onPress={register}  style={styles.Button}>
            <Text style={styles.TextButton}>Đăng ký</Text>
          </TouchableOpacity>
          <View style={styles.containerText}>
            <View style={styles.containerText2}>
              <Text style={styles.Text4}>Đã có tài khoản? </Text>
              <Text onPress={() => navigation.navigate('Login')} style={styles.Text5}>Đăng nhập</Text>
            </View>
          </View>
          {/* <View style={styles.ImageEmail}>
              <Image style={styles.imageImage}
                source={require("../../../assets/images/face.jpg")}
              ></Image>
            </View>
            <View style={styles.ImageEmail}>
              <Image style={styles.imageImage}
                source={require("../../../assets/images/google.jpg")}
              ></Image>
            </View> */}
        </View>
      </View>
    </ScrollView>
  );
};
export default Register;

const styles = StyleSheet.create({
  imageImage: {
    height: "70%",
    width: "70%",
  },
  ImageEmail: {
    height: 50,
    width: 50,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    marginLeft: 50,
  },
  plantaContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: -50,
  },
  Text5: {
    fontWeight: "700",
    fontSize: 16,
    color: "black",
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
  textInput: {
    height: 22,
    marginVertical: 4,
    paddingHorizontal: 20,
    color: "black",
    width: "100%",
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
  },

  login: {
    color: "white",
  },
  button: {
    height: 50,
    backgroundColor: "#F8774A",
    borderRadius: 8,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
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
  plantaText: {
    color: "#F8774A",
    fontWeight: "700",
    fontSize: 40,
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
    marginHorizontal: 32,
  },
  containerRegister:{
    width: "100%",
    height: "100%",
    backgroundColor: 'white'
  },
});
