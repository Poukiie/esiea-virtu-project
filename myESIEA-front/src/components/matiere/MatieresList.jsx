import { useLoaderData } from "react-router-dom";

import Matiere from "./Matiere";
import classes from "../List.module.css";


function MatieresList({ search }) {
    const tab_matieres = useLoaderData();

    const matieres = (search && search.length > 0) ? search : (search === null || search === undefined ? [] : tab_matieres);

    return (
        <>
            { matieres.length > 0 && (
                <div className={classes.list_matiere}>
                    { matieres.map((matiere) => <Matiere 
                                                    key={matiere._id}
                                                    id={matiere._id}
                                                    nom={matiere.name} /> ) }
                </div>
            )}
            { matieres.length === 0 && (
                <div style={{ textAlign: 'center', color: '#36a9e1' }}>
                    <h2>Aucune matière</h2>
                </div>
            )}

        </>
    );
}

export default MatieresList;