'use client'
import { Prisma,   } from "@prisma/client";
import { formatCurrency,calculateProductTotalPrice } from "@/app/_lib/_helpers/price";
import DiscountBadge from "@/app/_components/discountBadge";
import { Button } from "@/app/_components/ui/button";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/productList/productList";
interface ProductProps{
    product: Prisma.ProductGetPayload<{
    include:{
        restaurant:true
    }
}>;
    complementaryProducts: Prisma.ProductGetPayload<{
include:{
    restaurant:true
},

    }>[];
}

const ProductDetail = ({product,complementaryProducts}: ProductProps) => {
    const [quantity,setQuantity]= useState(1)
    const handleIncreaseQuantityClick = () => setQuantity(prev => prev+1);
    const handleDecreaseQuantityClick = ()=> {
        if(quantity >1){
           setQuantity(prev=> prev-1) 
        }
        };
    return ( 
        <div >
           
            <div>
<h1
className="font-semibold text-xl mb-3 mt-1"
>{product.name}</h1>
</div>

{/**PREÇO */}
<div className="flex items-center justify-between">
    <div>
    <div className=" flex items-center gap-2">
          <h2 className="font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product)) }</h2>
    {
         product.discountPercentage> 0 && (
          <DiscountBadge product={product}/>      
         )
    } 
    </div>
 <div>
    {/**valor antes do desconto */}
{
    product.discountPercentage> 0 &&  (
        <h2 className="text-sm text-muted-foreground">De: {formatCurrency(product.price) }</h2>
    )

}
</div>
  </div>
        {/**Quantidade */}
<div className="flex items-center gap-3">
<Button size={'icon'}
className="border-muted-foreground border border-solid"
variant={'ghost'}
onClick={handleDecreaseQuantityClick}
>
    <ChevronLeftIcon/>
</Button>
<span className="w-4">{quantity}</span>
<Button size={'icon'} variant={'ghost'}
className="bg-primary text-white"
onClick={handleIncreaseQuantityClick}
>
    <ChevronRightIcon/>
</Button>
</div>
</div>
      

{/**DADOS DA ENTREGA */}

    <Card className="flex justify-around  mt-6 py-3">
     

     
        <div className="flex flex-col items-center">
        {/**custo */}
<div className="flex items-center gap-1 text-muted-foreground">
    <span className="text-xs">Entrega</span>
<BikeIcon size={14}/>
</div>
<div>
    {
       Number(product.restaurant.deliveryFree)  === 0 ?
        <span className="font-semibold">Grátis</span> :
        <span className="font-semibold" >{formatCurrency( product.restaurant.deliveryFree)}</span>
    }
</div>

</div>
{/**tempo de entrega */}
<div className="flex flex-col items-center">
     
<div className="flex items-center gap-1 text-muted-foreground">
    <span className="text-xs">Tempo</span>
    <TimerIcon size={14}/>
</div>
<div>
<span className="font-semibold">{product.restaurant.deliveryTimeMinutes}min</span>
</div>



</div>


 
    </Card>
<div className="pt-6 space-y-3">
  <h3 className="text-base font-semibold ">Sobre</h3>
<p className="text-sm text-muted-foreground">{product.description}</p>  
</div>

<div className="pt-6">
  <ProductList products={complementaryProducts}/>  
</div>

        </div>
     );
}
 
export default ProductDetail;