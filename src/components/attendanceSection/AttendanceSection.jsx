import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AttendanceSection.module.scss";
import { getStudentsByClass } from "../../redux/slice/adminAuthSlice";
import { getEvaluationsByGroupThunk, updateAttendanceThunk } from "../../redux/slice/evaluationSlice";
import moment from "moment";
import { MdModeEdit, MdSave, MdOutlineCancel } from "react-icons/md";

const AttendanceSection = () => {
  const dispatch = useDispatch();
  const { adminAuth, loading, error } = useSelector((state) => state.adminAuth);
  const { evaluations, loading: evalLoading, error: evalError } = useSelector((state) => state.evaluations);

  const [selectedClass, setSelectedClass] = useState(null);
  const [editableAttendance, setEditableAttendance] = useState({});
  const [editedAttendances, setEditedAttendances] = useState({});

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
      acc[studentId] = { studentId: evalData.studentId, attendances: {}, absenceCount: 0 };
    }
    const dateKey = moment.utc(evalData.gradeDate).local().add(1, 'day').format("YYYY-MM-DD");
    acc[studentId].attendances[dateKey] = { attendance: evalData.attendance, id: evalData._id };

    if (evalData.attendance !== 0) {
      acc[studentId].absenceCount += evalData.attendance;
    }
    
    return acc;
  }, {});

  const handleEdit = (studentId, date) => {
    setEditableAttendance({ studentId, date });
    setEditedAttendances({ ...editedAttendances, [`${studentId}-${date}`]: groupedEvaluations[studentId]?.attendances[date]?.attendance || "" });
  };

  const handleChange = (e, studentId, date) => {
    setEditedAttendances({ ...editedAttendances, [`${studentId}-${date}`]: e.target.value });
  };

  const handleSave = (studentId, date) => {
    const evaluation = groupedEvaluations[studentId]?.attendances[date];
    if (!evaluation || !evaluation.id) return;
    dispatch(updateAttendanceThunk({ id: evaluation.id, data: { attendance: editedAttendances[`${studentId}-${date}`] } }));
    setEditableAttendance({});
  };

  const handleCancel = () => {
    setEditableAttendance({});
    setEditedAttendances({});
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Yoxlama Cədvəli</h2>
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
                {formattedDates.map(date => (
                  <th key={date}>{moment(date, "YYYY-MM-DD").format("DD MMM YYYY")}</th>
                ))}
                <th>Ümumi Qayıb</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(groupedEvaluations).length > 0 ? (
                Object.values(groupedEvaluations).map(({ studentId, attendances, absenceCount }) => (
                  <tr key={studentId._id}>
                    <td>{studentId?.name}</td>
                    <td>{studentId?.lastName}</td>
                    {formattedDates.map(date => (
                      <td key={date} className={styles.scoreCell}>
                        {editableAttendance.studentId === studentId._id && editableAttendance.date === date ? (
                          <div>
                            <input
                              type="number"
                              value={editedAttendances[`${studentId._id}-${date}`] || ""}
                              onChange={(e) => handleChange(e, studentId._id, date)}
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
                            {attendances[date]?.attendance || "-"} <MdModeEdit className={styles.editIcon} />
                          </span>
                        )}
                      </td>
                    ))}
                    <td className={styles.absenceCell}>{absenceCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={formattedDates.length + 3}>Bu sinif və tarix üçün yoxlama tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceSection;
