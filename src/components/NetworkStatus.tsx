"use client";

import { useState, useEffect } from "react";

interface NetworkStatusProps {
    message?: string;
}

export default function NetworkStatus({ message }: NetworkStatusProps = {}) {
    const [isOffline, setIsOffline] = useState(true); // Assume offline initially
    const defaultMessage = "⚠️ Your network is slow or disconnected. Please check your connection.";

    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        // Set initial online status after component mounts
        if (typeof navigator !== 'undefined') {
            setIsOffline(!navigator.onLine);
        }

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    if (!isOffline) return null; // Hide if online

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg text-sm animate-fadeIn">
            {message || defaultMessage}
        </div>
    );
}