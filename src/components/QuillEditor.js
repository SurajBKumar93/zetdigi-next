'use client';

import { useEffect, useRef, useState } from 'react';

export default function QuillEditor({ value, onChange, className, style }) {
  const [mounted, setMounted] = useState(false);
  const [Quill, setQuill] = useState(null);
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Dynamically import Quill (using react-quill-new for React 19 compatibility)
    import('react-quill-new').then((mod) => {
      setQuill(() => mod.default);
    });

    return () => {
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Dynamically import the CSS
    if (mounted) {
      import('react-quill-new/dist/quill.snow.css');
    }
  }, [mounted]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'blockquote', 'code-block'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'indent',
    'link',
    'blockquote',
    'code-block',
    'align'
  ];

  if (!mounted || !Quill) {
    return (
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50" style={style}>
        <div className="text-gray-500 text-sm">Loading editor...</div>
      </div>
    );
  }

  return (
    <Quill
      ref={editorRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className={className}
      style={style}
    />
  );
}
