import React from 'react';
import DeleteProducts from './deleteProducts';

const ProductDetail = ({ product }) => {
 

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-white text-2xl font-bold">{product.title}</h1>
        </div>
        <div className="p-4">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:ml-4">
              <h4 className="text-xl font-semibold mt-2 md:mt-0">Product Details</h4>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-gray-700 mt-2"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mt-2"><strong>Category:</strong> {product.category?.name}</p>
              <p className="text-gray-700 mt-2"><strong>Brand:</strong> {product.brand}</p>
              <p className="text-gray-700 mt-2"><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
              <p className="text-gray-700 mt-2"><strong>Times Bought:</strong> {product.timesBought}</p>
              <h5 className="text-xl font-semibold mt-4">Properties:</h5>
              <ul className="list-disc list-inside">
                {product.properties && Object.keys(product.properties).map(key => (
                  <li key={key} className="text-gray-700"><strong>{key}:</strong> {product.properties[key]}</li>
                ))}
              </ul>
              <a href={`/admin/products/edit/${product._id}`}>
              <button className="mt-4 m-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Edit</button>

              </a>
              <DeleteProducts productId={product.id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
