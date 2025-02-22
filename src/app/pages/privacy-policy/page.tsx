"use client";

import React from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuFour from "@/components/Header/MenuFour";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Top navigation and breadcrumb */}
      <TopNavOne
        props="style-one bg-gray-100 border-b border-gray-300"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full text-secondary-900">
        <MenuFour props="bg-white shadow-md" />
        <Breadcrumb
          heading="Privacy Policy"
          subHeading="Learn More Privacy Policy"
        />
      </div>

      <div className="privacy-policy container mx-auto px-6 py-16">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Who we are</h2>
          <p className="text-gray-700 text-lg">
            Our website address is:{" "}
            <a
              href="https://theribbonpack.com"
              className="text-blue-500 underline"
            >
              https://theribbonpack.com
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <p className="text-gray-700 text-lg mb-4">
            When visitors leave comments on the site, we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help with spam detection.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            An anonymized string created from your email address (also called a
            hash) may be provided to the Gravatar service to see if you are
            using it. The Gravatar service privacy policy is available here:{" "}
            <a
              href="https://automattic.com/privacy/"
              className="text-blue-500 underline"
            >
              https://automattic.com/privacy/
            </a>
            .
          </p>
          <p className="text-gray-700 text-lg">
            After approval of your comment, your profile picture is visible to
            the public in the context of your comment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Media</h2>
          <p className="text-gray-700 text-lg">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-gray-700 text-lg mb-4">
            If you leave a comment on our site, you may opt-in to saving your
            name, email address, and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            If you visit our login page, we will set a temporary cookie to
            determine if your browser accepts cookies. This cookie contains no
            personal data and is discarded when you close your browser.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            When you log in, we will also set up several cookies to save your
            login information and your screen display choices. Login cookies
            last for two days, and screen options cookies last for a year. If
            you select “Remember Me,” your login will persist for two weeks. If
            you log out of your account, the login cookies will be removed.
          </p>
          <p className="text-gray-700 text-lg">
            If you edit or publish an article, an additional cookie will be
            saved in your browser. This cookie includes no personal data and
            simply indicates the post ID of the article you just edited. It
            expires after one day.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Embedded content from other websites
          </h2>
          <p className="text-gray-700 text-lg">
            Articles on this site may include embedded content (e.g., videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website.
          </p>
          <p className="text-gray-700 text-lg">
            These websites may collect data about you, use cookies, embed
            additional third-party tracking, and monitor your interaction with
            that embedded content, including tracking your interaction with the
            embedded content if you have an account and are logged in to that
            website.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Who we share your data with
          </h2>
          <p className="text-gray-700 text-lg">
            If you request a password reset, your IP address will be included in
            the reset email.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            How long we retain your data
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            If you leave a comment, the comment and its metadata are retained
            indefinitely. This is so we can recognize and approve any follow-up
            comments automatically instead of holding them in a moderation
            queue.
          </p>
          <p className="text-gray-700 text-lg">
            For users that register on our website (if any), we also store the
            personal information they provide in their user profile. All users
            can see, edit, or delete their personal information at any time
            (except they cannot change their username). Website administrators
            can also see and edit that information.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            What rights you have over your data
          </h2>
          <p className="text-gray-700 text-lg">
            If you have an account on this site or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you, including any data you have provided to us. You can also
            request that we erase any personal data we hold about you. This does
            not include any data we are obliged to keep for administrative,
            legal, or security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Where your data is sent
          </h2>
          <p className="text-gray-700 text-lg">
            Visitor comments may be checked through an automated spam detection
            service.
          </p>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
