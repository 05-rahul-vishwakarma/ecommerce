'use client';

import React from 'react';
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import MenuFour from '@/components/Header/MenuFour';
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      {/* Top navigation and breadcrumb */}
      <TopNavOne
        props="style-one bg-gray-100 border-b border-gray-300"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full text-purple-900">
        <MenuFour props="bg-white shadow-md" />
        <Breadcrumb heading="About Us" subHeading="Learn More About Us" />
      </div>

      {/* About Us Section */}
      <div className="about bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-10">
          {/* Introduction Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">
              Welcome to The Ribbon Pack
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ribbons need no introduction. Over the years, they have transformed countless creative
              projects, from crafting elegant decorations to adding the perfect finishing touch to gifts.
              Our ribbons bring charm and sophistication to every occasion, inspiring your imagination and
              elevating your creations.
            </p>
          </div>

          {/* Company Profile Section */}
          <div className="company-profile bg-white shadow-md rounded-xl py-12 px-6 md:px-10 mb-16">
            <h2 className="text-3xl font-semibold text-purple-800 text-center mb-6">
              Company Profile
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              The Ribbon Pack is a prestigious organization that provides customized foil or leaf-printed
              ribbons, as well as a wide range of gifting and decorative products like woven-edge satin
              ribbons, organza, gross grain ribbons, and birthday sashes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Founded in 2021 in Delhi, India, we proudly serve bakeries and businesses across the city,
                delivering high-quality products and exceptional service. Our team works tirelessly to
                ensure satisfaction.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We stand out with guaranteed quality, aesthetic appeal, and a commitment to precision using
                modern technology. Our transparent business practices set benchmarks in the industry.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="services bg-gray-100 shadow-md rounded-xl py-12 px-6 md:px-10 mb-16">
            <h3 className="text-3xl font-semibold text-purple-800 text-center mb-6">
              Our Services
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-3">
              <li>Over 100+ ribbon colors and shades available.</li>
              <li>Special color development for custom requirements.</li>
              <li>Widths ranging from 6mm to 100mm.</li>
              <li>Foil printing on ribbons at nominal costs.</li>
              <li>Custom messages and designs for personalized ribbons.</li>
            </ul>
          </div>

          {/* Image Gallery */}
          <div className="gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Image
              src={'/images/other/storelistoffice1.jpg'}
              width={2000}
              height={3000}
              alt="Office Image 1"
              className="w-full rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={'/images/other/storelistoffice2.jpg'}
              width={2000}
              height={3000}
              alt="Office Image 2"
              className="w-full rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={'/images/other/storelistoffice3.jpg'}
              width={2000}
              height={3000}
              alt="Office Image 3"
              className="w-full rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href={'/pages/contact'}
              className="inline-block bg-purple text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-purple-700 transition-colors duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
