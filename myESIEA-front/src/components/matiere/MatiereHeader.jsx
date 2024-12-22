import axios from 'axios';

import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';

import classes from '../Header.module.css';

function MatiereHeader({ onSearch }) {

    async function handleSearch(e) {
        if(!e.target.value) {
            onSearch([]);
            return;
        }

        const res = await axios.get(`http://localhost:3001/subjects?search=${e.target.value}`);

        if(!res.data.length) {
            onSearch(null);
            return;
        }
        onSearch(res.data);
    }

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <FaGraduationCap />
                Matière
            </h1>
            <div className={classes.research}>
                <label htmlFor="research"><BsSearch /></label>
                <input type="text"
                       id="research"
                       placeholder='Rechercher une matière'
                       onChange={handleSearch} />
            </div>
            <div>
                <Link to="/matieres/create" className={classes.button}>
                    <FaGraduationCap size={20} />
                    Ajouter une matière
                </Link>
            </div>
        </header>
    );
}

export default MatiereHeader;