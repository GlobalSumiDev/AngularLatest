import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import config from './config';
const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'welcome-page-styles';
    style.innerHTML = `
      #react-root {
        padding: 0 !important;
        margin: 0 !important;
        background-color: #eee;
        overflow-x: hidden;
        width: 100% !important;
        max-width: 100% !important;
      }
      .welcome-page-container {
        background-color: #eee;
       
        min-height: 60vh;
        padding-top: 120px;
        padding-left: 0 !important; 
        margin-right: 0 !important;
        margin: 0 !important;
       width: 100% !important;
      }
      .welcome-main-layout {
        display: flex;
        width: 100%;
        margin: 0 ;
        padding: 0 ;
        gap: 1rem;
      }
      .sidebar {
        width: 180px
        padding: 1rem;
        border-radius: 8px;
        height: fit-content;
        margin-left: 10px;
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
      .welcome-container {
        flex: 1;
        max-width: 100%;
        margin: 0;
        padding: 0 1rem;
      }
      .welcome-card {
        background: transparent;
        border-radius: 25px;
        padding: 0;
      }
      .welcome-title {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
      }
      .welcome-input-group {
        display: flex;
        max-width: 100%;
        margin-bottom: 3rem;
        gap: 0;
      }
      .welcome-form-control {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem 0 0 0.25rem;
        font-size: 1rem;
        border-right: none;
      }
      .welcome-form-control:focus {
        outline: none;
        border-color: #007bff;
      }
      .welcome-btn-primary {
        padding: 0.75rem 2rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0 0.25rem 0.25rem 0;
        cursor: pointer;
        font-weight: 500;
        font-size: 1rem;
      }
      .welcome-btn-primary:hover {
        background-color: #0056b3;
      }
      .folder-section-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 2rem;
        color: #333;
      }
      .folders-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 3rem;
        justify-content: flex-start;
      }
      .folder-item {
        text-align: center;
        width: 280px;
      }
      .folder-name {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #000;
      }
      .folder-icon {
        width: 280px;
        height: 240px;
        cursor: pointer;
        display: block;
        margin: 0 auto;
      }
      .welcome-btn-danger {
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1.5rem;
        margin-top: 1rem;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
      }
      .welcome-btn-danger:hover {
        background-color: #c82333;
      }
      .text-muted {
        color: #6c757d;
        text-align: center;
        font-size: 1.1rem;
      }
      .alert-danger {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
        padding: 1rem;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
      }
      .employee-section-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #333;
      }
      .employee-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        margin-bottom: 2rem;
      }
      .employee-table th {
        background-color: #007bff;
        color: white;
        padding: 0.85rem 1rem;
        text-align: left;
        font-weight: 600;
        font-size: 0.95rem;
      }
      .employee-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #e9ecef;
        font-size: 0.95rem;
        color: #333;
      }
      .employee-table tr:last-child td {
        border-bottom: none;
      }
      .employee-table tr:hover td {
        background-color: #f8f9fa;
      }
        .employee-card-list {
        display: flex;
       flex-direction: column;
          gap: 10px;
          max-width:600px;
          margin:0 auto;
          }

.employee-card {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: 0.2s ease;
  
}

.employee-card:hover {
  transform: scale(1.01);
  background: #3dce41;
}

.emp-index {
  width: 40px;
  height: 30px;
  border-radius: 50%;
  background: #0d6efd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  margin-right: 12px;
}

.emp-details {
  display: flex;
  flex-direction: column;
}

.emp-name {
  font-weight: 600;
}

.emp-type {
  font-size: 12px;
  color: gray;
}
  .employee-scroll-box {
  max-height: 320px;   
  overflow-y: auto;    
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width:600px;
  margin:0 auto
}
    `;
    document.head.appendChild(style);
    return () => {
      const styleElement = document.getElementById('welcome-page-styles');
      if (styleElement) document.head.removeChild(styleElement);
    };
  }, []);

  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foldersVisible, setFoldersVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeesVisible, setEmployeesVisible] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const email = getCurrentUserEmail();
    setUserEmail(email);
    if (!email) {
      setError('No user email found. Please log in again.');
      setTimeout(() => window.location.href = '/login', 2000);
    }
    loadEmployees();

  }, []);

  const getCurrentUserEmail = () => {
    try {
      const currentUserJSON = localStorage.getItem('currentUserEmail');
      if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);
        return currentUser.email || '';
      }
      return '';
    } catch (error) {

      setError(`Failed to load : ${error.message}`);
      return '';
    }
  };

  const loadFolders = async (email) => {
    setLoading(true);
    setError('');
    try {
      console.log('loading folders for email:', email);
      console.log('token:', localStorage.getItem('authToken'));
      const apiUrl = `${config.BASE_URL}/`;
      console.log('apiurl:', apiUrl);
      const token = localStorage.getItem('authToken');

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(apiUrl, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFolders(data);
      setFoldersVisible(true);
    } catch (error) {
      console.error('Error loading folders:', error);
      setError(`Failed to load folders: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

 

  const handleShowFolders = () => {
    setEmployeesVisible(false);
    setFoldersVisible((prev) => {
      const newState = !prev;
      if (!prev && userEmail) {
        loadFolders(userEmail);
      }
      return newState

    })
  }


  const loadEmployees = async () => {
    setEmployeesLoading(true);
    setError('');
    try {

      const token = localStorage.getItem('authToken');

      const headers = { 'Content-Type': 'application/json' };

      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${config.BASE_URL}/party/get-all-parties`, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.data || data.parties || []);
      setEmployeesVisible(true);
    } catch (error) {

      setError(`Failed to load employees: ${error.message}`);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const handleShowEmployees = () => {
    if (!employeesVisible) {
      loadEmployees();
    }
  };

 

 



  if (error && !userEmail) {
    return (
      <section className="welcome-page-container">
        <div className="welcome-main-layout">
          <Sidebar />
          <div className="welcome-container">
            <div className="welcome-card">
              <h2 className="welcome-title">Employee Home</h2>
              <div className="alert-danger">{error}</div>
              <p className="text-muted">Redirecting to login...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="welcome-page-container">
      <div className="welcome-main-layout">
        <Sidebar
          activePage="folders"
          onShowEmployees={handleShowEmployees}
          onShowFolders={handleShowFolders}
        />

        <div className="welcome-container">
          <div className="welcome-card">
            <h3 className="welcome-title">Employee Home</h3>

            {error && <div className="alert-danger">{error}</div>}

           

            {employeesVisible && (
              <div style={{ maxHeight: '400px' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search by name..."
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
                <div style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  overflowX: 'auto',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white'
                  }}>

                    <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                      <tr style={{ backgroundColor: '#007bff' }}>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}></th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>First Name</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Middle Name</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Last Name</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Party Type</th>

                      </tr>
                    </thead>


                    <tbody>
                      { /* {employees.length === 0 ? (
        <tr>
          <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
            No employees found.
          </td>
        </tr>
      ) : (*/




                        employees.filter(emp => {
                          const fullName = `${emp.first_name || ''} ${emp.middle_name || ''} ${emp.last_name || ''}`.toLowerCase();
                          return fullName.includes(searchTerm.toLowerCase());
                        }).length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
                              {searchTerm ? `No results found for "${searchTerm}"` : 'No employees found.'}
                            </td>
                          </tr>
                        ) : (

                          employees
                            .filter(emp =>
                              (emp.first_name || '').toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((emp, index) => (
                              <tr
                                key={emp.party_id || index}
                                onClick={() => {
                                  localStorage.setItem('selectedEmployee', JSON.stringify(emp));
                                  window.location.href = '/addEmployee';
                                }}
                                style={{
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #e9ecef',
                                  transition: '0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              >
                                <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{index + 1}</td>
                                <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.first_name || '-'}</td>
                                <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.middle_name || '-'}</td>
                                <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.last_name || '-'}</td>
                                <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.party_type || '-'}</td>

                              </tr>
                            ))
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}




            {/* Folders Section */}
            {foldersVisible && (
              <div className="folder-list">
                <h3 className="folder-section-title">Your Folders</h3>
                {loading ? (
                  <p className="text-muted">Loading folders...</p>
                ) : folders.length === 0 ? (
                  <p className="text-muted">No folders yet. Create your first folder above!</p>
                ) : (
                  <div className="folders-grid">
                    {folders.map((folder, index) => (
                      <div className="folder-item" key={folder.id || index}>
                        <h2 className="folder-name">{folder.parentFolderName}</h2>
                        <img
                          src="/assets/images/Folder_Image.png"
                          alt="Folder"
                          className="folder-icon"
                          onClick={() => selectFolder(folder)}
                          onError={(e) => { e.target.style.display = 'block'; }}
                        />
                        <div>
                          <button
                            type="button"
                            className="welcome-btn-danger"
                            onClick={() => deleteFolder(folder)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {foldersVisible && (
              <>
                {/* CREATE FOLDER */}
                <form onSubmit={createFolder} style={{ marginBottom: '2rem' }}>
                  <div className="welcome-input-group">
                    <input
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      className="welcome-form-control"
                      placeholder="Enter Folder Name"
                    />

                    <button type="submit" className="welcome-btn-primary">
                      Create Folder
                    </button>
                  </div>
                </form>

                {/* FOLDER LIST */}
                <div className="folder-list">
                  <h3 className="folder-section-title">Your Folders</h3>

                  {loading ? (
                    <p>Loading folders...</p>
                  ) : folders.length === 0 ? (
                    <p>No folders found.</p>
                  ) : (
                    <div className="folders-grid">
                      {folders.map((folder, index) => (
                        <div className="folder-item" key={index}>
                          <h2 className="folder-name">
                            {folder.doc_name || folder.parentFolderName}
                          </h2>

                          <img
                            src="/assets/images/Folder_Image.png"
                            className="folder-icon"
                            onClick={() => selectFolder(folder)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;