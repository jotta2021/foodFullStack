import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";

export default function Home() {
  return (
  <div >
  <Header/>
  <div className="pt-20 px-12">
    <Search />
  </div>
  <div className="pt-20 px-12">
    <CategoryList/>
  </div>
  


  </div>
  );
}
