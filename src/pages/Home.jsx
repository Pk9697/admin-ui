import { useEffect, useMemo, useState } from 'react'
import UsersList from '../components/UsersList'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import DeleteSelectedButton from '../components/DeleteSelectedButton'

function Home() {
  const [users, setUsers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredUsersIds, setFilteredUsersIds] = useState([])
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
    const getUsers = () => {
      const url =
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const newUsers = data.map((user) => ({ ...user, isChecked: false }))
          const newUserIds = data.map((user) => user.id)
          setFilteredUsersIds(newUserIds)
          setUsers(newUsers)
        })
    }
    getUsers()
  }, [])

  useEffect(() => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        records.some((rUser) => rUser.id === user.id)
          ? { ...user, isChecked: selectAll }
          : user
      )
    })
  }, [selectAll])

  useEffect(() => {
    const updateUsers = () => {
      if (searchText) {
        setFilteredUsersIds(
          users.reduce(
            (acc, user) =>
              user.name.toLowerCase().includes(searchText.toLowerCase()) ||
              user.email.toLowerCase().includes(searchText.toLowerCase()) ||
              user.role.toLowerCase().includes(searchText.toLowerCase())
                ? [...acc, user.id]
                : acc,
            []
          )
        )
      } else {
        setFilteredUsersIds(users.map((user) => user.id))
        setCurrentPage(1)
      }
    }

    updateUsers()
  }, [searchText])

  const handleSingleDelete = (id) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => user.id !== id)
    })
  }

  const handleCheck = (id) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user
      )
    })
  }

  const handleDeleteSelected = () => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => !user.isChecked)
    })

    if (selectAll) {
      setCurrentPage(1)
      setSearchText('')
    }

    setSelectAll(false)
  }

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev)
  }

  const handleSubmit = (e, formData) => {
    e.preventDefault()
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === formData.id ? { ...user, ...formData } : user
      )
    })
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleChangePage = (page) => {
    setCurrentPage((prev) => {
      return prev !== page ? page : prev
    })
  }

  return (
    <div className="users-container">
      <SearchInput searchText={searchText} handleSearch={handleSearch} />

      <DeleteSelectedButton
        cntChecked={cntChecked}
        handleDeleteSelected={handleDeleteSelected}
      />

      <UsersList
        users={records}
        handleCheck={handleCheck}
        handleSingleDelete={handleSingleDelete}
        handleSubmit={handleSubmit}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
      />

      <Pagination
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        users={filteredUsers}
        handleChangePage={handleChangePage}
      />
    </div>
  )
}

export default Home
