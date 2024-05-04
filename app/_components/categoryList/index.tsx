import { db } from "@/app/_lib/prisma";
import CategoryItem from "./categoryItem";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
 
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((item) => (
        <CategoryItem key={item.id} category={item} />
      ))}
    </div>
  );
};

export default CategoryList;
