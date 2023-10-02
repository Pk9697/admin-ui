function SearchInput({ searchText, handleSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search by name email or role"
      value={searchText}
      onChange={handleSearch}
    />
  )
}

export default SearchInput
