import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import EleveHeader from '../components/eleve/EleveHeader';
import ElevesList from '../components/eleve/ElevesList';

import axios from 'axios';

export const EleveView = () => {
    const [eleves, setEleves] = useState([]);

    const handleSearch = (data) => {
        setEleves(data);
    };

    return (
        <>
            <EleveHeader onSearch={handleSearch} />
            <Outlet />
            <ElevesList search={eleves} />
        </>
    )
};

export async function loader() {
    const res = await axios.get('http://localhost:3001/students');

    return res.data;
}