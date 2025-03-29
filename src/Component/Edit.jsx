import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../Service/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserById(id)
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser(id, user)
      .then(() => {
        alert('User updated successfully!');
        navigate('/users'); // Redirect to the user list page
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Failed to update user.');
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit User</h2>
      {loading ? (
        <p className="text-center">Loading user details...</p>
      ) : (
        <>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={user.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={user.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditUser;