import axios from 'axios';
import Select from 'react-select';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, Form, redirect, useLoaderData } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function NewClasse() {
    const tab_matieres = useLoaderData();

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleSubjectsChange = (e) => {
        setSelectedSubjects(Array.isArray(e) ? e.map(subject => subject.value) : []);
    };

    return (
        <Modal>
            <Form method="post" className={classes.form} >
            <div>
                <label htmlFor="nom">Nom</label>
                <input tyep="text" id="nom" name="name" required />
            </div>
            <div>
                <label htmlFor="matieres">Matières</label>
                <Select options={tab_matieres}
                        onChange={handleSubjectsChange}
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

export default NewClasse;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.post('/classes', postData).then((res) => {
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
    const matieres = await axios.get('/subjects');
    const tab_matieres = matieres.data.map((matiere) => {
        return { value: matiere._id, label: matiere.name };
    });
    
    return tab_matieres;
}