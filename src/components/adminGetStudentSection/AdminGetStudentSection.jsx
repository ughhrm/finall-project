import React, { useEffect, useState } from 'react';
import styles from './AdminGetStudentSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const   AdminGetStudentSection = () => {
  const dispatch = useDispatch();
  const { adminAuth } = useSelector(state => state.adminAuth) || {}; // `undefined`-dan qorunmaq üçün

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const users = Array.isArray(adminAuth) ? adminAuth.filter(item => item.role === 'user') : [];

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
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////u7u4AAADt7e0EBqtK6ivjYlQitfyYe1VLfWX0lmqk1oTV0LImrAmroEdNWBPWhJ/XoyasCf/XhP8BifWHlNmisscAAAAASUVORK5CYII=" alt="user Icon" />
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

export default AdminGetStudentSection;
