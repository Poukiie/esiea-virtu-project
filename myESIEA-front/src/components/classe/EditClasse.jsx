import axios from 'axios';
import Select from 'react-select'

import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useLoaderData, Form, redirect } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function EditClasse() {
    const classe = useLoaderData().classe;
    const tab_matieres = useLoaderData().subjects;

    const [selectedSubjects, setSelectedSubjects] = useState(classe.subjects);

    const handleSubjectsChange = (e) => {
        setSelectedSubjects(Array.isArray(e) ? e.map(subject => subject.value) : []);
    };

    if(classe) {
        return (
            <Modal>
                <Form method="put" className={classes.form} >
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input tyep="text" id="nom" name="name" defaultValue={classe.name} required />
                </div>
                <div>
                    <label htmlFor="matieres">Matières</label>
                    <Select options={tab_matieres}
                            onChange={handleSubjectsChange}
                            defaultValue={tab_matieres.filter(subject => classe.subjects.includes(subject.value))}
                            isClearable
                            isMulti />
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
}

export default EditClasse;

export async function loader({params}) {
    const classe = await axios.get(`http://localhost:3001/classes/${params.id}`);
    
    const matieres = await axios.get('http://localhost:3001/subjects');
    const tab_matieres = matieres.data.map((matiere) => {
        return { value: matiere._id, label: matiere.name };
    });

    return { classe: classe.data, subjects: tab_matieres };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.put(`http://localhost:3001/classes/${params.id}`, postData).then((res) => {
        toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });
    return redirect('/classes');
}
