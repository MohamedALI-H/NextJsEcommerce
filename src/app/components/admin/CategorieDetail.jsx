import React from 'react';


const CategoryDetail = ({ category }) => {
 

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-white text-2xl font-bold">{category.name}</h1>
        </div>
        <div className="p-4">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={category.image && category.image.length > 0 ? category.image : ''}
                alt={category.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:ml-4">
             
              <p className="text-gray-700 mt-2">{category.description}</p>
              <p className="text-gray-700 mt-2"><strong>Created At:</strong> ${category.createdAt}</p>
              <p className="text-gray-700 mt-2"><strong>IsActive:</strong> {category.isActive}</p>
            
            
              <a href={`/admin/categories/edit/${category._id}`}>
              <button className="mt-4 m-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Edit</button>

              </a>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
