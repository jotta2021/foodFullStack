import { db } from "@/app/_lib/prisma";
import RestaurantItem from "./restaurantItem";

const RestaurantList =async () => {
    //busca os restaurantes, trazendo apenas 10
const restaurants = await db.restaurant.findMany({take:10})

    return (  
<div className="flex gap-6 px-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
{
    restaurants.map((restaurant)=> (
        <RestaurantItem
        key={restaurant.id}
        restaurant={restaurant}/>
    ))
}
</div>

    );
}
 
export default RestaurantList;