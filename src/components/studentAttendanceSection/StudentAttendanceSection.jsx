import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StudentAttendanceSection.module.scss";
import { getEvaluationsByGroupforStudentThunk } from "../../redux/slice/evaluationSlice";
import moment from "moment";

const StudentAttendanceSection = () => {
  const dispatch = useDispatch();
  const { evaluations, loading, error } = useSelector((state) => state.evaluations);
  const { userAuth } = useSelector(state => state.userAuth);

  useEffect(() => {
    if (userAuth?._id) {
      dispatch(getEvaluationsByGroupforStudentThunk(userAuth._id));
    }
  }, [userAuth, dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error?.message}</p>;

  const formattedDates = [...new Set(evaluations.map(e => moment.utc(e.gradeDate).local().add(1, 'day').format("YYYY-MM-DD")))];
  
  const groupedEvaluations = evaluations.reduce((acc, evalData) => {
    const dateKey = moment.utc(evalData.gradeDate).local().add(1, 'day').format("YYYY-MM-DD");
    acc[dateKey] = { 
      attendance: evalData.attendance, 
      score: evalData.score 
    };
    return acc;
  }, {});

  const totalAbsences = Object.values(groupedEvaluations).reduce((sum, val) => sum + (val.attendance || 0), 0);
  const totalScores = Object.values(groupedEvaluations).reduce((sum, val) => sum + (val.score || 0), 0);
  const averageScore = Object.keys(groupedEvaluations).length > 0 ? (totalScores / Object.keys(groupedEvaluations).length).toFixed(2) : "-";

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Mənim Qayıblarım və Qiymətlərim</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tarix</th>
            <th>Qayıb</th>
            <th>Qiymət</th>
          </tr>
        </thead>
        <tbody>
          {formattedDates.length > 0 ? (
            formattedDates.map(date => (
              <tr key={date}>
                <td>{moment(date, "YYYY-MM-DD").format("DD MMM YYYY")}</td>
                <td>{groupedEvaluations[date]?.attendance ?? "-"}</td>
                <td>{groupedEvaluations[date]?.score ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Məlumat tapılmadı</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td><b>Ümumi Qayıb</b></td>
            <td className={`${styles.absenceCell} ${totalAbsences >= 13 && totalAbsences < 17 ? styles.yellowCell : ""} ${totalAbsences >= 17 && totalAbsences <= 20 ? styles.redCell : ""}`}>
              {totalAbsences}
            </td>
            <td><b>Orta Qiymət:</b> {averageScore}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StudentAttendanceSection;
