import axios from 'axios';

import { Link } from 'react-router-dom';
import { MdPersonAddAlt1, MdPerson } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';

import classes from '../Header.module.css';

function EleveHeader({ onSearch }) {

    async function handleSearch(e) {
        if(!e.target.value) {
            onSearch([]);
            return;
        }

        const res = await axios.get(`/students?search=${e.target.value}`);

        if(!res.data.length) {
            onSearch(null);
            return;
        }
        onSearch(res.data);
    }

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdPerson />
                Élève
            </h1>
            <div className={classes.research}>
                <label htmlFor="research"><BsSearch /></label>
                <input type="text"
                       id="research"
                       placeholder='Rechercher un élève'
                       onChange={handleSearch} />
            </div>
            <div>
                <Link to="/eleves/create" className={classes.button}>
                    <MdPersonAddAlt1 size={20} />
                    Ajouter un élève
                </Link>
            </div>
        </header>
    );
}

export default EleveHeader;