import React, { useState, useEffect } from 'react';
import './Users.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetching users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users'); // Assuming your API is available here
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
    });
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers(); // Re-fetch users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser && selectedUser.id) {
        // Update existing user
        await fetch(`/api/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new user
        await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      fetchUsers();
      setSelectedUser(null); // Reset after saving
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="users-container">
      <h1>Manage Users</h1>
      <button onClick={() => setSelectedUser({})}>Add New User</button>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding/editing users */}
      <div className="user-form">
        <h2>{selectedUser && selectedUser.id ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setSelectedUser(null)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsersList;
