import Select from 'react-select';
import axios from 'axios';

import { useState } from 'react';
import { Link, Form, useLoaderData, redirect } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';
import { toast } from 'react-toastify';

function EditProf() {
    const prof = useLoaderData().prof;
    const tab_classes = useLoaderData().classes;
    const tab_matieres = useLoaderData().matieres;

    const [selectedClasses, setSelectedClasses] = useState(prof.classes);
    const [selectedSubjects, setSelectedSubjects] = useState(prof.subjects);

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
                    <input type="text" id="nom" name="lastname" defaultValue={prof.lastname} required />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="firstname" defaultValue={prof.firstname} required />
                </div>
                <div>
                    <label htmlFor="birthdate">Date de naissance</label>
                    <input type="date" id="birthdate" name="birthdate" defaultValue={prof.birthdate.split('T')[0]} required />
                </div>
                <div>
                    <label htmlFor="classe">Classe</label>
                    <Select options={tab_classes}
                            onChange={handleClassesChange}
                            defaultValue={tab_classes.filter(classe => prof.classes.includes(classe.value))}
                            isMulti
                            isClearable />

                    <input type="hidden" name='classes' value={JSON.stringify(selectedClasses)} readOnly />
                </div>
                <div>
                    <label htmlFor="matiere">Matière</label>
                    <Select options={tab_matieres}
                            onChange={handleSubjectsChange}
                            defaultValue={tab_matieres.filter(subject => prof.subjects.includes(subject.value))}
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

export default EditProf;

export async function loader({ params }) {
    const prof = await axios.get(`/teachers/${params.id}`);

    const classes = await axios.get('/classes');
    const tab_classes = classes.data.map((classe) => {
        return { value: classe._id, label: classe.name };
    });

    const matieres = await axios.get('/subjects');
    const tab_matieres = matieres.data.map((matiere) => {
        return { value: matiere._id, label: matiere.name };
    });

    return { prof: prof.data, classes: tab_classes, matieres: tab_matieres };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.put(`/teachers/${params.id}`, postData).then((res) => {
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