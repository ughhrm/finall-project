import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GroupSection.module.scss";
import { getStudentsByClass } from "../../redux/slice/adminAuthSlice";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { adminAuth, loading, error } = useSelector((state) => state.adminAuth);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getStudentsByClass());
  }, [dispatch]);
  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;


 
  const filteredClasses = Object.keys(adminAuth).filter((className) =>
    className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Qruplar</h2>


        <input
          type="text"
          placeholder="Qrupu axtarın..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.tableBox}>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((className) => (
              <div key={className} className={styles.classSection}>
                <h3 className={styles.classTitle}>Qrup: {className}</h3>
                <div>
                <table>
                  <thead>
                    <tr>
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>Email</th>
                      <th>Doğum günü</th>
                      <th>Ünvan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(adminAuth[className])
                      ? adminAuth[className].map((student) => (
                        <tr key={student._id}>
                          <td className={`${styles.da}`}>{student.name}</td>
                          <td>{student.lastName}</td>
                          <td>{student.email}</td>
                          <td>{student.dateOfBirth}</td>
                          <td>{student.location}</td>
                        </tr>
                      ))
                      : <tr><td colSpan="5">Məlumat yoxdur</td></tr>}
                  </tbody>
                </table>
                </div>
              </div>
            ))
          ) : (
            <p>Uyğun qrup tapılmadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
