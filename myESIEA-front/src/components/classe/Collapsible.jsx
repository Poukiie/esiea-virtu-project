import axios from 'axios';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

import classes from '../Element.module.css';

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);
    
    const toggle = () => setOpen(!open);

    async function deleteClasse() {
        try {
            await axios.delete(`http://localhost:3001/classes/${props.id}`).then((res) => {
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
        <div className={classes.collapsible}>
            <div className={classes.button}>
                <div onClick={toggle} className={classes.title}>{props.label}</div>
                <div className={classes.actions}>
                    <Link to={props.id}>
                        <span className={classes.edit}><MdEdit /></span>
                    </Link>
                    <span className={classes.delete} onClick={deleteClasse}><MdDelete /></span>
                </div>
            </div>
            {open && (<div className={classes.content}>{props.children}</div>)}
        </div>
    )
};

export default Collapsible;