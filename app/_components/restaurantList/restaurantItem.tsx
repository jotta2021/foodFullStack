import { formatCurrency } from "@/app/_lib/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
interface RestaurantProps {
  restaurant: Restaurant;
}
const RestaurantItem = ({ restaurant }: RestaurantProps) => {
  return (
    <Link
      href={`/restaurantPage/${restaurant.id}`}
      className="min-w-[266px] max-w-[266px] space-y-3"
    >
      <div className="w-full">
        <div className="relative h-[136px] w-full ">
          <Image
            className="rounded-lg object-cover"
            fill
            src={restaurant.imageUrl}
            alt={restaurant.name}
          />

          <div
            className="p-y[2px] absolute left-2 top-2 flex items-center
                gap-[2px] rounded-full bg-white px-2
                "
          >
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="tex-xs font-semibold">5.0</span>
          </div>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 hover:bg-primary"
          >
            <HeartIcon size={16} className="fill-white text-white" />
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold"> {restaurant.name}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <BikeIcon className="text-primary " size={14} />
            <span className="text-muted-foreground text-xs">
              {Number(restaurant.deliveryFree) === 0
                ? "Entrega Grátis"
                : formatCurrency(restaurant.deliveryFree)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon className="text-primary " size={14} />
            <span className="text-muted-foreground text-xs">
              {restaurant.deliveryTimeMinutes}min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
