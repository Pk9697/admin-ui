import { toggleSelectAll } from '../actions'
import User from './User'

function UsersList({ users, selectAll, dispatch }) {
  return (
    <div className="table">
      <div className="table__row">
        <div className="table__header table__data">
          <input
            type="checkbox"
            onChange={() => dispatch(toggleSelectAll())}
            checked={selectAll}
          />
        </div>
        <div className="table__header table__data">Name</div>
        <div className="table__header table__data">Email</div>
        <div className="table__header table__data">Role</div>
        <div className="table__header table__data">Actions</div>
      </div>
      {users.map((user) => {
        return <User key={user.id} user={user} dispatch={dispatch} />
      })}
    </div>
  )
}

export default UsersList
