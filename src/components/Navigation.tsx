import { FC } from "react";
import { Link } from "react-router-dom";


const Navigation:FC = () => {
    return <div>
        <Link to="main">Home</Link>
        <Link to="form">Form</Link>
    </div>
}

export default Navigation