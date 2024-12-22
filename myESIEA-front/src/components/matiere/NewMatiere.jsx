import axios from 'axios';

import { toast } from 'react-toastify';
import { Link, redirect, Form } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function NewMatiere() {
    return (
        <Modal>
            <Form method='post' className={classes.form}>
            <div>
                <label htmlFor="nom">Nom de la matière</label>
                <input tyep="text" id="nom" name="name" required />
            </div>
            <div className={classes.actions}>
                <Link to=".." type="button">Annuler</Link>
                <button>Confirmer</button>
            </div>
            </Form>
        </Modal>
    );
}

export default NewMatiere;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.post('http://localhost:3001/subjects', postData).then((res) => {
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
    const res = await axios.get('http://localhost:3001/classes');
    const tab_classes = res.data.map((classe) => {
        return { value: classe._id, label: classe.name };
    });

    return tab_classes;
}