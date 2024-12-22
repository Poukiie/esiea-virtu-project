import axios from 'axios';

import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from'../Element.module.css'

function Note({ id, eleve, matiere, prof, date, note }) {
    const currentQueryParams = window.location.search

    const date_modif = new Date(date);
    const day = ("0" + date_modif.getDate()).slice(-2);
    const month = ("0" + (date_modif.getMonth() + 1)).slice(-2);
    const year = date_modif.getFullYear();
    date = `${day}/${month}/${year}`;

    async function deleteNote() {
        try {
            await axios.delete(`http://localhost:3001/grades/${id}`).then((res) => {
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
            <td className={classes.eleve}>{ eleve }</td>
            <td className={classes.matiere}>{ matiere }</td>
            <td className={classes.prof}>{ prof }</td>
            <td className={classes.date}>{ date }</td>
            <td className={classes.grade}>{ note }</td>
            <td className={classes.actions}>
                <Link to={`/notes/${id}${currentQueryParams}`}>
                    <span className={classes.edit}><MdEdit /></span>
                </Link>
                <span className={classes.delete} onClick={deleteNote}><MdDelete /></span>
            </td>
        </tr>
    );
}

export default Note;