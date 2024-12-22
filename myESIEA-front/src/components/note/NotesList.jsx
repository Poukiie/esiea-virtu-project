import Select from "react-select";

import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import Note from "./Note";
import classes from "../List.module.css";


function NotesList({ search }) {
    const tab_classes = useLoaderData().classes;
    const tab_eleves = useLoaderData().eleves;

    const [searchParams, setSearchParams] = useSearchParams();
    const [classe, setClasse] = useState(tab_classes.find((c) => c.value === searchParams.get("classe")));
    const [eleve, setEleve] = useState(tab_eleves.find((e) => e.value === searchParams.get("eleve")));
    
    function handleClasseChange(classe) {
        searchParams.delete("eleve");
        setEleve(null);
        searchParams.set("classe", classe.value);
        setClasse(classe);
        setSearchParams(searchParams);
    }

    function handleEleveChange(eleve) {
        searchParams.set("eleve", eleve.value);
        setEleve(eleve);
        setSearchParams(searchParams);
    }

    const tab_notes = useLoaderData().notes;
    
    const notes = (search && search.length > 0) ? search : (search == null ? [] : tab_notes);

    useEffect(() => {
        if(search && search.length > 0) {
            searchParams.delete("classe");
            searchParams.delete("eleve");
            setClasse(null);
            setEleve(null);
            setSearchParams(searchParams);
        }
        // Pour enlever le warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <>
            <div className={classes.research}>
                <div className={classes.classe} style={{width: 15 + "rem"}}>
                    <label htmlFor="classe">Classe</label>
                    <Select options={tab_classes} 
                            id="classe"
                            value={classe}
                            isSearchable
                            onChange={handleClasseChange}/>
                </div>
                <div className={classes.eleve} style={{width: 20 + "rem"}}>
                    <label htmlFor="eleve">Élève</label>
                    <Select options={tab_eleves}
                            id="eleve"
                            isSearchable
                            value={eleve}
                            onChange={handleEleveChange} />
                </div>
            </div>
            { notes.length > 0 && (
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Élève</th>
                            <th>Matière</th>
                            <th>Enseignant</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { notes.map((note) => <Note key={note._id}
                                                    id={note._id}
                                                    eleve={note.student.lastname.toUpperCase() + ' ' + note.student.firstname}
                                                    matiere={note.subject.name}
                                                    prof={note.teacher.lastname.toUpperCase() + ' ' + note.teacher.firstname}
                                                    date={note.date}
                                                    note={note.grade} /> ) }

                    </tbody>
                </table>
            )}
            { notes.length === 0 && (
                <div style={{ textAlign: 'center', color: '#36a9e1' }}>
                    <h2>Aucune note pour cet(te) élève</h2>
                </div>
            )}

        </>
    );
}

export default NotesList;