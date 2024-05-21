import React from "react";
import CartProductItem from "../../../app/components/client/shoppingcart/cartProductItem";
import { getAllProducts } from "../../../app/services/ProdcutService";
async function getProducts() {
  const data = await getAllProducts();
  return data;
}
const CartProductsPage = async () => {
  const products = await getProducts();
  return (
    <>
      <div className="row">
        {products &&
          products?.map((product) => (
            <CartProductItem key={product?._id} product={product} />
          ))}{" "}
      </div>
    </>
  );
};
export default CartProductsPage;
