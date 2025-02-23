import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentEvaluationsThunk } from "../../redux/slice/evaluationSlice";
import moment from "moment";
import styles from "./StudentAttendanceSection.module.scss";
import { getUserAuthThunk } from "../../redux/slice/userAuthSlice";

const StudentAttendanceSection = () => {
  const dispatch = useDispatch();
  const { evaluations, loading, error } = useSelector((state) => state.evaluations);
  const { userAuth } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getUserAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    if (userAuth && userAuth._id) {
      dispatch(getStudentEvaluationsThunk(userAuth._id));
    }
  }, [userAuth, dispatch]);

  if (loading) return <p className={styles.loadingText}>Yüklənir...</p>;
  if (error) return <p>Xəta: {error?.message}</p>;

  const evaluationList = evaluations?.evaluations ?? [];

  const totalAttendance = evaluationList.reduce((sum, evalData) => sum + (evalData.attendance || 0), 0);
  const averageScore = evaluationList.length > 0
    ? (evaluationList.reduce((sum, evalData) => sum + (evalData.score || 0), 0) / evaluationList.length).toFixed(2)
    : "-";

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
          {evaluationList.length > 0 ? (
            evaluationList.map((evalData) => (
              <tr key={evalData._id}>
                <td>{moment(evalData.gradeDate).format("DD MMM YYYY")}</td>
                <td>{evalData.attendance ?? "-"}</td>
                <td>{evalData.score ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Məlumat tapılmadı</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.summary}>
        <table className={styles.table}>
         
          <tbody>
            <tr>
              <td>Cemi qayib: {totalAttendance}</td>
              <td>Orta qiymet: {averageScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendanceSection;
