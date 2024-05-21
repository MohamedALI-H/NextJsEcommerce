
'use client'
import React from 'react';
import { deleteProductById } from '../../services/ProdcutService';

const DeleteProducts = ({ productId }) => {
    const handleDelete = async () => {
        try {
            await deleteProductById(productId);
            alert('Product deleted successfully');
            
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
            Delete Product
        </button>
    );
};

export default DeleteProducts;
