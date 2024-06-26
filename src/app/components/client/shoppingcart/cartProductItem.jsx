"use client";
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useShoppingCart } from "use-shopping-cart";
const CartProductItem = ({ product }) => {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const addToCart = (product) => {
    const target = {
      id: product._id,
      title: product.description,
      image: product.images,
      price: product.price,
    };
    addItem(target, { count: quantity })
      .then(() => {
        console.log("Item added to cart:", target);
        setQuantity(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <article className="col-sm-3 mt-5">
      {" "}
      <div className="card">
        <img
          src={product?.imageart}
          className="card-img-top p-5"
          alt={product.description}
        />{" "}
      </div>
      <div className="text-center">
        <div>{product.description} ...</div>
        <div>Prix : {product.prix} TND </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            {" "}
            <Rating style={{ maxWidth: 100 }} value={5} />
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="mr-5" onClick={decreaseQuantity}>
          -
        </button>
        <span>{product.stockQuantity}</span>
        <button className="ml-5" onClick={increaseQuantity}>
          +
        </button>
      </div>
      <div className="text-center">
        <button
          className="btn btn-warning"
          disabled={product.stockQuantity <= 1}
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};
export default CartProductItem;
