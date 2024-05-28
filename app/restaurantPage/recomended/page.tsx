import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurantList/restaurantItem";
import { db } from "@/app/_lib/prisma";

const RecomendedRestaurant = async() => {
    const restaurants = await db.restaurant.findMany({})
    return ( 

        <  >
        <Header/>
        <div className="py-6 px-5">

      <h2 className="font-semibold text-lg mb-6 ">Restaurantes Recomendados</h2>
    <div className="space-y-4 px-5 flex flex-col w-full gap-6">
{
    restaurants.map((restaurant)=> (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full min-h-full"/>
    ))
}
    </div>
      </div>
      </>
);
}
 
export default RecomendedRestaurant;