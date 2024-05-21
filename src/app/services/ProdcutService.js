const API_URL_Product = process.env.API_URL_Product;

export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL_Product, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/products', {
      cache: 'no-store' // Add cache-control: no-store
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return null;
  }
};


export const getProductById = async (id) => {
  console.log(API_URL_Product+ id);
  try {
    
    const response = await fetch(API_URL_Product + id);
    const result= await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(API_URL_Product + 'category/' + categoryId);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return null;
  }
};

export const updateProductById = async (id, updatedProductData) => {
  try {
    const response = await fetch(API_URL_Product + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProductData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating product by ID:', error);
    return null;
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await fetch(API_URL_Product + id, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    return null;
  }
};

export const getProductsOrderedBy = async (orderBy) => {
  try {
    const response = await fetch(`${API_URL_Product}/order?orderby=${orderBy}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products ordered by ${orderBy}:`, error);
    return null;
  }
};



