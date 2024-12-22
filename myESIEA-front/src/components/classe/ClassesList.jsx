import { useLoaderData } from "react-router-dom";

import Classe from "./Classe";
import classes from "../List.module.css";

function ClassesList({ search }) {
    const tab_all_classes = useLoaderData();

    const tab_classes = (search && search.length > 0) ? search : (search === null || search === undefined ? [] : tab_all_classes);

    return (
        <>
            { tab_classes.length > 0 && (
                <div className={classes.list_classe}>
                    { tab_classes.map((classe) =>
                            <Classe key={classe._id}
                                    id={classe._id}
                                    nom={classe.name}
                                    eleves={classe.students}
                                    profs={classe.teachers}
                                    matieres={classe.subjects} /> )}
                </div>
            )}
            { tab_classes.length === 0 && (
                <div style={{ textAlign: 'center', color: '#36a9e1' }}>
                    <h2>Aucune classe</h2>
                </div>
            )}
        </>
    );
}

export default ClassesList;