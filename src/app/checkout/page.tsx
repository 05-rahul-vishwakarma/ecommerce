"use client";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import PersonalForm from "@/components/Form/PersonalForm";
import PaymentBar from '@/components/Checkout/PaymentBar';

const Checkout = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-white"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full text-secondary">
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>
      <div className="cart-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col md:flex-row justify-between gap-5">
            <div className="left md:w-1/2 w-full">
              <PersonalForm />
            </div>
            <PaymentBar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

