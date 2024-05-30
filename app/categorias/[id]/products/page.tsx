import { db } from "@/app/_lib/prisma";
import Header from "@/app/_components/header";

import { notFound } from "next/navigation";
import ProductItem from "@/app/_components/productList/productItem";
interface CategoriePageProps{
    params:{
        id:string;
        
    }
    
}

const CategoriesPage = async({params:{id}}:CategoriePageProps) => {
    const category= await db.category.findUnique({
        where:{
            id,
        },
        include:{
            products:{
                include:{
                    restaurant:{
                        select:{
                            name:true
                        }
                    }
                },
                take:15
            }
        }
    })
    if(!category){
       return notFound()
    }
    return ( 

        <div>
  <Header/>
        <div className="py-6 px-5">

      <h2 className="font-semibold text-lg mb-6 ">{category.name}</h2>
    <div className="space-y-4 px-5  w-full gap-6 grid grid-cols-2">
{
    category.products.map((item)=> (
        <ProductItem key={item.id} product={item} className="min-w-full min-h-full"/>
    ))
}
    </div>
      </div>
        </div>
     );
}
 
export default CategoriesPage;