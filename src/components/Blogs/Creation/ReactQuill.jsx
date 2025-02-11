"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Editor({ setContent, content }) {
    return (
        <div>
            <JoditEditor
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                config={{
                    readonly: false,
                    height: 400,
                    placeholder: "Start writing...",
                    toolbarSticky: true,
                    theme: "dark"
                }}
            />
            <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-900">
                <h3 className="text-lg font-bold mb-2">Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} className="prose dark:prose-invert"></div>
            </div>
        </div>
    );
}
