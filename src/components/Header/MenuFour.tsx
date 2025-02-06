"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Product from "@/components/Product/Product";
import productData from "@/data/Product.json";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface Props {
  props: string;
}

const MenuFour: React.FC<Props> = ({ props }) => {
  const pathname = usePathname();
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const { openModalCart } = useModalCartContext();
  const { cartData } = useCart();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalSearch } = useModalSearchContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/search-result?query=${value}`);
    setSearchKeyword("");
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    // Gắn sự kiện cuộn khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <>
      <div
        style={{ backgroundColor: "#592dbb" }}
        className={`header-menu style-one ${fixedHeader ? " fixed" : "relative"
          } w-full  md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex items-center justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center text-white"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>

            <div className="form-search relative max-lg:hidden z-[1]">
              <Image
                src="/logo2.png" // Path relative to the public folder
                alt="Company Logo"
                width={150} // Specify width (optional for fixed sizes)
                height={150} // Specify height (optional for fixed sizes)
                className="h-full w-auto mr-3" // Additional styling if needed
              />
            </div>
            <div className="menu-main h-full xl:w-full flex items-center justify-center max-lg:hidden xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center gap-8 h-full">
                <li className="h-full relative">
                  <Link
                    href="/"
                    className={` text-white text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 
                                            ${pathname.includes("/homepages")
                        ? "active"
                        : ""
                      }`}
                  >
                    Home
                  </Link>
                </li>

                <li className="h-full">
                  <Link
                    href="/shop"
                    className="text-white text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Shop
                  </Link>
                </li>

                <li className="h-full">
                  <Link
                    href="/product"
                    className="text-white text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Product
                  </Link>
                </li>

                <li className="h-full relative">
                  <Link
                    href="/blog"
                    className="text-white text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Blog
                  </Link>
                </li>

                <li className="h-full relative">
                  <Link
                    href="#!"
                    className="text-white text-button-uppercase duration-300 h-full flex items-center justify-center"
                  >
                    Pages
                  </Link>
                  <div className="sub-menu py-3 px-5 -left-10 absolute  rounded-b-xl backdrop-blur">
                    <ul className="w-full">
                      <li>
                        <Link
                          href="/pages/about"
                          className={`text-secondary duration-300 ${pathname === "/pages/about" ? "active" : ""
                            }`}
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/contact"
                          className={`text-secondary duration-300 ${pathname === "/pages/contact" ? "active" : ""
                            }`}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/client-contact"
                          className={`text-secondary duration-300 ${pathname === "/pages/client-contact" ? "active" : ""
                            }`}
                        >
                          Client Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pages/privacy-policy"
                          className={`text-secondary duration-300 ${pathname === "/pages/privacy-policy" ? "active" : ""
                            }`}
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          href="/pages/page-not-found"
                          className={`text-secondary duration-300 ${pathname === "/pages/page-not-found" ? "active" : ""
                            }`}
                        >
                          404
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          href="/pages/faqs"
                          className={`text-secondary duration-300 ${pathname === "/pages/faqs" ? "active" : ""
                            }`}
                        >
                          FAQs
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          href="/pages/coming-soon"
                          className={`text-secondary duration-300 ${pathname === "/pages/coming-soon" ? "active" : ""
                            }`}
                        >
                          Coming Soon
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          href="/pages/customer-feedbacks"
                          className={`text-secondary duration-300 ${pathname === "/pages/customer-feedbacks"
                            ? "active"
                            : ""
                            }`}
                        >
                          Customer Feedbacks
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="right flex gap-12 z-[1]">
              <div className="list-action flex items-center gap-4">
                <div className="user-icon flex items-center justify-center cursor-pointer">
                  <Icon.User
                    size={24}
                    color="white"
                    onClick={handleLoginPopup}
                  />
                  <div
                    className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm 
                                            ${openLoginPopup ? "open" : ""}`}
                  >
                    <Link
                      href={"/login"}
                      className="button-main w-full text-center"
                    >
                      Login
                    </Link>
                    <div className="text-secondary text-center mt-3 pb-4">
                      Don’t have an account?
                      <Link
                        href={"/register"}
                        className="text-black pl-1 hover:underline hover:text-purple"
                      >
                        Register
                      </Link>
                    </div>
                    <div className="bottom pt-4 border-t border-line"></div>
                    <Link href={"#!"} className="body1 hover:underline">
                      Support
                    </Link>
                  </div>
                </div>
                <div
                  className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                  onClick={openModalWishlist}
                >
                  <Icon.Heart size={24} color="white" />
                </div>
                <div
                  className="cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="white" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-black bg-white w-4 h-4 flex items-center justify-center rounded-full">
                    {cartData?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container  bg-custom-purple-color h-full w-9/12 ">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center mt-5">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl text-white font-semibold text-center"
                >
                  The Ribbon Pack
                </Link>
              </div>

              {/* Logo */}
              <div className="form-search relative mt-2">
                <Image
                  src="/logo2.png" // Path relative to the public folder
                  alt="Company Logo"
                  width={60} // Specify width (optional for fixed sizes)
                  height={60} // Specify height (optional for fixed sizes)
                  className="h-full w-auto rounded-lg flex items-center" // Additional styling if needed
                />
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <a
                      href={"/"}
                      className={`text-xl text-white font-semibold flex items-center justify-between`}
                    >
                      Home
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>

                  <li
                    className={`${openSubNavMobile === 3 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(3)}
                  >
                    <a
                      href={"/shop"}
                      className="text-xl text-white font-semibold flex items-center justify-between mt-5"
                    >
                      Shop
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>

                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(4)}
                  >
                    <a
                      href={"/product"}
                      className="text-xl text-white font-semibold flex items-center justify-between mt-5"
                    >
                      Product
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>

                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(5)}
                  >
                    <a
                      href={"/blog"}
                      className="text-xl text-white font-semibold flex items-center justify-between mt-5"
                    >
                      Blog
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                  </li>

                  <li
                    className={`${openSubNavMobile === 6 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(6)}
                  >
                    <a
                      href={"#!"}
                      className="text-xl text-white font-semibold flex items-center justify-between mt-5"
                    >
                      Pages
                      <span
                        className={`${openMenuMobile ? "open" : ""
                          } tesxt-right`}
                      >
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    {openSubNavMobile === 6 && (
                      <ul className="mt-2 pl-10">
                        <li className="mt-2">
                          <a
                            href="/pages/about"
                            className="text-lg text-white font-semibold flex items-center justify-between mt-5"
                          >
                            About Us
                          </a>
                        </li>
                        <li className="mt-2">
                          <a
                            href="/pages/contact"
                            className="text-lg text-white font-semibold flex items-center justify-between mt-3"
                          >
                            Contact Us
                          </a>
                        </li>

                        <li className="mt-2">
                          <a
                            href="/pages/customer-feedbacks"
                            className="text-lg text-white font-semibold flex items-center justify-between mt-3"
                          >
                            Customer Feedback
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuFour;