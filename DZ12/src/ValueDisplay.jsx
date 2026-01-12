import { useEffect, useRef } from "react";

export default function ValueDisplay({ value }) {
  const prevValueRef = useRef("");

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className="box">
      <p>
        <strong>Current value:</strong> {value || "(empty)"}
      </p>
      <p>
        <strong>Previous value:</strong> {prevValueRef.current || "(empty)"}
      </p>
    </div>
  );
}