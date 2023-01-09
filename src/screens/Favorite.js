import React, { useContext, useEffect, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Pressable
} from "react-native";
import { ProductContext } from "../product/ProductContext";
const Favorite = (props) => {
  const {
    navigation,
    route: {
      params: { _id },
    },
  } = props;
  const [myFavorite, setMyFavorite] = useState([]);
  const { OnGetFavoriteByID } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await OnGetFavoriteByID(_id);
      setMyFavorite(res);
    };
    fetchData();
  }, [_id]);
  const renderItem = ({ item }) => {
    const { _id, name, price , image  , category_id } = item;
    return (
     <TouchableOpacity onPress={() => {navigation.navigate('Productdetail', {_id: _id});}}>
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
            </View>
            <View style={styles.line}></View>
          </View>
        </View>
     </TouchableOpacity>
       
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleHome}>
        <Pressable onPress={() => navigation.goBack()} >
        <Image style = {{width: 40 , height: 40}}
          styles={styles.imagetitle}
          source={require("../assets/images/back.png")}
        ></Image>
        </Pressable>
        
        
        <Text style={styles.title}>Danh sách sản phẩm yêu thích</Text>
      </View>
      {myFavorite && (
        <FlatList
          style={styles.flatList}
          data={myFavorite}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
        ></FlatList>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
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
  container: {
    paddingHorizontal: 24,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
