function DeleteSelectedButton({ cntChecked, handleDeleteSelected }) {
  return (
    <button
      className="delete-btn"
      type="button"
      onClick={handleDeleteSelected}
      disabled={cntChecked === 0}
    >
      Delete Selected {cntChecked}
    </button>
  )
}

export default DeleteSelectedButton
