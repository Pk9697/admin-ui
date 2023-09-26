import { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'

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

  const handleSingleDelete = (e) => {
    const toBeDeletedId = e.currentTarget.value
    setUsers((currUsers) => {
      return currUsers.filter((user) => user.id !== toBeDeletedId)
    })
  }

  const handleCheck = (e) => {
    const toBeUpdatedId = e.target.value
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

      <table className="table">
        <thead>
          <tr className="table__row">
            <th className="table__header table__data">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </th>
            <th className="table__header table__data">Name</th>
            <th className="table__header table__data">Email</th>
            <th className="table__header table__data">Role</th>
            <th className="table__header table__data">Actions</th>
          </tr>
        </thead>
        {users.map(({ id, name, email, role, isChecked }) => {
          return (
            <tbody key={id}>
              <tr className="table__row">
                <td className="table__data">
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value={id}
                    onChange={handleCheck}
                    checked={isChecked}
                  />
                </td>
                <td className="table__data">{name}</td>
                <td className="table__data">{email}</td>
                <td className="table__data">{role}</td>
                <td className="table__data table__action">
                  <button className="table__btn table__edit-btn" type="button">
                    <ModeEditOutlineOutlinedIcon />
                  </button>
                  <button
                    className="table__btn table__delete-btn"
                    onClick={handleSingleDelete}
                    value={id}
                    type="button"
                  >
                    <DeleteOutlinedIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default Users
