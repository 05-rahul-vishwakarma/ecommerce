"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        toast.success('message sent successfully')

        try {
            // const response = await axios.post(`api calling `, data);
            toast.success('message sent successfully')
        } catch (error) {
            console.log(error);
        }
        reset(); // Reset the form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                {/* Name Field */}
                <div className="name">
                    <input
                        className={`border-line hover:border-purple px-4 py-3 w-full rounded-lg ${errors.username ? "border-red-500" : ""
                            }`}
                        id="username"
                        type="text"
                        placeholder="Your Name *"
                        {...register("username", { required: "Name is required" })}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="email">
                    <input
                        className={`border-line hover:border-purple px-4 py-3 w-full rounded-lg ${errors.email ? "border-red-500" : ""
                            }`}
                        id="email"
                        type="email"
                        placeholder="Your Email *"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Message Field */}
                <div className="message sm:col-span-2">
                    <textarea
                        className={`border-line hover:border-purple px-4 py-3 w-full rounded-lg ${errors.message ? "border-red-500" : ""
                            }`}
                        id="message"
                        rows={3}
                        placeholder="Your Message *"
                        {...register("message", { required: "Message is required" })}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="block-button md:mt-6 mt-4">
                <button
                    type="submit"
                    className="button-main px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-700"
                >
                    Send Message
                </button>
            </div>
        </form>
    );
}
