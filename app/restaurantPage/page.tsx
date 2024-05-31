'use client'

import { notFound, useSearchParams } from "next/navigation";
import SearchRestaurants from "./_actions/search";
import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurantList/restaurantItem";
const Restaurants = () => {

const [restaurants,setRestaurants]= useState<Restaurant[]>([])



    const searchParams = useSearchParams();
 

    useEffect(()=> {
async function fetchRestaurants(){
    const searhFor = searchParams.get('search')
    if(!searhFor){
        return;
    }
    const foundRestaurants = await SearchRestaurants(searhFor);
    setRestaurants(foundRestaurants)
}
fetchRestaurants()
    },[searchParams])

    const searhFor = searchParams.get('search')
    if(!searhFor){
        return notFound()
    }
    return (
        <div>
              <Header/>
        <div className="py-6 px-5">

      <h2 className="font-semibold text-lg mb-6 ">Restaurantes Encontrados</h2>
    <div className="space-y-4 px-5 flex flex-col w-full gap-6">
{
    restaurants.map((restaurant)=> (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full min-h-full"/>
    ))
}
    </div>
      </div>
        </div>
    )
}
 
export default Restaurants;