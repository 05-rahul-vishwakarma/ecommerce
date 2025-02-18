"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import ShippingAddress from './ShippingAddress';

interface Profile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  phoneNo?: string;
  data?: any;
}

interface AccountContentProps {
  initialProfile: { data: Profile } | null;
}

const AccountContent = ({ initialProfile }: AccountContentProps) => {
  const [profile, setProfile] = useState<Profile | null>(
    initialProfile?.data || null
  );
  // Set default active tab to "address"
  const [activeTab, setActiveTab] = useState<string>("address");

  return (
    <div className="profile-block md:py-20 py-10">
      <div className="container">
        <div className="content-main flex gap-y-8 max-md:flex-col w-full">
          <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
            <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl">
              <div className="heading flex flex-col items-center justify-center">
                <div className="name heading6 mt-4 text-center">
                  {profile?.firstName}
                </div>
                <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1">
                  {profile?.phoneNo}
                </div>
              </div>
              <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                <button
                  className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${
                    activeTab === "orders" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <Icon.Package size={20} />
                  <strong className="heading6">History Orders</strong>
                </button>

                <button
                  className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${
                    activeTab === "address" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("address")}
                >
                  <Icon.Tag size={20} />
                  <strong className="heading6">My Address</strong>
                </button>

                <Link
                    href={"/login"}
                    className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5"
                  >
                    <Icon.SignOut size={20} />
                    <strong className="heading6">Logout</strong>
                  </Link>
              </div>
            </div>
          </div>
          
          <div className="right md:w-2/3 w-full pl-2.5">
            <div
              className={`tab_address text-content w-full p-7 border border-line rounded-xl ${
                activeTab === "address" ? "block" : "hidden"
              }`}
            >
              <ShippingAddress initialProfile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;