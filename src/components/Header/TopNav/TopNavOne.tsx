"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  props: string;
  slogan: string;
}

const TopNavOne: React.FC<Props> = ({ props, slogan }) => {
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenCurrence, setIsOpenCurrence] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currence, setCurrence] = useState("USD");

  return (
    <>
      <div className={`top-nav md:h-[44px] h-[30px] hidden ${props}`}>
        <div className="container mx-auto h-full">
          <div className="top-nav-main flex justify-between max-md:justify-center h-full">
            <div className="left-content flex items-center gap-5 max-md:hidden">
              <div
                className="choose-type choose-language flex items-center gap-1.5"
                onClick={() => {
                  setIsOpenLanguage(!isOpenLanguage);
                  setIsOpenCurrence(false);
                }}
              >
                <div className="select relative">
                  <p className="selected caption2 text-secondary">{language}</p>
                  <ul
                    className={`list-option bg-white ${
                      isOpenLanguage ? "open" : ""
                    }`}
                  >
                    {["English", "Espana", "France"].map((item, index) => (
                      <li
                        key={index}
                        className="caption2"
                        onClick={() => setLanguage(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Icon.CaretDown size={12} color="#fff" />
              </div>
              <div
                className="choose-type choose-currency flex items-center gap-1.5"
                onClick={() => {
                  setIsOpenCurrence(!isOpenCurrence);
                  setIsOpenLanguage(false);
                }}
              >
                <div className="select relative">
                  <p className="selected caption2 text-secondary">{currence}</p>
                  <ul
                    className={`list-option bg-white ${
                      isOpenCurrence ? "open" : ""
                    }`}
                  >
                    {["USD", "EUR", "GBP"].map((item, index) => (
                      <li
                        key={index}
                        className="caption2"
                        onClick={() => setCurrence(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Icon.CaretDown size={12} color="#fff" />
              </div>
            </div>
            <div className="text-center text-button-uppercase text-secondary flex items-center">
              {slogan}
            </div>
            <div className="right-content flex items-center gap-5 max-md:hidden">
              <Link href={"https://www.facebook.com/share/17Sdc7UBVT/?mibextid=wwXIfr"} target="_blank">
                <i className="icon-facebook text-secondary "></i>
              </Link>
              <Link href={"https://www.instagram.com/theribbonpack_?igsh=MWxxbnhrZjZ0bnJ3/"} target="_blank">
                <i className="icon-instagram text-secondary "></i>
              </Link>
              <Link href={"https://youtube.com/@theribbonpack3241?si=0VSECWeGhEjo9OYc"} target="_blank">
                <i className="icon-youtube text-secondary "></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavOne;
