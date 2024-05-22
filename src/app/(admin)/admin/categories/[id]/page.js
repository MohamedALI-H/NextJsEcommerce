import React from "react";
import CategorieDetail from "../../../../components/admin/CategorieDetail";
import {getCategoryById} from "../../../../services/CategoryService";

const fetchCategory = async (id) => {
  const fetchedCategory = await getCategoryById(id);
  return fetchedCategory;

};
const CategoryDetailPage = async({params}) => {

  const category= await fetchCategory(params.id)



  return (
    <div className="p-4 sm:ml-64 mt-14">
<CategorieDetail category={category}/>

    </div>

  );
};

export default CategoryDetailPage;
