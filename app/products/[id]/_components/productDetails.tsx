'use client'
import { Prisma,   } from "@prisma/client";
import { formatCurrency,calculateProductTotalPrice } from "@/app/_lib/_helpers/price";
import DiscountBadge from "@/app/_components/discountBadge";
import { Button } from "@/app/_components/ui/button";
import {ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import ProductList from "@/app/_components/productList/productList";
import DeliveryInfo from "@/app/_components/deliveryInfo/deliveryInfo";
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
<div className="mt-6 py-3">
    <DeliveryInfo restaurant={product.restaurant}/>
</div>
      

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