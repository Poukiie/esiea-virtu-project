import axios from 'axios';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import NotesList from '../components/note/NotesList';
import NoteHeader from '../components/note/NoteHeader';

export const NoteView = () => {

    const [notes, setNotes] = useState([]);

    const handleSearch = (data) => {
        setNotes(data);
    };

    return (
        <>
            <NoteHeader onSearch={handleSearch} />
            <Outlet />
            <NotesList search={notes} />
        </>
    )
};

export async function loader({ request }) {
    const url = new URL(request.url);

    const tab_classes = await axios.get('http://localhost:3001/classes');
    const classes = tab_classes.data.map((classe) => {
        return { value: classe._id, label: classe.name };
    });
    
    let eleves = [];
    let grades = [];
    
    if (url.searchParams.get("classe") != null) {
        const tab_eleves = await axios.get('http://localhost:3001/classes/' + url.searchParams.get("classe") + '/students');
        eleves = tab_eleves.data.map((eleve) => {
            return { value: eleve._id, label: eleve.lastname.toUpperCase() + " " + eleve.firstname };
        });
    
        if (url.searchParams.get("eleve") != null) {
            const gradesResponse = await axios.get('http://localhost:3001/grades/student/' + url.searchParams.get("eleve"));
            grades = gradesResponse.data;
        }
    }
    
    return { eleves: eleves, classes: classes, notes: grades };    
}