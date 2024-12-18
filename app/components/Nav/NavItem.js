'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavItem({icon, label, link}) {
    const isActive = false
    const pathname = usePathname()
    return (
        <Link className={`navbar-brand p-3 d-flex flex-column align-items-center ${pathname === link ? "text-danger" : "text-primary"}`} href={link}>
            {icon}
            <p className="text-sm m-0">{label}</p>
        </Link>
    );
}



