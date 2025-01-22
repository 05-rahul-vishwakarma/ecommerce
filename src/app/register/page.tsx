'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import MenuFour from '@/components/Header/MenuFour';



const Register = () => {
  return (
    <>
      {/* <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" /> */}
      <div id="header" className="relative w-full text-purple">
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading="Create An Account" subHeading="Create An Account" />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r p-5 border-line bg-[#f6efff]">
              <div className="heading4">Register</div>
              <form className="md:mt-7 mt-4">
                <div className="name mb-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="name"
                    type="text"
                    placeholder="Full Name *"
                    required
                  />
                </div>
                <div className="email">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Username or email address *"
                    required
                  />
                </div>
                <div className="pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="password"
                    type="password"
                    placeholder="Password *"
                    required
                  />
                </div>
                <div className="confirm-pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password *"
                    required
                  />
                </div>
                <div className="flex items-center mt-5">
                  <div className="block-input">
                    <input type="checkbox" name="remember" id="remember" />
                    <Icon.CheckSquare size={20} weight="fill" className="icon-checkbox" />
                  </div>
                  <label htmlFor="remember" className="pl-2 cursor-pointer text-secondary2">
                    I agree to the
                    <Link href={'#!'} className="text-black hover:underline pl-1">
                      Terms of Use
                    </Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button className="button-main" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled
                  to have you with us again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={'/login'} className="button-main">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne';
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
// import Footer from '@/components/Footer/Footer';
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import MenuFour from '@/components/Header/MenuFour';
// import axios from 'axios';

// const Register = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//   });

//   // State for errors and success messages
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Handle input changes
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       // API call
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,
//         {
//           email: formData.email,
//           password: formData.password,
//           name: formData.name,
//         }
//       );

//       if (response.status === 200) { // Assuming 201 is the success status code
//         setSuccess('Registration successful! You can now log in.');
//         setFormData({ email: '', password: '', confirmPassword: '', name: '' });
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred during registration.');
//     }
//   };

//   return (
//     <>
//       <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
//       <div id="header" className='relative w-full text-purple'>
//         <MenuFour props="bg-transparent" />
//         <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
//       </div>
//       <div className="register-block md:py-20 py-10">
//         <div className="container">
//           <div className="content-main flex gap-y-8 max-md:flex-col">
//             <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r p-5 border-line bg-[#f6efff]">
//               <div className="heading4">Register</div>
//               <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
//                 {/* Name Input */}
//                 <div className="name mb-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="name"
//                     type="text"
//                     placeholder="Full Name *"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Email Input */}
//                 <div className="email mb-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="email"
//                     type="email"
//                     placeholder="Email Address *"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Password Input */}
//                 <div className="password mb-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="password"
//                     type="password"
//                     placeholder="Password *"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Confirm Password Input */}
//                 <div className="confirm-password mb-5">
//                   <input
//                     className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//                     id="confirmPassword"
//                     type="password"
//                     placeholder="Confirm Password *"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 {/* Terms and Conditions */}
//                 <div className='flex items-center mb-5'>
//                   <input
//                     type="checkbox"
//                     id='terms'
//                     required
//                   />
//                   <label htmlFor='terms' className="pl-2 cursor-pointer text-secondary2">
//                     I agree to the
//                     <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of Use</Link>
//                   </label>
//                 </div>
//                 {/* Error or Success Messages */}
                // {error && <p className="text-red-500 mb-3">{error}</p>}
                // {success && <p className="text-green-500 mb-3">{success}</p>}
                {/* Submit Button */}
//                 <div className="block-button">
//                   <button type="submit" className="button-main">Register</button>
//                 </div>
//               </form>
//             </div>
//             <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//               <div className="text-content">
//                 <div className="heading4">Already have an account?</div>
//                 <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more.</div>
//                 <div className="block-button md:mt-7 mt-4">
//                   <Link href={'/login'} className="button-main">Login</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Register;
