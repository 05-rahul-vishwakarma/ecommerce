'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Icon from "@phosphor-icons/react/dist/ssr";

import { updateProfile, getAuthHeaders } from '@/api/baseApi';

export default function PersonalForm() {
    const [activePayment, setActivePayment] = useState('credit-card');
    const [message, setMessage] = useState("")

import axios from 'axios';

export default function PersonalForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
 

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`https://ecommerce-backend-8utt.onrender.com/api/v1/user/profile`)
            console.log(response);

        } catch (error) {
            console.log(error?.message);
        }
        console.log('Form Data:', data); // Handle form submission
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
  
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            city: data.city,
            address_1: data.apartment,
            state: data.country,
            pincode: data.postal
          };
    
        try {
          const response = await fetch(updateProfile, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
            body: JSON.stringify(payload),
          })
    
          if (!response.ok) {
            console.log(response)
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to update profile")
          }
    
          const result = await response.json()
          setMessage("Profile updated successfully")
        } catch (error) {
          console.error("Error updating profile:", error)
          setMessage(error.message || "Failed to update profile")
        }
      }

    return (
        <div className="information mt-5">
            <div className="heading5">Information</div>
            <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
                <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="firstName" name="firstName" type="text" placeholder="First Name *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="lastName" name="lastName" type="text" placeholder="Last Name *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="email" name="email" type="email" placeholder="Email Address *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="phoneNumber" name="phoneNumber" type="number" placeholder="Phone Number *" required />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                        {/* First Name */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="firstName"
                                type="text"
                                placeholder="First Name *"
                                {...register('firstName', { required: 'First Name is required' })}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="lastName"
                                type="text"
                                placeholder="Last Name *"
                                {...register('lastName', { required: 'Last Name is required' })}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="email"
                                type="email"
                                placeholder="Email Address *"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="phoneNumber"
                                type="number"
                                placeholder="Phone Numbers *"
                                {...register('phoneNumber', {
                                    required: 'Phone Number is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Phone Number must be at least 10 digits',
                                    },
                                })}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                            )}

                        </div>

                        {/* Country/Region */}
                        <div className="col-span-full select-block">
                            <Controller
                                name="region"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Country/Region is required' }}
                                render={({ field }) => (
                                    <select
                                        className="border border-line px-4 py-3 w-full rounded-lg"
                                        id="region"
                                        {...field}
                                    >
                                        <option value="" disabled>
                                            Choose Country/Region
                                        </option>
                                        <option value="India">India</option>
                                        <option value="France">France</option>
                                        <option value="Singapore">Singapore</option>
                                    </select>
                                )}
                            />
                            <Icon.CaretDown className="arrow-down" />
                            {errors.region && (
                                <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
                            )}
                        </div>
 
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="city" name="city" type="text" placeholder="Town/City *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="apartment" name="apartment" type="text" placeholder="Street,..." required />


                        {/* Town/City */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="city"
                                type="text"
                                placeholder="Town/City *"
                                {...register('city', { required: 'Town/City is required' })}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>

                        {/* Street Address */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="apartment"
                                type="text"
                                placeholder="Street,..."
                                {...register('apartment', { required: 'Street Address is required' })}
                            />
                            {errors.apartment && (
                                <p className="text-red-500 text-sm mt-1">{errors.apartment.message}</p>
                            )}
 
                        </div>

                        {/* State */}
                        <div className="select-block">
                            <Controller
                                name="state"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'State is required' }}
                                render={({ field }) => (
                                    <select
                                        className="border border-line px-4 py-3 w-full rounded-lg"
                                        id="state"
                                        {...field}
                                    >
                                        <option value="" disabled>
                                            Choose State
                                        </option>
                                        <option value="India">India</option>
                                        <option value="France">France</option>
                                        <option value="Singapore">Singapore</option>
                                    </select>
                                )}
                            />
                            <Icon.CaretDown className="arrow-down" />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                            )}
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="postal" name="postal" type="text" placeholder="Postal Code *" required />


                        {/* Postal Code */}
                        <div>
                            <input
                                className="border-line px-4 py-3 w-full rounded-lg"
                                id="postal"
                                type="text"
                                placeholder="Postal Code *"
                                {...register('postal', { required: 'Postal Code is required' })}
                            />
                            {errors.postal && (
                                <p className="text-red-500 text-sm mt-1">{errors.postal.message}</p>
                            )}
 
                        </div>

                        {/* Note */}
                        <div className="col-span-full">
                            <textarea
                                className="border border-line px-4 py-3 w-full rounded-lg"
                                id="note"
                                placeholder="Write note..."
                                {...register('note')}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="block-button md:mt-10 mt-6">
 
                        <button type='submit' className="button-main w-full">Payment</button>
                    </div>
                    {message && (
                    <div className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                        <button type="submit" className="button-main w-full">
                            Payment
                        </button>
 
                    </div>
                    )}
                </form>
            </div>
        </div>
 
    )
}

// For PROFILE PAGE
// 'use client'
// import React, { useState } from 'react'
// import * as Icon from "@phosphor-icons/react/dist/ssr";

// import { updateProfile, getAuthHeaders } from '@/api/baseApi'; 
// export default function PersonalForm() {
//     const [activePayment, setActivePayment] = useState("credit-card")
//     const [message, setMessage] = useState("")
  
