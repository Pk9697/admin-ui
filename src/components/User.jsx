import { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Modal from './Modal'

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
      <div
        key={user.id}
        className={`table__row ${user.isChecked ? 'bc-grey' : ''}`}
      >
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
      {inEditMode && (
        <Modal
          formData={formData}
          handleClose={handleClose}
          handleFormSubmit={handleFormSubmit}
          handleChange={handleChange}
        />
      )}
    </>
  )
}

export default User
