'use client'
import {  Restaurant } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface RestaurantImageProps{
    restaurant : Pick< Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ( {restaurant}:RestaurantImageProps) => {
   const router = useRouter() ;

    const handleLeftPage = () => {
        router.back()
    }
   
    return (

<div className="relative w-full h-[250px]">
<Image 
fill
className="object-cover"
src={restaurant?.imageUrl}
alt={restaurant?.name}
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
<Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-4 top-4  rounded-full bg-gray-700 hover:bg-primary"
          >
            <HeartIcon size={'18'} className="fill-white text-white" />
          </Button>
</div>
      );
}
 
export default RestaurantImage;