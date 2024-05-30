import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/productList/productList";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promoBanner/promoBanner";
import RestaurantList from "./_components/restaurantList";
import Link from "next/link";
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

  <PromoBanner 
  src={'/Banner01.png'}
  alt={'Promoção 30% de desconto em pizzas'}
  />

</div>
<div className="pt-6 space-y-3">
  <div className="px-5 flex items-center justify-between ">
   <h2 className="font-semibold text-base">Produtos Recomendados</h2> 
   <Link href={'/products/recomended'}>
   <Button
  variant='ghost'
  className="text-primary p-0 hover:bg-transparent"
  >Ver todos
  <ChevronRightIcon/>
  </Button>
   </Link>
  
  </div>
  
  <ProductList products={products}/>
</div>
<div className="px-5 py-6">
<PromoBanner 
  src={'/Banner02.png'}
  alt={'lanches a partir de 17,90'}
  />
</div>
<div className="px-5 flex items-center justify-between ">
   <h2 className="font-semibold text-base">Restaurantes Recomendados</h2> 

   <Link href="/restaurantPage/recomended">

   <Button
  variant='ghost'
  className="text-primary p-0 hover:bg-transparent"
  >Ver todos
  <ChevronRightIcon/>
  </Button>

   </Link>

  </div>

<div className="px-5 py-6" >
  <RestaurantList/>
</div>

  </div>
  );
}
