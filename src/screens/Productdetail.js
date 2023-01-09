import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions, 
  Pressable
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import { ProductContext } from "../product/ProductContext";
import { UserContext } from "../user/UserContext";

const {width} = Dimensions.get("window");

const Productdetail = (props) => {
  const {
    navigation,
    route: {
      params: { _id },
    },
  } = props;
  const { product, onGetProductById } = useContext(ProductContext);
  
  const { name, description, image, price } = product;
  
  useEffect(() => {
    onGetProductById(_id).then();
    return () => {};
  }, []);

  const Item = (props) => {
    const { profile } = useContext(UserContext);
    const { product  } = props;
    const { _id , name, description, image, price } = product;
    const { cart, updateCart , onInsetFavorite } = useContext(ProductContext);
    const [number, setNumber] = useState(1);
  
    
  
    const onNumberChange = (isAdd) => {
      if (isAdd == true) {
        setNumber(number + 1);
      } else if (isAdd == false && number > 0) {
        setNumber(number - 1);
      }
    };
  
    const addProductToCart = () => {
      updateCart(product, number, price, true);
      navigation.navigate('Home');
    };

    const addfavorite = () => {
      onInsetFavorite(profile._id, _id); 
    };

    const comment = () => {
      navigation.navigate('ListComment', { _id: _id});
    };
  
    return (
      <>
        <View>
          <View style={styles.detailProduct}>
            <View style={styles.descriptionView}>
              <View style={styles.descriptionproduct}>
                <View style={styles.description}>
                  <Text style={styles.textdescription}>{description}</Text>
                </View>
                <View style={styles.category}>
                  <Text>{}</Text>
                  <Text style={styles.textdescription}>{}</Text>
                </View>
              </View>
              <View style = {{width: "100%" , height: 44 ,  marginTop: 12 , paddingHorizontal: 16 ,  alignItems: "center", }}>
              <Pressable onPress={comment} style = {{width: "100%" , flexDirection: "row" , alignItems: "center" , height: 40 , borderWidth: 2 ,  borderRadius: 10, borderColor: "#FF785B" , paddingHorizontal: 8}}>
                  <Text style = {{fontSize: 16, fontWeight: "500"}}>Bình luận đánh giá</Text>
                  <Image style={{width: 8 , height: 12 ,  right: 8 , position: "absolute"}}
                   source={require("../assets/images/nextimage.png")}
                   ></Image>
                  
              </Pressable>
            </View>
            </View>
            <View style = {styles.ViewName}>
            <View style={styles.nameProduct}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <Pressable onPress={addfavorite} style = {styles.Tym}>
              <Image style = {{width: '70%', height: '60%'}}
               source={require("../assets/images/aftertym.png")}
              ></Image>
            </Pressable>
            </View>
       
            <View style={styles.cartview}>
              <View style={styles.cart}>
                <View>
                  <Text style={styles.carttextPrice}>{price * number}₫</Text>
                </View>
                <View style={styles.quantityView}>
                  <TouchableOpacity style={styles.touchableopacity}>
                    <Text
                      onPress={() => onNumberChange(false)}
                      style={styles.carttextQuantity}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.carttext}>{number}</Text>
                  <TouchableOpacity style={styles.touchableopacity}>
                    <Text
                      onPress={() => onNumberChange(true)}
                      style={styles.carttextQuantity}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
       
            <View style={styles.Viewbuttonaddtocart}>
              <View style={styles.addtocart}>
                <TouchableOpacity
                  onPress={() => {
                    addProductToCart();
                  }}
                  style={styles.buttonaddtocart}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  >
                    Thêm vào giỏ hàng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </View>
      </>
    );
  };
  return (
    <View styles={styles.container}>
      <ScrollView pagingEnabled  horizontal style={styles.imageProductView}>
        {
        image?.map((img , index) => (
          <Image
            key={index}
            style={styles.imageProduct}
            source={{uri: img}}
            resizeMode="cover"
          ></Image>
        ))
        }
      </ScrollView>
      <TouchableOpacity
        style={styles.imageback}
        onPress={() => navigation.navigate('Home')}
      >
        <Image source={require("../assets/images/backwhite.png")}></Image>
      </TouchableOpacity>
      <Item product={product}></Item>
    </View>
  );
};

export default Productdetail;

const styles = StyleSheet.create({
  buttonaddtocart: {
    height: 50,
    width: "100%",
    backgroundColor: "#FF785B",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addtocart: {},
  Viewbuttonaddtocart: {
    width: "100%",
    marginTop: 8,
    paddingHorizontal: 16,
    
  },
  touchableopacity: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FF785B",
    borderWidth: 2,
    borderRadius: 8,
  },
  cartimage: {
    marginTop: 6,
  },
  carttextQuantity: {
    color: "#FF785B",
    fontSize: 26,
    fontWeight: "700",
  },
  carttextPrice: {
    color: "#FF785B",
    fontSize: 18,
    fontWeight: "500",
  },
  carttext: {
    color: "#FF785B",
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 12,
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 34,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cartview: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  cart: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    marginTop: 200,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 48,
    borderWidth: 2,
    borderColor: "#FF785B",
  },
  textdescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#5E5959",
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#5E5959",
  },
  category: {
    width: "30%",
    height: "100%",
    marginTop: 45,
  },
  description: {
    width: "60%",
    height: "100%",
    marginTop: 45,
  },
  descriptionproduct: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 32,
    marginTop: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#FF785B",
  },
  descriptionView: {},
  Tym: {
    marginTop: 4,
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF785B",
    right: 60,
    position: "absolute",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A4A4A",
  },
  nameProduct: {
    width: "40%",
    height: 50,
    backgroundColor: "white",

    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
    borderWidth: 2,
    borderColor: "#FF785B",
  },
  ViewName: {
    marginTop: -275,
    flexDirection: "row",
  },
  detailProduct: {
    width: "100%",
    height: "70%",
    marginTop: 160,
    backgroundColor: "white",
  },
  imageback: {
    width: 20,
    height: 20,
    marginLeft: 24,
    marginTop: -250,
  },
  imageProductView: {
    width: "100%",
    height: 320,
    backgroundColor : "blue",
  },
  imageProduct: {
    width: width,
    height: 320,
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
});
