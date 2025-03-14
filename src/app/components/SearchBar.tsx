'use client';

interface SearchBarProps {
  search: string;
  sortAsc: boolean;
  sortBy: 'text' | 'rating';
  onSearchChange: (value: string) => void;
  onSortToggle: () => void;
  onSortByChange: (value: 'text' | 'rating') => void;
}

const SearchBar = ({ search, sortAsc, sortBy, onSearchChange, onSortToggle, onSortByChange }: SearchBarProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search jokes..."
        className="py-1 px-2 rounded-md border border-gray-500"
      />
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as 'text' | 'rating')}
        className="py-1 px-2 rounded-md border border-gray-500 cursor-pointer"
      >
        <option value="text">Sorting by Text</option>
        <option value="rating">Sorting by Rating</option>
      </select>
      <button
        onClick={onSortToggle}
        className="px-2 py-1 bg-gray-500 text-white cursor-pointer rounded"
      >
        {sortAsc ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
};

export default SearchBar; 