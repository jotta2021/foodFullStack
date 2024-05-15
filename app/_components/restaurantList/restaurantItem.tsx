import { formatCurrency } from "@/app/_lib/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image
 from "next/image";
import { Button } from "../ui/button";
interface RestaurantProps{
    restaurant: Restaurant;
}
const RestaurantItem = ({restaurant}:RestaurantProps) => {


    return (

        <div className="min-w-[266px] max-w-[266px] space-y-3">
            <div className="w-full h-[136px] relative ">
                <Image
                className="object-cover rounded-lg" 
                fill
                src={restaurant.imageUrl} 
                alt={restaurant.name}/>
                
                <div className="absolute bg-white rounded-full left-2 top-2 gap-[2px]
                flex items-center px-2 p-y[2px]
                ">
                   <StarIcon size={12} className="fill-yellow-400 text-yellow-400"/>
                    <span className="tex-xs font-semibold">5.0</span>
                </div>
                <Button 
                variant={'ghost'}
                size={'icon'}
                className="absolute rounded-full right-2 top-2 bg-gray-700 h-7 w-7">
                    <HeartIcon size={16} className="fill-white text-white"/>
                </Button>
            </div>
            <div>
              <h3 className="font-semibold text-sm"> {restaurant.name}</h3>  
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <BikeIcon className="text-primary " size={14}/>
               <span className='text-xs text-muted-foreground'>{Number(restaurant.deliveryFree) === 0 ? 'Entrega Grátis' : formatCurrency(restaurant.deliveryFree)}</span>     
                </div>
                <div className="flex items-center gap-1">
                    <TimerIcon className="text-primary " size={14}/>
                   <span className='text-xs text-muted-foreground'>{restaurant.deliveryTimeMinutes}min</span> 
                </div>

            </div>
            
        </div>
      );
}
 
export default RestaurantItem;