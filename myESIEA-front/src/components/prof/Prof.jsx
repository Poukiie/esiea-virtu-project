import axios from 'axios';

import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from'../Element.module.css'

function Prof({ id, nom, prenom, birthdate, tab_classe, tab_matiere }) {
    const date = new Date(birthdate);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    birthdate = `${day}/${month}/${year}`;

    async function deleteProf() {
        try {
            await axios.delete(`/teachers/${id}`).then((res) => {
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
            <td className={classes.classe}>
                { tab_classe }
            </td>
            <td className={classes.matiere}>{ tab_matiere }</td>
            <td className={classes.actions}>
                <Link to={id}>
                    <span className={classes.edit}><MdEdit /></span>
                </Link>
                <span className={classes.delete} onClick={deleteProf}><MdDelete /></span>
            </td>
        </tr>
    );
}

export default Prof;