import classes from './App.module.css';

function App() {

  return (
    <>
      <div className={classes.title}>
        <h1>
          Bienvenue sur
          <br />
          <span className={classes.siteName}>myESIEA</span>
        </h1>
        <p className={classes.subtitle}>La plateforme en ligne pour la gestion de l'école.</p>
      </div>
    </>
  );
}

export default App;