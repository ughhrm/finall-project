import EvaluationModel from "../models/evaluationModel.js";
import UserModel from "../models/userModel.js";

const createEvaluation = async (req, res) => {
    try {
        const { group, gradeDate } = req.body;

        const students = await UserModel.find({ group: group, role: "user"})

        if (!students.length) {
            return res.status(404).json({ message: "Bu qrupda tələbə tapılmadı" });
        }
        
      
        const evaluations = students.map(student => ({
            name:student._name,
            studentId: student._id,
            score: 0,
            attendance: 0,
            gradeDate: gradeDate || new Date()
        }));

        await EvaluationModel.insertMany(evaluations);

            res.status(200).json({ message: "Qiymət cədvəli yaradıldı", evaluations });
        } catch (error) {
            console.error("Qiymət cədvəli yaratma xətası:", error);
            res.status(500).json({ message: "Xəta baş verdi", error });
        }
    };


    const updateEvaluation = async (req, res) => {
        try {
            const { id } = req.params; 
            const { score } = req.body;
    
            if (score === undefined) {
                return res.status(400).json({ message: "Qiymət daxil edilməlidir" });
            }
    
            const updatedEvaluation = await EvaluationModel.findByIdAndUpdate(
                id,
                { score },
                { new: true, runValidators: true }
            );
    
            if (!updatedEvaluation) {
                return res.status(404).json({ message: "Qiymət tapılmadı" });
            }
    
            res.status(200).json({ updatedEvaluation });
        } catch (error) {
            console.error("Qiymət yeniləmə xətası:", error);
            res.status(500).json({ message: "Xəta baş verdi", error });
        }
    };
    


    const updateAttendance = async (req, res) => {
        try {
            const { id } = req.params;
            const { attendance } = req.body;
    
            if (attendance === undefined) {
                return res.status(400).json({ message: "Qayıb daxil edilməlidir" });
            }
    
            const updatedAttendance = await EvaluationModel.findByIdAndUpdate(
                id,
                { attendance },
                { new: true, runValidators: true }
            );
    
            if (!updatedAttendance) {
                return res.status(404).json({ message: "Qayıb tapılmadı" });
            }
    
            res.status(200).json({ updatedAttendance });
        } catch (error) {
            console.error("Qayıb yeniləmə xətası:", error);
            res.status(500).json({ message: "Xəta baş verdi", error });
        }
    };


    export const getEvaluationsForStudent = async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: "Tələbə ID-si göndərilməyib" });
            }
    
            const student = await UserModel.findById(id).select("email group name lastName");
            if (!student) {
                return res.status(404).json({ message: "Tələbə tapılmadı" });
            }
    
            const evaluations = await EvaluationModel.find({ studentId: id });
    
            return res.json({
                studentInfo: student, 
                evaluations: evaluations 
            });
    
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            res.status(500).json({ message: "Server xətası" });
        }
    };
    
    
   const getEvaluationsByGroup = async (req, res) => {
    try {
        const { group } = req.params;
        console.log("sdddsd")

        if (!group) {
            return res.status(400).json({ message: "Qrup adı tələb olunur" });
        }

        const evaluations = await EvaluationModel.find().populate({
            path: "studentId",
            select: "name lastName group role",
        });

        const filteredEvaluations = evaluations.filter(
            (evaluation) => evaluation.studentId?.group === group && evaluation.studentId?.role === "user"
        );

        res.status(200).json({ evaluations: filteredEvaluations });
    } catch (error) {
        console.error("Qiymət cədvəlini gətirmə xətası:", error);
        res.status(500).json({ message: "Xəta baş verdi", error });
    }
};
    
    
export {createEvaluation,updateEvaluation,getEvaluationsByGroup, updateAttendance} 