//     const handlePayment = (item) => {
//       setActivePayment(item)
//     }
  
//     const handleSubmit = async (e) => {
//       e.preventDefault()
//       const formData = new FormData(e.target)
//       const data = Object.fromEntries(formData)

//       const payload = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         gender: data.gender,
//         dob: data.dob,
//         address_1: data.address_1,
//         address_2: data.address_2,
//         city: data.city,
//         state: data.state,
//         pincode: data.pincode
//       };
  
//       try {
//         const response = await fetch(updateProfile, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             ...getAuthHeaders(),
//           },
//           body: JSON.stringify(payload),
//         })
  
//         if (!response.ok) {
//           console.log(response)
//           const errorData = await response.json()
//           throw new Error(errorData.message || "Failed to update profile")
//         }
  
//         const result = await response.json()
//         setMessage("Profile updated successfully")
//       } catch (error) {
//         console.error("Error updating profile:", error)
//         setMessage(error.message || "Failed to update profile")
//       }
//     }
  
//     return (
//       <div className="information mt-5">
//         <div className="heading5">Information</div>
//         <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
//           <form onSubmit={handleSubmit}>
//             <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   placeholder="Last Name"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="gender"
//                   name="gender"// For PROFILE PAGE
// 'use client'
// import React, { useState } from 'react'
// import * as Icon from "@phosphor-icons/react/dist/ssr";

// import { updateProfile, getAuthHeaders } from '@/api/baseApi'; 
// export default function PersonalForm() {
//     const [activePayment, setActivePayment] = useState("credit-card")
//     const [message, setMessage] = useState("")
  
//     const handlePayment = (item) => {
//       setActivePayment(item)
//     }
  
//     const handleSubmit = async (e) => {
//       e.preventDefault()
//       const formData = new FormData(e.target)
//       const data = Object.fromEntries(formData)

//       const payload = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         gender: data.gender,
//         dob: data.dob,
//         address_1: data.address_1,
//         address_2: data.address_2,
//         city: data.city,
//         state: data.state,
//         pincode: data.pincode
//       };
  
//       try {
//         const response = await fetch(updateProfile, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             ...getAuthHeaders(),
//           },
//           body: JSON.stringify(payload),
//         })
  
//         if (!response.ok) {
//           console.log(response)
//           const errorData = await response.json()
//           throw new Error(errorData.message || "Failed to update profile")
//         }
  
//         const result = await response.json()
//         setMessage("Profile updated successfully")
//       } catch (error) {
//         console.error("Error updating profile:", error)
//         setMessage(error.message || "Failed to update profile")
//       }
//     }
  
//     return (
//       <div className="information mt-5">
//         <div className="heading5">Information</div>
//         <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
//           <form onSubmit={handleSubmit}>
//             <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   placeholder="Last Name"
//                   required
//                 />
//               </div>
//               <div className="">

//                   type="text"
//                   placeholder="Gender"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="dob"
//                   name="dob"
//                   type="date"
//                   placeholder="Date of Birth"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Email Address"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   type="number"
//                   placeholder="Phone Number"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="address_1"
//                   name="address_1"
//                   type="text"
//                   placeholder="Address 1"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="address_2"
//                   name="address_2"
//                   type="text"
//                   placeholder="Address 2"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="city"
//                   name="city"
//                   type="text"
//                   placeholder="City"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="state"
//                   name="state"
//                   type="text"
//                   placeholder="State"
//                 />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="pincode"
//                   name="pincode"
//                   type="text"
//                   placeholder="Pincode"
//                 />
//               </div>
//               <div className="col-span-full select-block">
//                 <select
//                   className="border border-line px-4 py-3 w-full rounded-lg"
//                   id="region"
//                   name="region"
//                   defaultValue={"default"}
//                 >
//                   <option value="default" disabled>
//                     Choose Country/Region
//                   </option>
//                   <option value="India">India</option>
//                   <option value="France">France</option>
//                   <option value="Singapore">Singapore</option>
//                 </select>
//                 <Icon.CaretDown className="arrow-down" />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="apartment"
//                   name="apartment"
//                   type="text"
//                   placeholder="Street..."
//                   required
//                 />
//               </div>
//               <div className="select-block">
//                 <select
//                   className="border border-line px-4 py-3 w-full rounded-lg"
//                   id="country"
//                   name="country"
//                   defaultValue={"default"}
//                 >
//                   <option value="default" disabled>
//                     Choose State
//                   </option>
//                   <option value="India">India</option>
//                   <option value="France">France</option>
//                   <option value="Singapore">Singapore</option>
//                 </select>
//                 <Icon.CaretDown className="arrow-down" />
//               </div>
//               <div className="">
//                 <input
//                   className="border-line px-4 py-3 w-full rounded-lg"
//                   id="postal"
//                   name="postal"
//                   type="text"
//                   placeholder="Postal Code"
//                   required
//                 />
//               </div>
//               <div className="col-span-full">
//                 <textarea
//                   className="border border-line px-4 py-3 w-full rounded-lg"
//                   id="note"
//                   name="note"
//                   placeholder="Write note..."
//                 ></textarea>
//               </div>
//             </div>
  
//             <div className="block-button md:mt-10 mt-6">
//               <button type="submit" className="button-main w-full">
//                 Update Profile
//               </button>
//             </div>
  
//             {message && (
//               <div className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
//                 {message}
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     )
//   }

    );
}
