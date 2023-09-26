import { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'

function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = () => {
      const url =
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUsers(data))
    }
    getUsers()
  }, [])
  return (
    <div className="users-container">
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
                    value="Bike"
                  />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td className="table__action">
                  <div className="table__icon table__edit-icon">
                    <ModeEditOutlineOutlinedIcon />
                  </div>
                  <div className="table__icon table__delete-icon">
                    <DeleteOutlinedIcon />
                  </div>
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
