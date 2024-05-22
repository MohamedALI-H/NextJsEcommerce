import UpdateProduct from "../../../../../components/admin/updateProduct";
 import {getAllCategories} from "../../../../../services/CategoryService" 
 import {getProductById} from "../../../../../services/ProdcutService"
 const getcategories=async()=>{
    const data=await getAllCategories()

        return data;
    
    }
    const NewProductPage = async({params}) => {
    const categories=await getcategories()
    const product=await getProductById(params.id);
      return (
        <div className="p-4 sm:ml-64 mt-14">
    <UpdateProduct categories={categories} product={product}/> </div>
    ) }
    export default NewProductPage