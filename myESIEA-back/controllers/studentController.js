const mongoose = require("mongoose")

const Student = require("../models/studentModel")
const { validateInput, validateDate } = require("../utils/validationUtils")

const createStudent = async (req, res) => {
    let { firstname, lastname, birthdate, class : classe } = req.body;
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

    if(classe == undefined || !mongoose.Types.ObjectId.isValid(classe)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    try {
        await Student.create({
            firstname,
            lastname,
            birthdate,
            class: classe
        });
        res.status(201).send({message: "Élève créé avec succès." });
        return
    } catch (err) {
        res.status(409).send({ error: "Une erreur est survenue." });
        return
    }
}


const updateStudent = async (req, res) => {
    const { id } = req.params;
    let { firstname, lastname, birthdate, class : classe } = req.body;
    firstname = firstname.trim()
    lastname = lastname.trim()

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    }

    if(!validateInput(firstname) || !validateInput(lastname)) {
        res.status(400).send({ error: "Prénom ou nom invalide." });
        return
    }

    if(!validateDate(birthdate)) {
        res.status(400).send({ error: "Date de naissance invalide." });
        return
    }

    if(classe == undefined || !mongoose.Types.ObjectId.isValid(classe)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    const student = await Student.findById(id)

    if(!student) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    } else {
        await Student.findByIdAndUpdate(
            id,
            { firstname, lastname, birthdate, class : classe },
            { new: true }
        )

        res.status(200).send({ message: "Élève modifié avec succès." });
        return
    }
}


const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    }

    const student = await Student.findById(id)

    if(!student) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    } else {
        await Student.findByIdAndDelete(id).then((result) =>{
            res.status(200).send({ message: "Élève supprimé avec succès." });
            return
        }).catch((err) => {
            res.status(409).send({ error: "Une erreur est survenue." });
            return
        })
    }
}


const getStudent = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    }

    const student = await Student.findById(id).populate("class", "name")

    if(!student) {
        res.status(404).send({ error: "Élève inexistant." });
        return
    } else {
        res.status(200).json(student);
        return
    }
}


const getAllStudents = async (req, res) => {
    const { search } = req.query;

    if(search) {
        searchStudent(req, res)
        return
    }

    try {
        const students = await Student.find().populate("class").sort({ lastname: 1, firstname: 1 });
        res.status(200).json(students);
        return
    } catch (err) {
        res.status(404).send({ error: "Élèves introuvables." });
        return
    }
}


const searchStudent = async (req, res) => {
    const { search } = req.query;
    try {
        const students = await Student.find({ $or: [{ firstname: { $regex: new RegExp(search, "i") } }, { lastname: { $regex: new RegExp(search, "i") } }] }).populate("class").sort({ lastname: 1, firstname: 1 });
        res.status(200).json(students);
        return
    } catch (err) {
        res.status(404).send({ error: "Élèves introuvables." });
        return
    }
}

module.exports = { createStudent, updateStudent, deleteStudent, getStudent, getAllStudents, searchStudent };