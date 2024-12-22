import axios from 'axios';

import { Link } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';

import classes from '../Header.module.css';

function ProfHeader({ onSearch }) {

    async function handleSearch(e) {
        if(!e.target.value) {
            onSearch([]);
            return;
        }

        const res = await axios.get(`/teachers?search=${e.target.value}`);

        if(!res.data.length) {
            onSearch(null);
            return;
        }
        onSearch(res.data);
    }

    return (
        <div>
            <div className={classes.header}>
                <h1 className={classes.logo}>
                    <FaChalkboardTeacher />
                    Enseignant
                </h1>
                <div className={classes.research}>
                    <label htmlFor="research"><BsSearch /></label>
                    <input type="text"
                        id="research"
                        placeholder='Rechercher un enseignant'
                        onChange={handleSearch} />
                </div>
                <div>
                    <Link to="/professeurs/create" className={classes.button}>
                        <MdPersonAddAlt1 size={20} />
                        Ajouter un enseignant
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfHeader;