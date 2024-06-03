import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './userListStyles.css'; // Import CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5227/api/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5227/api/user/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Check if any input field is left blank
    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields.');
      return;
    }
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      await axios.put(`http://localhost:5227/api/user/${editingUser}`, formData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="table-container">
      <h2>User List</h2>
      <Link to="/">Home</Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {editingUser === user.id ? (
                <>
                  <td><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} /></td>
                  <td><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} /></td>
                  <td><input type="text" name="address" value={formData.address} onChange={handleInputChange} /></td>
                  <td><input type="email" name="email" value={formData.email} onChange={handleInputChange} /></td>
                  <td><input type="text" name="location" value={formData.location} onChange={handleInputChange} /></td>
                  <td>
                    <button onClick={handleFormSubmit}>Submit</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
