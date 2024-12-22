const mongoose = require("mongoose")

const Subject = require("../models/subjectModel")
const { validateInput } = require("../utils/validationUtils")

const createSubject = async (req, res) => {
    let { name } = req.body;
    name = name.trim()

    if(!validateInput(name)) {
        res.status(400).send({ error: "Nom invalide." });
        return
    }

    const subject = await Subject.findOne({name});   

    if(subject) {
        res.status(409).send({ error: "Matière déjà existante." });
        return
    }

    try {
        await Subject.create({name})
        res.status(201).send({ message: "Matière créée avec succès."});
        return
    } catch (err) {
        res.status(409).send({ error: "Une erreur est survenue." });
        return
    }
}


const updateSubject = async (req, res) => {
    const { id } = req.params;
    let { name } = req.body;
    name = name.trim()

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    }

    if(!validateInput(name)) {
        res.status(400).send({ error: "Nom invalide." });
        return
    }

    const verifySubject = await Subject.findOne({ name });

    if(!verifySubject) {
        const subject = await Subject.findById(id)

        if(!subject) {
            res.status(404).send({ error: "Matière inexistante." });
            return
        } else {
            subject.name = name
            await subject.save()

            res.status(200).json({ message: "Matière modifiée." });
            return
        }
    } else {
        res.status(409).send({ error: "Matière déjà existante." });
        return
    }
}


const deleteSubject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    }

    const subject = await Subject.findById(id)

    if(!subject) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    } else {
        try {
            await Subject.findByIdAndRemove(id);
            res.status(200).json({ message: "Matière supprimée." });
            return
        } catch (err) {
            res.status(409).send({ error: "Une erreur est survenue." });
            return
        }
    }
}


const getSubject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    }

    const subject = await Subject.findById(id)

    if(!subject) {
        res.status(404).send({ error: "Matière inexistante." });
        return
    } else {
        try {
            res.status(200).json(subject);
            return
        } catch (err) {
            res.status(409).send({ error: "Une erreur est survenue." });
            return
        }
    }
}


const getAllSubjects = async (req, res) => {
    const { search } = req.query;

    if(search) {
        searchSubject(req, res)
        return
    }

    try {
        const subjects = await Subject.find().sort({name: 1})
        res.status(200).json(subjects);
        return
    } catch (err) {
        res.status(404).send({ error: "Aucune matière trouvée." });
        return
    }
}


const searchSubject = async (req, res) => {
    const { search } = req.query;

    try {
        const subjects = await Subject.find({ name: { $regex: new RegExp(search, "i") } }).sort({name: 1})
        res.status(200).json(subjects);
        return
    } catch (err) {
        res.status(404).send({ error: "Aucune matière trouvée." });
        return
    }
}

// router.get("/subjects", (req, res) => {
//     if(req.query.search) {
//         let subject = {name: {$regex: new RegExp(req.query.search, "i")}}
//         searchSubject(subject).then((result) => {
//             res.end(JSON.stringify(result))
//         })
//     } else {
//         getAllSubjects().then((result) => {
//             res.end(JSON.stringify(result))
//         })
//     }
// })


module.exports = { createSubject, updateSubject, deleteSubject, getSubject, getAllSubjects, searchSubject }