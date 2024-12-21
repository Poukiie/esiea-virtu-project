const express = require("express");
const {
    createGrade,
    updateGrade,
    deleteGrade,
    getGrade,
    getGradesFromStudent,
    searchGrades
} = require("../controllers/gradeController");

const router = express.Router();

router.post("/", createGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);
router.get("/:id", getGrade);
router.get("/student/:id", getGradesFromStudent);
router.get("/", searchGrades);

module.exports = router;