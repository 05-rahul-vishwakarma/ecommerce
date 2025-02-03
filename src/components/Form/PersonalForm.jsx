"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { updateProfile, getAuthHeaders } from "@/api/baseApi";

export default function PersonalForm() {
  const [message, setMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      address_1: data.apartment,
      state: data.state,
      pincode: data.postal,
    };

    try {
      const response = await fetch(updateProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.message || "Failed to update profile");
    }
  };

  return (
    <div className="information mt-5">
      <div className="heading5">Information</div>
      <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-4 gap-y-5">
            {/* First Name */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="text"
                placeholder="First Name *"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="text"
                placeholder="Last Name *"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="email"
                placeholder="Email Address *"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="number"
                placeholder="Phone Number *"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Must be at least 10 digits",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Country/Region */}
            <div className="col-span-full select-block">
              <Controller
                name="state"
                control={control}
                defaultValue=""
                rules={{ required: "Country/Region is required" }}
                render={({ field }) => (
                  <select
                    className="border px-4 py-3 w-full rounded-lg"
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
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="text"
                placeholder="Town/City *"
                {...register("city", { required: "Town/City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="text"
                placeholder="Street, Apartment, etc."
                {...register("apartment", {
                  required: "Street Address is required",
                })}
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm">
                  {errors.apartment.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <input
                className="border-line px-4 py-3 w-full rounded-lg"
                type="text"
                placeholder="Postal Code *"
                {...register("postal", { required: "Postal Code is required" })}
              />
              {errors.postal && (
                <p className="text-red-500 text-sm">{errors.postal.message}</p>
              )}
            </div>

            {/* Note */}
            <div className="col-span-full">
              <textarea
                className="border px-4 py-3 w-full rounded-lg"
                placeholder="Write a note..."
                {...register("note")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="block-button mt-6">
            <button type="submit" className="button-main w-full">
              Submit
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <p className="text-green-500 text-center mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
