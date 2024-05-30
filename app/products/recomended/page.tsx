import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/productList/productItem";
import { db } from "@/app/_lib/prisma";

const RecomendedProducts =async () => {
    const products = await db.product.findMany({
take:15,
        include:{
            restaurant:true,

        }
    })

    return ( 

        <  >
        <Header/>
        <div className="py-6 px-5">

      <h2 className="font-semibold text-lg mb-6 ">Produtos Recomendados</h2>
    <div className="space-y-4 px-5   w-full gap-6 grid grid-cols-2">
{
    products.map((product)=> (
        <ProductItem key={product.id} product={product} className="min-w-full min-h-full"/>
    ))
}
    </div>
      </div>
      </>
);
}
 
export default RecomendedProducts;