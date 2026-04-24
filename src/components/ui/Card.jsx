import React from 'react';

export function Card({ className = '', ...props }) {
  return <div className={['rounded-2xl shadow-xl', className].join(' ')} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={className} {...props} />;
}
