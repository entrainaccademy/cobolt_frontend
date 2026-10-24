import React from 'react';

export default function ProductLoadingSkeleton() {
  return (
    <div className="pt-28 pb-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-12 bg-slate-200/80 rounded animate-pulse" />
            <div className="h-3 w-3 bg-slate-200/80 rounded-full animate-pulse" />
            <div className="h-3.5 w-24 bg-slate-200/80 rounded animate-pulse" />
            <div className="h-3 w-3 bg-slate-200/80 rounded-full animate-pulse" />
            <div className="h-3.5 w-32 bg-slate-200/80 rounded animate-pulse" />
          </div>
          <div className="h-3.5 w-28 bg-slate-200/80 rounded animate-pulse hidden sm:block" />
        </div>

        {/* Product Details Grid */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          
          {/* Left Column: Product Photo Box */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-6">
              <div className="w-48 h-48 rounded-2xl bg-slate-200/60 animate-pulse" />
            </div>
          </div>

          {/* Right Column: Spec & Details Skeleton */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="h-3.5 w-36 bg-red-100 rounded animate-pulse" />
            <div className="h-8 w-4/5 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-28 bg-slate-100 rounded-full animate-pulse" />

            <div className="space-y-2 pt-2">
              <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-3.5 w-11/12 bg-slate-100 rounded animate-pulse" />
              <div className="h-3.5 w-4/5 bg-slate-100 rounded animate-pulse" />
            </div>

            {/* Specifications Box Skeleton */}
            <div className="pt-4 space-y-2">
              <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />
              <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-3 bg-slate-50/60">
                    <div className="h-3.5 w-28 bg-slate-200/60 rounded animate-pulse" />
                    <div className="h-3.5 w-36 bg-slate-200/60 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button Skeleton */}
            <div className="pt-3">
              <div className="h-12 w-full sm:w-[450px] bg-red-500/10 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16 pt-10 border-t border-gray-100 text-left">
          <div className="h-5 w-36 bg-slate-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 bg-white">
                <div className="h-40 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-slate-200/50 rounded-lg animate-pulse" />
                </div>
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse mb-2" />
                <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
