import Select from 'react-select';

import { toast } from 'react-toastify';
import { Link, Form, useLoaderData, redirect } from 'react-router-dom';

import classes from '../NewEditModal.module.css';
import Modal from '../Modal';
import axios from 'axios';

function EditEleve() {
    const eleve = useLoaderData().eleve;
    const tab_classes = useLoaderData().classes;

    if(eleve) {
        return (
            <Modal>
                <Form method="put" className={classes.form}>
                    <div>
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" name="lastname" defaultValue={eleve.lastname} required />
                    </div>
                    <div>
                        <label htmlFor="prenom">Prénom</label>
                        <input type="text" id="prenom" name="firstname" defaultValue={eleve.firstname} required />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Date de naissance</label>
                        <input type="date" id="birthdate" name="birthdate" defaultValue={eleve.birthdate.split('T')[0]} required />
                    </div>
                    <div>
                        <label htmlFor="classe">Classe</label>
                        <Select id="classe"
                                name="class"
                                options={tab_classes}
                                defaultValue={eleve.class ? {value: eleve.class._id, label: eleve.class.name} : ''} />
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

export default EditEleve;

export async function loader({params}) {
    const eleve = await axios.get(`/students/${params.id}`);
    const classes = await axios.get(`/classes`);

    const tab_classes = classes.data.map((classe) => {
        if(classe._id === eleve.data.class) console.log(classe);
        return { value: classe._id, label: classe.name };
    });

    return {
        eleve: eleve.data,
        classes: tab_classes,
    };
}

export async function action({request, params}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    axios.put(`/students/${params.id}`, postData).then((res) => {
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