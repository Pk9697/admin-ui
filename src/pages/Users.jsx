import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'

function Users() {
  const [users, setUsers] = useState([])
  const [cntChecked, setCntChecked] = useState(0)
  const [selectAll, setSelectAll] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    const getUsers = () => {
      const url =
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const newUsers = data.map((user) => ({ ...user, isChecked: false }))
          setUsers(newUsers)
        })
    }
    getUsers()
  }, [])

  useEffect(() => {
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        return { ...user, isChecked: selectAll }
      })
    })
  }, [selectAll])

  useEffect(() => {
    const cnt = users.reduce((acc, user) => {
      return user.isChecked ? acc + 1 : acc
    }, 0)
    setCntChecked(cnt)
  }, [users])

  useEffect(() => {
    const updateUsers = () => {
      if (searchText) {
        setFilteredUsers(
          users.filter(({ name, email, role }) => {
            return (
              name.toLowerCase().includes(searchText.toLowerCase()) ||
              email.toLowerCase().includes(searchText.toLowerCase()) ||
              role.toLowerCase().includes(searchText.toLowerCase())
            )
          })
        )
      } else {
        setFilteredUsers(users)
      }
    }

    updateUsers()
  }, [searchText])

  const handleSingleDelete = (id) => {
    const toBeDeletedId = id
    setUsers((currUsers) => {
      return currUsers.filter((user) => user.id !== toBeDeletedId)
    })
  }

  const handleCheck = (id) => {
    const toBeUpdatedId = id
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        return user.id === toBeUpdatedId
          ? { ...user, isChecked: !user.isChecked }
          : user
      })
    })
  }

  const handleDeleteSelected = () => {
    setUsers((currUsers) => {
      return currUsers.filter((user) => !user.isChecked)
    })
    setSelectAll(false)
  }

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev)
  }

  const handleSubmit = (e, formData) => {
    e.preventDefault()
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        return user.id === formData.id ? { ...user, ...formData } : user
      })
    })
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="users-container">
      <input
        className="search"
        type="text"
        placeholder="Search by name email or role"
        value={searchText}
        onChange={handleSearch}
      />

      <button
        className="delete-btn"
        type="button"
        onClick={handleDeleteSelected}
        disabled={cntChecked === 0}
      >
        Delete Selected
      </button>

      <UsersList
        users={searchText.length ? filteredUsers : users}
        handleCheck={handleCheck}
        handleSingleDelete={handleSingleDelete}
        handleSubmit={handleSubmit}
        handleSelectAll={handleSelectAll}
      />
    </div>
  )
}

export default Users
