import NewProduct from "../../../../components/admin/createProduct";
 import {getAllCategories} from "../../../../services/CategoryService" 
 const getcategories=async()=>{
    const data=await getAllCategories()

        return data;
    
    }
    const NewProductPage = async() => {
    const categories=await getcategories()
      return (
        <div className="p-4 sm:ml-64 mt-14">
    <NewProduct categories={categories}/> </div>
    ) }
    export default NewProductPage