import React from "react";
import ProductDetail from "../../../../components/admin/productDetail";
import {getProductById} from "../../../../services/ProdcutService";

const fetchProduct = async (id) => {
  const fetchedProduct = await getProductById(id);
  return fetchedProduct;

};
const ProductDetailPage = async({params}) => {

  const product= await fetchProduct(params.id)
console.log(product);


  return (
    <div className="p-4 sm:ml-64 mt-14">
<ProductDetail product={product}/>

    </div>

  );
};

export default ProductDetailPage;
