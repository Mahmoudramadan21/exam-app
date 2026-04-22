function ExamListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-gray-100 p-4 flex gap-4 animate-pulse">
          {/* Image */}
          <div className="w-22 h-22 bg-gray-200 rounded shrink-0" />

          {/* Content */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />

            <div className="h-8 w-20 bg-gray-200 rounded mt-auto self-end" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExamListSkeleton;
