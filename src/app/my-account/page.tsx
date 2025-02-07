import { Suspense } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import AccountContent from "@/components/MyAccount/AccountContent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function fetchProfile(accessToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(
        `Failed to fetch profile: ${res.status} ${res.statusText}. Details: ${errorDetails}`
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export default async function MyAccount() {
  const nextCookies = cookies();
  const accessToken = (await nextCookies).get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login"); // Redirect to login if no token
    return null;
  }

    const nextCookies = cookies();
    const accessToken = (await nextCookies).get('accessToken')?.value;

  if (!accessToken) {
    redirect('/login');
    return null;
  }

    let profileData = null;
    try {
        profileData = await fetchProfile(accessToken);
    } catch (error) {
        console.error("Profile fetch failed:", (error as { message: string }).message);
        return (
          <div>
            <h1>An error occurred</h1>
            <p>{(error as { message: string }).message}</p>
          </div>
        )
    }

  let profileData = null;
  try {
    profileData = await fetchProfile(accessToken);
    // console.log("Profile Data:", profileData);
  } catch (error) {
    console.error(
      "Profile fetch failed:",
      (error as { message: string }).message
    );
    return (
      <div>
        <h1>An error occurred</h1>
        <p>{(error as { message: string }).message}</p>
      </div>
    );
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-white"
        slogan="New customers save 10% with the code GET20"
      />
      <div id="header" className="relative w-full text-secondary">
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading="My Account" subHeading="My Account" />
      </div>
      <div className="profile-block md:py-20 py-10">
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <AccountContent initialProfile={profileData} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
