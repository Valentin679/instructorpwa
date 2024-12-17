import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import NavItem from "@/app/components/Nav/NavItem";

export default function Nav() {
    return (
        <nav className="navbar sticky-bottom bg-body-tertiary p-2">
            <div className="container-fluid d-flex justify-content-between">
                <NavItem label={'Ученики'} icon={<BsFillPeopleFill />}/>
                <NavItem label={'Расписание'} icon={<FaTableList />}/>
            </div>
        </nav>
    );
}



