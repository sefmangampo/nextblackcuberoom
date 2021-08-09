import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import navStyles from "../styles/Nav.module.scss";

export default function Nav() {
  const headerRef = useRef();
  const checkboxRef = useRef();

  useEffect(() => {
    const navlinks = document.getElementsByClassName(navStyles.link);

    for (let i = 0; i < navlinks.length; i++) {
      navlinks[i].addEventListener("click", () => {
        checkboxRef.current.checked = false;
      });
    }
  }, []);

  return (
    <header ref={headerRef} className={navStyles.header}>
      {/* <Image src={img} /> */}
      <div className={navStyles["logo-container"]}>
        <div className={navStyles["logo-image"]}></div>
        <span className={navStyles.logo}>Black Cube Room</span>
      </div>

      <input
        ref={checkboxRef}
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
              <div className={navStyles.link}>Projects</div>
            </Link>
          </li>
          <li>
            <Link href="/#about">
              <div className={navStyles.link}>About</div>
            </Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className={navStyles["nav-toggle-label"]}>
        <span></span>
      </label>
    </header>
  );
}
