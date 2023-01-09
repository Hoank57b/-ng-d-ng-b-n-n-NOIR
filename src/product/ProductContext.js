import React, { useState, createContext , useEffect , useContext } from "react";
import { getProducts, getProductById , saveCart , insert_cart_item , getCart_Item  , insert_order , getAllOrders , getOrderDetail , getProductByName ,insert_favorite , getFavoriteByID , insert_comment , getCommentByID } from "./ProductService";
import { UserContext } from "../user/UserContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const { profile , userprofile} = useContext(UserContext);
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [cart_item, setCart_Item] = useState([]);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const onGetProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.log("lay danh sach san pham that bai", error);
    }
  };

  const onGetProductById = async (id) => {
    try {
      const result = await getProductById(id);
      setProduct(result);
      console.log(result);
    } catch (error) {
      console.log("lay san pham chi tiet that bai", error);
    }
  };

  const onInsertCommnet = async (name , text , product_id) => {
    await insert_comment(name, text, product_id);
  };

  const onGetCommentByID = async (id) => {
    try {
      const comment = await getCommentByID(id);
      return comment;
    } catch (error) {
      console.log("lay san pham yeu thich that bai", error);
    }
  };

  const onGetProductByName = async (name) => {
    try {
      const res = await getProductByName(name);
        return res;
    } catch (e) {
      console.log('onGetProductByName Error', e);
    }
  };

  const onInsetFavorite = async (user_id, product_id) => {
    await insert_favorite(user_id, product_id);
  }

  const OnGetFavoriteByID = async (id) => {
    try {
      const favorite = await getFavoriteByID(id);
      return favorite;
    } catch (error) {
      console.log("lay san pham yeu thich that bai", error);
    }
  };

  const onGetOrders = async (id) => {
    try {
      const orders = await getAllOrders(id);
      setOrders(orders);
    } catch (error) {
      console.log("lay san oder that bai", error);
    }
  };
  const onGetOderDetail = async (id) => {
    try {
      const result = await getOrderDetail(id);
      setOrderDetail(result);
      console.log("da chay cai nay roi nhe")
    } catch (error) {
      console.log("lay san pham chi tiet that bai", error);
    }
  };

  const onGetCartItemById = async (id) =>{
    try {
      const item = await getCart_Item(id);
      setCart_Item(item);
      console.log(item);
        } catch (error) {
      console.log("khong lay duoc danh sach that bai", error);
    }

  };

  const insert_cart_items = async (price , quantity , cart_id , product_id) => {
   try {
      const cart_item = await insert_cart_item(price , quantity , cart_id , product_id);
      return cart_item.status;
   }catch (error){
    console.log('them item cart that bai', error);
   }


  };
  const updateCart = async (product, quantity, price ,checked = true) => {
    let temp = cart;
    if (cart == 0) {
      temp.push({ product: product, quantity: quantity, price: price , checked: checked})
    } else {
      const check = cart.filter(item => item.product._id == product._id);
      // khong co san pham
      if (check.length == 0) {

        temp.push({ product: product, quantity: quantity, price: price , checked: checked})
      } else {
        if (quantity <= 0) {
          temp = temp.filter(item => item.product._id != product._id)
        } else {
          temp = temp.map(item => {
            if (item.product._id == product._id) {
              
              item.quantity = quantity>=10 ? 10 : quantity;
              item.checked = checked;

            }
            return item;
          }
          )
        }
      }
    }
    setCart([...temp]);
    storeData([...temp]);
  }
  const onSaveCart = async () => {
    try {
      let total = 0;
      let products = [];
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        total += element.quantity * element.price;
        products.push({
          id: element.product._id,
          product: element.product.name,
          price: element.price,
          quantity: element.quantity,
        });
      }

      let user_id = profile._id;
      let user_name = userprofile.name;
      let user_phonenumber = userprofile.phone_number;
      let user_address = userprofile.address;
      await insert_order( 'Đang xử lý', total, products ,20000, "638c0de0fd40cf5fdc090004", user_id , user_name  , user_phonenumber, user_address );
      setCart([...[]]);
    } catch (error) {
      console.log("onSaveCart error: ", error);
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getcart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      const cart= jsonValue != null ? JSON.parse(jsonValue) : [];

      return cart;
    } catch(e) {
      // error reading value
    }
  }
  
  useEffect(() => {

    if(cart.length > 0){
      storeData(cart)
    }
   
  }, [cart])

  
  
  return (
    <ProductContext.Provider
      value={{
        insert_cart_items,
        onGetProducts,
        onGetProductById,
        onGetCartItemById,
        product,
        products,
        cart_item,
        cart, setCart , updateCart , getcart, onSaveCart , onGetOrders , orders , onGetOderDetail , orderDetail , onGetProductByName , onInsetFavorite , OnGetFavoriteByID , onInsertCommnet , onGetCommentByID
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
