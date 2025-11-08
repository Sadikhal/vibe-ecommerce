import { SearchIcon } from 'lucide-react';

export const EmptyState = ({handleClearAll}) => (
  <div className="w-full text-center py-12">
    <div className="mx-auto max-w-md">
      <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter to find what you're looking for.
      </p>
      <div className="mt-6">
        <button
          onClick={handleClearAll}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
);


export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-90vh py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-[#2a5d61] rounded-full animate-spin"></div>
    </div>
  );
};

