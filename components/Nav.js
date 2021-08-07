import { useRef, useEffect } from "react";
import Link from "next/link";

import navStyles from "../styles/Nav.module.scss";


export default function Nav() {

    const headerRef = useRef();



    useEffect(() => {

        let prevSrollpos = window.pageYOffset;
        window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;

            if (prevSrollpos > currentScrollPos) {
                headerRef.current.style.top = "0";
            } else {
                headerRef.current.style.top = "-64px"
            }
            prevSrollpos = currentScrollPos;
        }
    }, [])



    return (
        <header ref={headerRef} className={navStyles.header}>
            <h1 className={navStyles.logo}>Logo</h1>
            <input
                type="checkbox"
                id="nav-toggle"
                className={navStyles["nav-toggle"]}
            />
            <nav>
                <ul>
                    <li>
                        <Link href="/#quotes">
                            <a>
                                <div>Home</div>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#projects" className="active">Projects</Link>
                    </li>
                    <li>
                        <Link href="/#about">About</Link>
                    </li>
                </ul>
            </nav>
            <label htmlFor="nav-toggle" className={navStyles["nav-toggle-label"]}>
                <span></span>
            </label>
        </header>
    );
}
