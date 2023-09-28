import { useEffect, useState } from 'react'
import User from '../components/User'

function Users() {
  const [users, setUsers] = useState([])
  const [cntChecked, setCntChecked] = useState(0)
  const [selectAll, setSelectAll] = useState(false)

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

  return (
    <div className="users-container">
      <button
        className="delete-btn"
        type="button"
        onClick={handleDeleteSelected}
        disabled={cntChecked === 0}
      >
        Delete Selected
      </button>

      <div className="table">
        <div>
          <div className="table__row">
            <div className="table__header table__data">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </div>
            <div className="table__header table__data">Name</div>
            <div className="table__header table__data">Email</div>
            <div className="table__header table__data">Role</div>
            <div className="table__header table__data">Actions</div>
          </div>
        </div>
        {users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              handleCheck={handleCheck}
              handleSingleDelete={handleSingleDelete}
              handleSubmit={handleSubmit}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Users
