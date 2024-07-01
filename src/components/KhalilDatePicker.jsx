import { useState } from "react";

export function KhalilDatePicker({ value, onChange }) {
  // const [date, setDate] = useState(value ? value : Date.now());

  return (
    <input
      type="date"
      value={value}
      style={{
        border: '1px solid black',
        borderRadius: '4px',
        padding: '8px'
      }}
      onChange={onChange}
    />
  );
}