import axios from 'axios';

import { useState } from 'react';
import { Outlet} from 'react-router-dom';

import MatiereHeader from '../components/matiere/MatiereHeader';
import MatieresList from '../components/matiere/MatieresList';

export const MatiereView = () => {
    const [matieres, setMatieres] = useState([]);

    const handleSearch = (data) => {
        setMatieres(data);
    };

    return (
        <>
            <MatiereHeader onSearch={handleSearch} />
            <Outlet />
            <MatieresList search={matieres} />
        </>
    )
};

export async function loader() {
    const res = await axios.get('http://localhost:3001/subjects');
    return res.data;
}