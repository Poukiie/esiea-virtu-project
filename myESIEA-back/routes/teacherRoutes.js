const express = require("express");

const {
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers,
    searchTeacher,
    getTeacher
} = require("../controllers/teacherController");

const router = express.Router();

router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.get("/", getAllTeachers);
router.get("/search", searchTeacher);
router.get("/:id", getTeacher);

module.exports = router;