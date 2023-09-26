/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'

function Users() {
  const [users, setUsers] = useState([])
  const [cntChecked, setCntChecked] = useState(0)

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

  const handleSingleDelete = (e) => {
    const toBeDeletedId = e.currentTarget.value
    setUsers((currUsers) => {
      return currUsers.filter((user) => user.id !== toBeDeletedId)
    })
  }

  const handleCheck = (e) => {
    const toBeUpdatedId = e.target.value
    if (e.target.checked) {
      setCntChecked((prevCntChecked) => prevCntChecked + 1)
    } else {
      setCntChecked((prevCntChecked) => prevCntChecked - 1)
    }
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        return user.id === toBeUpdatedId
          ? { ...user, isChecked: e.target.checked }
          : user
      })
    })
  }

  const handleDeleteSelected = () => {
    setUsers((currUsers) => {
      return currUsers.filter((user) => !user.isChecked)
    })
    setCntChecked(0)
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
          <tr>
            <th className="table__header">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
            </th>
            <th className="table__header">Name</th>
            <th className="table__header">Email</th>
            <th className="table__header">Role</th>
            <th className="table__header">Actions</th>
          </tr>
        </thead>
        {users.map(({ id, name, email, role }) => {
          return (
            <tbody key={id}>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value={id}
                    onChange={handleCheck}
                  />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td className="table__action">
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
