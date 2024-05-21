const API_URL_Category =process.env.API_URL_Category ;

export const createCategory = async (categoryData) => {
  const response = await fetch(API_URL_Category, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const getAllCategories = async () => {
  const response = await fetch(API_URL_Category);
  return response.json();
};

export const updateCategoryById = async (id, categoryData) => {
  const response = await fetch(API_URL_Category + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  return response.json();
};

export const deleteCategoryById = async (id) => {
  const response = await fetch(API_URL_Category + id, {
    method: 'DELETE',
  });
  return response.json();
};
export const getCategoryById = async (id) => {
    try {
      const response = await fetch(API_URL_Category + id);
      return response.json();
    } catch (error) {
      console.error('Error getting category by ID:', error);
      throw error;
    }
  };
  
export const getAllCategoriesOrdered = async (orderBy) => {
    try {
      let query = '';
      if (orderBy === 'name') {
        query = '?sortBy=name';
      } else if (orderBy === 'numProducts') {
        query = '?sortBy=numProducts';
      }
    
      const response = await fetch(API_URL_Category + 'order' + query);
      return response.json();
    } catch (error) {
      console.error('Error getting all categories ordered:', error);
      throw error;
    }
  };
  
