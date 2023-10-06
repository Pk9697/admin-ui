import { changePage, deleteCheckedUsers, toggleSelectAll } from '../actions'

function DeleteSelectedButton({ cntChecked, selectAll, dispatch }) {
  const handleClick = () => {
    dispatch(deleteCheckedUsers())
    if (selectAll) {
      dispatch(changePage(1))
      dispatch(toggleSelectAll())
    }
  }
  return (
    <button
      className="delete-btn"
      type="button"
      onClick={handleClick}
      disabled={cntChecked === 0}
    >
      Delete Selected {cntChecked}
    </button>
  )
}

export default DeleteSelectedButton
