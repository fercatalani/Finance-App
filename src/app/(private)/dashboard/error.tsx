"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-4">
      <p className="mb-4">Something went wrong loading the dashboard.</p>
      <button className="primaryButton" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
