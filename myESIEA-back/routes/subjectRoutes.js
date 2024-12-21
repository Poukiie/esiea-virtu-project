const express = require("express");
const {
    createSubject,
    updateSubject,
    deleteSubject,
    getAllSubjects,
    searchSubject,
    getSubject
} = require("../controllers/subjectController");

const router = express.Router();

router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);
router.get("/", getAllSubjects);
router.get("/search", searchSubject);
router.get("/:id", getSubject);

module.exports = router;