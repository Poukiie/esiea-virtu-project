import { useLoaderData } from "react-router-dom";

import Eleve from "./Eleve";
import classes from "../List.module.css";

function ElevesList({ search }) {
    const tab_eleves = useLoaderData();

    const eleves = (search && search.length > 0) ? search : (search === null || search === undefined ? [] : tab_eleves);

    return (
        <>
            { eleves.length > 0 && (
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Classe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { eleves.map((eleve) => <Eleve key={eleve._id}
                                                    id={eleve._id}
                                                    nom={eleve.lastname}
                                                    prenom={eleve.firstname}
                                                    birthdate={eleve.birthdate.split('T')[0]}
                                                    classe={eleve.class ? eleve.class.name : ''} /> ) }

                    </tbody>
                </table>
            )}
            { eleves.length === 0 && (
                <div style={{ textAlign: 'center', color: '#36a9e1' }}>
                    <h2>Aucun élève</h2>
                </div>
            )}

        </>
    );
}

export default ElevesList;