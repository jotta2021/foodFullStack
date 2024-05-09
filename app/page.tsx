import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import Image from "next/image";
import ProductList from "./_components/productList/productList";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
export default async function Home(){
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
  <div >
  <Header/>
  <div className=" pt-8 px-12">
    <Search />
  </div>
  <div className="pt-16 px-12">
    <CategoryList/>
  </div>
  <div className="pt-6 px-5">

  
  <Image src={'/Banner01.png'} 
  width={0} 
  height={0} 
  alt="promoção 30% de desconto em pizzas"
  className=" w-full h-auto object-contain"
  sizes="100vw"
  quality={100}
  />
</div>
<div className="pt-6 space-y-3">
  <div className="px-5 flex items-center justify-between ">
   <h2 className="font-semibold text-base">Pedidos Recomendados</h2> 
  <Button
  variant='ghost'
  className="text-primary p-0 hover:bg-transparent"
  >Ver todos
  <ChevronRightIcon/>
  </Button>
  </div>
  
  <ProductList products={products}/>
</div>

  </div>
  );
}
