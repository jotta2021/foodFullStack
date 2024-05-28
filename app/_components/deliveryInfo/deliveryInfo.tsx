import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "../ui/card"
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "@/app/_lib/_helpers/price";
interface RestaurantProps{
    restaurant : Pick< Restaurant, 'deliveryFree' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({restaurant}:RestaurantProps) => {
    return ( 

<>
    <Card className="flex justify-around  ">
     

     
    <div className="flex flex-col items-center">
    
<div className="flex items-center gap-1 text-muted-foreground">
<span className="text-xs">Entrega</span>
<BikeIcon size={14}/>
</div>
<div>
{
   Number(restaurant.deliveryFree)  === 0 ?
    <span className="font-semibold">Grátis</span> :
    <span className="font-semibold" >{formatCurrency( restaurant.deliveryFree)}</span>
}
</div>

</div>

<div className="flex flex-col items-center">
 
<div className="flex items-center gap-1 text-muted-foreground">
<span className="text-xs">Tempo</span>
<TimerIcon size={14}/>
</div>
<div>
<span className="font-semibold">{restaurant.deliveryTimeMinutes}min</span>
</div>



</div>



</Card>

</>
     );
}
 
export default DeliveryInfo;