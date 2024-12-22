import axios from 'axios';

import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from'../Element.module.css'

function Matiere({ id, nom }) {
    async function deleteMatiere() {
        try {
            await axios.delete(`/subjects/${id}`).then((res) => {
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
        <div className={classes.matiere}>
            <p className={classes.nom}>{ nom }</p>
            <div className={classes.actions}>
                <Link to={id}>
                    <span className={classes.edit}><MdEdit /></span>
                </Link>
                <span className={classes.delete} onClick={deleteMatiere}><MdDelete /></span>
            </div>
        </div>
    );
}

export default Matiere;