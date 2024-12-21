const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        subjects: {
            type: Array,
            required: false,
            default: [],
            ref: "Subject",
        },
        classes: {
            type: Array,
            required: false,
            default: [],
            ref: "Class",
        },
    },
    {
        timestamps: true,
    }
);
  
module.exports = mongoose.model("Teacher", teacherSchema);