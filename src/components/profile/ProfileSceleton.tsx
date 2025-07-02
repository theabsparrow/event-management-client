"use client";

const ProfileSectionSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden animate-pulse">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          {/* Image placeholder */}
          <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700" />

          <div className="flex flex-col gap-4 text-center sm:text-left w-full">
            {/* Name skeleton */}
            <div className="w-44 h-8 bg-gray-300 dark:bg-gray-700 rounded-md" />

            {/* Email skeleton */}
            <div className="w-52 h-6 bg-gray-300 dark:bg-gray-700 rounded-md" />

            {/* Role badge skeleton */}
            <div className="w-24 h-6 mt-2 bg-gray-400 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionSkeleton;
