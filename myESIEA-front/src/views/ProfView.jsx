import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

import ProfHeader from '../components/prof/ProfHeader';
import ProfsList from '../components/prof/ProfsList';

export const ProfView = () => {
    const [profs, setProfs] = useState([]);

    const handleSearch = (data) => {
        setProfs(data);
    };

    return (
        <>
            <ProfHeader onSearch={handleSearch} />
            <Outlet />
            <ProfsList search={profs} />
        </>
    )
};

export async function loader() {
    const res = await axios.get('/teachers');
    return res.data;
}