import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { MdAssignment, MdPerson } from 'react-icons/md';

import logo from '../logo_myESIEA.png';

import classes from './NavBar.module.css';

function NavBar() {
    return (
        <header className={classes.header}>
            <Link to="/">
                <img className={classes.logo} src={logo} alt="Logo myESIEA" />
            </Link>
            <ul>
                <CustomLink to="/eleves" className={classes.button}>
                    <MdPerson />
                    <span>Élève</span>
                </CustomLink>
                <CustomLink to="/professeurs" className={classes.button}>
                    <FaChalkboardTeacher />
                    <span>Professeur</span>
                </CustomLink>
                <CustomLink to="/matieres" className={classes.button}>
                    <FaGraduationCap />
                    <span>Matière</span>
                </CustomLink>
                <CustomLink to="/notes" className={classes.button}>
                    <MdAssignment />
                    <span>Note</span>
                </CustomLink>
                <CustomLink to="/classes" className={classes.button}>
                    <SiGoogleclassroom />
                    <span>Classe</span>
                </CustomLink>
                {/* <li>
                    <Link to="/eleves" className={classes.button}>
                        <MdPerson />
                        <span>Élève</span>
                    </Link>
                </li>
                <li>
                    <Link to="/professeurs" className={classes.button}>
                        <FaChalkboardTeacher />
                        <span>Professeur</span>
                    </Link>
                </li>
                <li>
                    <Link to="/matieres" className={classes.button}>
                        <FaGraduationCap />
                        <span>Matière</span>
                    </Link>
                </li>
                <li>
                    <Link to="/notes" className={classes.button}>
                        <MdAssignment />
                        <span>Note</span>
                    </Link>
                </li>
                <li>
                    <Link to="/classes" className={classes.button}>
                        <SiGoogleclassroom />
                        <span>Classe</span>
                    </Link>
                </li> */}
            </ul>
        </header>
    );
}

export default NavBar;

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? classes.active : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}