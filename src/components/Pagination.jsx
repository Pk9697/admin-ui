import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

function Pagination({ currentPage, users, handleChangePage, recordsPerPage }) {
  const totalPages = Math.ceil(users.length / recordsPerPage)
  const numbers = [...Array(totalPages + 1).keys()].slice(1)
  return (
    <div className="pagination">
      <button
        className="btn pagination__btn"
        onClick={() => handleChangePage(1)}
        disabled={currentPage === 1 || users.length === 0}
        type="button"
      >
        <KeyboardDoubleArrowLeftOutlinedIcon />
      </button>
      <button
        className="btn pagination__btn"
        onClick={() => handleChangePage(currentPage - 1)}
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
          onClick={() => handleChangePage(page)}
          disabled={currentPage === page || users.length === 0}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className="btn pagination__btn"
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages || users.length === 0}
        type="button"
      >
        <KeyboardArrowRightOutlinedIcon />
      </button>
      <button
        className="btn pagination__btn"
        onClick={() => handleChangePage(totalPages)}
        disabled={currentPage === totalPages || users.length === 0}
        type="button"
      >
        <KeyboardDoubleArrowRightOutlinedIcon />
      </button>
    </div>
  )
}

export default Pagination
