import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

function Modal({ formData, handleClose, handleFormSubmit, handleChange }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="btn modal__close-btn"
          onClick={handleClose}
          type="button"
        >
          <CloseOutlinedIcon fontSize="small" />
        </button>
        <h2 className="modal__header">Edit</h2>
        <form className="modal__form" onSubmit={handleFormSubmit}>
          <input
            className="modal__input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name..."
            required
          />
          <input
            className="modal__input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email..."
            required
          />
          <input
            className="modal__input"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role..."
            required
          />
          <button className="btn modal__btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
