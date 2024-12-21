const express = require('express');
const {
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent,
    getAllStudents,
    searchStudent
} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/', getAllStudents);
router.get('/search', searchStudent);
router.get('/:id', getStudent);

module.exports = router;