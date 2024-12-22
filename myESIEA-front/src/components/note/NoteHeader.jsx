import axios from 'axios';

import { Link } from 'react-router-dom';
import { MdAssignmentAdd, MdAssignment } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';

import classes from '../Header.module.css';

function NoteHeader({ onSearch }) {
    async function handleSearch(e) {
        if(!e.target.value) {
            onSearch([]);
            return;
        }

        const res = await axios.get(`/grades?search=${e.target.value}`);

        if(!res.data.length) {
            onSearch(null);
            return;
        }
        onSearch(res.data);
    }

    const handleCreateNote = () => {
        const searchParams = window.location.search;
        const createNoteUrl = `/notes/create${searchParams}`;
    
        window.location.href = createNoteUrl;
    };

    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                <MdAssignment />
                Note
            </h1>
            <div className={classes.research}>
                <label htmlFor="research"><BsSearch /></label>
                <input type="text"
                       id="research"
                       placeholder='Rechercher un élève'
                       onChange={handleSearch} />
            </div>
            <div>
                <Link onClick={handleCreateNote}className={classes.button}>
                    <MdAssignmentAdd size={20} />
                    Ajouter une note
                </Link>
            </div>
        </header>
    );
}

export default NoteHeader;