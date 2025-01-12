import React, { useState } from 'react'
import { Children } from 'react'
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout({ Children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <section>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {Children}
        </section>
    )
}
