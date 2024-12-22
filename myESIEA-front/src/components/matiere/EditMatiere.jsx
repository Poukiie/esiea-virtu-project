import axios from 'axios';

import { toast } from 'react-toastify';
import { Link, useLoaderData, redirect, Form } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function EditMatire() {
    const classe = useLoaderData();

    if(classe) {
        return (
            <Modal>
                <Form method='put' className={classes.form} >
                <div>
                    <label htmlFor="nom">Nom de la matière</label>
                    <input tyep="text" id="nom" name="name" defaultValue={classe.name} required />
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

export default EditMatire;

export async function loader({params}) {
    const res = await axios.get('/subjects/' + params.id);
    return res.data;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.put(`/subjects/${params.id}`, postData).then((res) => {
        toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }).catch((err) => {
        console.log(err)
        toast.error(err.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    });

    return redirect('/matieres');
}