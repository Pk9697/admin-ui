import { useEffect, useMemo, useReducer } from 'react'
import UsersList from '../components/UsersList'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import DeleteSelectedButton from '../components/DeleteSelectedButton'
import {
  TOGGLE_SELECT_ALL,
  SET_SEARCH_TEXT,
  SET_USERS,
  SET_CURRENT_PAGE,
  SET_FILTERED_USER_IDS,
  DELETE_USER,
  TOGGLE_CHECK_USER,
  DELETE_CHECKED_USERS,
  EDIT_USER,
  UPDATE_FILTERED_USER_IDS,
  UPDATE_FILTERED_USER_IDS_WITH_ALL_USERS,
  CHANGE_PAGE,
} from '../actions/actionTypes'
import {
  changePage,
  fetchUsers,
  onSelectAllChange,
  updateFilteredUsersIds,
  updateFilteredUsersIdsWithAllUserIds,
} from '../actions'

function Home() {
  const [state, dispatch] = useReducer(
    (currState, action) => {
      switch (action.type) {
        case SET_USERS: {
          return { ...currState, users: action.payload }
        }
        case DELETE_USER: {
          return {
            ...currState,
            users: currState.users.filter((user) => user.id !== action.payload),
          }
        }
        case DELETE_CHECKED_USERS: {
          return {
            ...currState,
            users: currState.users.filter((user) => !user.isChecked),
          }
        }
        case TOGGLE_CHECK_USER: {
          return {
            ...currState,
            users: currState.users.map((user) =>
              user.id === action.payload
                ? { ...user, isChecked: !user.isChecked }
                : user
            ),
          }
        }
        case EDIT_USER: {
          return {
            ...currState,
            users: currState.users.map((user) =>
              user.id === action.payload.id
                ? { ...user, ...action.payload }
                : user
            ),
          }
        }
        case TOGGLE_SELECT_ALL: {
          return { ...currState, selectAll: !currState.selectAll }
        }
        case SET_SEARCH_TEXT: {
          return { ...currState, searchText: action.payload }
        }
        case SET_CURRENT_PAGE: {
          return { ...currState, currentPage: action.payload }
        }
        case SET_FILTERED_USER_IDS: {
          return { ...currState, filteredUsersIds: action.payload }
        }
        case UPDATE_FILTERED_USER_IDS: {
          return {
            ...currState,
            filteredUsersIds: currState.users.reduce(
              (acc, user) =>
                user.name
                  .toLowerCase()
                  .includes(currState.searchText.toLowerCase()) ||
                user.email
                  .toLowerCase()
                  .includes(currState.searchText.toLowerCase()) ||
                user.role
                  .toLowerCase()
                  .includes(currState.searchText.toLowerCase())
                  ? [...acc, user.id]
                  : acc,
              []
            ),
          }
        }
        case UPDATE_FILTERED_USER_IDS_WITH_ALL_USERS: {
          return {
            ...currState,
            filteredUsersIds: currState.users.map((user) => user.id),
          }
        }
        case CHANGE_PAGE: {
          return {
            ...currState,
            currentPage: action.payload,
          }
        }
        default:
          return currState
      }
    },
    {
      users: [],
      selectAll: false,
      searchText: '',
      currentPage: 1,
      filteredUsersIds: [],
    }
  )

  const { users, selectAll, searchText, currentPage, filteredUsersIds } = state

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        filteredUsersIds.some((fUser) => fUser === user.id)
      ),
    [users, filteredUsersIds]
  )

  const cntChecked = useMemo(
    () =>
      users.reduce((acc, user) => {
        return user.isChecked ? acc + 1 : acc
      }, 0),
    [users]
  )

  const recordsPerPage = 10
  const lastIndexOfPage = useMemo(
    () => currentPage * recordsPerPage,
    [currentPage]
  )
  const firstIndexOfPage = useMemo(
    () => lastIndexOfPage - recordsPerPage,
    [lastIndexOfPage]
  )
  const records = useMemo(
    () => filteredUsers.slice(firstIndexOfPage, lastIndexOfPage),
    [filteredUsers, firstIndexOfPage, lastIndexOfPage]
  )

  useEffect(() => {
    fetchUsers(dispatch)
  }, [])

  useEffect(() => {
    onSelectAllChange(users, records, selectAll, dispatch)
  }, [selectAll])

  useEffect(() => {
    const updateUsers = () => {
      if (searchText) {
        dispatch(updateFilteredUsersIds())
      } else {
        dispatch(updateFilteredUsersIdsWithAllUserIds())
        dispatch(changePage(1))
      }
    }

    updateUsers()
  }, [searchText])

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
