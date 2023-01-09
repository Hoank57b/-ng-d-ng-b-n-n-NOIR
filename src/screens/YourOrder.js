import { StyleSheet, Text, View, TouchableOpacity , ScrollView , FlatList , Image , Pressable} from 'react-native'
import React, {  useContext, useEffect , useState } from "react";
import { ProductContext } from "../product/ProductContext";
import { UserContext } from '../user/UserContext';

const YourOrder = (props) => {
  const {
    navigation
  } = props;
  const {profile} = useContext(UserContext);
  const {orders , onGetOrders } =  useContext(ProductContext);
  useEffect(() => {
    onGetOrders(profile._id).then();
    return () => {};
  }, []);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onGetOrders(profile._id).then();
    });
    return focusHandler;
}, [navigation]);

  const renderItem = ({ item }) => {
    const { _id, date, status , total  , user_name , user_phonenumber , user_address } = item;
    return (
     <TouchableOpacity  onPress={() => {navigation.navigate('YourOderDetail', {_id: _id});}} >
      <View style={styles.Apply}>
        <View>
          <View style={styles.YourOrderitem}>
            <View>
              <Text style={styles.name}>{user_name}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.money}>{total}đ</Text>
            </View>
          </View>
          <View style = {{width: "100%", height: 1, backgroundColor: "#EA6435"}}></View>
          <View style = {{paddingHorizontal: 10 ,marginTop: 8}}>
            <Text style={styles.letter}>ORDERED ON</Text>
          </View>
          <View style = {{paddingHorizontal: 10 , marginBottom: 8}}>
            <Text style={{fontSize: 14, fontWeight: "600"}} >{date}</Text>
          </View>
        </View>
        <View style = {{width: "100%", height: 1, backgroundColor: "#EA6435"}}></View>
        <View style={styles.Repeat}>
          <Text style={styles.letter}>Trạng thái</Text>
          <Text style={{fontSize: 16, fontWeight: "600" , color: "#079D49"}}>{status}</Text>
        </View>
      </View>
     </TouchableOpacity>
       
    );
  };
  return (
    <View style={styles.Container}>
      <View style = {{height: 80}}   >
        <Pressable onPress={() => navigation.goBack()}>
        <Image style = {{marginTop: 40 , marginLeft: 4 , with: "30%" , height: "30%"}} source={require("../assets/images/arrow-Left.png")}></Image>
        </Pressable>
     
      </View>
      <Text style = {{fontSize: 20 , fontWeight: "600"}}>Your Orders</Text>
      <FlatList
       style={styles.flatList}
       data={orders}
       renderItem={renderItem}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) =>item._id}
      ></FlatList>
    </View>
  )
}

export default YourOrder

const styles = StyleSheet.create({
  price: {
    right: 10, position: "absolute"
  },
  letter: {
    fontWeight: "400",

  },
  Note: {
    height: 30,
    fontWeight: "400",
    fontSize: 14,
  },
  money: {
    fontSize : 18,
    fontWeight: "600",
  },
  Repeat: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 10
  },
  item: {
    flexDirection: "row",
    height: "20%"
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  YourOrderitem: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 12,
    paddingHorizontal: 10
  },
  Apply: {
     marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EA6435",

    width: '100%',
    height: 170,
  },
  Container: {
    height: 200,
    width: '100%',
    paddingHorizontal: 10,
    flex: 1,
  }
})