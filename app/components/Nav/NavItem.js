import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import Link from "next/link";

export default function NavItem({icon, label}) {
    const isActive = false
    return (
        <Link className={`navbar-brand p-3 d-flex flex-column align-items-center ${isActive ? "text-danger" : "text-primary"}`} href="/students">
            {icon}
            <p className="text-sm m-0">{label}</p>
        </Link>
    );
}



