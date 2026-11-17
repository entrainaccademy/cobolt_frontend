import React from 'react';

export default function CategoryLoadingSkeleton() {
  return (
    <div className="w-full flex-grow flex flex-col bg-[#F8FAFC]">
      {/* Category Hero / Header Skeleton */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-14 bg-[#F8FAFC] border-b border-[#E5E7EB]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2 text-xs mb-2">
            <div className="h-3 w-10 bg-slate-200 rounded animate-pulse" />
            <div className="h-2.5 w-2.5 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Category Products Grid Skeleton */}
      <section className="py-10 sm:py-14 bg-[#F8FAFC] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header Skeleton */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 text-left">
            <div>
              <div className="h-6 sm:h-7 w-56 sm:w-72 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-3.5 w-36 bg-slate-100 rounded mt-2 animate-pulse" />
            </div>
            <div className="h-4 w-28 bg-slate-200 rounded animate-pulse hidden sm:block" />
          </div>

          {/* 8 Product Cards Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 flex flex-col justify-between"
              >
                <div>
                  {/* Image Placeholder */}
                  <div className="h-44 sm:h-52 bg-slate-50 rounded-2xl flex items-center justify-center p-4 mb-3 border border-slate-50">
                    <div className="w-28 h-28 bg-slate-200/50 rounded-xl animate-pulse" />
                  </div>

                  {/* Title Skeleton */}
                  <div className="space-y-2 px-1">
                    <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>

                {/* Bottom line */}
                <div className="pt-4 px-1">
                  <div className="h-3 w-20 bg-red-100/70 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
