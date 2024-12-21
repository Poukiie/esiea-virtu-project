const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema(
    {
        grade: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Student",
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Subject",
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Teacher",
        },
    },
    {
        timestamps: true,
    }
);
  
module.exports = mongoose.model("Grade", gradeSchema);