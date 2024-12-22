import classes from'./Classe.module.css'
import Collapsible from "./Collapsible";

function Classe({ id, nom, eleves, profs, matieres }) {
    return (
        <Collapsible label={nom} id={id}>
        <h1 className={classes.title}>Élèves</h1>
        { eleves.length > 0 && (
            <div className={classes.table}>
                { eleves.map((eleve) => <div key={eleve._id} className={classes.classe}>
                                            <span className={classes.nom}>{ eleve.lastname }</span> { eleve.firstname }
                                        </div> )
                }
            </div>
        ) }
        { eleves.length === 0 && (
            <div style={{ textAlign: 'center', fontWeight: 'normal' }}>
                <h4>Aucun élève</h4>
            </div>
        )}
        <h1 className={classes.title}>Enseignants</h1>
        { profs.length > 0 && (
            <div className={classes.table}>
                { profs.map((prof) => <div key={prof._id} className={classes.classe}>
                                        <span className={classes.nom}>{ prof.lastname }</span> { prof.firstname }
                                      </div> )
                }
            </div>
        ) }
        { profs.length === 0 && (
            <div style={{ textAlign: 'center', fontWeight: 'normal' }}>
                <h4>Aucun enseignant</h4>
            </div>
        )}
        <h1 className={classes.title}>Matières</h1>
        { matieres.length > 0 && (
            <div className={classes.table}>
                { matieres.map((matiere) => <div key={matiere._id} className={classes.classe}>{ matiere.name }</div> ) }
            </div>
        ) }
        { matieres.length === 0 && (
            <div style={{ textAlign: 'center', fontWeight: 'normal' }}>
                <h4>Aucune matière</h4>
            </div>
        )}
    </Collapsible>

    );
}

export default Classe;