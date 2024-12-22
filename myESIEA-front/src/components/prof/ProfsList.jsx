import { useLoaderData } from "react-router-dom";

import Prof from "./Prof";
import classes from "../List.module.css";

function ProfsList({ search }) {
    const tab_profs = useLoaderData();

    const profs = (search && search.length > 0) ? search : (search === null || search === undefined ? [] : tab_profs);

    return (
        <>
            { profs.length > 0 && (
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Classe</th>
                            <th>Matière</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { profs.map((prof) => {
                            const tab_classes = prof.classes.map(classe => classe.name).join(', ');
                            const tab_matiere = prof.subjects.map(subject => subject.name).join(', ');
                            return (<Prof 
                                key={prof._id}
                                id={prof._id}
                                nom={prof.lastname}
                                prenom={prof.firstname}
                                birthdate={prof.birthdate}
                                tab_classe={tab_classes}
                                tab_matiere={tab_matiere} />
                            )})
                        }
                    </tbody>
                </table>
            )}
            { profs.length === 0 && (
                <div style={{ textAlign: 'center', color: '#36a9e1' }}>
                    <h2>Aucun enseignant</h2>
                </div>
            )}

        </>
    );
}

export default ProfsList;