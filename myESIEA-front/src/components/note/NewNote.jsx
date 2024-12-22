import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { Link, useLoaderData, Form, redirect } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function NewNote() {
    const profs = useLoaderData().profs;
    const matieres = useLoaderData().matieres;
    const eleves = useLoaderData().eleves;

    const currentQueryParams = window.location.search;

    return (
        <Modal>
            <Form method="post" className={classes.form}>
            <div>
                <label htmlFor="matiere">Matière</label>
                <Select options={matieres}
                        name='subject'
                        isSearchable
                        required />
            </div>
            <div>
                <label htmlFor="prof">Professeur</label>
                <Select options={profs}
                        name='teacher'
                        isSearchable
                        required />
            </div>
            <div>
                <label htmlFor="student">Elève</label>
                <Select options={eleves}
                        name='student'
                        isSearchable
                        required />
            </div>
            <div>
                <label htmlFor="note">Note</label>
                <input type="number" id="note" min="0" max="20" name="grade" required />
            </div>
            <div className={classes.actions}>
                <Link to={`/notes${currentQueryParams}`} type="button">Annuler</Link>
                <button>Confirmer</button>
            </div>
            </Form>
        </Modal>
    );
}

export default NewNote;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.post('http://localhost:3001/grades', postData).then((res) => {
        toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });

    const currentQueryParams = window.location.search;
    return redirect(`/notes${currentQueryParams}`);
}

export async function loader() {
    const matieres = await axios.get('http://localhost:3001/subjects');
    const tab_matieres = matieres.data.map((matiere) => {
        return { value: matiere._id, label: matiere.name };
    });

    const profs = await axios.get('http://localhost:3001/teachers');
    const tab_profs = profs.data.map((prof) => {
        return { value: prof._id, label: prof.lastname.toUpperCase() + ' ' + prof.firstname };
    });

    const eleves = await axios.get('http://localhost:3001/students');
    const tab_eleves = eleves.data.map((eleve) => {
        return { value: eleve._id, label: eleve.lastname.toUpperCase() + ' ' + eleve.firstname };
    });
    
    return { matieres: tab_matieres, profs: tab_profs, eleves: tab_eleves };
}