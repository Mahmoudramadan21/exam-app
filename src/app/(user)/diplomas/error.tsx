"use client";

export default function ErrorBoundary({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <div>Something went wrong: {error.message}</div>;
}
