import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ImageProductComponent from "./_components/imageProductComponents";
import ProductDetail from "./_components/productDetails";
import { Button } from "@/app/_components/ui/button";
interface ProductProps{
    params:{
        id:String
    },

}

const ProductsPage =async ({params:{id}}:ProductProps) => {
    //busca noi banco de dados o produto atraves do id
  const product = await db.product.findUnique({
    where:{
        id
    },
    include:{
        restaurant:true
    }
  })

const juices = await db.product.findMany({
    where: {
        category: {
            name:'Sucos',
        },
       restaurant:{
        id: product?.restaurandId
       }
    },
        include:{
            restaurant:true,
        },
    
})

  if(!product){
    return notFound()
  }

 
console.log(product)
    return ( 
        <div >

 <ImageProductComponent product={product}/>
<div className="px-5 py-6 bg-white rounded-tl-3xl rounded-tr-3xl relative z-30 mt-[-1.5rem]">


{/**Restaurante */}
<div className="flex items-center gap-[0.375rem]">
    <div className="w-6 h-6 relative">

  
    <Image
src={product.restaurant.imageUrl}
alt={product.restaurant.name}
fill
className="rounded-full"
    />
   
 </div>
  <span
  className="text-xs text-muted-foreground"
  >{product.restaurant.name}</span>
</div>

{/**titulo */}
<ProductDetail product={product} complementaryProducts={juices} />

<div className="px-5 mt-6 ">
<Button
className='w-full rounded-lg font-semibold'
>Adicionar à Sacola</Button>
</div>

</div>


        </div>
     );
}
 
export default ProductsPage;