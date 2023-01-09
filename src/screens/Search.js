import React, { useContext, useEffect, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";

import { ProductContext } from "../product/ProductContext";
const Search = ({ navigation }) => {
  const [productsFilter, setProductsFilter] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onGetProductByName } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await onGetProductByName(textSearch);
      setProductsFilter(res);
    };
    fetchData();
  }, [textSearch]);

  const renderItem = ({ item }) => {
    const { _id, name, price, image } = item;
    return (
      <TouchableOpacity style={{ paddingHorizontal: 1}}
        onPress={() => {
          navigation.navigate("Productdetail", { _id: _id });
        }}
      >
        <View style={styles.ContainerItem}>
          <View style={styles.ContainerImageItem}>
            <Image
              style={styles.imageItem}
              resizeMode="cover"
              source={{ uri: image }}
            ></Image>
          </View>
          <View style={styles.textItem}>
            <Text style={styles.nameProduct}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ProgressDialog visible={isLoading} /> */}
      <View style={styles.ViewTop}>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.search}>
            <Image
              style={styles.imageSearch}
              source={require("../assets/images/search.png")}
            ></Image>
            <TextInput
              style={styles.textInput}
              value={textSearch}
              onChangeText={(value) => setTextSearch(value)}
              placeholderTextColor={"#9098B1"}
              placeholder="Nhập tên sản phẩm"
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.ViewBot}>
        {
          <FlatList
            data={productsFilter}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
          ></FlatList>
        }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  nameProduct:{
    fontSize: 16,
    fontWeight: "500"
  },
  imageItem:{
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ContainerImageItem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  ContainerItem: {
  width: '100%',
  height: 50,
  flexDirection: "row",
  marginTop: 18,
  alignItems: "center",
  },
  ViewBot: {
    width: "100%",
    height: "80%",
    backgroundColor: "#F3F3F3",
    marginTop: -160,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  textInput: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    fontSize: 16,
  },
  search: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 14,
    width: "100%",
    height: 46,
    backgroundColor: "#F3F3F3",
  },
  ViewTop: {
    width: "100%",
    height: 300,
    backgroundColor: "#FF4B3A",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    marginBottom: 20,
  },
  contextEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: 20,
  },
});
export default Search;
