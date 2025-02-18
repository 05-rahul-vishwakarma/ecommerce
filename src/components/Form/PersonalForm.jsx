"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { updateProfile, getAuthHeaders, getProfile } from "@/api/baseApi";
import { updateProfileData } from "@/api/profileApis/updateProfile";
import { useRouter } from "next/navigation";

export default function PersonalForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(getProfile, {
          headers: getAuthHeaders(),
        });
        if (response.data.statusCode === 200) {
          const profile = response.data.data;
          setValue("firstName", profile.firstName);
          setValue("lastName", profile.lastName);
          setValue("city", profile.city);
          setValue("apartment", profile.address_1);
          setValue("state", profile.state);
          setValue("postal", profile.pincode);
          setValue("phoneNumber", profile.phoneNo);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    }
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      address_1: data.apartment,
      state: data.state,
      pincode: data.postal,
    };

    console.log('yes working');

    const response = await updateProfileData(payload);
    console.log(response);


    // try {
    //   const response = await fetch(updateProfile, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       ...getAuthHeaders(),
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "Failed to update profile");
    //   }

    //   setMessage("Profile updated successfully");
    // } catch (error) {
    //   setMessage(error.message || "Failed to update profile");
    // }
  };

  const router = useRouter();

  return (
    <div className="information mt-5">
      <div className="heading5">Information</div>
      <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
        <form>
          <div className="grid sm:grid-cols-2 gap-4 gap-y-5">
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="First Name *" {...register("firstName", { required: "First Name is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="Last Name *" {...register("lastName", { required: "Last Name is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="Town/City *" {...register("city", { required: "City is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="Street, Apartment, etc." {...register("apartment", { required: "Address is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="State *" {...register("state", { required: "State is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="Postal Code *" {...register("postal", { required: "Postal Code is required" })} />
            <input className="border-line px-4 py-3 w-full rounded-lg" type="text" placeholder="Phone Number *" {...register("phoneNumber", { required: "Phone Number is required" })} />
          </div>
          <div onClick={() => Router.push('/my-account')} className="button-block mt-5">
            <p className="button-main w-full text-center text-white">
              Update
            </p>
          </div>
          {message && <p className="text-green-500 text-center mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
