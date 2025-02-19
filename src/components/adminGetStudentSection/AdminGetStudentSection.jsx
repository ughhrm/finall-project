import React, { useEffect, useState } from 'react';
import styles from './AdminGetStudentSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const AdminGetuserSection = () => {
  const dispatch = useDispatch();
  const { adminAuth } = useSelector(state => state.adminAuth);

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const users = adminAuth
    .filter(item => item.role === 'user')
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredUsers = users.filter(item => {
    const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchesEmail = item.email.toLowerCase().includes(email.toLowerCase());
    const matchesRole = item.group.toLowerCase().includes(group.toLowerCase());
    return matchesName && matchesEmail && matchesRole;
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
          <img src="data:image/png;base64,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" alt="user Icon" />
          <div className={styles.inputBox}>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad" />
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-poçt" />
            <input type="text" name="group" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Qrup" />
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
                <th>Qrup</th>
                <th>Proqramlaşdırma dili</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      {editingId === user._id ? (
                        <input type="text" value={editedData.name || ''} onChange={(e) => handleChange(e, 'name')} />
                      ) : user.name}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input type="text" value={editedData.lastName || ''} onChange={(e) => handleChange(e, 'lastName')} />
                      ) : user.lastName}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input
                        type="date"
                        value={editedData.dateOfBirth ? new Date(editedData.dateOfBirth).toISOString().split('T')[0] : ''} 
                        onChange={(e) => handleChange(e, 'dateOfBirth')}
                      />
                      ) : user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input type="text" value={editedData.location || ''} onChange={(e) => handleChange(e, 'location')} />
                      ) : user.location}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input type="email" value={editedData.email || ''} onChange={(e) => handleChange(e, 'email')} />
                      ) : user.email}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input type="text" value={editedData.group || ''} onChange={(e) => handleChange(e, 'group')} />
                      ) : user.group}
                    </td>
                    <td>
                      {editingId === user._id ? (
                        <input type="text" value={editedData.programmingLanguage || ''} onChange={(e) => handleChange(e, 'programmingLanguage')} />
                      ) : user.programmingLanguage}
                    </td>
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
                  <td colSpan="8">Heç bir tələbə tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGetuserSection;
