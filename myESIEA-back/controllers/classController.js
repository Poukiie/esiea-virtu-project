const mongoose = require("mongoose")

const Class = require("../models/classModel")
const Student = require("../models/studentModel")
const { validateClasseName } = require("../utils/validationUtils")

const createClass = async (req, res) => {
    const { name, subjects } = req.body;

    if(!validateClasseName(name)) {
        res.status(400).send({ error: "Nom de classe invalide." });
        return
    }

    const classe = await Class.findOne({ name });
  
    if(!classe) {
        const subjectsList = (subjects == undefined) ? [] : JSON.parse(subjects).map((subject) => new mongoose.Types.ObjectId(subject))            
        await Class.create({
            name,
            subjects: subjectsList
        });
        res.status(201).send({ message: "Classe créée avec succès." });
        return
    } else {
        res.status(409).send({ error: "Classe déjà existante." });
        return
    }
};


const updateClass = async (req, res) => {
    const { id } = req.params;
    const { name, subjects } = req.body;

    if(!validateClasseName(name)) {
        res.status(400).send({ error: "Nom de classe invalide." });
        return
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    const verifyClass = await Class.findOne({ name });

    if(verifyClass) {
        res.status(409).send({ error: "Classe déjà existante." });
        return
    }
    
    const classe = await Class.findById(id);

    if(!classe) {
        res.status(404).send({ error: "Classe inexistante."});
        return
    }

    const subjectsList = (subjects == undefined) ? [] : JSON.parse(subjects).map((subject) => new mongoose.Types.ObjectId(subject))
    await Class.findByIdAndUpdate(
        id,
        { name, subjects: subjectsList },
        { new: true }
    );
    
    res.status(200).send({ message: "Classe modifiée avec succès." });
    return
}

const deleteClass = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    const classe = await Class.findById(id);

    if(!classe) {
        res.status(404).send({ error: "Classe inexistante."});
        return
    } else {
        await Class.findByIdAndRemove(id);
        res.status(200).send({ message: "Classe supprimée avec succès." });
        return
    }
}


const getAllClasses = async (req, res) => {
    const { search } = req.query;

    if(search) {
        searchClass(req, res);
        return
    }

    try {
        const classes = await Class.aggregate([{
                                        $lookup: {
                                        from: "students",
                                        localField: "_id",
                                        foreignField: "class",
                                        as: "students"
                                    }
                                    }, {
                                        $lookup: {
                                        from: "teachers",
                                        localField: "_id",
                                        foreignField: "classes",
                                        as: "teachers"
                                    }
                                    }, {
                                        $lookup: {
                                        from: "subjects",
                                        localField: "subjects",
                                        foreignField: "_id",
                                        as: "subjects"
                                    }
                                    }, {
                                        $sort: { name: 1 }
                                    }])

        res.status(200).json(classes);
        return
    } catch (err) {
        res.status(404).send({ error: "Une erreur est survenue." });
        return
    }
}


const searchClass = async (req, res) => {
    const { search } = req.query;

    let query = {name: {$regex: new RegExp(search, "i")}}

    try {
        const classes = await Class.aggregate([{
                                        $match: query
                                    }, {
                                        $lookup: {
                                            from: "students",
                                            localField: "_id",
                                            foreignField: "class",
                                            as: "students"
                                        }
                                    }, {
                                        $lookup: {
                                            from: "teachers",
                                            localField: "_id",
                                            foreignField: "classes",
                                            as: "teachers"
                                        }
                                    }, {
                                        $lookup: {
                                            from: "subjects",
                                            localField: "subjects",
                                            foreignField: "_id",
                                            as: "subjects"
                                        }
                                    },{
                                        $sort: { name: 1 }
                                    }])

        res.status(200).json(classes);
        return
    } catch (err) {
        res.status(404).send({ error: "Une erreur est survenue." });
        return
    }
}


const getClass = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    const classe = await Class.findById(id)

    if(!classe) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    } else {
        res.status(200).json(classe);
        return
    }
}


const getClassStudents = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    }

    const classe = await Class.findById(id)

    if(!classe) {
        res.status(404).send({ error: "Classe inexistante." });
        return
    } else {
        const students = await Student.find({ class: id })

        res.status(200).json(students);
        return

    }
}    

module.exports = { createClass, updateClass, deleteClass, getAllClasses, searchClass, getClass, getClassStudents };
