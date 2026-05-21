import React, { useEffect } from 'react';

const Sidebar = ({ onShowEmployees, onShowFolders, activePage }) => {

  useEffect(() => {
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
      .sidebar-menu li:hover{
          transform: scale(1.05);
          color:#3dce41;
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

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li
          className={activePage === 'parties' ? 'active' : ''}
          onClick={onShowEmployees}>
          <span className="menu-icon">👥</span><span>Parties</span>
        </li>
        <li
          className={activePage === 'beneficiary' ? 'active' : ''}
          onClick={() => alert('Beneficiary coming soon!')}>
          <span className="menu-icon">👤</span><span>Beneficiary</span>
        </li>
        <li
          className={activePage === 'add-employee' ? 'active' : ''}
          onClick={() => window.location.href = '/addEmployee'}>
          <span className="menu-icon">➕</span><span>Add Employees</span>
        </li>
        <li
          className={activePage === 'add-beneficiary' ? 'active' : ''}
          onClick={() => alert('Add Beneficiary coming soon!')}>
          <span className="menu-icon">➕</span><span>Add Beneficiary</span>
        </li>
        <li
          className={activePage === 'folders' ? 'active' : ''}
          onClick={onShowFolders}>
          <span className="menu-icon">📁</span><span>Folders</span>
        </li>
        <li
          className={activePage === 'folders' ? 'active' : ''}
          onClick={()=> window.location.href = '/userPage'}>
          <span className="menu-icon">🧑</span><span>User</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;