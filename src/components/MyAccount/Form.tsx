"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react";
import axios from "axios";

interface Profile {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  phoneNo?: string;
}

interface PersonalFormProps {
  profile: Profile | null;
}

export default function PersonalForm({ profile }: PersonalFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phoneNumber: profile?.phoneNo || "",
      gender: profile?.gender || "MALE",
      dob: profile?.dob ? profile.dob.slice(0, 10) : "", // for date input (YYYY-MM-DD)
    },
  });

  // Reset the form when profile changes.
  useEffect(() => {
    reset({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phoneNumber: profile?.phoneNo || "",
      gender: profile?.gender || "MALE",
      dob: profile?.dob ? profile.dob.slice(0, 10) : "",
    });
  }, [profile, reset]);

  const onSubmit = (data: any) => {
    // Update profile logic (e.g., axios.put(...))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="heading5 pb-4">Information</div>

      <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
        {/* First Name */}
        <div className="first-name">
          <label htmlFor="firstName" className="caption1 capitalize">
            First Name <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="firstName"
            placeholder="First name"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="last-name">
          <label htmlFor="lastName" className="caption1 capitalize">
            Last Name <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="lastName"
            placeholder="Last name"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="phone-number">
          <label htmlFor="phoneNumber" className="caption1 capitalize">
            Phone Number <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="phoneNumber"
            placeholder="Phone number"
            {...register("phoneNumber", { required: "Phone number is required" })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="gender">
          <label htmlFor="gender" className="caption1 capitalize">
            Gender <span className="text-red">*</span>
          </label>
          <div className="select-block mt-2 relative">
            <select
              className="border border-line px-4 py-3 w-full rounded-lg"
              id="gender"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="Other">Other</option>
            </select>
            <Icon.CaretDown className="arrow-down text-lg absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="birth">
          <label htmlFor="dob" className="caption1">
            Day of Birth <span className="text-red">*</span>
          </label>
          <input
            className="border-line mt-2 px-4 py-3 w-full rounded-lg"
            id="dob"
            type="date"
            placeholder="Day of Birth"
            {...register("dob", { required: "Date of birth is required" })}
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>
      </div>

      <div className="flex space-x-4 space-y-4 mt-5">
        {/* <Button type="submit" className="flex-1/2 bg-purple text-white shadow-lg">
          Save Changes
        </Button> */}
      </div>
    </form>
  );
}
