'use client'
import React, { useState } from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function PersonalForm() {
    const [activePayment, setActivePayment] = useState('credit-card');

    const handlePayment = (item) => {
        setActivePayment(item);
    };

    return (
        <div className="information mt-5">
            <div className="heading5">Information</div>
            <div className="form-checkout mt-5 p-3 bg-[#f6efff]">
                <form>
                    <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="firstName" type="text" placeholder="First Name *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="lastName" type="text" placeholder="Last Name *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="email" type="email" placeholder="Email Address *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="phoneNumber" type="number" placeholder="Phone Numbers *" required />
                        </div>
                        <div className="col-span-full select-block">
                            <select className="border border-line px-4 py-3 w-full rounded-lg" id="region" name="region" defaultValue={'default'}>
                                <option value="default" disabled>Choose Country/Region</option>
                                <option value="India">India</option>
                                <option value="France">France</option>
                                <option value="Singapore">Singapore</option>
                            </select>
                            <Icon.CaretDown className='arrow-down' />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="city" type="text" placeholder="Town/City *" required />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="apartment" type="text" placeholder="Street,..." required />
                        </div>
                        <div className="select-block">
                            <select className="border border-line px-4 py-3 w-full rounded-lg" id="country" name="country" defaultValue={'default'}>
                                <option value="default" disabled>Choose State</option>
                                <option value="India">India</option>
                                <option value="France">France</option>
                                <option value="Singapore">Singapore</option>
                            </select>
                            <Icon.CaretDown className='arrow-down' />
                        </div>
                        <div className="">
                            <input className="border-line px-4 py-3 w-full rounded-lg" id="postal" type="text" placeholder="Postal Code *" required />
                        </div>
                        <div className="col-span-full">
                            <textarea className="border border-line px-4 py-3 w-full rounded-lg" id="note" name="note" placeholder="Write note..."></textarea>
                        </div>
                    </div>

                    <div className="block-button md:mt-10 mt-6">
                        <button className="button-main w-full">Payment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
