const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subjects: {
            type: Array,
            required: false,
            default: [],
            ref: "Subject",
        },
    },
    {
        timestamps: true,
    }
);
  
module.exports = mongoose.model("Class", classSchema);