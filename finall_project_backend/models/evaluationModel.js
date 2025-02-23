import mongoose from "mongoose";

const EvaluationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    score: { type: Number, default: 0 }, 
    attendance: { type: Number, default: 0 }, 
    gradeDate: { type: Date, default: Date.now } 
});

const EvaluationModel = mongoose.model("Evaluation", EvaluationSchema);

  export default EvaluationModel