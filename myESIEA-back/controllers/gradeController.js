const mongoose = require("mongoose")

const Grade = require("../models/gradeModel")
const Student = require("../models/studentModel")
const { validateGrade } = require("../utils/validationUtils")

const createGrade = async (req, res) => {
    let { grade, student, subject, teacher } = req.body;
    grade = grade.trim()

    if(!grade || !student || !subject || !teacher) {
        res.status(400).send({ error: "Paramètres manquants." });
        return
    }

    if(!validateGrade(grade)) {
        res.status(400).send({ error: "Note invalide." });
        return
    }

    if(!mongoose.Types.ObjectId.isValid(student)) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    }

    if(!mongoose.Types.ObjectId.isValid(subject)) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    }

    if(!mongoose.Types.ObjectId.isValid(teacher)) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    }

    await Grade.create({
        grade,
        student,
        subject,
        teacher
    });
    res.status(201).send({ message: "Note créée avec succès." });
    return
};

const updateGrade = async (req, res) => {
    const { id } = req.params;
    let { grade } = req.body;
    grade = grade.trim()

    if(!validateGrade(grade)) {
        res.status(400).send({ error: "Note invalide." });
        return
    }        

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Note inexistante." });
        return
    }

    const note = await Grade.findById(id);

    if(!note) {
        res.status(404).send({ error: "Note inexistante."});
        return
    } else {
        note.grade = grade;
        await note.save();

        res.status(200).json({ message: "Note modifiée." });
        return
    }
}


const deleteGrade = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Note inexistante." });
        return
    }
    
    const note = await Grade.findById(id);

    if(!note) {
        res.status(404).send({ error: "Note inexistante."});
        return
    } else {
        await Grade.findByIdAndRemove(id);
        res.status(200).send({ message: "Note supprimée avec succès." });
        return
    }
}

const getGradesFromStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    }

    const student = await Student.findById(id);

    if(!student) {
        res.status(404).send({ error: "Élève inexistant."});
        return
    } else {
        const grades = await Grade.aggregate([
            { $match: {student: new mongoose.Types.ObjectId(id)} },
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "student"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subject"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            { $unwind: "$student" },
            { $unwind: "$subject" },
            { $unwind: "$teacher" },
        ]);
        res.status(200).send(grades);
        return
    }
}


const searchGrades = async (req, res) => {
    const { search } = req.query;

    if(search) {
        let query = {
            $or: [
                {"student.firstname": { $regex: new RegExp(search, "i") }},
                {"student.lastname": { $regex: new RegExp(search, "i") }},
            ]
        }

        const grades = await Grade.aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "student"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subject"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            { $unwind: "$student" },
            { $unwind: "$subject" },
            { $unwind: "$teacher" },
            { $match: query },
        ]);
        res.status(200).json(grades);
        return

    } else {
        res.end(JSON.stringify({}))
    }
}

const getGrade = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Note inexistante." });
        return
    }

    const note = await Grade.findById(id);

    if(!note) {
        res.status(404).send({ error: "Note inexistante."});
        return
    } else {
        const grade = await Grade.aggregate([
            { $match: note },
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "student"
                }
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subject"
                }
            },
            {
                $lookup: {
                    from: "teachers",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            { $unwind: "$student" },
            { $unwind: "$subject" },
            { $unwind: "$teacher" },
        ]);
        res.status(200).send(grade[0]);
        return
    }
}

module.exports = { createGrade, updateGrade, deleteGrade, getGradesFromStudent, searchGrades, getGrade }