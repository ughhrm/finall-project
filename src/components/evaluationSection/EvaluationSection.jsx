import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EvaluationSection.module.scss";
import { getStudentsByClass } from "../../redux/slice/adminAuthSlice";
import { getEvaluationsByGroupThunk } from "../../redux/slice/evaluationSlice";

const EvaluationSection = () => {
  const dispatch = useDispatch();
  const { adminAuth, loading, error } = useSelector((state) => state.adminAuth);
  const { evaluations, loading:evalLoadin, error:evalError } = useSelector((state) => state.evaluations);
  
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getStudentsByClass());
  }, [dispatch]);
  
  useEffect(() => {
  dispatch(getEvaluationsByGroupThunk(selectedClass));
    }, [selectedClass]);
  

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Qiymətləndirmə Cədvəli</h2>

      <div className={styles.classList}>
        {Object.keys(adminAuth).map((className) => (
          <button
            key={className}
            onClick={() => setSelectedClass(className)}
            className={selectedClass === className ? styles.active : styles.classButton}
          >
            {className}
          </button>
        ))}
      </div>

      {selectedClass && (
        <div className={styles.tableBox}>
          <h3 className={styles.classTitle}>Qrup: {selectedClass}</h3>
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>grade</th>
                <th>attendance</th>
              </tr>
            </thead>
            <tbody>
            {evaluations.length > 0 ? (
                  evaluations.map((evalData) => (
                    <tr key={evalData._id}>
                      <td>{evalData.studentId?.name}</td>
                      <td>{evalData.studentId?.lastName}</td>
                      <td>{evalData.grade==null|| evalData.grade==0 ? 0: evalData.grade }</td>
                      <td>{evalData.attendance==null|| evalData.attendance==0 ? 0: evalData.attendance }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Bu sinif üçün qiymətləndirmə tapılmadı</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EvaluationSection;
