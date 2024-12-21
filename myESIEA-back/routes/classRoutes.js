const express = require("express");
const {
    createClass,
    updateClass,
    deleteClass,
    getAllClasses,
    searchClass,
    getClass,
    getClassStudents
} = require("../controllers/classController");
const { get } = require("mongoose");

const router = express.Router();

router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.get("/", getAllClasses);
router.get("/search", searchClass);
router.get("/:id", getClass);
router.get("/:id/students", getClassStudents);

module.exports = router;