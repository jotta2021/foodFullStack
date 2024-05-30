import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    
  return (
    <Link href={`/categorias/${category.id}/products`}
    className="flex gap-3 items-center bg-white rounded-full shadow-md px-4 py-3 "
    >

  
      <Image
        alt={category.name}
        src={category.imageUrl}
        width={30}
        height={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    

    </Link>
  );
};

export default CategoryItem;
