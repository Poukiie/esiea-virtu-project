import axios from 'axios';
import Select from 'react-select';

import { toast } from 'react-toastify';
import { Link, Form, redirect, useLoaderData } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function EditNote() {
    const note = useLoaderData();
    const currentQueryParams = window.location.search;

    return (
        <Modal>
            <Form method="post" className={classes.form}>
            <div>
                <label htmlFor="matiere">Matière</label>
                <Select options={[{ value: note.subject._id, label: note.subject.name }]}
                        value={{value: note.subject._id, label: note.subject.name}}
                        isSearchable
                        isDisabled />
            </div>
            <div>
                <label htmlFor="prof">Professeur</label>
                <Select options={[{ value: note.teacher._id, label: note.teacher.firstname.toUpperCase() + " " + note.teacher.lastname }]}
                        value={{ value: note.teacher._id, label: note.teacher.firstname.toUpperCase() + " " + note.teacher.lastname }}
                        isSearchable
                        isDisabled />
            </div>
            <div>
                <label htmlFor="student">Elève</label>
                <Select options={[{ value: note.student._id, label: note.student.firstname.toUpperCase() + " " + note.student.lastname }]}
                        value={{ value: note.student._id, label: note.student.firstname.toUpperCase() + " " + note.student.lastname }}
                        isSearchable
                        isDisabled />
            </div>
            <div>
                <label htmlFor="note">Note</label>
                <input type="number" id="note" min="0" max="20" name="grade" defaultValue={note.grade} required />
            </div>
            <div className={classes.actions}>
                <Link to={`/notes${currentQueryParams}`} type="button">Annuler</Link>
                <button>Confirmer</button>
            </div>
            </Form>
        </Modal>    );
}

export default EditNote;

export async function action({ request, params }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.put(`http://localhost:3001/grades/${params.id}`, postData).then((res) => {
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

export async function loader({ params }) {
    const grade = await axios.get(`http://localhost:3001/grades/${params.id}`);
    
    return grade.data;
}