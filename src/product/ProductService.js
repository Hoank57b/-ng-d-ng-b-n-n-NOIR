import axiosInstance from "../utils/axios";
import constants from "../utils/constants";

export const getProducts = async() => {
  const response = await axiosInstance.get(constants.API_PRODUCTS);
  return response;
}

export const getProductById = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_PRODUCTS}/${id}/detail`);
  console.log(response)
  return response;
}
export const getAllOrders = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_GET_ORDERS}/${id}`);
  console.log(response)
  return response;
}
export const getOrderDetail = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_GET_ORDERDETAIL}/${id}`);
  console.log(response)
  return response;
}
export const insert_order = async ( status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address) =>{
  const data = { status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address};
  const response = await axiosInstance.post(constants.API_ODER, data);
  return response;
}

export const insert_cart_item = async (price, quantity, cart_id, product_id) =>{
  const data = {price, quantity, cart_id, product_id};
  const response = await axiosInstance.post(constants.API_INSERT_CART_ITEM, data);
  return response;
}

export const getCart_Item = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_GET_CART_ITEM}/${id}`);
  console.log(response)
  return response;
}

export const getProductByName = async (name) =>{
  const response = await axiosInstance.get(`${constants.API_GET_PRODUCTBYNAME}/${name}`);
  console.log(response)
  return response;
}

export const insert_favorite = async (user_id , product_id) =>{
  const data = { user_id, product_id};
  const response = await axiosInstance.post(constants.API_FAVORITE, data);
  return response;
}

export const getFavoriteByID = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_GET_FAVORITE}/${id}`);
  console.log(response)
  return response;
}

export const insert_comment = async (name , text , product_id) =>{
  const data = { name , text , product_id};
  const response = await axiosInstance.post(constants.API_COMMENT, data);
  return response;
}

export const getCommentByID = async (id) =>{
  const response = await axiosInstance.get(`${constants.API_GET_COMMENT}/${id}`);
  console.log(response)
  return response;
}
