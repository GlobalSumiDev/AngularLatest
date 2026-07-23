import React, { useEffect, useState } from 'react';
import config from './config';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = ({ onShowEmployees, onShowFolders, activePage }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // ── Fetch user role
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`${config.BASE_URL}/user/me`, { headers });
        const data = await res.json();

        setUserRole(data.role || '');
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };
    fetchUserRole();

    // ── Styles
    const style = document.createElement('style');
    style.id = 'sidebar-styles';
    style.innerHTML = `
      .sidebar {
        width: 150px;
        padding: 0.5rem;
        border-radius: 8px;
        height: fit-content;
        margin-left: 5px;
        flex-shrink: 0;
      }
      .sidebar-menu {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .sidebar-menu li {
        padding: 0.75rem 1rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.2s;
      }
      .sidebar-menu li:hover:not(.active) {
        background-color: #f0f0f0;
      }
      .menu-icon {
        font-size: 1.2rem;
      }
      .page-with-sidebar {
        display: flex;
        padding-top: 120px;
        min-height: 100vh;
        background-color: #eee;
      }
      .page-main-content {
        flex: 1;
        padding: 0 1rem;
        background-color: white;
        border-radius: 8px;
        margin-right: 10px;
      }
      .sidebar-menu li:hover {
        transform: scale(1.05);
        color: #3dce41;
      }
    `;
    if (!document.getElementById('sidebar-styles')) {
      document.head.appendChild(style);
    }
    return () => {
      const styleElement = document.getElementById('sidebar-styles');
      if (styleElement) document.head.removeChild(styleElement);
    };
  }, []);

  //  Check if admin
  const isAdmin = userRole.toLowerCase() === 'admin'
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">

        {/* ── Show for ALL roles */}
        <li
          className={activePage === 'parties' ? 'active' : ''}
          onClick={() => alert('Party coming soon!')}>
          <span className="menu-icon">👥</span><span>Parties</span>
        </li>



        <li
          className={activePage === 'folders' ? 'active' : ''}
          onClick={() => window.location.href = '/folderPage'}>
          <span className="menu-icon">📁</span><span>Folders</span>
        </li>

        {/* ── Show ONLY for Admin */}
        {isAdmin && (
          <li
            className={activePage === 'add-employee' ? 'active' : ''}
            onClick={() => window.location.href = '/addEmployee'}>
            <span className="menu-icon">➕</span><span>Add Employees</span>
          </li>
        )}
        {isAdmin && (
          <li
            className={activePage === 'beneficiary' ? 'active' : ''}
            onClick={() => alert('Beneficiary coming soon!')}>
            <span className="menu-icon">👤</span><span>Beneficiary</span>
          </li>
        )

        }

        {isAdmin && (
          <li
            className={activePage === 'add-beneficiary' ? 'active' : ''}
            onClick={() => alert('Add Beneficiary coming soon!')}>
            <span className="menu-icon">➕</span><span>Add Beneficiary</span>
          </li>
        )}

        {isAdmin && (
          <li
            className={activePage === 'user' ? 'active' : ''}
            onClick={() => window.location.href = '/userPage'}>
            <span className="menu-icon">🧑</span><span>User</span>
          </li>
        )}

        <li
          onClick={async () => {
            try {
              const token = localStorage.getItem('authToken');
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              };


              await fetch(`${config.BASE_URL}/user/logout`, {
                method: 'POST',
                headers
              });

            } catch (err) {
              console.error('Logout API error:', err);
            } finally {

              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('currentUserEmail');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('lastCreatedPartyId');
              localStorage.removeItem('lastCreatedClientId');
              localStorage.removeItem('registrationSuccess');
              window.location.href = '/login';
            }
          }}
          style={{ cursor: 'pointer', color: '#dc3545' }}>
          <FiLogOut style={{ marginRight: '8px', color: '#dc3545' }} />
          <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;