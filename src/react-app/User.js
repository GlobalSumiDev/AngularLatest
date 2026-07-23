
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import config from './config';
import { FaTrash } from 'react-icons/fa';
import { MdLockReset } from 'react-icons/md';


const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [resetPassword, setResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  const [resetFeedback, setResetFeedback] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [loginUserId, setLoginUserId] = useState(null);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const [updatePasswordData, setUpdatePasswordData] = useState({
    email: '',
    old_password: '',
    new_password: '',
    confirmNewPassword: '',
  });
  const [updatePasswordFeedback, setUpdatePasswordFeedback] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    username: '',
    email: '',
    role: '',
    status: 'true',
  });
  const [updateUserFeedback, setUpdateUserFeedback] = useState('');
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);



  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    status: true,
  });


  const inputStyle = {
    width: '100%', padding: '0.75rem', border: '1px solid #ced4da',
    borderRadius: '0.25rem', fontSize: '1rem', marginBottom: '1rem',
    boxSizing: 'border-box'
  };
  const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: '500' };
  const buttonStyle = {
    width: '100%', padding: '0.75rem', backgroundColor: '#007bff',
    color: 'white', border: 'none', borderRadius: '0.25rem',
    fontSize: '1rem', fontWeight: '500', cursor: 'pointer'
  };


  const handleBack = () => { if (window.history.length > 1) navigate(-1); else navigate("/"); };


  useEffect(() => {
    loadUsers();
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;


    fetch(`${config.BASE_URL}/user/me`, { headers })
      .then(r => r.json())
      .then(data => {

        setLoginUserId(data.id);
      })
      .catch(err => console.error('Error:', err));

    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/user/getusers`, { headers });
      if (!response.ok) throw new Error('Failed to load users');
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (newUser.password !== newUser.confirmPassword) {
      setFeedbackMessage('❌ Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('Creating user...');

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const payload = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: 'User',
        status: false,
      };

      console.log('Creating user payload:', payload);

      const response = await fetch(`${config.BASE_URL}/user/register`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('response:', responseText);

      if (!response.ok) throw new Error(`Failed to create user: ${responseText}`);

      const result = JSON.parse(responseText);
      setUsers(prev => [...prev, result]);
      setFeedbackMessage('✅ User created successfully!');


      setNewUser({ username: '', email: '', password: '', confirmPassword: '', role: 'User', status: true });


      setTimeout(() => {
        setIsFormOpen(false);
        setFeedbackMessage('');
      }, 1000);

    } catch (error) {
      console.error('Error creating user:', error);
      setFeedbackMessage(`❌ ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Handle user delete
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(
        `${config.BASE_URL}/user/delete-user?user_id=${userId}`,
        { method: 'DELETE', headers }
      );

      if (!response.ok) throw new Error('Failed to delete user');


      setUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Failed to delete user: ${error.message}`);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetPassword !== confirmResetPassword) {
      setResetFeedback('❌ Passwords do not match.');
      return;
    }

    setIsResetting(true);
    setResetFeedback('Resetting password...');

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;


      const payload = {
        user_id: selectedUser.id,
        email: selectedUser.email,
        new_password: resetPassword,
      };

      console.log('Reset password payload:', payload);

      const response = await fetch(`${config.BASE_URL}/user/reset-password-by-admin`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('Reset response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);

      setResetFeedback('✅ Password reset successfully!');
      setTimeout(() => {
        setIsResetModalOpen(false);
        setSelectedUser(null);
        setResetPassword('');
        setConfirmResetPassword('');
        setResetFeedback('');
      }, 1000);

    } catch (error) {
      setResetFeedback(`❌ ${error.message}`);
    } finally {
      setIsResetting(false);
    }
  };

  const handleUpdateUser = async (e) => {


    setIsUpdatingUser(true);
    setUpdateUserFeedback('Updating user...');

    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const payload = {
        username: updateUserData.username,
        email: updateUserData.email,
        role: updateUserData.role,
        status: updateUserData.status,
      };

      console.log('Update user payload:', payload);

      const response = await fetch(
        `${config.BASE_URL}/user/update-user?user_id=${selectedUser.id}`,
        { method: 'PUT', headers, body: JSON.stringify(payload) }
      );

      const responseText = await response.text();
      console.log('Update user response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);


      setUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, ...payload } : u
      ));

      setUpdateUserFeedback('✅ User updated successfully!');
      setTimeout(() => {
        setIsUpdateUserOpen(false);
        setSelectedUser(null);
        setUpdateUserFeedback('');
      }, 1000);

    } catch (error) {
      setUpdateUserFeedback(`❌ ${error.message}`);
    } finally {
      setIsUpdatingUser(false);
    }
  };



  const handleActivateUser = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('token for toggle:', token);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      // if(token) headers['Authorization'] = 'Bearer ${token}';
      console.log('headres:', headers);
      console.log('userId:', userId)

      const response = await fetch(
        `${config.BASE_URL}/user/users/${userId}/toggle-status`,
        { method: 'PUT', headers }
      );
      const responseText = await response.text();
      console.log('toggle status response:', responseText);
      if (!response.ok) throw new Error(`failed : ${responseText}`)
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, status: !currentStatus } : u
      ));
      alert(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);

    } catch (error) {
      console.error('error:', error);
      alert('failed:${error.message}')
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (updatePasswordData.new_password !== updatePasswordData.confirmNewPassword) {
      setUpdatePasswordFeedback('❌ Passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    setUpdatePasswordFeedback('Updating password...');

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const payload = {
        email: updatePasswordData.email,
        old_password: updatePasswordData.old_password,
        new_password: updatePasswordData.new_password,
      };

      console.log('Update password payload:', payload);

      const response = await fetch(`${config.BASE_URL}/user/change-password`, {
        method: 'POST', headers, body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to update password');

      setUpdatePasswordFeedback('✅ Password updated successfully!');
      setTimeout(() => {
        setIsUpdatePasswordOpen(false);
        setUpdatePasswordData({ email: '', old_password: '', new_password: '', confirmNewPassword: '' });
        setUpdatePasswordFeedback('');
      }, 1000);

    } catch (error) {
      setUpdatePasswordFeedback(`❌ ${error.message}`);
    } finally {
      setIsUpdatingPassword(false);
    }
  };



  return (
    <div style={{ width: '100%', padding: '2rem', backgroundColor: '#eee', borderRadius: '8px' }}>

      {/* Header Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button type="button" onClick={handleBack}
          style={{ color: 'white', borderRadius: '70px', width: '50px', height: '40px', backgroundColor: "#3dce41", border: 'none', cursor: 'pointer', marginTop: '100px' }}>
          ←
        </button>

      </div>

      <div style={{ display: 'flex' }}>

        {/* Sidebar */}
        <div style={{ width: "240px" }}>
          <Sidebar
            activePage="user"
            onShowEmployees={() => window.location.href = '/welcomePage?showEmployees=true'}
            onShowFolders={() => window.location.href = '/welcomePage'}
            onShowUsers={() => window.location.href = '/userPage'}
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, marginLeft: '2rem' }}>

          {/* Title + Create Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', position: 'absolute', left: '50%', marginBottom: '60px' }}>User Management</h2>
            <button
              type="button"
              onClick={() => { setIsFormOpen(!isFormOpen); setFeedbackMessage(''); }}
              style={{
                padding: '0.6rem 1.2rem', backgroundColor: '#007bff',
                color: 'white', border: 'none', borderRadius: '0.25rem',
                cursor: 'pointer', fontSize: '0.9rem'
              }}>
              + Create New User
            </button>
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f8d7da', borderRadius: '0.25rem' }}>
              {error}
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="🔍 Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #ced4da',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                boxSizing: 'border-box',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* ── Create User Form */}

          {isFormOpen && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflowY: 'auto'
            }}>
              <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem',
                width: '400px', maxWidth: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                margin: 'auto',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Create New User</h3>

                </div>

                {/* Feedback Message */}
                {feedbackMessage && (
                  <div style={{
                    padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem',
                    backgroundColor: feedbackMessage.includes('✅') ? '#d4edda' : '#f8d7da',
                    color: feedbackMessage.includes('✅') ? '#155724' : '#721c24'
                  }}>
                    {feedbackMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Username <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      style={inputStyle} required disabled={isSubmitting}
                      placeholder="Enter username"
                      autoComplete="off"
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email <span style={{ color: 'red' }}>*</span></label>
                    <input type="email" value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      style={inputStyle} required disabled={isSubmitting}
                      placeholder="Enter email" />
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password" value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      style={inputStyle} required disabled={isSubmitting}
                      placeholder="Enter password" />

                  </div>


                  {/* Confirm Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Confirm Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password" value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                      style={inputStyle} required disabled={isSubmitting}
                      placeholder="Confirm password" />
                  </div>



                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit"
                      style={{ ...buttonStyle, flex: 1 }}
                      disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create User'}
                    </button>
                    <button type="button"
                      onClick={() => { setIsFormOpen(false); setFeedbackMessage(''); }}
                      style={{ ...buttonStyle, flex: 1, backgroundColor: 'red' }}
                      disabled={isSubmitting}>
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* ── Users Table */}
          {users.filter(user =>
            (user.username || '').toLowerCase().includes(searchTerm.toLowerCase())
          ).length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse', backgroundColor: 'white',
                borderRadius: '0.5rem', overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>#</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Username</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Role</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>

                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: '600' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user => (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((user, index) => (
                      <tr key={user.id || index}
                        style={{
                          borderBottom: '1px solid #dee2e6',
                          backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
                        }}>
                        <td style={{ padding: '0.75rem 1rem' }}>{index + 1}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{user.username}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{user.email}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{user.role}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>

                          <button
                            onClick={() => handleActivateUser(user.id, user.status)}
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: user.status ? '#28a745' : '#ffc107',
                              color: user.status ? 'white' : '#212529',
                              border: 'none',
                              borderRadius: '1rem',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}>
                            {user.status ? 'Activated' : 'Activate'}
                          </button>

                        </td>

                        <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>

                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete User"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                              color: '#218838'
                            }}
                          >
                            <FaTrash color="#218838" size={18} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsResetModalOpen(true);
                              setResetPassword('');
                              setConfirmResetPassword('');
                              setResetFeedback('');
                            }}
                            title="Reset Password"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <MdLockReset color="#218838" size={20} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setUpdateUserData({
                                username: user.username,
                                email: user.email,
                                role: user.role,
                                status: user.status,
                              });
                              setIsUpdateUserOpen(true);
                              setUpdateUserFeedback('');
                            }}
                            title="Update User"
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            ✏️
                          </button>


                          {user.id === loginUserId && (
                            <button
                              onClick={() => {
                                setUpdatePasswordData({
                                  email: user.email,
                                  old_password: '',
                                  new_password: '',
                                  confirmNewPassword: '',
                                });
                                setIsUpdatePasswordOpen(true);
                                setUpdatePasswordFeedback('');
                              }}
                              title="Update Password"
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                              }}>
                              🔒
                            </button>
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{
              color: '#6c757d', textAlign: 'center', padding: '2rem',
              backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #dee2e6'
            }}>
              {searchTerm ? `No users found for "${searchTerm}"` : 'No users found.'}
            </p>
          )}
          {/* ── Reset Password Modal */}
          {isResetModalOpen && selectedUser && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem',
                width: '400px', maxWidth: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Reset Password</h3>
                  <button type="button"
                    onClick={() => { setIsResetModalOpen(false); setSelectedUser(null); setResetPassword(''); setConfirmResetPassword(''); setResetFeedback(''); }}
                    style={{ padding: '0.3rem 0.75rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>

                {resetFeedback && (
                  <div style={{
                    padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem',
                    backgroundColor: resetFeedback.includes('✅') ? '#d4edda' : '#f8d7da',
                    color: resetFeedback.includes('✅') ? '#155724' : '#721c24'
                  }}>
                    {resetFeedback}
                  </div>
                )}

                <form onSubmit={handleResetPassword}>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={selectedUser.email}
                      style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                      readOnly disabled />
                  </div>

                  {/* User ID - readonly */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>User ID</label>
                    <input type="text" value={selectedUser.id}
                      style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                      readOnly disabled />
                  </div>

                  {/* New Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>New Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password" value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      style={inputStyle} required disabled={isResetting}
                      placeholder="Enter new password" />
                  </div>

                  {/* Confirm Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Confirm Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password" value={confirmResetPassword}
                      onChange={(e) => setConfirmResetPassword(e.target.value)}
                      style={inputStyle} required disabled={isResetting}
                      placeholder="Confirm new password" />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" style={{ ...buttonStyle, flex: 1 }} disabled={isResetting}>
                      {isResetting ? 'Resetting...' : 'Reset Password'}
                    </button>
                    <button type="button"
                      onClick={() => { setIsResetModalOpen(false); setSelectedUser(null); setResetPassword(''); setConfirmResetPassword(''); setResetFeedback(''); }}
                      style={{ ...buttonStyle, flex: 1, backgroundColor: '#6c757d' }}
                      disabled={isResetting}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/*Update User Modal  */}


          {isUpdateUserOpen && selectedUser && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem',
                width: '400px', maxWidth: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                maxHeight: '90vh', overflowY: 'auto'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Update User</h3>
                  <button type="button"
                    onClick={() => { setIsUpdateUserOpen(false); setUpdateUserFeedback(''); }}
                    style={{ padding: '0.3rem 0.75rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>

                {/* Feedback */}
                {updateUserFeedback && (
                  <div style={{
                    padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem',
                    backgroundColor: updateUserFeedback.includes('✅') ? '#d4edda' : '#f8d7da',
                    color: updateUserFeedback.includes('✅') ? '#155724' : '#721c24'
                  }}>
                    {updateUserFeedback}
                  </div>
                )}

                <form >

                  {/* Username */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Username <span style={{ color: 'red' }}>*</span></label>
                    <input type="text"
                      value={updateUserData.username}
                      onChange={(e) => setUpdateUserData({ ...updateUserData, username: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingUser}
                      placeholder="Enter username" />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email <span style={{ color: 'red' }}>*</span></label>
                    <input type="email"
                      value={updateUserData.email}
                      onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingUser}
                      placeholder="Enter email" />
                  </div>

                  {/* Role */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Role <span style={{ color: 'red' }}>*</span></label>
                    <select value={updateUserData.role}
                      onChange={(e) => setUpdateUserData({ ...updateUserData, role: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingUser}>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Status <span style={{ color: 'red' }}>*</span></label>
                    <select value={updateUserData.status}
                      onChange={(e) => setUpdateUserData({ ...updateUserData, status: e.target.value === 'true' })}
                      style={inputStyle} disabled={isUpdatingUser}>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    {!showUpdateConfirm ? (
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button"
                          onClick={() => setShowUpdateConfirm(true)}
                          style={{ ...buttonStyle, flex: 1 }}
                          disabled={isUpdatingUser}>
                          Update User
                        </button>
                        <button type="button"
                          onClick={() => { setIsUpdateUserOpen(false); setUpdateUserFeedback(''); }}
                          style={{ ...buttonStyle, flex: 1, backgroundColor: 'red' }}
                          disabled={isUpdatingUser}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p style={{ textAlign: 'center', fontWeight: '600', color: '#333', marginBottom: '1rem' }}>
                          ⚠️ Are you sure you want to update this user?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button type="button"
                            onClick={() => setShowUpdateConfirm(false)}
                            style={{ ...buttonStyle, flex: 1, backgroundColor: '#6c757d' }}>
                            No
                          </button>
                          <button type="button"
                            onClick={async () => { setShowUpdateConfirm(false); await handleUpdateUser(); }}
                            style={{ ...buttonStyle, flex: 1, backgroundColor: '#28a745' }}>
                            Yes, Update
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}




          {/* ── Update Password Modal */}
          {isUpdatePasswordOpen && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem',
                width: '400px', maxWidth: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                maxHeight: '90vh', overflowY: 'auto'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Update Password</h3>

                </div>

                {/* Feedback */}
                {updatePasswordFeedback && (
                  <div style={{
                    padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem',
                    backgroundColor: updatePasswordFeedback.includes('✅') ? '#d4edda' : '#f8d7da',
                    color: updatePasswordFeedback.includes('✅') ? '#155724' : '#721c24'
                  }}>
                    {updatePasswordFeedback}
                  </div>
                )}

                <form onSubmit={handleUpdatePassword}>

                  {/* Email - readonly */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={updatePasswordData.email}
                      style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                      readOnly disabled />
                  </div>

                  {/* Old Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Old Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password"
                      value={updatePasswordData.old_password}
                      onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, old_password: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingPassword}
                      placeholder="Enter old password" />
                  </div>

                  {/* New Password */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>New Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password"
                      value={updatePasswordData.new_password}
                      onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, new_password: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingPassword}
                      placeholder="Enter new password" />
                  </div>

                  {/* Confirm New Password */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Confirm New Password <span style={{ color: 'red' }}>*</span></label>
                    <input type="password"
                      value={updatePasswordData.confirmNewPassword}
                      onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, confirmNewPassword: e.target.value })}
                      style={inputStyle} required disabled={isUpdatingPassword}
                      placeholder="Confirm new password" />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit"
                      style={{ ...buttonStyle, flex: 1 }}
                      disabled={isUpdatingPassword}>
                      {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                    <button type="button"
                      onClick={() => { setIsUpdatePasswordOpen(false); setUpdatePasswordFeedback(''); }}
                      style={{ ...buttonStyle, flex: 1, backgroundColor: 'red' }}
                      disabled={isUpdatingPassword}>
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default User;
