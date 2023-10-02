import { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import DeleteSelectedButton from '../components/DeleteSelectedButton'

function Home() {
  const [allUsers, setAllUsers] = useState([])
  const [users, setUsers] = useState([])
  const [cntChecked, setCntChecked] = useState(0)
  const [selectAll, setSelectAll] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10
  const lastIndexOfPage = currentPage * recordsPerPage
  const firstIndexOfPage = lastIndexOfPage - recordsPerPage
  const records = users.slice(firstIndexOfPage, lastIndexOfPage)

  useEffect(() => {
    const getUsers = () => {
      const url =
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const newUsers = data.map((user) => ({ ...user, isChecked: false }))
          setAllUsers(newUsers)
          setUsers(newUsers)
        })
    }
    getUsers()
  }, [])

  useEffect(() => {
    setUsers((prevUsers) => {
      return prevUsers.map((user, index) => {
        return firstIndexOfPage <= index && index + 1 <= lastIndexOfPage
          ? { ...user, isChecked: selectAll }
          : user
      })
    })

    const currentIdsInUsers = new Set()

    users.forEach((user, index) => {
      if (firstIndexOfPage <= index && index + 1 <= lastIndexOfPage) {
        currentIdsInUsers.add(user.id)
      }
    })

    setAllUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return currentIdsInUsers.has(user.id)
          ? { ...user, isChecked: selectAll }
          : user
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
        setUsers(
          allUsers.filter(({ name, email, role }) => {
            return (
              name.toLowerCase().includes(searchText.toLowerCase()) ||
              email.toLowerCase().includes(searchText.toLowerCase()) ||
              role.toLowerCase().includes(searchText.toLowerCase())
            )
          })
        )
      } else {
        setUsers(allUsers)
        setCurrentPage(1)
      }
    }

    updateUsers()
  }, [searchText])

  const handleSingleDelete = (id) => {
    const toBeDeletedId = id
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => user.id !== toBeDeletedId)
    })
    setAllUsers((prevUsers) => {
      return prevUsers.filter((user) => user.id !== toBeDeletedId)
    })
  }

  const handleCheck = (id) => {
    const toBeUpdatedId = id
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.id === toBeUpdatedId
          ? { ...user, isChecked: !user.isChecked }
          : user
      })
    })
    setAllUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.id === toBeUpdatedId
          ? { ...user, isChecked: !user.isChecked }
          : user
      })
    })
  }

  const handleDeleteSelected = () => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => !user.isChecked)
    })
    setAllUsers((prevUsers) => {
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
      return prevUsers.map((user) => {
        return user.id === formData.id ? { ...user, ...formData } : user
      })
    })
    setAllUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.id === formData.id ? { ...user, ...formData } : user
      })
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
        users={users}
        handleChangePage={handleChangePage}
      />
    </div>
  )
}

export default Home
