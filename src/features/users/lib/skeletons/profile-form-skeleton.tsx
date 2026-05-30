export default function ProfileFormSkeleton() {
  return (
    <div className="bg-white p-6 animate-pulse">
      {/* ===== First Row (1 columns on mobile, 2 columns on tablet and above) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <div className="h-5 w-24 bg-gray-200 rounded" /> {/* label */}
          <div className="h-12 w-full bg-gray-200 rounded-none" />{" "}
          {/* input h-12 */}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-12 w-full bg-gray-200 rounded-none" />
        </div>
      </div>

      {/* ===== Second Group ===== */}
      <div className="mt-4 space-y-4">
        {/* Username (disabled input style) */}
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-200 rounded" />
          <div className="h-12 w-full bg-gray-200 rounded-none" />
        </div>

        {/* Email with action button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-12 w-full bg-gray-200 rounded-none" />
        </div>

        {/* Phone Input (react-phone-input-2 is taller + has flag button) */}
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-200 rounded" />

          <div className="flex">
            {/* country flag box */}
            <div className="h-12 w-14 bg-gray-200 rounded-none border-r border-gray-300" />
            {/* input */}
            <div className="h-12 w-full bg-gray-200 rounded-none" />
          </div>
        </div>
      </div>

      {/* ===== Submit Button ===== */}
      <div className="mt-10">
        <div className="h-12 w-full bg-gray-300 rounded-none" />
      </div>
    </div>
  );
}
