'use client';

interface SearchBarProps {
  search: string;
  sortAsc: boolean;
  onSearchChange: (value: string) => void;
  onSortToggle: () => void;
}

const SearchBar = ({ search, sortAsc, onSearchChange, onSortToggle }: SearchBarProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search jokes..."
        className="py-1 px-2 rounded-md border border-gray-500"
      />
      <button
        onClick={onSortToggle}
        className="px-2 py-1 bg-gray-500 text-white cursor-pointer rounded"
      >
        {sortAsc ? 'Sort Descending' : 'Sort Ascending'}
      </button>
    </div>
  );
};

export default SearchBar; 