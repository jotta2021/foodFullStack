import Image from "next/image";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
const Header = () => {
    return ( 
<div className="flex justify-between pt-24 px-6">
    <Image src={'/logo.png'} alt="imageLogo" height={30} width={100}/>
<Button variant='outline' className="bg-transparent border-none">
    <MenuIcon />
</Button>

</div>

     );
}
 
export default Header;