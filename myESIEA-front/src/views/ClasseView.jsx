import axios from 'axios';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ClasseHeader from '../components/classe/ClasseHeader';
import ClassesList from '../components/classe/ClassesList';

export const ClasseView = () => {
    const [classes, setClasses] = useState([]);

    const handleSearch = (data) => {
        setClasses(data);
    };

    return (
        <>
            <ClasseHeader onSearch={handleSearch} />
            <Outlet />
            <ClassesList search={classes} />
        </>
    )
};

export async function loader() {
    const res = await axios.get('/classes');
    return res.data;
}