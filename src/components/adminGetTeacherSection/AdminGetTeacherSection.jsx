import React, { useEffect, useState } from 'react';
import styles from './AdminGetTeacherSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByAdminThunk, getAllUsersByAdminThunk, updateUserByAdmin } from '../../redux/slice/adminAuthSlice';
import { MdDelete, MdModeEdit, MdSave, MdCancel } from "react-icons/md";

const AdminGetTeacherSection = () => {
  const dispatch = useDispatch();
  const { adminAuth } = useSelector(state => state.adminAuth);

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const teachers = adminAuth
    .filter(item => item.role === 'teacher')
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredTeachers = teachers.filter(item => {
    const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchesEmail = item.email.toLowerCase().includes(email.toLowerCase());
    return matchesName && matchesEmail;
  });

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setEditedData({ ...teacher });
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = (id) => {
    dispatch(updateUserByAdmin(id,editedData));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.searchBox}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZGtnERe-XiD68WXngZD9CcwvougwN8X0yaQ&s" alt="Teacher Icon" />
          <div className={styles.inputBox}>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad" />
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-poçt" />
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
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(teacher => (
                  <tr key={teacher._id}>
                    <td>{editingId === teacher._id ? <input type="text" value={editedData.name} onChange={(e) => handleChange(e, 'name')} /> : teacher.name}</td>
                    <td>{editingId === teacher._id ? <input type="text" value={editedData.lastName} onChange={(e) => handleChange(e, 'lastName')} /> : teacher.lastName}</td>
                    <td>{editingId === teacher._id ? <input type="date" value={editedData.dateOfBirth} onChange={(e) => handleChange(e, 'dateOfBirth')} /> : teacher.dateOfBirth}</td>
                    <td>{editingId === teacher._id ? <input type="text" value={editedData.location} onChange={(e) => handleChange(e, 'location')} /> : teacher.location}</td>
                    <td>{editingId === teacher._id ? <input type="email" value={editedData.email} onChange={(e) => handleChange(e, 'email')} /> : teacher.email}</td>
                    <td>{editingId === teacher._id ? <input type="text" value={editedData.programmingLanguage} onChange={(e) => handleChange(e, 'programmingLanguage')} /> : teacher.programmingLanguage}</td>
                    <td><button onClick={() => dispatch(deleteUserByAdminThunk(teacher._id))}><MdDelete /></button></td>
                    <td>
                      {editingId === teacher._id ? (
                        <>
                          <button onClick={()=>handleSave(teacher._id)}><MdSave /></button>
                          <button onClick={handleCancel}><MdCancel /></button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(teacher)}><MdModeEdit /></button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Heç bir müəllim tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGetTeacherSection;
