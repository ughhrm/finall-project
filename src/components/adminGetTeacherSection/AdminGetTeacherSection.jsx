import React, { useEffect, useState } from 'react';
import styles from './AdminGetTeacherSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const AdminGetUserSection = () => {
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
    .filter(item => item.role === 'teacher')
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
        <div className={styles.searchBox}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZGtnERe-XiD68WXngZD9CcwvougwN8X0yaQ&s" alt="User Icon" />
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
                <th>Proqramlaşdırma dili</th>
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
                    </td>                    <td>{editingId === user._id ? <input type="text" value={editedData.location || ''} onChange={(e) => handleChange(e, 'location')} /> : user.location}</td>
                    <td>{editingId === user._id ? <input type="email" value={editedData.email || ''} onChange={(e) => handleChange(e, 'email')} /> : user.email}</td>
                    <td>{editingId === user._id ? <input type="text" value={editedData.programmingLanguage || ''} onChange={(e) => handleChange(e, 'programmingLanguage')} /> : user.programmingLanguage}</td>
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
                  <td colSpan="7">Heç bir müəllim tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGetUserSection;
