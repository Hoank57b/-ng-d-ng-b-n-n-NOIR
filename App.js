import React from "react";
import MainNavigations from "./src/navigations/MainNavigations";
import { ProductContextProvider } from "./src/product/ProductContext"
import { UserContextProvider } from "./src/user/UserContext";

export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <MainNavigations></MainNavigations>
      </ProductContextProvider>
    </UserContextProvider>
  );
}
