import { notFound } from "next/navigation";
import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./components/restaurantImage";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/deliveryInfo/deliveryInfo";
import ProductList from "@/app/_components/productList/productList";
interface RestaurantProps{
    params:{
        id:string
    }
}

const RestaurantPage = async ({params:{id}}:RestaurantProps) => {
    const restaurant =  await db.restaurant.findUnique({
        where:{
            id:id
        },
        include:{
            categories:{
               orderBy:{
                createdAt:'desc'
               },
                include:{
                  
                    products:{
                        include:{
                            restaurant:{
                                select:{
                                    name:true
                                }
                            }
                        },
                        where:{
                            restaurandId:id
                        }
                    },
                   
                },
               
            },
            products:{
                take:10,
                include:{
                    restaurant:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })

    if(!restaurant){
        notFound()
    }
    return ( 
    <div>
<RestaurantImage restaurant={restaurant}/>


<div className="flex items-center justify-between px-5 pt-5  bg-white rounded-tl-3xl rounded-tr-3xl relative z-30 mt-[-1.5rem]" >

    {/**IMAGE */}
    <div className="flex items-center gap-[0.375rem]">



    <div className=" w-[30px] h-[30px] relative">
    <Image
src={restaurant.imageUrl}
alt={restaurant.name}
fill
className="rounded-full"
    />
   
 </div>
 {/**NOME DO RESTAURANTE */}
 <h1 className="font-semibold text-xl">{restaurant.name}</h1>
</div>
<div
            className="p-y[2px]  flex items-center
                gap-[3px] rounded-full bg-gray-800 px-2
                "
          >
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="tex-xs font-semibold text-white">5.0</span>
          </div>

 
</div>
<div className="mt-6 py-3 px-5">
<DeliveryInfo restaurant={restaurant}/>
</div>

<div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden  mx-5">
{
    restaurant.categories.map((categorie)=> (
        <div key={categorie.id}
        className="bg-[#F4F4F4] min-w-[167px] min-h-[26px] px-6 rounded-lg text-center   "
        >
            <span className="text-muted-foreground text-xs ">{categorie.name}</span>
        </div>
    ))
}
</div>


{/**TODO: mistrar mais oprodutos */}

<div className="mt-6 space-y-4 ">
<h2 className="font-semibold px-5">Mais Pedidos</h2>
<ProductList products={restaurant.products}/>
</div>

<div>
    {
        restaurant.categories.map((categorie)=>(
            <div key={categorie.id} className="mt-6 space-y-4 ">
            <h2 className="font-semibold px-5">{categorie.name}</h2>
            <ProductList products={categorie.products}/>
            </div>
            
        ))
    }
</div>

    </div>
    

);
}
 
export default RestaurantPage;