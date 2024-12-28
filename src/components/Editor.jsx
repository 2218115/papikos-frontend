import Quill from 'quill';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import '../../node_modules/quill/dist/quill.snow.css';

// Editor is an uncontrolled React component
const Editor = forwardRef(
    ({ readOnly, defaultValue, onTextChange, onSelectionChange, label, errorHint, isError }, ref) => {
        const containerRef = useRef(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            ref.current?.enable(!readOnly);
        }, [ref, readOnly]);

        useEffect(() => {
            const container = containerRef.current;
            const editorContainer = container.appendChild(
                container.ownerDocument.createElement('div'),
            );
            const quill = new Quill(editorContainer, {
                theme: 'snow',
            });

            ref.current = quill;

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.TEXT_CHANGE, (...args) => {
                onTextChangeRef.current?.(...args);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                ref.current = null;
                container.innerHTML = '';
            };
        }, [ref]);

        return <div className='w-full mb-4'>
            {label && <label className="text-sm mb-2 text-gray-500">{label}</label>}
            <div ref={containerRef} ></div>
            {isError && errorHint && (
                <span className="text-xs text-red-500 mt-1">{errorHint}</span>
            )}
        </div>;
    },
);

Editor.displayName = 'Editor';

export default Editor;