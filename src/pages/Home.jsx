import UsersList from '../components/UsersList'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import DeleteSelectedButton from '../components/DeleteSelectedButton'
import useCustomHook from '../customHooks/useCustomHook'

function Home() {
  const [state, dispatch] = useCustomHook()

  const {
    selectAll,
    searchText,
    currentPage,
    filteredUsers,
    records,
    cntChecked,
    recordsPerPage,
  } = state

  return (
    <div className="users-container">
      <SearchInput searchText={searchText} dispatch={dispatch} />

      <DeleteSelectedButton
        cntChecked={cntChecked}
        selectAll={selectAll}
        dispatch={dispatch}
      />

      <UsersList users={records} dispatch={dispatch} selectAll={selectAll} />

      <Pagination
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        users={filteredUsers}
        dispatch={dispatch}
      />
    </div>
  )
}

export default Home
