import axios from 'axios';

import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';

import classes from '../Header.module.css';

function ClasseHeader({ onSearch }) {

    async function handleSearch(e) {
        if(!e.target.value) {
            onSearch([]);
            return;
        }

        const res = await axios.get(`/classes?search=${e.target.value}`);
        
        if(!res.data.length) {
            onSearch(null);
            return;
        }
        onSearch(res.data);
    }

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <SiGoogleclassroom />
                Classe
            </h1>
            <div className={classes.research}>
                <label htmlFor="research"><BsSearch /></label>
                <input type="text"
                       id="research"
                       placeholder='Rechercher une classe'
                       onChange={handleSearch} />
            </div>
            <div>
                <Link to="/classes/create" className={classes.button}>
                    <SiGoogleclassroom size={20} />
                    Ajouter une classe
                </Link>
            </div>
        </header>
    );
}

export default ClasseHeader;