import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import useBlogStore from '../store/useBlogStore';

const Editor = ({ placeholder }) => {
    const editor = useRef(null);
    const { content, setContent } = useBlogStore();

    const config = useMemo(() => ({
        readonly: false, 
        readonly: false, 
        height: 400, 
        placeholder: placeholder || 'Start typing...'
    }),
        [placeholder]
    );

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} 
            onBlur={newContent => setContent(newContent)} 
            onChange={newContent => { }}
        />
    );
};

export default Editor;