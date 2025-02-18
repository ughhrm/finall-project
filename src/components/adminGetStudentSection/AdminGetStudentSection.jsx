import React, { useEffect, useState } from 'react';
import styles from './AdminGetStudentSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const AdminGetStudentSection = () => {
  const dispatch = useDispatch();
  const { adminAuth } = useSelector(state => state.adminAuth);

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const students = adminAuth
    .filter(item => item.role === 'user')
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredStudents = students.filter(item => {
    const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchesEmail = item.email.toLowerCase().includes(email.toLowerCase());
    const matchesRole = item.role.toLowerCase().includes(role.toLowerCase());
    return matchesName && matchesEmail && matchesRole;
  });

  const handleEdit = (student) => {
    setEditingId(student._id);
    setEditedData({ ...student });
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
          <img src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-student-glyph-black-icon-png-image_691145.jpg" alt="Student Icon" />
          <div className={styles.inputBox}>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad" />
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-poçt" />
            <input type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Qrup" />
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student._id}>
                    <td>
                      {editingId === student._id ? (
                        <input type="text" value={editedData.name || ''} onChange={(e) => handleChange(e, 'name')} />
                      ) : student.name}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input type="text" value={editedData.lastName || ''} onChange={(e) => handleChange(e, 'lastName')} />
                      ) : student.lastName}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input
                        type="date"
                        value={editedData.dateOfBirth ? new Date(editedData.dateOfBirth).toISOString().split('T')[0] : ''} 
                        onChange={(e) => handleChange(e, 'dateOfBirth')}
                      />
                      ) : student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : ''}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input type="text" value={editedData.location || ''} onChange={(e) => handleChange(e, 'location')} />
                      ) : student.location}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input type="email" value={editedData.email || ''} onChange={(e) => handleChange(e, 'email')} />
                      ) : student.email}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input type="text" value={editedData.group || ''} onChange={(e) => handleChange(e, 'group')} />
                      ) : student.group}
                    </td>
                    <td>
                      {editingId === student._id ? (
                        <input type="text" value={editedData.programmingLanguage || ''} onChange={(e) => handleChange(e, 'programmingLanguage')} />
                      ) : student.programmingLanguage}
                    </td>
                    <td>
                    <div className={styles.buttons}>
                      {editingId === student._id ? (
                        <>
                          <button onClick={handleSave}><MdSave /></button>
                          <button onClick={handleCancel}><MdCancel /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => dispatch(deleteUserByAdminThunk(student._id))}><MdDelete /></button>
                          <button onClick={() => handleEdit(student)}><MdModeEdit /></button>
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
