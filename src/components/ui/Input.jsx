import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={[
        'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-amber-300',
        className,
      ].join(' ')}
      {...props}
    />
  );
}
