// styles.ts
export const searchContainer = 'space-y-4 px-2 sm:px-4 md:px-6'
export const searchHeader = 'bg-white shadow-sm rounded-lg p-3 sm:p-4 space-y-3'
export const searchInputContainer = 'flex flex-col sm:flex-row gap-3'
export const searchInputWrapper = 'flex-1 relative'
export const searchIcon =
  'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
export const searchInput =
  'block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
export const resultsGrid =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4'
export const resultCard =
  'bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-row sm:flex-col'
export const resultImageContainer = 'w-24 sm:w-full aspect-square relative'
export const resultImage = 'absolute inset-0 w-full h-full object-cover'
export const resultCardContent = 'flex-1 p-2 min-w-0' // Added min-w-0 to prevent text overflow
export const resultTitle = 'text-sm font-semibold text-gray-900 truncate'
export const resultDescription = 'text-xs text-gray-500 truncate'

// Filter styles
export const filterButton =
  'w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
export const filterPanel =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 p-3 bg-gray-50 rounded-md'
export const filterSection = 'space-y-1'
export const filterLabel = 'block text-sm font-medium text-gray-700'
export const filterSelect =
  'mt-1 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md'
export const activeFilters = 'flex flex-wrap gap-2 mt-3'
export const filterTag =
  'inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm bg-indigo-100 text-indigo-700'
