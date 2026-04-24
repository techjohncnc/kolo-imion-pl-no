import React from 'react';

const variantClasses = {
  default: 'bg-white text-slate-950 hover:bg-slate-100',
  secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
  amber: 'bg-amber-500 text-black hover:bg-amber-400',
};

export function Button({ className = '', variant = 'default', disabled = false, ...props }) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant] || variantClasses.default,
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    />
  );
}
