import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,

} from "react-native";
import React, {  useContext, useEffect } from "react";
import { ProductContext } from "../product/ProductContext";
import { UserContext } from "../user/UserContext";


const Home = (props) => {
  const {navigation} = props;
  const {products ,onGetProducts } = useContext(ProductContext);
  const { onInsetcart , profile } = useContext(UserContext);
  const insert_cart = async () => {
    const res = await onInsetcart(profile._id);
   
    if (res == false) {
   
   }
   };
  useEffect(() => {
     onGetProducts().then()
    return () => {
      
    }
  }, [])
  

  const renderItem = ({ item }) => {
    const { _id, name, price , image  , category_id } = item;
    return (
     <TouchableOpacity onPress={() => {insert_cart();  navigation.navigate('Productdetail', {_id: _id});}}>
           <View   style={styles.ContainerItem}>
          <View style={styles.ContainerImageItem}>
            <Image
              style={styles.imageItem}
              resizeMode="cover"
              source={{uri: image}}
            ></Image>
          </View>
          <View style={styles.textItem}>
            <Text style={styles.nameProduct}>{name}</Text>
            <View style={styles.pricecategoryview}>
              <Text style={styles.priceProduct}>{price}₫</Text>
              <Text style={styles.categoryProduct}>{category_id.description}</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.descriptionProduct}>{category_id.name}</Text>
          </View>
        </View>
     </TouchableOpacity>
       
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleHome}>
        <Image
          styles={styles.imagetitle}
          source={require("../assets/images/coolicon.png")}
        ></Image>
        <Text style={styles.title}>Trang chủ</Text>
      </View>
      {products && ( <FlatList
      
       style={styles.flatList}
       data={products}
       renderItem={renderItem}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) =>item._id}
      ></FlatList>)}
     
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatList:{
    marginVertical: 16,
  },
  descriptionProduct: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
    marginVertical: 8,
  },
  categoryProduct: {
    right: 0,
    position: "absolute",
    color: "#4FA987",
  },
  priceProduct: {
    fontSize: 20,
    fontWeight: "400",
    color: "#F88922",
  },
  pricecategoryview: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  nameProduct: {
    fontSize: 18,
    fontWeight: "400",
  },
  textItem: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  imageItem: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  ContainerImageItem: {
    width: "100%",
    height: 150,
  },
  ContainerItem: {
    width: "100%",
    height: 275,
    borderRadius: 20,
    backgroundColor: "#F3F3F3",
    marginVertical: 16,
  },
  textInput: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
  },
  search: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 14,
    width: "100%",
    height: 40,
    backgroundColor: "#F3F3F3",
  },
  title: {
    marginLeft:8,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "600",
  },
  titleHome: {
    flexDirection: "row",
    paddingTop: 30,
  },
  container: {
    paddingHorizontal: 24,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
