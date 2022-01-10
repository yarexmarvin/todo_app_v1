import { FC } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";


const Navigation: FC = () => {
    return <div>
        <header className='nav'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="form">Form</NavLink>
        </header>


        <Outlet />
    </div>
}

export default Navigation