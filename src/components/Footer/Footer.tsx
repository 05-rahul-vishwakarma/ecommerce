import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Footer = () => {
   
  return (
    <>
      <div id="footer" className="footer">
        <div className="footer-main bg-surface">
          <div className="container">
            <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-2">
                <Link href={"/"} className="logo">
                  <div className="heading4">The Ribbon Pack</div>
                </Link>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col ">
                    <span className="text-button">Mail:</span>
                    <span className="text-button mt-3">Phone:</span>
                    <span className="text-button mt-3">Address:</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="pt-px caption1">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=Support@theribbonpack.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="has-line-before text-secondary"
                      >
                        Support@theribbonpack.com
                      </a>
                    </span>
                    <span className="mt-3 caption1">+91 9821472627</span>
                    <span className="mt-3 pt-px caption1">
                      Shop No-105 1st Floor Aggarwal Tower Pocket O & P Dilshad
                      Garden Near in font of Punjab National Bank  Delhi 110095
                    </span>
                  </div>
                </div>
              </div>
              <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full pl-10">
                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Infomation</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/pages/contact"}
                    >
                      Contact us
                    </Link>
                  
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/my-account"}
                    >
                      My Account
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/order-tracking"}
                    >
                      Order & Returns
                    </Link>
                    {/* <Link className='caption1 has-line-before duration-300 w-fit pt-2' href={'/pages/faqs'}>FAQs</Link> */}
                  </div>
                  <div className="item flex flex-col basis-1/3  ">
                    <div className="text-button-uppercase pb-3">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/product"}
                    >
                      Custom Printed Ribbon
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/product"}
                    >
                      Premium Satin Ribbon
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/product"}
                    >
                      Foil Printed
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/blog"}
                    >
                      Blog
                    </Link>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">
                      Customer Services
                    </div>
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/pages/faqs"}
                    >
                      Orders FAQs
                    </Link> */}
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/pages/faqs"}
                    >
                      Shipping
                    </Link> */}
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/pages/faqs"}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/order-tracking"}
                    >
                      Not Refundable
                    </Link>
                  </div>
                </div>
                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0 flex justify-center">
                  <div className="list-social flex items-center gap-6 mt-4">
                    <div>
                      {" "}
                      <Link href="/">
                        {" "}
                        <Image
                          src="/logo2.png" // Path relative to the public folder
                          alt="Company Logo"
                          width={150} // Specify width (optional for fixed sizes)
                          height={150} // Specify height (optional for fixed sizes)
                          className="h-full w-auto mr-3" // Additional styling if needed
                        />
                      </Link>
                    </div>

                    <Link href={"https://www.facebook.com/share/17Sdc7UBVT/?mibextid=wwXIfr"} target="_blank">
                      <div className="icon-facebook text-2xl text-custom-purple-color"></div>
                    </Link>
                    <Link href={"https://www.instagram.com/theribbonpack_?igsh=MWxxbnhrZjZ0bnJ3"} target="_blank">
                      <div className="icon-instagram text-2xl text-custom-purple-color"></div>
                    </Link>

                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
              <div className="left flex items-center gap-8 hidden ">
                <div className="copyright caption1 text-secondary">
                  <span>Developer Email: - </span>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=rahul930vishwakarma@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="has-line-before text-secondary"
                  >
                    rahul930vishwakarma@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
