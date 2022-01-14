import { FC } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";


const Navigation: FC = () => {
    return <div>
        <Outlet />
    </div>
}

export default Navigation