import {  Prisma} from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_lib/_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "../discountBadge";
interface ProductProps {
  product: Prisma.ProductGetPayload<{
    include:{
      restaurant:{
        select:{
          name:true;
        }
      }
    }
  }>
}

const ProductItem = ({ product }: ProductProps) => {
  return (
    <Link
    className="w-[150px] min-w-[150px]"
    href={`/products/${product.id}`}>
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover  shadow-sm"
        />
        {
          product.discountPercentage > 0 ? (
             <DiscountBadge product={product}/>
          ) : ''
        }
       

      </div>

      <div className="h-[24px] mi-w-[113px]">
        <h2 className="text-sm truncate">{product.name}</h2>
      </div>
      <div className="flex gap-1 items-center">
        <h3 className=" font-semibold text[16px]">
       {formatCurrency(calculateProductTotalPrice(product))}
        </h3>
        {product.discountPercentage > 0 ? (
          <span className="line-through text-stone-500 text-muted-foreground text-xs">{
       formatCurrency(product.price)
           }</span>
        ) : (
          ""
        )}
        
      </div>
      <div>
        <span className="text-xs text-muted-foreground block">{product.restaurant.name}</span>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
