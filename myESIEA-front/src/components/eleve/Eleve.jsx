import axios from 'axios';

import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from'../Element.module.css'

function Eleve({ id, nom, prenom, birthdate, classe }) {
    const date = new Date(birthdate);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    birthdate = `${day}/${month}/${year}`;

    async function deleteEleve() {
        try {
            await axios.delete(`/students/${id}`).then((res) => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.error, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <tr className={classes.element}>
            <td className={classes.nom}>{ nom }</td>
            <td className={classes.prenom}>{ prenom }</td>
            <td className={classes.birthdate}>{ birthdate }</td>
            <td className={classes.classe}>{ classe }</td>
            <td className={classes.actions}>
                <Link to={id}>
                    <span className={classes.edit}><MdEdit /></span>
                </Link>
                <span className={classes.delete} onClick={deleteEleve}><MdDelete /></span>
            </td>
        </tr>
    );
}

export default Eleve;