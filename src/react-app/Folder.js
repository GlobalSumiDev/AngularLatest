import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import config from './config';
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FolderPage = () => {
  const fileInputRef = useRef(null);
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [partyFolders, setPartyFolders] = useState([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [currentPartyId, setCurrentPartyId] = useState(null);

  // ── File/Subfolder states
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [subFoldersLoading, setSubFoldersLoading] = useState(false);
  const [subFolderName, setSubFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState('parties');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const [folderHistory, setFolderHistory] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'folder-page-styles';
    style.innerHTML = `
      #react-root {
        padding: 0 !important;
        margin: 0 !important;
        background-color: #eee;
        overflow-x: hidden;
        width: 100% !important;
        max-width: 100% !important;
      }
      .folder-page-container {
        background-color: #eee;
        min-height: 60vh;
        padding-top: 120px;
        margin: 0 !important;
        width: 100% !important;
      }
      .folder-main-layout {
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;
        gap: 1rem;
      }
      .folder-content {
        flex: 1;
        max-width: 100%;
        margin: 0;
        padding: 0 1rem;
      }
      .folder-title {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
      }
      .folders-grid {
        display: flex;
        flex-direction: column;
         }
     .folder-item {
        display: flex;
         justify-content: space-between;
        align-items: center;
         width: 80%;
        padding: 10px 15px;
       
        }
      .folder-name {
        margin: 0;
        font-size:16px;
      }
        .folder-left {
        display:flex;
        align-items: center;
        gap: 12px;
        }
      .folder-icon {
        width: 20px;
        height: 30px;
        cursor: pointer;
        display: block;
        transition: transform 0.2s;
      }
      .folder-icon:hover {
        transform: scale(1.05);
      }
      .welcome-input-group {
        display: flex;
        max-width: 80%;
        margin-bottom: 1.5rem;
        gap: 10px;
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
        border-radius: 0.25rem;
       
      }
      .delete-btn{
      margin-right: 10%; 
      border:none;
      }
      .delete{
      
  margin-right: 28%;   
  border:none;
  

      }
      .welcome-btn-primary:hover { background-color: #0056b3; }
      .section-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;
        
      }
      .file-table {
        width: 72%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        margin-bottom: 2rem;
      }
      .file-table th {
        background-color: #007bff;
        color: white;
        padding: 0.50rem 
        text-align: left;
        font-weight: 600;
        font-size: 0.95rem;
      }
   
      .file-table td {
       padding: 0.50rem 
        border-bottom: 1px solid #e9ecef;
        font-size: 0.95rem;
        color: #333;
      }
      .file-table tr:last-child td { border-bottom: none; }
      .file-table tr:hover td { background-color: #f8f9fa; }
      .btn-back {
        padding: 0.5rem 1rem;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        margin-right: 0.5rem;
      }
      .btn-back:hover { background-color: #5a6268; }
      .file-actions {
         display: flex;
         align-items: center;  
         gap: 10px;
      }
      .btn-download {
       background: transparent;
        color: black;
        border: none;
       cursor: pointer;
        font-size: 0.85rem;
        margin-right: 0.5rem;
      }
      .btn-download:hover { color: #138496; }
      .btn-delete-file {
        border: none;
        cursor: pointer;
        background: transparent;
        width:50px;
        height:30px;
         margin-left: 40%; 
      }
      
      .upload-section {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        align-items: center;
        flex-wrap: wrap;
      }
      .upload-input {
        flex: 1;
        padding: 0.6rem 1rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        font-size: 1rem;
        max-width: 72%;
        background-color: white;
      }
      .btn-upload {
        padding: 0.6rem 1.5rem;
        background-color: '#28a745';
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 1rem;
        white-space: nowrap;
        background-color: #28a745;
      }
      .btn-upload:hover { background-color: #218838; }
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        color: #6c757d;
        flex-wrap: wrap;
      }
      .breadcrumb-item {
        cursor: pointer;
        color: #007bff;
      }
      .breadcrumb-item:hover { text-decoration: underline; }
      .breadcrumb-separator { color: #6c757d; }
      .alert-danger {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
        padding: 1rem;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
      }
    `;
    if (!document.getElementById('folder-page-styles')) {
      document.head.appendChild(style);
    }
    return () => {
      const styleElement = document.getElementById('folder-page-styles');
      if (styleElement) document.head.removeChild(styleElement);
    };
  }, []);

  const handleBack = () => { if (window.history.length > 1) navigate(-1); else navigate("/"); };
  useEffect(() => {
    const fetchUserInfoAndParties = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const meRes = await fetch(`${config.BASE_URL}/user/me`, { headers });
        const meData = await meRes.json();
        setCurrentUserRole(meData.role || '');

        setEmployeesLoading(true);
        const partiesRes = await fetch(`${config.BASE_URL}/party/get-all-parties`, { headers });
        if (!partiesRes.ok) throw new Error(`HTTP error! status: ${partiesRes.status}`);
        const partiesData = await partiesRes.json();
        const parties = Array.isArray(partiesData) ? partiesData : [];
        setEmployees(parties);

        // ← User role: auto-load their own folders
        if (meData.role?.toLowerCase() === 'user' && parties.length > 0) {
          const partyId = parties[0].party_id;
          setCurrentPartyId(partyId);
          setSelectedPartyId(partyId);
          setSelectedEmployee(parties[0]);
          setView('folders');
          loadPartyFolders(partyId, headers);
        }

      } catch (err) {
        console.error('Error fetching info:', err);
        setError(`Failed to load: ${err.message}`);
      } finally {
        setEmployeesLoading(false);
      }
    };

    fetchUserInfoAndParties();
  }, []);

  // ── Load root folders for a party
  const loadPartyFolders = async (partyId, existingHeaders = null) => {
    setFoldersLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const headers = existingHeaders || { 'Content-Type': 'application/json' };
      if (!existingHeaders && token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/folders/party/${partyId}`, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const rootFolders = (Array.isArray(data) ? data : []).filter(item => {
        return item.parent_id == null;
      });

      setPartyFolders(rootFolders);
    }
    catch (error) {
      setError(`Failed to load folders: ${error.message}`);
    } finally {
      setFoldersLoading(false);
    }
  };

  const loadSubFolders = async (folder) => {
    setSubFoldersLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/folders/party/${selectedPartyId}`, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('all items:', data);


      const filtered = Array.isArray(data)
        ? data.filter(item =>
          item.parent_id === folder.item_id &&
          item.file_size === null
        )
        : [];

      console.log('subfolders:', filtered);
      setSubFolders(filtered);

    } catch (error) {
      setError(`Failed to load subfolders: ${error.message}`);
    } finally {
      setSubFoldersLoading(false);
    }
  };

  // ── Load files inside a folder 
  const loadFiles = async (folder) => {
    setFilesLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${config.BASE_URL}/folders/party/${selectedPartyId}`, { headers });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('all folder items:', data);


      const filtered = Array.isArray(data)
        ? data.filter(item =>
          item.parent_id === folder.item_id &&
          item.file_path
        )
        : [];

      console.log('files:', filtered);
      setFiles(filtered);

    } catch (error) {
      setError(`Failed to load files: ${error.message}`);
    } finally {
      setFilesLoading(false);
    }
  };

  // ── Create root folder
  const createFolder = async (e) => {
    e.preventDefault();
    const trimmedName = folderName.trim();
    if (!trimmedName) { alert('Please enter a folder name.'); return; }
    if (!selectedPartyId) { alert('No party selected.'); return; }

    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const url = `${config.BASE_URL}/folders/create-folder?party_id=${selectedPartyId}&item_name=${encodeURIComponent(trimmedName)}`;
      const response = await fetch(url, { method: 'POST', headers });
      const responseText = await response.text();
      console.log('create folder response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);

      alert(`Folder '${trimmedName}' created successfully!`);
      setFolderName('');
      loadPartyFolders(selectedPartyId);
    } catch (error) {
      alert(`Failed to create folder: ${error.message}`);
    }
  };

  // ── Create subfolder inside selected folder 
  const createSubFolder = async (e) => {
    e.preventDefault();
    const trimmedName = subFolderName.trim();
    if (!trimmedName) { alert('Please enter a folder name.'); return; }


    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      //  Same API as create folder + parent_id
      const url = `${config.BASE_URL}/folders/create-folder?party_id=${selectedPartyId}&item_name=${encodeURIComponent(trimmedName)}&parent_id=${selectedFolder.item_id}`;

      console.log('creating subfolder url:', url);
      console.log('parent folder:', selectedFolder);

      const response = await fetch(url, {
        method: 'POST',
        headers,
      });

      const responseText = await response.text();
      console.log('create subfolder response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);

      alert(`Subfolder '${trimmedName}' created successfully!`);
      setSubFolderName('');
      loadSubFolders(selectedFolder);

    } catch (error) {
      console.error('Error creating subfolder:', error);
      alert(`Failed to create subfolder: ${error.message}`);
    }
  };

  // ── Upload file 
  const uploadFile = async () => {
    if (!selectedFile) { alert('Please select a file first.'); return; }
    if (!selectedPartyId) { alert('No party selected.'); return; }
    if (!selectedFolder) { alert('No folder selected.'); return; }

    setUploading(true);
    try {
      const token = localStorage.getItem('authToken');


      const formData = new FormData();
      formData.append('file', selectedFile);


      const url = `${config.BASE_URL}/folders/upload-file?party_id=${selectedPartyId}&parent_id=${selectedFolder.item_id}`;

      console.log('uploading file:', selectedFile.name);
      console.log('upload url:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`

        },
        body: formData
      });

      const responseText = await response.text();
      console.log('upload response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);

      alert(`File '${selectedFile.name}' uploaded successfully!`);


      setSelectedFile(null);

      setFileInputKey(prev => prev + 1);  // ← forces file input to reset
      loadFiles(selectedFolder);



      loadFiles(selectedFolder);

    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };


  const downloadFile = async (file) => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      console.log('downloading file:', file.item_name);
      const url = `${config.BASE_URL}/folders/download?item_id=${file.item_id}`;
      console.log('download url:', url);

      const response = await fetch(url, { headers });
      console.log('download response status:', response.status);

      if (!response.ok) throw new Error(`Failed: ${response.status}`);


      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.item_name || 'download';
      document.body.appendChild(a);
      a.click();


      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Download error:', error);
      alert(`Failed to download: ${error.message}`);
    }
  };






  const deleteFolder = (folder) => {
    setItemToDelete({ ...folder, deleteType: 'folder' });
    setShowDeleteConfirm(true);
  };

  const deleteFile = (file) => {
    setItemToDelete({ ...file, deleteType: 'file' });
    setShowDeleteConfirm(true);
  };


  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      //  Same API for both file and folder
      const url = `${config.BASE_URL}/folders/delete?item_id=${itemToDelete.item_id}`;
      console.log('delete url:', url);

      const response = await fetch(url, { method: 'DELETE', headers });
      const responseText = await response.text();
      console.log('delete response:', responseText);

      if (!response.ok) throw new Error(`Failed: ${responseText}`);

      setShowDeleteConfirm(false);
      setItemToDelete(null);


      if (itemToDelete.deleteType === 'file') {
        loadFiles(selectedFolder);
      } else {

        if (view === 'files') {
          loadSubFolders(selectedFolder);
        } else {
          loadPartyFolders(selectedPartyId);
        }
      }

    } catch (error) {
      alert(`Failed to delete: ${error.message}`);
    }
  };




  const selectFolder = (folder) => {
    setFolderHistory(prev => [...prev, folder]);
    setSelectedFolder(folder);
    setView('files');
    setFiles([]);
    setSubFolders([]);
    loadFiles(folder);
    loadSubFolders(folder);
    console.log('selected folder:', folder);
  };

  const isAdmin = currentUserRole.toLowerCase() === 'admin';

  return (
    <section className="folder-page-container">



      <div className="folder-main-layout">



        {/* ── Sidebar */}
        <div style={{ width: '240px' }}>
          <Sidebar
            activePage="folders"
            onShowEmployees={() => window.location.href = '/welcomePage'}
            onShowFolders={() => window.location.href = '/folderPage'}
            onShowUsers={() => window.location.href = '/userPage'}
          />
        </div>

        {/* ── Main Content */}
        <div className="folder-content">
          <h3 className="folder-title">Folder Home</h3>
          {/* Back Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button type="button" onClick={handleBack}
              style={{ color: 'white', borderRadius: '70px', width: '50px', height: '40px', backgroundColor: "#3dce41", border: 'none', cursor: 'pointer' }}>
              ←
            </button>

          </div>
          {error && <div className="alert-danger">{error}</div>}

          {/* ── Breadcrumb Navigation */}
          <div className="breadcrumb">
            {/* ← Home */}
            <span className="breadcrumb-item"
              onClick={() => {
                setView('parties');
                setSelectedPartyId(null);
                setSelectedEmployee(null);
                setSelectedFolder(null);
                setFolderHistory([]);
              }}>
              🏠 Home
            </span>

            {/* ← Employee name */}
            {selectedEmployee && (
              <>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-item"
                  onClick={() => {
                    setView('folders');
                    setSelectedFolder(null);
                    setFolderHistory([]);
                  }}>
                  👤 {selectedEmployee.first_name} {selectedEmployee.last_name}
                </span>
              </>
            )}

            {/* ← Show full folder path from history */}
            {folderHistory.map((folder, index) => (
              <React.Fragment key={index}>
                <span className="breadcrumb-separator">›</span>
                {index === folderHistory.length - 1 ? (

                  <span style={{ color: '#333' }}>
                    📁 {folder.item_name}
                  </span>
                ) : (

                  <span className="breadcrumb-item"
                    onClick={() => {

                      const newHistory = folderHistory.slice(0, index + 1);
                      setFolderHistory(newHistory);
                      setSelectedFolder(folder);
                      setView('files');
                      setFiles([]);
                      setSubFolders([]);
                      loadFiles(folder);
                      loadSubFolders(folder);
                    }}>
                    📁 {folder.item_name}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ════════════════════════════════════
              VIEW 1 — Admin: Employee List
          ════════════════════════════════════ */}
          {isAdmin && view === 'parties' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="🔍 Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    border: '1px solid #ced4da', borderRadius: '0.5rem',
                    fontSize: '1rem', boxSizing: 'border-box',
                    outline: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr style={{ backgroundColor: '#007bff' }}>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>#</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>First Name</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Middle Name</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Last Name</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'center', color: 'white', fontWeight: '600' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesLoading ? (
                      <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>Loading...</td></tr>
                    ) : employees
                      .filter(emp => (emp.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()))
                      .length === 0 ? (
                      <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
                        {searchTerm ? `No results for "${searchTerm}"` : 'No employees found.'}
                      </td></tr>
                    ) : (
                      employees
                        .filter(emp => (emp.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((emp, index) => (
                          <tr key={emp.party_id || index}
                            style={{ borderBottom: '1px solid #e9ecef', backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8f9fa'}>
                            <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{index + 1}</td>
                            <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.first_name || '-'}</td>
                            <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.middle_name || '-'}</td>
                            <td style={{ padding: '0.75rem 1rem', color: '#333' }}>{emp.last_name || '-'}</td>
                            <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                              <button type="button"
                                onClick={() => {
                                  setSelectedPartyId(emp.party_id);
                                  setSelectedEmployee(emp);
                                  setView('folders');
                                  loadPartyFolders(emp.party_id);
                                }}
                                style={{ padding: '0.4rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                📁 View Folders
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              VIEW 2 — Folder List + Create Folder
          ════════════════════════════════════ */}
          {view === 'folders' && selectedPartyId && (
            <div>
              {/* Employee name */}
              {selectedEmployee && (
                <h5 style={{ color: '#333' }}>
                  👤 {selectedEmployee.first_name} {selectedEmployee.last_name}'s Folders
                </h5>
              )}

              {/* Create Folder Form */}
              <div >
                <h6 className="section-title">📂 Create Folder</h6>
                <form onSubmit={createFolder}>
                  <div className="welcome-input-group">
                    <input
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      className="welcome-form-control"
                      placeholder="Enter Folder Name"
                    />
                    <button type="submit" className="welcome-btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>

              {/* Folders Grid */}
              <h6 className="section-title">📁 Existing Folders</h6>
              {foldersLoading ? (
                <p style={{ color: '#6c757d' }}>Loading folders...</p>
              ) : partyFolders.length === 0 ? (
                <p style={{ color: '#6c757d', padding: '1rem', borderRadius: '0.5rem' }}>
                  No folders found. Create your first folder above!
                </p>
              ) : (
                <div className="folders-grid">
                  {partyFolders.map((folder, index) => (
                    <div className="folder-item" key={index}>

                      <div className="folder-left">
                        <img
                          src="/assets/images/Folder_Image.png"
                          className="folder-icon"
                          alt="Folder"
                          onClick={() => selectFolder(folder)}
                        />

                        <p className="folder-name">
                          {folder.item_name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteFolder(folder)}
                        className="delete-btn"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════
              VIEW 3 — Files + SubFolders inside a folder
          ════════════════════════════════════ */}
          {view === 'files' && selectedFolder && (
            <div>
              
              <h6 style={{ color: '#333' }}>
                📁 {selectedFolder.item_name}
              </h6>

              {/* ── Upload File Section */}
              <div >
                <h6 className="section-title">📤 Upload File</h6>
                <div className="upload-section">
                  <input
                    type="file"
                    className="upload-input"
                    key={fileInputKey}
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                  />
                  <button
                    className="btn-upload"
                    onClick={uploadFile}
                    disabled={uploading}>
                    {uploading ? 'Uploading...' : '⬆️ Upload File'}
                  </button>
                </div>
              </div>

              {/* ── Files List */}
              <div >
                <h6 className="section-title">📄 Uploaded Files</h6>
                {filesLoading ? (
                  <p style={{ color: '#6c757d' }}>Loading files...</p>
                ) : files.length === 0 ? (
                  <p style={{ color: '#6c757d', textAlign: 'center', padding: '2rem' }}>
                    No files uploaded yet.
                  </p>
                ) : (
                  <table className="file-table">
                    <thead>
                      <tr>
                        <th style={{ width: '.5%' }}>#</th>
                        <th style={{ width: '15%' }}>File Name</th>
                        <th style={{ width: '10%' }}>Size</th>
                        <th style={{ width: '15%' }}>Upload Time</th>
                        <th style={{ width: '15%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td
                            title={file.item_name}
                            style={{
                              maxWidth: '0',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              padding: '0.75rem 1rem'
                            }}
                          >📄 {file.item_name || file.file_name || '-'}</td>
                          <td>{file.file_size ? `${(file.file_size / 1024).toFixed(2)} KB` : '-'}</td>
                          <td>{file.uploaded_date || file.uploadTime || '-'}</td>
                          <td>
                            <div className="file-actions">

                              <button className="btn-download" onClick={() => downloadFile(file)}>
                                ⬇️ Download
                              </button>
                              <button
                                className="btn-delete-file"
                                onClick={() => deleteFile(file)}
                              >
                                <FaTrash color="black" size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* ── Create SubFolder Section */}
              <div >
                <h6 className="section-title">📂 Create Sub Folder</h6>
                <form onSubmit={createSubFolder}>
                  <div className="welcome-input-group">
                    <input
                      type="text"
                      value={subFolderName}
                      onChange={(e) => setSubFolderName(e.target.value)}
                      className="welcome-form-control"
                      placeholder="Enter Sub Folder Name"
                    />
                    <button type="submit" className="welcome-btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>

              {/* ── SubFolders List */}

              {subFoldersLoading ? (
                <p style={{ color: '#6c757d' }}>Loading subfolders...</p>
              ) : subFolders.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h6 className="section-title">📂 Sub Folders</h6>
                  <div >
                    {subFolders.map((folder, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        borderBottom: index < subFolders.length - 1 ? '1px solid #e9ecef' : 'none',
                        cursor: 'pointer',
                        transition: '0.2s ease',

                      }}

                      >
                        {/* ← Folder icon */}
                        <img
                          src="/assets/images/Folder_Image.png"
                          alt="Folder"
                          style={{
                            width: '35px',
                            height: '30px',
                            marginRight: '1rem',
                            backgroundColor: 'white'
                          }}
                          onClick={() => selectFolder(folder)}
                        />

                        {/* ← Folder name */}
                        <span
                          onClick={() => selectFolder(folder)}
                          style={{ flex: 1, fontSize: '0.95rem' }}>
                          {folder.item_name}
                        </span>

                        {/* ← Delete button */}
                        <button
                          type="button"
                          onClick={() => deleteFolder(folder)}
                          className="delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      {/* ── Shared Delete Confirmation Modal */}
      {showDeleteConfirm && itemToDelete && (
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            width: '380px',
            maxWidth: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            {/* Icon — different for file vs folder */}
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {itemToDelete.deleteType === 'file' ? '📄' : '🗑️'}
            </div>

            {/* Title — different for file vs folder */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#333' }}>
              Delete {itemToDelete.deleteType === 'file' ? 'File' : 'Folder'}
            </h3>

            {/* Message */}
            <p style={{ color: '#6c757d', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Are you sure you want to delete <strong>'{itemToDelete.item_name}'</strong>?

            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => { setShowDeleteConfirm(false); setItemToDelete(null); }}
                style={{
                  flex: 1, padding: '0.75rem',
                  backgroundColor: 'white', color: '#333',
                  border: '2px solid #dee2e6',
                  borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: '500'
                }}>
                No, Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                style={{
                  flex: 1, padding: '0.75rem',
                  backgroundColor: '#dc3545', color: 'white',
                  border: 'none', borderRadius: '0.5rem',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: '500'
                }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FolderPage;



