const mongoose = require("mongoose")

const Teacher = require("../models/teacherModel")
const { validateInput, validateDate } = require("../utils/validationUtils")

const createTeacher = async (req, res) => {
    let { firstname, lastname, birthdate, subjects, classes } = req.body;
    firstname = firstname.trim()
    lastname = lastname.trim()

    if(!validateInput(firstname) || !validateInput(lastname)) {
        res.status(400).send({ error: "Prénom ou nom invalide." });
        return
    }

    if(!validateDate(birthdate)) {
        res.status(400).send({ error: "Date de naissance invalide." });
        return
    }

    const subjectsList = (subjects == undefined) ? [] : JSON.parse(subjects).map((subject) => new mongoose.Types.ObjectId(subject))
    const classesList = (classes == undefined) ? [] : JSON.parse(classes).map((classe) => new mongoose.Types.ObjectId(classe))

    try {
        await Teacher.create({
            firstname,
            lastname,
            birthdate,
            subjects: subjectsList,
            classes: classesList
        });
        res.status(201).send({ message: "Professeur créé avec succès." });
        return
    } catch (err) {
        res.status(409).send({ error: "Une erreur est survenue." });
        return
    }
}


const updateTeacher = async (req, res) => {
    const { id } = req.params;
    let { firstname, lastname, birthdate, subjects, classes } = req.body;
    firstname = firstname.trim()
    lastname = lastname.trim()

    if(!validateInput(firstname) || !validateInput(lastname)) {
        res.status(400).send({ error: "Prénom ou nom invalide." });
        return
    }

    if(!validateDate(birthdate)) {
        res.status(400).send({ error: "Date de naissance invalide." });
        return
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    }

    const teacher = await Teacher.findById(id)

    if(!teacher) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    } else {
        teacher.firstname = firstname
        teacher.lastname = lastname
        teacher.birthdate = birthdate
        teacher.subjects = subjects == undefined ? [] : JSON.parse(subjects).map((subject) => new mongoose.Types.ObjectId(subject))
        teacher.classes = classes == undefined ? [] : JSON.parse(classes).map((classe) => new mongoose.Types.ObjectId(classe))

        try {
            await teacher.save();
            res.status(201).send({ message: "Professeur modifié avec succès." });
            return
        } catch (err) {
            res.status(409).send({ error: "Une erreur est survenue." });
            return
        }
    }
}

const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    }

    const teacher = await Teacher.findById(id)

    if(!teacher) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    } else {
        try {
            await Teacher.findByIdAndRemove(id);
            res.status(201).json({ message: "Professeur supprimé avec succès." });
            return
        } catch (err) {
            res.status(409).send({ error: "Une erreur est survenue." });
            return
        }
    }
}


const getTeacher = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    }

    const teacher = await Teacher.findById(id)

    if(!teacher) {
        res.status(404).send({ error: "Professeur inexistant." });
        return
    } else {
        res.status(201).json(teacher);
        return
    }
}


const getAllTeachers = async (req, res) => {
    const { search } = req.query;

    if(search) {
        searchTeacher(req, res)
        return
    }

    try {
        const teachers = await Teacher.find().populate("subjects").populate("classes", "name").sort({ lastname: 1, firstname: 1 });

        res.status(200).json(teachers);
        return
    } catch (err) {
        res.status(404).send({ error: "Professeurs introuvables." });
        return
    }
}


const searchTeacher = async (req, res) => {
    const { search } = req.query;

    let query = {
        $or: [
            {"firstname": { $regex: new RegExp(search, "i") }},
            {"lastname": { $regex: new RegExp(search, "i") }},
        ]
    }

    try {
        const teachers = await Teacher.find(query)
                                      .populate("subjects")
                                      .populate("classes", "name")
                                      .sort({ lastname: 1, firstname: 1 })

        res.status(200).json(teachers);
        return
    } catch (err) {
        res.status(404).send({ error: "Professeurs introuvables." });
        return
    }
}

module.exports = { createTeacher, updateTeacher, deleteTeacher, getTeacher, getAllTeachers, searchTeacher }