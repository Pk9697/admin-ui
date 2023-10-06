import {
  CHANGE_PAGE,
  DELETE_CHECKED_USERS,
  DELETE_USER,
  EDIT_USER,
  SET_FILTERED_USER_IDS,
  SET_SEARCH_TEXT,
  SET_USERS,
  TOGGLE_CHECK_USER,
  TOGGLE_SELECT_ALL,
  UPDATE_FILTERED_USER_IDS,
  UPDATE_FILTERED_USER_IDS_WITH_ALL_USERS,
} from './actionTypes'

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  }
}

export function setFilteredUserIds(userIds) {
  return {
    type: SET_FILTERED_USER_IDS,
    payload: userIds,
  }
}

export function fetchUsers(dispatch) {
  const url =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const newUsers = data.map((user) => ({ ...user, isChecked: false }))
      const newUserIds = data.map((user) => user.id)
      dispatch(setUsers(newUsers))
      dispatch(setFilteredUserIds(newUserIds))
    })
}

export function toggleSelectAll() {
  return {
    type: TOGGLE_SELECT_ALL,
  }
}

export function deleteUser(userId) {
  return {
    type: DELETE_USER,
    payload: userId,
  }
}

export function toggleCheckUser(userId) {
  return {
    type: TOGGLE_CHECK_USER,
    payload: userId,
  }
}

export function deleteCheckedUsers() {
  return {
    type: DELETE_CHECKED_USERS,
  }
}

export function editUser(formData) {
  return {
    type: EDIT_USER,
    payload: formData,
  }
}

export function setSearchText(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText,
  }
}

export function updateFilteredUsersIds() {
  return {
    type: UPDATE_FILTERED_USER_IDS,
  }
}

export function updateFilteredUsersIdsWithAllUserIds() {
  return {
    type: UPDATE_FILTERED_USER_IDS_WITH_ALL_USERS,
  }
}

export function onSelectAllChange(users, records, selectAll, dispatch) {
  const newUsers = users.map((user) =>
    records.some((rUser) => rUser.id === user.id)
      ? { ...user, isChecked: selectAll }
      : user
  )

  dispatch(setUsers(newUsers))
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: page,
  }
}
