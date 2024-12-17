import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";

export default function NavItem({icon, label}) {
    const isActive = false
    return (
        <a className={`navbar-brand p-3 d-flex flex-column align-items-center ${isActive ? "text-danger" : "text-primary"}`} href="#">
            {icon}
            <p className="text-sm m-0">{label}</p>
        </a>
    );
}



