import React, { useState, useEffect } from 'react';
import { updateProfileData } from '@/api/profileApis/updateProfile';

export default function ShippingAddress({ initialProfile }) {
    const [formData, setFormData] = useState({
        firstName: initialProfile?.firstName || '',
        lastName: initialProfile?.lastName || '',
        address_1: initialProfile?.address_1 || '',
        address_2: initialProfile?.address_2 || '',
        city: initialProfile?.city || '',
        state: initialProfile?.state || '',
        pincode: initialProfile?.pincode || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
            };
            const response = await updateProfileData(payload);
            // Add success notification/feedback here
        } catch (error) {
            console.error('Update failed:', error);
            // Add error handling here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-5">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="caption1 capitalize">
                        First Name <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="caption1 capitalize">
                        Last Name <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address Line 1 */}
                <div>
                    <label htmlFor="address_1" className="caption1 capitalize">
                        Address Line 1 <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="address_1"
                        name="address_1"
                        type="text"
                        value={formData.address_1}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address Line 2 */}
                <div>
                    <label htmlFor="address_2" className="caption1 capitalize">
                        Address Line 2 (Optional)
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="address_2"
                        name="address_2"
                        type="text"
                        value={formData.address_2}
                        onChange={handleChange}
                    />
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="caption1 capitalize">
                        City <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* State */}
                <div>
                    <label htmlFor="state" className="caption1 capitalize">
                        State <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="state" className="caption1 capitalize">
                        Country <span className="text-red"></span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="state"
                        name="state"
                        type="text"
                        value={'India'}
                        readOnly
                    />
                </div>

                {/* Pincode */}
                <div>
                    <label htmlFor="pincode" className="caption1 capitalize">
                        Pincode <span className="text-red">*</span>
                    </label>
                    <input
                        className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                        id="pincode"
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="block-button lg:mt-10 mt-6">
                <button type="submit" className="button-main bg-custom-purple-color ">
                    {initialProfile ? 'Update Address' : 'Save Address'}
                </button>
            </div>
        </form>
    );
}