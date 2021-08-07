import { useRef, useEffect } from "react";
import Link from "next/link";
// import img from "../public/logo.png";
import Image from "next/image";
import navStyles from "../styles/Nav.module.scss";


export default function Nav() {

    const headerRef = useRef();



    // useEffect(() => {

    //     let prevSrollpos = window.pageYOffset;
    //     window.onscroll = () => {
    //         let currentScrollPos = window.pageYOffset;

    //         if (prevSrollpos > currentScrollPos) {
    //             headerRef.current.style.top = "0";
    //         } else {
    //             headerRef.current.style.top = "-64px"
    //         }
    //         prevSrollpos = currentScrollPos;
    //     }
    // }, [])



    return (
        <header ref={headerRef} className={navStyles.header}>
            {/* <Image src={img} /> */}
            <div className={navStyles["logo-container"]}>
                <div className={navStyles["logo-image"]}></div>
                <span className={navStyles.logo}>Black Cube Room</span>
            </div>

            <input
                type="checkbox"
                id="nav-toggle"
                className={navStyles["nav-toggle"]}
            />
            <nav>
                <ul>
                    <li>
                        <Link href="/#quotes">
                            <div className={navStyles.link}>Home</div>


                        </Link>
                    </li>
                    <li>
                        <Link href="/#projects">
                            <div className={navStyles.link}>Projects</div></Link>
                    </li>
                    <li>
                        <Link href="/#about">
                            <div className={navStyles.link}>About</div></Link>
                    </li>
                </ul>
            </nav>
            <label htmlFor="nav-toggle" className={navStyles["nav-toggle-label"]}>
                <span></span>
            </label>
        </header>
    );
}
