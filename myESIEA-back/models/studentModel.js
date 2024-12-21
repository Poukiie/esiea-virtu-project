const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
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
        class: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            default: null,
            ref: "Class",
        },
    },
    {
        timestamps: true,
    }
);
  
module.exports = mongoose.model("Student", studentSchema);