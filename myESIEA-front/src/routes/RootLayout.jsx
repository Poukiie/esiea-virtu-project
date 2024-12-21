import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from "../components/NavBar";

function RootLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <ToastContainer />
        </>
    );
}

export default RootLayout;