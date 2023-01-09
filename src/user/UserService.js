import axiosInstance from "../utils/axios";
import constants from "../utils/constants";

export const login = async (username, password) => {
  const data = { username, password };
  const response = await axiosInstance.post(constants.API_LOGIN, data);
  return response;
}

export const register = async (username, password, confirm_password, name) => {
  const data = { username, password, confirm_password, name };
  const response = await axiosInstance.post(constants.API_REGISTER, data);
  return response;
}
export const insert = async (user_id) => {
  const data = { user_id }
  const response = await axiosInstance.post(constants.API_INSERT_CART, data);
  return response;
};

export const getUser = async (username, password, name, phone, address) => {
  const data = {
    username: username,
    password: password,
    name: name,
    email: email,
    phone: phone,
    address: address
  }
  const res = await axiosInstance.get(constants.API_LOGIN, data);
  console.log(res);
  return res;
}

export const updateUser = async (username , name, phone_number, address) => {
  const data = {
    username: username,
    name: name,
    phone_number: phone_number,
    address: address
  }
  const res = await axiosInstance.post(constants.API_PROFILE, data);
  console.log(res);
  return res;
}

export const getUserByID = async (id) => {
  const response = await axiosInstance.get(`${constants.API_USER}/${id}`);
  return response;
}