import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TeacherEvaluation.module.scss";
import { getStudentsByClass } from "../../redux/slice/adminAuthSlice";
import { getEvaluationsByGroupThunk, updateEvaluationThunk, createEvaluationThunk } from "../../redux/slice/evaluationSlice";
import moment from "moment";
import { MdModeEdit, MdSave, MdOutlineCancel } from "react-icons/md";

const TeacherEvaluation = () => {
  const dispatch = useDispatch();
  const { adminAuth, loading, error } = useSelector((state) => state.adminAuth);
  const { evaluations, loading: evalLoading, error: evalError } = useSelector((state) => state.evaluations);

  const [selectedClass, setSelectedClass] = useState(null);
  const [editableScore, setEditableScore] = useState({});
  const [editedScores, setEditedScores] = useState({});
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    dispatch(getStudentsByClass());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClass) {
      dispatch(getEvaluationsByGroupThunk(selectedClass));
    }
  }, [selectedClass, dispatch]);

  if (loading || evalLoading) return <p>Yüklənir...</p>;
  if (error || evalError) return <p>Xəta: {error?.message || evalError?.message}</p>;

  const formattedDates = [...new Set(evaluations.map(e => moment.utc(e.gradeDate).local().add(1, 'day').format("YYYY-MM-DD")))];

  const groupedEvaluations = evaluations.reduce((acc, evalData) => {
    const studentId = evalData.studentId?._id;
    if (!acc[studentId]) {
      acc[studentId] = { studentId: evalData.studentId, scores: {} };
    }
    acc[studentId].scores[moment.utc(evalData.gradeDate).local().add(1, 'day').format("YYYY-MM-DD")] = {
      score: evalData.score, id: evalData._id
    };
    return acc;
  }, {});

  const handleEdit = (studentId, date) => {
    setEditableScore({ studentId, date });
    setEditedScores({ ...editedScores, [`${studentId}-${date}`]: groupedEvaluations[studentId]?.scores[date]?.score || "" });
  };

  const handleSave = (studentId, date) => {
    const evaluation = groupedEvaluations[studentId]?.scores[date];
    if (!evaluation || !evaluation.id) return;

    dispatch(updateEvaluationThunk({ id: evaluation.id, data: { score: Number(editedScores[`${studentId}-${date}`]) } }));
    setEditableScore({});
  };

  const handleCancel = () => {
    setEditableScore({});
    setEditedScores({});
  };

  const handleAddDay = () => {
    if (!selectedClass || !newDate) return;
    dispatch(createEvaluationThunk({ group: selectedClass, gradeDate: newDate }))
      .then(() => dispatch(getEvaluationsByGroupThunk(selectedClass))); 
    setNewDate("");
  };

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
          <div className={styles.addDayContainer}>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button className={styles.addDayButton} onClick={handleAddDay}>
              Yeni Gün Əlavə Et
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                {formattedDates.map(date => (
                  <th key={date}>{moment(date, "YYYY-MM-DD").format("DD MMM YYYY")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(groupedEvaluations).length > 0 ? (
                Object.values(groupedEvaluations).map(({ studentId, scores }) => (
                  <tr key={studentId._id}>
                    <td>{studentId?.name}</td>
                    <td>{studentId?.lastName}</td>
                    {formattedDates.map(date => (
                      <td key={date} className={styles.scoreCell}>
                        {editableScore.studentId === studentId._id && editableScore.date === date ? (
                          <div>
                            <input
                              type="number"
                              value={editedScores[`${studentId._id}-${date}`] || ""}
                              onChange={(e) => setEditedScores({ ...editedScores, [`${studentId._id}-${date}`]: e.target.value })}
                              autoFocus
                            />
                            <button className={styles.saveBtn} onClick={() => handleSave(studentId._id, date)}>
                              <MdSave />
                            </button>
                            <button className={styles.cancelBtn} onClick={handleCancel}>
                              <MdOutlineCancel />
                            </button>
                          </div>
                        ) : (
                          <span onClick={() => handleEdit(studentId._id, date)}>
                            {scores[date]?.score || "-"} <MdModeEdit className={styles.editIcon} />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={formattedDates.length + 2}>Bu sinif və tarix üçün qiymətləndirmə tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherEvaluation;
