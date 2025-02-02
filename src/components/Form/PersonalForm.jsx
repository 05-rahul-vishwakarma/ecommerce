'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Icon from "@phosphor-icons/react/dist/ssr";
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

    return (
        <div className="information mt-5">
            <div className="heading5">Information</div>
            <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
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
                        <button type="submit" className="button-main w-full">
                            Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}