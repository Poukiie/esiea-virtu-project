import axios from 'axios';
import Select from 'react-select';

import { toast } from 'react-toastify';
import { Link, Form, redirect, useLoaderData } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';

function NewEleve() {
    const tab_classes = useLoaderData();

    return (
        <Modal>
            <Form method="post" className={classes.form}>
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
                    <Select id="classe" name="class" options={tab_classes} />
                </div>
                <div className={classes.actions}>
                    <Link to=".." type="button">Annuler</Link>
                    <button>Confirmer</button>
                </div>
            </Form>
        </Modal>
    );
}

export default NewEleve;

export async function action({ request }) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    const birthdate = new Date(postData.birthdate);
    if (isNaN(birthdate.getTime())) {
        toast.error('La date de naissance est invalide', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        return redirect('.');
    }

    if (!/^[a-zA-ZÀ-ÿ- ]+$/.test(postData.lastname) || !/^[a-zA-ZÀ-ÿ- ]+$/.test(postData.firstname)) {
        toast.error('Le nom et prénom doivent être composés de lettres uniquement', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        return redirect('.');
    }
console.log(postData)
    axios.post('http://localhost:3001/students', postData).then((res) => {
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