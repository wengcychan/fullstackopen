import { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
    .then(users => setUsers(users))
  }, [])

  return (
  <div>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user => 
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>
  </div>
)}

export default Users