import React from 'react';

export default function DeliveryStatus({ value, onChange }) {

  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <select value={value} onChange={handleChange}>
      <option>PENDING</option>
      <option>ORDERED</option>
      <option>SHIPPED</option>
      <option>CANCELLED</option>
    </select>
  );
}
