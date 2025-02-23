import React, { useEffect, useState } from 'react';
import styles from './GetAdminSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const GetAdminSection = () => {
  const dispatch = useDispatch();
  const { adminAuth } = useSelector(state => state.adminAuth);

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const users = adminAuth
    .filter(item => item.role === 'admin')
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredUsers = users.filter(item => {
    const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchesEmail = item.email.toLowerCase().includes(email.toLowerCase());
    return matchesName && matchesEmail;
  });

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditedData({ ...user });
  };

  const handleChange = (e, field) => {
    setEditedData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    if (!editingId) return;
    await dispatch(updateUserByAdmin({ id: editingId, userData: editedData }));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h1>Adminlər</h1>
        <div className={styles.searchBox}>
          <img src="data:image/png;base64,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" alt="" />
          <div className={styles.inputBox}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-poçt" />
          </div>
        </div>

        <div className={styles.tableBox}>
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Doğum tarixi</th>
                <th>Yaşadığı yer</th>
                <th>E-poçt</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>{editingId === user._id ? <input type="text" value={editedData.name || ''} onChange={(e) => handleChange(e, 'name')} /> : user.name}</td>
                    <td>{editingId === user._id ? <input type="text" value={editedData.lastName || ''} onChange={(e) => handleChange(e, 'lastName')} /> : user.lastName}</td>
                    <td>
                      {editingId === user._id ? (
                        <input
                          type="date"
                          value={editedData.dateOfBirth ? new Date(editedData.dateOfBirth).toISOString().split('T')[0] : ''}
                          onChange={(e) => handleChange(e, 'dateOfBirth')}
                        />
                      ) : user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''}
                    </td>           
                             <td>{editingId === user._id ? <input type="text" value={editedData.location || ''} onChange={(e) => handleChange(e, 'location')} /> : user.location}</td>
                    <td>{editingId === user._id ? <input type="email" value={editedData.email || ''} onChange={(e) => handleChange(e, 'email')} /> : user.email}</td>
                    <td>
                      <div className={styles.buttons}>
                        {editingId === user._id ? (
                          <>
                            <button onClick={handleSave}><MdSave /></button>
                            <button onClick={handleCancel}><MdCancel /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => dispatch(deleteUserByAdminThunk(user._id))}><MdDelete /></button>
                            <button onClick={() => handleEdit(user)}><MdModeEdit /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Heç bir admin tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAdminSection