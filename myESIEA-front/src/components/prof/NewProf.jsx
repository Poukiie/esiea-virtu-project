import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { useState } from 'react';
import { Link, redirect, useLoaderData, Form } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function NewProf() {
    const tab_classes = useLoaderData().classes;
    const tab_matieres = useLoaderData().matieres;

    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleClassesChange = (e) => {
        setSelectedClasses(Array.isArray(e) ? e.map(classe => classe.value) : []);
    };

    const handleSubjectsChange = (e) => {
        setSelectedSubjects(Array.isArray(e) ? e.map(subject => subject.value) : []);
    };

    return (
        <Modal>
            <Form method='post' className={classes.form}>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="lastname" required />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="firstname" required />
                </div>
                <div>
                    <label htmlFor="birthdate">Date de naissance</label>
                    <input type="date" id="birthdate" name="birthdate" required />
                </div>
                <div>
                    <label htmlFor="classe">Classe</label>
                    <Select options={tab_classes}
                            onChange={handleClassesChange}
                            isMulti
                            isClearable />

                    <input type="hidden" name='classes' value={JSON.stringify(selectedClasses)} readOnly />
                </div>
                <div>
                    <label htmlFor="matiere">Matière</label>
                    <Select options={tab_matieres}
                            onChange={handleSubjectsChange}
                            isMulti
                            isClearable />

                    <input type="hidden" name='subjects' value={JSON.stringify(selectedSubjects)} readOnly />
                </div>
                <div className={classes.actions}>
                    <Link to=".." type="button">Annuler</Link>
                    <button>Confirmer</button>
                </div>
            </Form>
        </Modal>
    );
}

export default NewProf;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.post('/teachers', postData).then((res) => {
        toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });

    return redirect('..');
}

export async function loader() {
    const classes = await axios.get('/classes');
    const tab_classes = classes.data.map((classe) => {
        return { value: classe._id, label: classe.name };
    });

    const matieres = await axios.get('/subjects');
    const tab_matieres = matieres.data.map((matiere) => {
        return { value: matiere._id, label: matiere.name };
    });

    return { classes: tab_classes, matieres: tab_matieres };
}