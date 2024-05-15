import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
interface DiscountProps{
    product: Pick<Product,"discountPercentage">
}

const DiscountBadge = ({product}:DiscountProps) => {
    return ( 
        <div className="relative  left-2 bg-primary text-white *:
        rounded-full px-2 py-[2px] flex items-center
        gap-[2px] w-[52px]
        ">
         <ArrowDownIcon size={12}/>
    <span className="font-semibold text-xs">
     {product.discountPercentage}%
    </span>
   </div>
    );
}
 
export default DiscountBadge;