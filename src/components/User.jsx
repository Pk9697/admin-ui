import { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'

function User({ user, handleCheck, handleSingleDelete, handleSubmit }) {
  const [inEditMode, setInEditMode] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleClose = () => {
    setInEditMode(false)
    setFormData((prevData) => {
      return {
        ...prevData,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  }

  const handleFormSubmit = (e) => {
    handleSubmit(e, formData)
    setInEditMode(false)
  }
  return (
    <>
      <div key={user.id} className={`${user.isChecked ? 'bc-grey' : ''}`}>
        <div className="table__row">
          <div className="table__data">
            <input
              type="checkbox"
              onChange={() => handleCheck(user.id)}
              checked={user.isChecked}
            />
          </div>
          <div className="table__data">{formData.name}</div>
          <div className="table__data">{formData.email}</div>
          <div className="table__data">{formData.role}</div>
          <div className="table__data table__action">
            <button
              onClick={() => setInEditMode(true)}
              className={`table__btn table__edit-btn ${
                user.isChecked ? 'bc-grey' : ''
              }`}
              type="button"
            >
              <ModeEditOutlineOutlinedIcon />
            </button>
            <button
              className={`table__btn table__delete-btn ${
                user.isChecked ? 'bc-grey' : ''
              }`}
              onClick={() => handleSingleDelete(user.id)}
              type="button"
            >
              <DeleteOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      {inEditMode && (
        <div className="modal">
          <div className="modal__content">
            <button onClick={handleClose} type="button">
              Close
            </button>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default User
