'use client';

import { useState } from 'react';

export default function FAQItem({ faq, index, isOpen = false }) {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="border-2 border-blue-500 rounded p-6 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-6 text-left"
      >
        <span className={`flex-shrink-0 text-4xl relative bottom-1 font-bold ${open ? 'text-blue-600' : 'text-gray-900'}`}>
          {open ? '−' : '+'}
        </span>
        <span className="flex-1 font-semibold text-gray-900 text-base">
          {faq.question}
        </span>
      </button>
      {open && (
        <div className="mt-6 ml-14 text-gray-500 text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}
