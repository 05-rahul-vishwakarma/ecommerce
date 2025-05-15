
import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import ShopBreadCrumb from '@/components/Shop/ShopBreadCrumb';


export default function BreadCrumb1() {


  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      <ShopBreadCrumb />
      <Footer />
    </>
  );
}
