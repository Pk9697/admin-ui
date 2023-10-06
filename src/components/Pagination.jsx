import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { changePage } from '../actions'

function Pagination({ currentPage, users, recordsPerPage, dispatch }) {
  const totalPages = Math.ceil(users.length / recordsPerPage)
  const numbers = [...Array(totalPages + 1).keys()].slice(1)
  return (
    <div className="pagination">
      <button
        className="btn pagination__btn"
        onClick={() => dispatch(changePage(1))}
        disabled={currentPage === 1 || users.length === 0}
        type="button"
      >
        <KeyboardDoubleArrowLeftOutlinedIcon />
      </button>
      <button
        className="btn pagination__btn"
        onClick={() => dispatch(changePage(currentPage - 1))}
        disabled={currentPage === 1 || users.length === 0}
        type="button"
      >
        <KeyboardArrowLeftOutlinedIcon />
      </button>
      {numbers.map((page, index) => (
        <button
          key={`page-${index}`}
          className={`btn pagination__btn ${
            currentPage === page ? 'active' : ''
          }`}
          onClick={() => dispatch(changePage(page))}
          disabled={currentPage === page || users.length === 0}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className="btn pagination__btn"
        onClick={() => dispatch(changePage(currentPage + 1))}
        disabled={currentPage === totalPages || users.length === 0}
        type="button"
      >
        <KeyboardArrowRightOutlinedIcon />
      </button>
      <button
        className="btn pagination__btn"
        onClick={() => dispatch(changePage(totalPages))}
        disabled={currentPage === totalPages || users.length === 0}
        type="button"
      >
        <KeyboardDoubleArrowRightOutlinedIcon />
      </button>
    </div>
  )
}

export default Pagination
