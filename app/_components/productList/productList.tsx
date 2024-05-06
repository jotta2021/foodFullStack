import { db } from "@/app/_lib/prisma";
import ProductItem from "./productItem";

const ProductList = async () => {
const products = await db.product.findMany({
    where:{
        discountPercentage:{
            gt:0,        }
    },
    take:10,
    include:{
        restaurant:{
            select:{
                name:true
            }
        }
    }
});

    return ( 

        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-6 px-5">

            {
                products.map((item)=> (
                   <ProductItem key={item.id} product={item}/>
                ))
            }
        </div>
     );
}
 
export default ProductList;