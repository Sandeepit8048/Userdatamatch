import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const loadUsers = async (currentPage) => {
    try {
      const data = await fetchUsers(currentPage);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      alert('User deleted successfully');
      loadUsers(page);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h2>Users List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt={user.first_name} width="50" />
              </td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
