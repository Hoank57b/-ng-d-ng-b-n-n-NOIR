
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  Modal,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProductContext } from "../product/ProductContext";
import { UserContext } from "../user/UserContext";

const CheckOutModal = (props) => {
  const { navigation } = props;
  const { isShowModal, setIsShowModal } = props;
  const { onSaveCart } = useContext(ProductContext);
  const { profile, onGetUserByID, userprofile } = useContext(UserContext);



  const checkOut = () => {

    onSaveCart();
    // ToastAndroid.show('Thanh toán thành công',ToastAndroid.BOTTOM);
    setIsShowModal(false);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isShowModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text>Xác nhận thanh toán</Text>
          <Pressable style={styles.checkoutButton} onPress={checkOut}>
            <Text style={styles.checkoutText}>Đồng ý</Text>
          </Pressable>
          <Text onPress={() => setIsShowModal(false)} style={styles.cancel}>
            Hủy bỏ
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const DeleteModal = (props) => {
  const { isShowDeleteModal, setIsShowDeleteModal } = props;
  const { setCart } = useContext(ProductContext);
  console.log(props);
  const onDeleteCart = () => {
    setIsShowDeleteModal(false);
    setCart([...[]]);
  }
  return (
    <Modal animationType="slide" transparent={true} visible={isShowDeleteModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text>Xác nhận xóa tất cả món hàng</Text>
          <Pressable onPress={onDeleteCart} style={styles.checkoutButton}>
            <Text style={styles.deleteText}>Đồng ý</Text>
          </Pressable>
          <Text
            onPress={() => setIsShowDeleteModal(false)}
            style={styles.cancel}
          >
            Hủy bỏ
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const CartItem = (props) => {
  const [checked, setchecked] = useState(false);
  const { cart } = props;
  const { updateCart } = useContext(ProductContext);
  // const checkedbox = () => {
  //   setchecked(!checked)
  // };
  const renderItem = ({ item }) => {
    const { product, quantity, price, checked } = item;
    return (
      <View style={styles.itemContainer}>

        <View style={styles.cartitem}>
          <View style={styles.checkedContainer}>
            {
              // <TouchableOpacity onPress={checkedbox}>
              //     <FontAwesome  name= {checked ? 'check-square' : 'square-o'}   size={24} color="black" />
              // </TouchableOpacity>
            }
          </View>
          <View style={styles.name}>
            <Text>{product.name}</Text>
          </View>
          <View style={styles.quantity}>
            <TouchableOpacity onPress={() => updateCart(product, quantity - 1, price, true)} style={styles.touchableopacity}>
              <Text style={styles.carttext}>-</Text>
            </TouchableOpacity>
            <Text style={styles.carttext}>{quantity}</Text>
            <TouchableOpacity onPress={() => updateCart(product, quantity + 1, price, true)} style={styles.touchableopacity}>
              <Text style={styles.carttext}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.price}>
            <Text>{product.price * quantity}₫</Text>
          </View>
        </View>

      </View>
    );
  };

  return (
    <FlatList
      data={cart}
      renderItem={renderItem}
      keyExtractor={(item) => Math.random()}
      style={styles.flatlistContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};
const Cart = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const { cart, setCart, onSaveCart, getcart } = useContext(ProductContext);
  const { profile, onGetUserByID, userprofile } = useContext(UserContext);
  useEffect(() => {

    getcart().then(data => data)
      .then(value => {

        console.log("yourKey Value:  " + value)
        setCart(value)
      })

  }, [])

  useEffect(() => {
    onGetUserByID(profile._id).then();
    return () => { };
  }, []);

  const Checkout = () => {
    if (cart.length <= 0) {
      ToastAndroid.show('Giỏ hàng đang trống', ToastAndroid.BOTTOM);
    } if (!userprofile.address || !userprofile.phone_number || userprofile.phone_number.trim().length == 0 || userprofile.address.trim().length == 0
    ) {
      setIsShowModal(false);
      ToastAndroid.show("Hãy cập nhật đầy đủ thông tin", ToastAndroid.CENTER);
      return;
    }
    else {
      setIsShowModal(true);
    }
  };
  const isShowCheckout = () => {
    const items = cart.filter((item) => item.checked == true) || [];
    let total = 0;
    let tongsoluong = 0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      total += element.quantity * element.price;
      tongsoluong += element.quantity;
    }
    return { isShown: items.length > 0, total: total, tongsoluong: tongsoluong };
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageTitle}>
        <Image
          style={styles.Image}
          source={require("../assets/images/comchien.png")}
        ></Image>
      </View>
      <FontAwesome onPress={() => setIsShowDeleteModal(true)} style={styles.trash} name="trash-o" size={24} color="black" />
      <View style={styles.ContainerMini}>
        <View style={styles.ScrollView}>
          <ScrollView>
            {cart.length == 0 ? (
              <View style={styles.emtyContainer}>
                <Text style={styles.emty}>Giỏ hàng của bạn đang trống</Text>
              </View>
            ) : (
              <CartItem cart={cart} />
            )}
          </ScrollView>
        </View>
        <View style={styles.containerapply}>
          {isShowCheckout().isShown == true ? (
            <>
              <View>
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={styles.Apply}>
            <View style={styles.containeritem}>
              <View style={styles.soluong}>
                <Text style={styles.containerSoLuong}>Số Lượng:{isShowCheckout().tongsoluong}</Text>
              </View>
              <View style={styles.tongtien}>
                <Text style={styles.containermoney}>Tổng Tiền:{isShowCheckout().total}₫</Text>
              </View>
            </View>
            <View style={styles.pay}>
              <TouchableOpacity onPress={() => Checkout()} style={styles.buttonpay}>
                <Text style={styles.TextPay}>Thanh Toán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CheckOutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      <DeleteModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  trash: {
    marginLeft: 46,
    marginTop: 8,
  },
  checkouthuy: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  checkoutText: {
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#EA6435',
    height: 50,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  checkout: {
    color: '#252A31',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  checkedContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  emtyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  ImageTitle: {
    width: "100%",
    height: "20%",
  },
  ScrollView: {
    width: "100%",
    height: "78%",
  },
  price: {
    marginLeft: 16,
    width: "20%",
  },
  quantity: {
    width: "18%",
  },
  name: {
    width: "34%",
  },
  TextPay: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  containermoney: {
    fontWeight: "500",
  },
  containerSoLuong: {
    fontWeight: "500",
  },
  money: {
    width: 100,
  },

  buttonpay: {
    backgroundColor: "#EA6435",
    width: 160,
    height: 46,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pay: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  tongtien: {
    height: "50%",
    flexDirection: "row",
    width: "100%",
  },
  soluong: {
    height: "50%",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  containeritem: {
    width: "50%",
  },
  Apply: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#EA6435",
    paddingHorizontal: 8,
    width: "90%",
    height: "100%",
  },
  containerapply: {
    width: "114%",
    height: "18%",
    bottom: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  carttextquantity: {
    color: "#EA6435",
    fontSize: 20,
    fontWeight: "600",
  },
  carttext: {
    color: "#EA6435",
    fontSize: 16,
    fontWeight: "500",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 34,
    borderRadius: 20,
    borderColor: "#EA6435",
    borderWidth: 2,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cartitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  ContainerMini: {
    paddingHorizontal: 24,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F3F3F3",
    flex: 1,
  },
});
