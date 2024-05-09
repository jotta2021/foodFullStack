
import ProductItem from "./productItem";

import { Prisma } from "@prisma/client";

interface ProductListProps {
    products: Prisma.ProductGetPayload<{
      include:{
        restaurant:{
          select:{
            name:true;
          }
        }
      }
    }>[]
  }

const ProductList = async ({products}: ProductListProps) => {


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