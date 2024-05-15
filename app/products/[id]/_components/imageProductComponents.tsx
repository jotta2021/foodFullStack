'use client'
import { Product } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface ProductImageProps{
    product : Pick< Product, 'name' | 'imageUrl'>
}

const ImageProductComponent = ( {product}:ProductImageProps) => {
   const router = useRouter() ;

    const handleLeftPage = () => {
        router.back()
    }
   
    return (

<div className="relative w-full h-[360px]">
<Image 
fill
className="object-cover"
src={product?.imageUrl}
alt={product?.name}
quality={100}
/>
<Button 
onClick={handleLeftPage}
className="absolute top-4 left-4 rounded-full
bg-white text-foreground hover:text-white
"
size={'icon'}
>
    <ChevronLeftIcon
    
    />
</Button>
</div>
      );
}
 
export default ImageProductComponent;