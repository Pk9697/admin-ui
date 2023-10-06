import { setSearchText } from '../actions'

function SearchInput({ searchText, dispatch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search by name email or role"
      value={searchText}
      onChange={(e) => dispatch(setSearchText(e.target.value))}
    />
  )
}

export default SearchInput
