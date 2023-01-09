
import { StyleSheet, Text, View, FlatList, Image, Pressable, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from "../product/ProductContext";
const PartialView = (props) => {
  const { orderDetail } = props;
  const { products } = orderDetail;


  return (
    <>
      {
        products?.map((item) => {
          return (
            <View>
              <View style={styles.productDetail}>
                <View style={styles.view}>
                  <Text style={{ fontSize: 16 }}>{item.product}</Text>
                </View>
                <View style={styles.view2}>
                  <Text style={{ fontSize: 16 }}>{item.price}</Text>
                </View>
                <View style={styles.view3}>
                  <Text style={{ fontSize: 16 }}>{item.quantity}</Text>
                </View>

              </View>
              <View style={{ width: "100%", height: 2, backgroundColor: "#EA6435" }}></View>
            </View>
          );
        })
      }
    </>
  )
}

const YourOderDetail = (props) => {

  const {
    navigation,
    route: {
      params: { _id },
    },
  } = props;
  const { orderDetail, onGetOderDetail } = useContext(ProductContext);
  useEffect(() => {
    onGetOderDetail(_id).then();
    return () => { };
  }, []);
  if (!orderDetail) {
    return (<></>)
  }

  const { products, shipping_fee, total , user_name , user_phonenumber , user_address } = orderDetail;


  return (
    <View style={styles.container}>
      <View style={{ height: 100 }}   >
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={{ marginTop: 40, marginLeft: 8, with: "30%", height: "30%" }} source={require("../assets/images/arrow-Left.png")}></Image>
        </Pressable>

      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.view}>
          <Text style={styles.Text}>Tên hàng</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.Text}>Đơn giá</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.Text}>Số lượng</Text>
        </View>
      </View>

      <PartialView orderDetail={orderDetail} ></PartialView>

      <View>
        <View style={{ flexDirection: "row", marginVertical: 12  }}>
          <Text style={styles.Text}>Phí vận chuyển</Text>
          <Text style={{ right: 10, position: "absolute", fontSize: 16, }}>{shipping_fee}₫</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <Text style={styles.Text}>Tổng tiền</Text>
          <Text style={{ right: 10, position: "absolute", fontSize: 16, fontWeight: "600" }}>{total}₫</Text>
        </View>
        <View style={{ width: "100%", height: 2, backgroundColor: "#EA6435" , marginVertical: 16}}></View>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <Text style={styles.Text}>Tên</Text>
          <Text style={{ right: 10, position: "absolute", fontSize: 16, fontWeight: "600" }}>{user_name}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <Text style={styles.Text}>Số điện thoại</Text>
          <Text style={{ right: 10, position: "absolute", fontSize: 16, fontWeight: "600" }}>{user_phonenumber}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <Text style={styles.Text}>Địa chỉ</Text>
          <Text style={{ right: 10, position: "absolute", fontSize: 16, fontWeight: "600" }}>{user_address}</Text>
        </View>

      </View>


    </View>
  )
}

export default YourOderDetail

const styles = StyleSheet.create({

  view2: {
    marginLeft: 32
  },
  Text: {
    fontSize: 16,
    fontWeight: "600"
  },
  view3: {
    right: 10, position: "absolute"
  },
  view: {
    width: "33%",
  },
  productDetail: {
    flexDirection: "row",
    marginVertical: 12,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  Apply: {
    width: "100%",
    height: 100,
  }
})

